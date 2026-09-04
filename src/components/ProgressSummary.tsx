"use client";

import { useState } from "react";
import { useProgress, countSolved, clearProgress } from "@/lib/progress";

/**
 * Overall "solved / total" for the whole judge, plus a way to wipe progress.
 *
 * The reset exists because progress is stored silently in the browser; without
 * it there would be no way to start over or to hand the laptop to another
 * student.
 */
export default function ProgressSummary({ slugs }: { slugs: string[] }) {
  const progress = useProgress();
  const [confirming, setConfirming] = useState(false);

  const solved = countSolved(progress, slugs);
  const total = slugs.length;
  const ratio = total > 0 ? solved / total : 0;

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <span
          className={`text-sm font-semibold tabular-nums ${
            solved === total && total > 0 ? "text-green-300" : "text-gray-300"
          }`}
        >
          {solved}/{total}
        </span>
        <span className="text-sm text-gray-500 hidden sm:inline">rezolvate</span>
        <span className="hidden md:inline-block w-16 h-1.5 rounded-full bg-gray-800 overflow-hidden">
          <span
            className={`block h-full rounded-full transition-all duration-500 ${
              solved === total && total > 0 ? "bg-green-500" : "bg-blue-500"
            }`}
            style={{ width: `${ratio * 100}%` }}
          />
        </span>
      </div>

      {solved > 0 &&
        (confirming ? (
          <span className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => {
                clearProgress();
                setConfirming(false);
              }}
              className="px-2 py-1 rounded bg-red-700 hover:bg-red-600 text-white transition-colors cursor-pointer"
            >
              Șterge tot
            </button>
            <button
              onClick={() => setConfirming(false)}
              className="px-2 py-1 rounded text-gray-400 hover:text-gray-200 transition-colors cursor-pointer"
            >
              Anulează
            </button>
          </span>
        ) : (
          <button
            onClick={() => setConfirming(true)}
            className="text-xs text-gray-600 hover:text-gray-400 transition-colors cursor-pointer"
            title="Șterge progresul salvat în acest browser"
          >
            Resetează
          </button>
        ))}
    </div>
  );
}
