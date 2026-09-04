/**
 * Daily request-quota tracking for the Judge0 API.
 *
 * RapidAPI returns the remaining quota on every response as headers. There is
 * no endpoint to ask for the quota without spending a request, so instead of
 * burning a credit just to render a badge we remember the last value we saw
 * and serve that. It is refreshed on every submission.
 *
 * Self-hosted Judge0 instances send no such headers, so the quota simply stays
 * unknown — which is correct, they are not metered.
 */
export interface Quota {
  /** Requests allowed per day (e.g. 50 on the free plan) */
  limit: number;
  /** Requests still available today */
  remaining: number;
  /** Seconds until the quota resets, if the API told us */
  resetSeconds: number | null;
  /** When we observed this (epoch ms), so the client can age the countdown */
  observedAt: number;
}

let lastQuota: Quota | null = null;

/** Pull RapidAPI's rate-limit headers off a response, if present. */
export function readQuotaFromHeaders(headers: Headers): Quota | null {
  const limit = headers.get("x-ratelimit-requests-limit");
  const remaining = headers.get("x-ratelimit-requests-remaining");

  if (limit === null || remaining === null) return null;

  const parsedLimit = Number(limit);
  const parsedRemaining = Number(remaining);
  if (!Number.isFinite(parsedLimit) || !Number.isFinite(parsedRemaining)) {
    return null;
  }

  const reset = Number(headers.get("x-ratelimit-requests-reset"));

  return {
    limit: parsedLimit,
    remaining: parsedRemaining,
    resetSeconds: Number.isFinite(reset) ? reset : null,
    observedAt: Date.now(),
  };
}

/** Record the freshest quota reading. Ignores stale/absent values. */
export function rememberQuota(quota: Quota | null): void {
  if (quota) lastQuota = quota;
}

/** Last known quota, or null if we have not made a metered call yet. */
export function getLastQuota(): Quota | null {
  return lastQuota;
}
