import { NextRequest, NextResponse } from "next/server";
import { testCases } from "@/lib/testcases";

/**
 * Judge0 CE API — industry-standard code execution engine.
 *
 * Get a FREE API key:
 *   1. Go to https://rapidapi.com/judge0-official/api/judge0-ce
 *   2. Sign up (free, no credit card)
 *   3. Subscribe to the Basic plan (free — 50 requests/day)
 *   4. Copy your X-RapidAPI-Key
 *   5. Set JUDGE0_API_KEY in your .env.local (or Vercel env vars)
 *
 * Or self-host Judge0: https://github.com/judge0/judge0
 *   and set JUDGE0_API_URL to your instance URL.
 */
const JUDGE0_API_URL =
  process.env.JUDGE0_API_URL || "https://judge0-ce.p.rapidapi.com";
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY || "";
const RAPIDAPI_HOST = "judge0-ce.p.rapidapi.com";

// Free Pascal language ID in Judge0
const PASCAL_LANGUAGE_ID = 67;

interface Judge0Submission {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  message: string | null;
  status: { id: number; description: string };
  time: string | null;
  memory: number | null;
}

function getHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // If using RapidAPI (default), add RapidAPI headers
  if (JUDGE0_API_URL.includes("rapidapi.com")) {
    headers["X-RapidAPI-Key"] = JUDGE0_API_KEY;
    headers["X-RapidAPI-Host"] = RAPIDAPI_HOST;
  } else if (JUDGE0_API_KEY) {
    // Self-hosted Judge0 with auth token
    headers["X-Auth-Token"] = JUDGE0_API_KEY;
  }

  return headers;
}

async function executeWithJudge0(
  code: string,
  stdin: string,
): Promise<Judge0Submission> {
  // Use ?wait=true so the API blocks until execution completes
  const res = await fetch(
    `${JUDGE0_API_URL}/submissions?base64_encoded=false&wait=true`,
    {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        source_code: code,
        language_id: PASCAL_LANGUAGE_ID,
        stdin,
      }),
    },
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Judge0 API error (${res.status}): ${text}`);
  }

  return res.json();
}

export async function POST(req: NextRequest) {
  try {
    if (!JUDGE0_API_KEY) {
      return NextResponse.json(
        {
          error:
            "JUDGE0_API_KEY is not configured. Get a free key at https://rapidapi.com/judge0-official/api/judge0-ce and set it in your environment variables.",
        },
        { status: 500 },
      );
    }

    const body = await req.json();
    const code: string = body.code;

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { error: "No Pascal code provided" },
        { status: 400 },
      );
    }

    // Run all test cases in parallel
    const resultPromises = testCases.map(async (tc) => {
      try {
        const result = await executeWithJudge0(code, tc.input);

        // Status 6 = Compilation Error
        if (result.status.id === 6) {
          return {
            id: tc.id,
            name: tc.name,
            passed: false,
            expectedOutput: tc.expectedOutput.replace(/\r\n/g, "\n").trim(),
            actualOutput: "",
            stderr: result.compile_output || "Compilation error",
            exitCode: 1,
            compilationError: true,
          };
        }

        // Status 3 = Accepted (ran successfully)
        // Any other status = runtime error, TLE, etc.
        const actualOutput = (result.stdout || "")
          .replace(/\r\n/g, "\n")
          .trim();
        const expectedOutput = tc.expectedOutput.replace(/\r\n/g, "\n").trim();
        const passed =
          result.status.id === 3 && actualOutput === expectedOutput;

        return {
          id: tc.id,
          name: tc.name,
          passed,
          expectedOutput,
          actualOutput,
          stderr:
            result.stderr ||
            result.message ||
            (result.status.id !== 3
              ? `Runtime: ${result.status.description}`
              : undefined),
          exitCode: result.status.id === 3 ? 0 : result.status.id,
        };
      } catch (err: any) {
        return {
          id: tc.id,
          name: tc.name,
          passed: false,
          expectedOutput: tc.expectedOutput.replace(/\r\n/g, "\n").trim(),
          actualOutput: "",
          stderr: err.message,
          exitCode: -1,
        };
      }
    });

    const results = await Promise.all(resultPromises);
    results.sort((a, b) => a.id - b.id);

    // Check if every test had a compilation error
    const allCompileErrors = results.every(
      (r) => "compilationError" in r && r.compilationError,
    );

    if (allCompileErrors) {
      return NextResponse.json({
        compiled: false,
        compileError: results[0]?.stderr || "Compilation error",
        results: [],
      });
    }

    return NextResponse.json({
      compiled: true,
      results,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 },
    );
  }
}
