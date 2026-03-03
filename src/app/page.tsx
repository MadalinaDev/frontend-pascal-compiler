"use client";

import { useState } from "react";

interface TestResult {
  id: number;
  name: string;
  passed: boolean;
  expectedOutput: string;
  actualOutput: string;
  stderr?: string;
  exitCode: number;
}

interface RunResponse {
  compiled: boolean;
  compileError?: string;
  compileOutput?: string;
  results: TestResult[];
  error?: string;
}

const DEFAULT_CODE = `program solve;
var a, b: integer;
begin
  readln(a, b);
  writeln(a + b);
end.`;

export default function Home() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<RunResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch("/api/run-pascal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data: RunResponse = await res.json();

      if (!res.ok) {
        setError(data.error || `Server error (${res.status})`);
      } else {
        setResponse(data);
      }
    } catch (err: any) {
      setError(err.message || "Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const passedCount = response?.results.filter((r) => r.passed).length ?? 0;
  const totalCount = response?.results.length ?? 0;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-1 text-white">
          Pascal Code Judge: Problema "Produs maxim"
        </h1>
        <p className="text-gray-400 text-sm mb-6">
          Write your Pascal solution below, then submit to run it against the
          test cases.
        </p>

        {/* Code Editor */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Pascal Source Code
          </label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="w-full h-80 bg-gray-900 border border-gray-700 rounded-lg p-4 font-mono text-sm text-green-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y leading-relaxed"
            placeholder="program solve; ..."
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading || !code.trim()}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-500 text-white font-medium rounded-lg transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center gap-2">
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
              Compiling & Running...
            </span>
          ) : (
            "Submit Solution"
          )}
        </button>

        {/* Error */}
        {error && (
          <div className="mt-6 bg-red-900/50 border border-red-700 rounded-lg p-4">
            <h3 className="text-red-400 font-semibold mb-1">Error</h3>
            <pre className="text-red-300 text-sm whitespace-pre-wrap font-mono">
              {error}
            </pre>
          </div>
        )}

        {/* Compile Error */}
        {response && !response.compiled && (
          <div className="mt-6 bg-red-900/50 border border-red-700 rounded-lg p-4">
            <h3 className="text-red-400 font-semibold mb-1">
              Compilation Failed
            </h3>
            <pre className="text-red-300 text-sm whitespace-pre-wrap font-mono max-h-60 overflow-auto">
              {response.compileError}
            </pre>
          </div>
        )}

        {/* Results */}
        {response && response.compiled && (
          <div className="mt-6">
            {/* Summary */}
            <div
              className={`rounded-lg p-4 mb-4 border ${
                passedCount === totalCount
                  ? "bg-green-900/30 border-green-700"
                  : "bg-yellow-900/30 border-yellow-700"
              }`}
            >
              <span className="text-lg font-bold">
                {passedCount === totalCount ? (
                  <span className="text-green-400">
                    All Tests Passed! ({passedCount}/{totalCount})
                  </span>
                ) : (
                  <span className="text-yellow-400">
                    {passedCount}/{totalCount} Tests Passed
                  </span>
                )}
              </span>
            </div>

            {/* Individual Results */}
            <div className="space-y-3">
              {response.results.map((result) => (
                <div
                  key={result.id}
                  className={`rounded-lg border p-4 ${
                    result.passed
                      ? "bg-green-900/20 border-green-800"
                      : "bg-red-900/20 border-red-800"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                        result.passed
                          ? "bg-green-600 text-white"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {result.passed ? "✓" : "✗"}
                    </span>
                    <span className="font-medium">{result.name}</span>
                    <span
                      className={`ml-auto text-xs font-semibold px-2 py-0.5 rounded ${
                        result.passed
                          ? "bg-green-800 text-green-200"
                          : "bg-red-800 text-red-200"
                      }`}
                    >
                      {result.passed ? "PASSED" : "FAILED"}
                    </span>
                  </div>

                  {!result.passed && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 text-sm">
                      <div>
                        <span className="text-gray-400 text-xs uppercase tracking-wide">
                          Expected Output
                        </span>
                        <pre className="mt-1 bg-gray-900 rounded p-2 text-green-300 font-mono whitespace-pre-wrap">
                          {result.expectedOutput || "(empty)"}
                        </pre>
                      </div>
                      <div>
                        <span className="text-gray-400 text-xs uppercase tracking-wide">
                          Actual Output
                        </span>
                        <pre className="mt-1 bg-gray-900 rounded p-2 text-red-300 font-mono whitespace-pre-wrap">
                          {result.actualOutput || "(empty)"}
                        </pre>
                      </div>
                      {result.stderr && (
                        <div className="md:col-span-2">
                          <span className="text-gray-400 text-xs uppercase tracking-wide">
                            Stderr
                          </span>
                          <pre className="mt-1 bg-gray-900 rounded p-2 text-yellow-300 font-mono whitespace-pre-wrap text-xs">
                            {result.stderr}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
