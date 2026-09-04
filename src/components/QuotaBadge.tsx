"use client";

import { useEffect, useState } from "react";

// Type-only import: erased at compile time, so the server-side quota store
// never reaches the client bundle.
import type { Quota } from "@/lib/quota";

export type { Quota };

/** Roughly how many upstream requests one submission costs (batch + polls). */
const TYPICAL_COST = 3;

function formatReset(seconds: number): string {
  if (seconds <= 0) return "acum";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m`;
  return `${seconds}s`;
}

/**
 * Shows how many daily Judge0 credits are left.
 *
 * `quota` is the fresh reading returned by the last submission; when it is
 * null the badge falls back to the server's last remembered value, which costs
 * nothing to fetch but may be stale.
 */
export default function QuotaBadge({ quota }: { quota?: Quota | null }) {
  const [fetched, setFetched] = useState<Quota | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/quota")
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) setFetched(d.quota ?? null);
      })
      .catch(() => {
        /* the badge is a nicety — never break the page over it */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Prefer whichever reading is newer.
  const current =
    quota && fetched
      ? quota.observedAt >= fetched.observedAt
        ? quota
        : fetched
      : (quota ?? fetched);

  if (!current) {
    return (
      <span
        className="text-xs text-gray-500 border border-gray-800 rounded-full px-2.5 py-1"
        title="Numărul de credite devine cunoscut după prima trimitere din această sesiune. Instanțele Judge0 self-hosted nu sunt limitate."
      >
        Credite: necunoscut
      </span>
    );
  }

  const { limit, remaining, resetSeconds } = current;
  const ratio = limit > 0 ? remaining / limit : 0;
  const submissionsLeft = Math.floor(remaining / TYPICAL_COST);

  const tone =
    remaining < TYPICAL_COST
      ? "text-red-300 border-red-700 bg-red-900/30"
      : ratio <= 0.2
        ? "text-yellow-200 border-yellow-700 bg-yellow-900/25"
        : "text-green-200 border-green-800 bg-green-900/20";

  const barTone =
    remaining < TYPICAL_COST
      ? "bg-red-500"
      : ratio <= 0.2
        ? "bg-yellow-500"
        : "bg-green-500";

  const title =
    `${remaining} din ${limit} cereri Judge0 rămase azi. ` +
    `O trimitere costă ~${TYPICAL_COST} cereri (un batch + verificări), ` +
    `deci mai sunt ~${submissionsLeft} trimiteri.` +
    (resetSeconds !== null ? ` Cota se resetează în ${formatReset(resetSeconds)}.` : "");

  return (
    <span
      className={`inline-flex items-center gap-2 text-xs rounded-full border px-2.5 py-1 ${tone}`}
      title={title}
    >
      <span className="font-semibold tabular-nums">
        {remaining}/{limit}
      </span>
      <span className="hidden sm:inline opacity-80">credite azi</span>
      <span className="hidden md:inline-block w-10 h-1.5 rounded-full bg-black/40 overflow-hidden align-middle">
        <span
          className={`block h-full rounded-full ${barTone}`}
          style={{ width: `${Math.max(0, Math.min(1, ratio)) * 100}%` }}
        />
      </span>
      <span className="hidden lg:inline opacity-70">
        ~{submissionsLeft} trimiteri
      </span>
    </span>
  );
}
