import { NextResponse } from "next/server";
import { getLastQuota } from "@/lib/quota";

/**
 * Reports the daily Judge0 credits left, so the UI can warn before students
 * run the class out of quota.
 *
 * This deliberately makes NO upstream call — RapidAPI only reports the quota
 * in the headers of a metered request, and spending a credit to display the
 * credit count would be self-defeating. It replays the reading taken during
 * the last submission instead, so the value is free but may be stale.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  const quota = getLastQuota();

  return NextResponse.json(
    { quota },
    { headers: { "Cache-Control": "no-store" } },
  );
}
