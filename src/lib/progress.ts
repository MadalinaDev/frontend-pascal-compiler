"use client";

import { useSyncExternalStore } from "react";

/**
 * Per-device record of how each problem has gone.
 *
 * Stored in localStorage rather than cookies: the server never needs this
 * data, so putting it in a cookie would ship it on every single request, cap
 * it at ~4KB, and force the statically prerendered home page to re-render per
 * request. localStorage keeps it client-side, larger, and free.
 *
 * Every read and write is guarded — localStorage throws outright in some
 * privacy modes, and the app must still work when it does. Progress is a
 * nicety; losing it must never break judging.
 */

const STORAGE_KEY = "cppjudge:progress:v1";

/** Fired on this tab after a write, since `storage` only reaches other tabs. */
const CHANGE_EVENT = "cppjudge:progress-changed";

export interface ProblemProgress {
  /** Every test passed at least once */
  solved: boolean;
  /** Best number of tests passed across all attempts */
  bestPassed: number;
  /** How many tests the problem had at that attempt */
  total: number;
  /** How many times it has been submitted */
  attempts: number;
  /** Epoch ms of the most recent submission */
  lastAttemptAt: number;
  /** Epoch ms of the first fully-passing submission */
  solvedAt?: number;
}

export type ProgressMap = Record<string, ProblemProgress>;

/** Shared empty result, so identity stays stable for useSyncExternalStore. */
const EMPTY: ProgressMap = {};

function safeReadRaw(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function parse(raw: string | null): ProgressMap {
  if (!raw) return EMPTY;
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return EMPTY;
    return parsed as ProgressMap;
  } catch {
    // Corrupt or hand-edited value: behave as if there were no progress.
    return EMPTY;
  }
}

// useSyncExternalStore requires getSnapshot to return a stable reference when
// nothing changed, so the parsed value is cached against its raw string.
let cachedRaw: string | null = null;
let cachedValue: ProgressMap = EMPTY;
let primed = false;

function getSnapshot(): ProgressMap {
  const raw = safeReadRaw();
  if (!primed || raw !== cachedRaw) {
    cachedRaw = raw;
    cachedValue = parse(raw);
    primed = true;
  }
  return cachedValue;
}

/** The server has no localStorage; render as if nothing is solved. */
function getServerSnapshot(): ProgressMap {
  return EMPTY;
}

function subscribe(onChange: () => void): () => void {
  const handleStorage = (e: StorageEvent) => {
    if (e.key === null || e.key === STORAGE_KEY) onChange();
  };
  // `storage` fires in other tabs; the custom event covers this one.
  window.addEventListener("storage", handleStorage);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

function write(next: ProgressMap): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Quota exceeded or storage disabled — keep going without persisting.
  }
  // Invalidate before notifying so subscribers read the new value.
  primed = false;
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Subscribe a component to stored progress. */
export function useProgress(): ProgressMap {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Fold one submission into the stored progress.
 *
 * `solved` latches: once a problem has been fully solved, a later worse
 * attempt does not un-solve it, and `bestPassed` only ever climbs.
 */
export function recordAttempt(
  slug: string,
  passed: number,
  total: number,
): void {
  const now = Date.now();
  const current = getSnapshot()[slug];
  const nowSolved = total > 0 && passed === total;

  const next: ProblemProgress = {
    solved: current?.solved || nowSolved,
    bestPassed: Math.max(current?.bestPassed ?? 0, passed),
    total,
    attempts: (current?.attempts ?? 0) + 1,
    lastAttemptAt: now,
    solvedAt: current?.solvedAt ?? (nowSolved ? now : undefined),
  };

  write({ ...getSnapshot(), [slug]: next });
}

/** Forget everything. */
export function clearProgress(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* nothing to do */
  }
  primed = false;
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Count of fully-solved problems among the given slugs. */
export function countSolved(progress: ProgressMap, slugs: string[]): number {
  return slugs.filter((s) => progress[s]?.solved).length;
}
