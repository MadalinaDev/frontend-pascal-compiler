export interface TestCase {
  /** Unique test case identifier */
  id: number;
  /** Display name for the test */
  name: string;
  /** Input to feed via stdin */
  input: string;
  /** Expected stdout output */
  expectedOutput: string;
  /** Timeout in ms (default 5000) */
  timeoutMs?: number;
}

/**
 * Define your test cases here.
 *
 * Each test case has an input string (fed to stdin)
 * and an expectedOutput string (compared to stdout).
 *
 * Example problem: Read two integers, print their sum.
 *
 *   program solve;
 *   var a, b: integer;
 *   begin
 *     readln(a, b);
 *     writeln(a + b);
 *   end.
 */
export const testCases: TestCase[] = [
  {
    id: 1,
    name: "Test 1 - basic example from problem",
    input: "5\n-2 4 -3 2 3\n",
    expectedOutput: "12",
  },
  {
    id: 2,
    name: "Test 2 - two negative numbers give maximum product",
    input: "4\n-5 -6 1 2\n",
    expectedOutput: "30",
  },
  {
    id: 3,
    name: "Test 3 - all negative numbers",
    input: "4\n-1 -2 -3 -4\n",
    expectedOutput: "12",
  },
  {
    id: 4,
    name: "Test 4 - all positive numbers",
    input: "5\n1 3 5 7 9\n",
    expectedOutput: "63",
  },
  {
    id: 5,
    name: "Test 5 - contains zeros",
    input: "5\n0 0 0 3 5\n",
    expectedOutput: "15",
  },
  {
    id: 6,
    name: "Test 6 - zeros dominate negatives",
    input: "4\n0 0 -3 -5\n",
    expectedOutput: "15",
  },
  {
    id: 7,
    name: "Test 7 - minimum N=2",
    input: "2\n7 8\n",
    expectedOutput: "56",
  },
  {
    id: 8,
    name: "Test 8 - minimum N=2 both negative",
    input: "2\n-3 -9\n",
    expectedOutput: "27",
  },
  {
    id: 9,
    name: "Test 9 - large positive values near constraint",
    input: "3\n1000000000 999999999 1\n",
    expectedOutput: "999999999000000000",
  },
  {
    id: 10,
    name: "Test 10 - two large negatives give max product",
    input: "4\n-1000000000 -999999999 1 2\n",
    expectedOutput: "999999999000000000",
  },
  {
    id: 11,
    name: "Test 11 - mixed large and small",
    input: "6\n-1000000000 -1000000000 0 1 2 3\n",
    expectedOutput: "1000000000000000000",
  },
  {
    id: 12,
    name: "Test 12 - single negative and single positive",
    input: "2\n-1000000000 1000000000\n",
    expectedOutput: "-1000000000000000000",
  },
  {
    id: 13,
    name: "Test 13 - all same positive value",
    input: "4\n5 5 5 5\n",
    expectedOutput: "25",
  },
  {
    id: 14,
    name: "Test 14 - all same negative value",
    input: "3\n-4 -4 -4\n",
    expectedOutput: "16",
  },
  {
    id: 15,
    name: "Test 15 - one large negative beats two positives",
    input: "5\n-100 -99 2 3 4\n",
    expectedOutput: "9900",
  },
  {
    id: 16,
    name: "Test 16 - contains duplicate max values",
    input: "5\n9 9 1 2 3\n",
    expectedOutput: "81",
  },
  {
    id: 17,
    name: "Test 17 - mix of zeros and negatives only",
    input: "4\n0 0 -1 -2\n",
    expectedOutput: "2",
  },
  {
    id: 18,
    name: "Test 18 - N=2 one zero",
    input: "2\n0 5\n",
    expectedOutput: "0",
  },
  {
    id: 19,
    name: "Test 19 - large N with obvious answer",
    input: "6\n1 2 3 4 5 100\n",
    expectedOutput: "500",
  },
  {
    id: 20,
    name: "Test 20 - all zeros",
    input: "5\n0 0 0 0 0\n",
    expectedOutput: "0",
  },
];