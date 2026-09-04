import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * The judging API route reads content/ at request time to look up a
   * problem's test cases. Next's dependency tracing only follows imports, so
   * it cannot see those JSON files and would leave them out of the serverless
   * bundle — every submission would then 404. This includes them explicitly.
   */
  outputFileTracingIncludes: {
    "/api/run-cpp": ["./content/**/*.json"],
  },
};

export default nextConfig;
