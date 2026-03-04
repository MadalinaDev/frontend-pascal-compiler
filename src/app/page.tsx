"use client";

import Link from "next/link";
import { problems } from "@/lib/testcases";
import { slugify } from "@/lib/testcases";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-sm">
              PJ
            </div>
            <h1 className="text-xl font-bold text-white">Pascal Judge</h1>
          </div>
          <div className="text-sm text-gray-400">
            {problems.length} problem{problems.length !== 1 ? "e" : "ă"} disponibil{problems.length !== 1 ? "e" : "ă"}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Probleme</h2>
          <p className="text-gray-400">
            Alege o problemă, scrie soluția în Pascal, și testează-o automat.
          </p>
        </div>

        {/* Problem Table */}
        <div className="rounded-xl border border-gray-800 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-900/80 text-left text-sm text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-3 w-12">#</th>
                <th className="px-6 py-3">Problemă</th>
                <th className="px-6 py-3 w-20 text-center">Teste</th>
                <th className="px-6 py-3 w-28"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {problems.map((problem, idx) => (
                <tr
                  key={slugify(problem.title)}
                  className="hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-6 py-4 text-gray-500 font-mono text-sm">
                    {idx + 1}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/problem/${slugify(problem.title)}`}
                      className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                    >
                      {problem.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-center text-gray-400 text-sm">
                    {problem.testCases.length}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/problem/${slugify(problem.title)}`}
                      className="inline-flex items-center gap-1 text-sm px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors whitespace-nowrap"
                    >
                      <span>Rezolvă</span>
                      <span>→</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
