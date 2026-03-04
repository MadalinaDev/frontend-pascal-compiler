"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import type { Problem } from "@/lib/testcases";
import { slugify } from "@/lib/testcases";

interface TestResult {
  id: number;
  name: string;
  passed: boolean;
  expectedOutput: string;
  actualOutput: string;
  stderr?: string;
  exitCode: number;
  time?: string | null;
  memory?: number | null;
}

interface RunResponse {
  compiled: boolean;
  compileError?: string;
  results: TestResult[];
  error?: string;
}

function fireConfetti() {
  const duration = 3000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ["#22c55e", "#3b82f6", "#eab308", "#ef4444", "#a855f7"],
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ["#22c55e", "#3b82f6", "#eab308", "#ef4444", "#a855f7"],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };
  frame();

  // Big burst in the center
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { x: 0.5, y: 0.4 },
    colors: ["#22c55e", "#3b82f6", "#eab308", "#ef4444", "#a855f7"],
  });
}

export default function ProblemClient({ problem }: { problem: Problem }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<RunResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"statement" | "submissions">(
    "statement",
  );
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const passedCount = response?.results.filter((r) => r.passed).length ?? 0;
  const totalCount = response?.results.length ?? 0;
  const allPassed =
    response?.compiled && passedCount === totalCount && totalCount > 0;

  // Timer during submission
  useEffect(() => {
    if (loading) {
      setElapsedTime(0);
      timerRef.current = setInterval(() => {
        setElapsedTime((t) => t + 0.1);
      }, 100);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [loading]);

  // Fire confetti when all tests pass
  useEffect(() => {
    if (allPassed) {
      fireConfetti();
    }
  }, [allPassed]);

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch("/api/run-pascal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, problemSlug: slugify(problem.title) }),
      });

      const data: RunResponse = await res.json();

      if (!res.ok) {
        setError(data.error || `Server error (${res.status})`);
      } else {
        setResponse(data);
        setActiveTab("submissions");
        // Scroll to results
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
    } catch (err: any) {
      setError(err.message || "Failed to connect to server");
    } finally {
      setLoading(false);
    }
  }, [code, problem.title]);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-xs">
                PJ
              </div>
              <span className="font-semibold text-white">Pascal Judge</span>
            </Link>
            <span className="text-gray-600">|</span>
            <span className="text-gray-300 font-medium">{problem.title}</span>
          </div>
          <div className="flex items-center gap-4"></div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel — Problem Statement */}
          <div className="space-y-4">
            {/* Tabs */}
            <div className="flex gap-1 bg-gray-900 rounded-lg p-1">
              <button
                onClick={() => setActiveTab("statement")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === "statement"
                    ? "bg-gray-700 text-white"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                Enunț
              </button>
              <button
                onClick={() => setActiveTab("submissions")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === "submissions"
                    ? "bg-gray-700 text-white"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                Rezultate
                {response && response.compiled && (
                  <span
                    className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                      allPassed
                        ? "bg-green-800 text-green-200"
                        : "bg-yellow-800 text-yellow-200"
                    }`}
                  >
                    {passedCount}/{totalCount}
                  </span>
                )}
              </button>
            </div>

            {/* Statement Tab */}
            {activeTab === "statement" && (
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 space-y-5 h-[calc(100vh-340px)] min-h-[400px] overflow-y-auto">
                {/* Title & metadata */}
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">
                    {problem.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
                    <span>{problem.testCases.length} teste</span>
                  </div>
                </div>

                {/* Statement */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wide mb-2">
                    Cerință
                  </h3>
                  <div
                    className="text-gray-200 leading-relaxed whitespace-pre-wrap prose prose-invert prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300 max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: problem.statement.replace(
                        /(https?:\/\/[^\s]+)/g,
                        '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 underline">$1</a>',
                      ),
                    }}
                  />
                </div>
              </div>
            )}

            {/* Results Tab */}
            {activeTab === "submissions" && (
              <div
                ref={resultsRef}
                className="bg-gray-900 rounded-xl border border-gray-800 p-6 max-h-[calc(100vh-200px)] overflow-y-auto"
              >
                {!response && !error && (
                  <div className="text-center py-12 text-gray-500">
                    <svg
                      className="w-16 h-16 mx-auto mb-3 opacity-30"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p>Nicio trimitere încă.</p>
                    <p className="text-sm mt-1">
                      Scrie soluția și apasă Submit.
                    </p>
                  </div>
                )}

                {/* Error */}
                {error && (
                  <div className="bg-red-900/50 border border-red-700 rounded-lg p-4">
                    <h3 className="text-red-400 font-semibold mb-1">Eroare</h3>
                    <pre className="text-red-300 text-sm whitespace-pre-wrap font-mono">
                      {error}
                    </pre>
                  </div>
                )}

                {/* Compile Error */}
                {response && !response.compiled && (
                  <div className="bg-red-900/50 border border-red-700 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-xs font-bold">
                        ✗
                      </span>
                      <h3 className="text-red-400 font-semibold">
                        Eroare de compilare
                      </h3>
                    </div>
                    <pre className="text-red-300 text-sm whitespace-pre-wrap font-mono max-h-60 overflow-auto bg-gray-950 rounded p-3 mt-2">
                      {response.compileError}
                    </pre>
                  </div>
                )}

                {/* Results */}
                {response && response.compiled && (
                  <div className="space-y-4">
                    {/* Score banner */}
                    <div
                      className={`rounded-xl p-5 border ${
                        allPassed
                          ? "bg-green-900/30 border-green-600"
                          : "bg-yellow-900/20 border-yellow-700"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div
                            className={`text-2xl font-bold ${allPassed ? "text-green-400" : "text-yellow-400"}`}
                          >
                            {allPassed ? "Accepted!" : "Parțial"}
                          </div>
                          <div className="text-sm text-gray-400 mt-1">
                            {passedCount} din {totalCount} teste trecute
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`text-3xl font-bold ${allPassed ? "text-green-400" : "text-yellow-400"}`}
                          >
                            {passedCount}/{totalCount}
                          </div>
                          <div className="text-xs text-gray-500">
                            teste trecute
                          </div>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="mt-3 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            allPassed ? "bg-green-500" : "bg-yellow-500"
                          }`}
                          style={{
                            width: `${(passedCount / totalCount) * 100}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Individual test results */}
                    <div className="space-y-2">
                      {response.results.map((result) => (
                        <TestResultCard key={result.id} result={result} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Panel — Code Editor */}
          <div className="space-y-4">
            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
              {/* Editor header */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-800 bg-gray-900/80">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-sm text-gray-400 ml-2 font-mono">
                    solution.pas
                  </span>
                </div>
                <button
                  onClick={() => setCode("")}
                  className="text-xs text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
                >
                  Resetează
                </button>
              </div>

              {/* Code input */}
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                className="w-full h-[calc(100vh-340px)] min-h-[400px] bg-gray-950 p-4 font-mono text-sm text-green-300 focus:outline-none resize-none leading-relaxed"
                placeholder={`program solve;
var
  a, b, sum: integer;
begin
  readln(a, b);
  sum := a + b;
  writeln(sum);
end.`}
              />
            </div>

            {/* Submit area */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleSubmit}
                disabled={loading || !code.trim()}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-500 text-white font-semibold rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Se evaluează... ({elapsedTime.toFixed(1)}s)
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Trimite soluția
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TestResultCard({ result }: { result: TestResult }) {
  const [expanded, setExpanded] = useState(!result.passed);

  return (
    <div
      className={`rounded-lg border transition-colors ${
        result.passed
          ? "bg-green-900/10 border-green-800/50"
          : "bg-red-900/10 border-red-800/50"
      }`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-2 px-4 py-3 cursor-pointer"
      >
        <span
          className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold flex-shrink-0 ${
            result.passed ? "bg-green-600 text-white" : "bg-red-600 text-white"
          }`}
        >
          {result.passed ? "✓" : "✗"}
        </span>
        <span className="font-medium text-sm text-left flex-1">
          {result.name}
        </span>
        {result.time && (
          <span className="text-xs text-gray-500 mr-2">{result.time}s</span>
        )}
        {result.memory && (
          <span className="text-xs text-gray-500 mr-2">
            {(result.memory / 1024).toFixed(0)} KB
          </span>
        )}
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded ${
            result.passed
              ? "bg-green-800/60 text-green-200"
              : "bg-red-800/60 text-red-200"
          }`}
        >
          {result.passed ? "AC" : "WA"}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${expanded ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {expanded && (
        <div className="px-4 pb-3 space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-500 text-xs uppercase tracking-wide block mb-1">
                Ieșire așteptată
              </span>
              <pre className="bg-gray-950 rounded p-2 text-green-300 font-mono whitespace-pre-wrap text-xs">
                {result.expectedOutput || "(gol)"}
              </pre>
            </div>
            <div>
              <span className="text-gray-500 text-xs uppercase tracking-wide block mb-1">
                Ieșirea ta
              </span>
              <pre
                className={`bg-gray-950 rounded p-2 font-mono whitespace-pre-wrap text-xs ${
                  result.passed ? "text-green-300" : "text-red-300"
                }`}
              >
                {result.actualOutput || "(gol)"}
              </pre>
            </div>
          </div>
          {result.stderr && (
            <div>
              <span className="text-gray-500 text-xs uppercase tracking-wide block mb-1">
                Stderr
              </span>
              <pre className="bg-gray-950 rounded p-2 text-yellow-300 font-mono whitespace-pre-wrap text-xs">
                {result.stderr}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
