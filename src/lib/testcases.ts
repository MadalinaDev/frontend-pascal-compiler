export interface TestCase {
  /** Unique test case identifier within the problem */
  id: number;
  /** Display name for the test */
  name: string;
  /** Optional description of the test case */
  description?: string;
  /** Input to feed via stdin */
  input: string;
  /** Expected stdout output */
  expectedOutput: string;
  /** Timeout in ms (default 5000) */
  timeoutMs?: number;
}

export interface Problem {
  /** Display title */
  title: string;
  /** Problem statement (supports basic markdown/text) */
  statement: string;
  /** Test cases for judging */
  testCases: TestCase[];
}

/** Derive a URL-friendly slug from a problem title */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// ─────────────────────────────────────────────
// PROBLEMS — Add your problems below!
// ─────────────────────────────────────────────

export const problems: Problem[] = [
  {
    title: "Produs Maxim",
    statement: `For more info about the problem statement visit: https://ance.gov.md/sites/default/files/ol23_informatica_probleme.pdf`,
    testCases: [
      {
        id: 1,
        name: "Test 1",
        description: "Basic example from problem",
        input: "5\n-2 4 -3 2 3\n",
        expectedOutput: "12",
      },
      {
        id: 2,
        name: "Test 2",
        description: "Two negative numbers give maximum product",
        input: "4\n-5 -6 1 2\n",
        expectedOutput: "30",
      },
      {
        id: 3,
        name: "Test 3",
        description: "All negative numbers",
        input: "4\n-1 -2 -3 -4\n",
        expectedOutput: "12",
      },
      {
        id: 4,
        name: "Test 4",
        description: "All positive numbers",
        input: "5\n1 3 5 7 9\n",
        expectedOutput: "63",
      },
      {
        id: 5,
        name: "Test 5",
        description: "Contains zeros",
        input: "5\n0 0 0 3 5\n",
        expectedOutput: "15",
      },
      {
        id: 6,
        name: "Test 6",
        description: "Zeros dominate negatives",
        input: "4\n0 0 -3 -5\n",
        expectedOutput: "15",
      },
      {
        id: 7,
        name: "Test 7",
        description: "Minimum N=2",
        input: "2\n7 8\n",
        expectedOutput: "56",
      },
      {
        id: 8,
        name: "Test 8",
        description: "Minimum N=2 both negative",
        input: "2\n-3 -9\n",
        expectedOutput: "27",
      },
      {
        id: 9,
        name: "Test 9",
        description: "Large positive values near constraint",
        input: "3\n1000000000 999999999 1\n",
        expectedOutput: "999999999000000000",
      },
      {
        id: 10,
        name: "Test 10",
        description: "Two large negatives give max product",
        input: "4\n-1000000000 -999999999 1 2\n",
        expectedOutput: "999999999000000000",
      },
      {
        id: 11,
        name: "Test 11",
        description: "Mixed large and small",
        input: "6\n-1000000000 -1000000000 0 1 2 3\n",
        expectedOutput: "1000000000000000000",
      },
      {
        id: 12,
        name: "Test 12",
        description: "Single negative and single positive",
        input: "2\n-1000000000 1000000000\n",
        expectedOutput: "-1000000000000000000",
      },
      {
        id: 13,
        name: "Test 13",
        description: "All same positive value",
        input: "4\n5 5 5 5\n",
        expectedOutput: "25",
      },
      {
        id: 14,
        name: "Test 14",
        description: "All same negative value",
        input: "3\n-4 -4 -4\n",
        expectedOutput: "16",
      },
      {
        id: 15,
        name: "Test 15",
        description: "One large negative beats two positives",
        input: "5\n-100 -99 2 3 4\n",
        expectedOutput: "9900",
      },
      {
        id: 16,
        name: "Test 16",
        description: "Contains duplicate max values",
        input: "5\n9 9 1 2 3\n",
        expectedOutput: "81",
      },
      {
        id: 17,
        name: "Test 17",
        description: "Mix of zeros and negatives only",
        input: "4\n0 0 -1 -2\n",
        expectedOutput: "2",
      },
      {
        id: 18,
        name: "Test 18",
        description: "N=2 one zero",
        input: "2\n0 5\n",
        expectedOutput: "0",
      },
      {
        id: 19,
        name: "Test 19",
        description: "Large N with obvious answer",
        input: "6\n1 2 3 4 5 100\n",
        expectedOutput: "500",
      },
      {
        id: 20,
        name: "Test 20",
        description: "All zeros",
        input: "5\n0 0 0 0 0\n",
        expectedOutput: "0",
      },
    ],
  },

  {
    title: "Numar Maxim",
    statement: `For more info about the problem statement visit: https://ance.gov.md/sites/default/files/ol23_informatica_probleme.pdf`,
    testCases: [
      {
        id: 1,
        name: "Test 1",
        description: "Example 1 - from problem (remove mid digit, big jump)",
        input: "7590163298\n",
        expectedOutput: "790163298\n5 8",
      },
      {
        id: 2,
        name: "Test 2",
        description:
          "Example 2 - from problem (remove 0, non-obvious position)",
        input: "9750234\n",
        expectedOutput: "975234\n0 3",
      },
      {
        id: 3,
        name: "Test 3",
        description: "Example 3 - from problem (all same + one larger at end)",
        input: "3333334\n",
        expectedOutput: "333334\n3 1",
      },
      {
        id: 4,
        name: "Test 4",
        description: "Single digit minimum (n=1)",
        input: "1\n",
        expectedOutput: "0\n1 0",
      },
      {
        id: 5,
        name: "Test 5",
        description: "Single digit maximum (n=9)",
        input: "9\n",
        expectedOutput: "0\n9 0",
      },
      {
        id: 6,
        name: "Test 6",
        description: "Two digits - remove smaller first digit",
        input: "19\n",
        expectedOutput: "9\n1 1",
      },
      {
        id: 7,
        name: "Test 7",
        description: "Two digits non-increasing, remove last",
        input: "91\n",
        expectedOutput: "9\n1 0",
      },
      {
        id: 8,
        name: "Test 8",
        description: "All same digits - non-increasing, remove last",
        input: "2222222\n",
        expectedOutput: "222222\n2 0",
      },
      {
        id: 9,
        name: "Test 9",
        description: "All nines - remove last",
        input: "9999999999\n",
        expectedOutput: "999999999\n9 0",
      },
      {
        id: 10,
        name: "Test 10",
        description: "Strictly decreasing - remove last digit (0)",
        input: "9876543210\n",
        expectedOutput: "987654321\n0 0",
      },
      {
        id: 11,
        name: "Test 11",
        description: "Nearly all nines, last is 8 - remove last",
        input: "9999999998\n",
        expectedOutput: "999999999\n8 0",
      },
      {
        id: 12,
        name: "Test 12",
        description: "Strictly increasing - remove first digit",
        input: "123456789\n",
        expectedOutput: "23456789\n1 8",
      },
      {
        id: 13,
        name: "Test 13",
        description: "Almost all same, last larger - remove second-to-last",
        input: "111112\n",
        expectedOutput: "11112\n1 1",
      },
      {
        id: 14,
        name: "Test 14",
        description: "Zeros in middle, small digit at end",
        input: "9000000001\n",
        expectedOutput: "900000001\n0 1",
      },
      {
        id: 15,
        name: "Test 15",
        description: "Multiple zeros interspersed",
        input: "5030204\n",
        expectedOutput: "530204\n0 5",
      },
      {
        id: 16,
        name: "Test 16",
        description: "Complex mixed - local dip near start",
        input: "9182736455\n",
        expectedOutput: "982736455\n1 8",
      },
      {
        id: 17,
        name: "Test 17",
        description: "Palindrome shape - remove leftmost",
        input: "1234321\n",
        expectedOutput: "234321\n1 6",
      },
      {
        id: 18,
        name: "Test 18",
        description: "50 nines - large input stress test",
        input: "99999999999999999999999999999999999999999999999999\n",
        expectedOutput:
          "9999999999999999999999999999999999999999999999999\n9 0",
      },
      {
        id: 19,
        name: "Test 19",
        description: "Small digit embedded in large number",
        input: "999999999919999999999\n",
        expectedOutput: "99999999999999999999\n1 10",
      },
      {
        id: 20,
        name: "Test 20",
        description:
          "Two digits 10 - remove zero, result needs no leading zero",
        input: "10\n",
        expectedOutput: "1\n0 0",
      },
    ],
  },

  {
    title: "Bancherul",
    statement: `For more info about the problem statement visit: https://ance.gov.md/sites/default/files/ol23_informatica_probleme.pdf`,
    testCases: [
      {
        id: 1,
        name: "Test 1",
        description: "Example 1 from problem",
        input: "5\n5 30 34 9 3\n",
        expectedOutput: "9534330",
      },
      {
        id: 2,
        name: "Test 2",
        description: "Example 2 from problem",
        input: "5\n30 0 0 9 88\n",
        expectedOutput: "9883000",
      },
      {
        id: 3,
        name: "Test 3",
        description: "All zeros",
        input: "5\n0 0 0 0 0\n",
        expectedOutput: "0",
      },
      {
        id: 4,
        name: "Test 4",
        description: "Single element",
        input: "1\n1\n",
        expectedOutput: "1",
      },
      {
        id: 5,
        name: "Test 5",
        description: "Single element max digit",
        input: "1\n9\n",
        expectedOutput: "9",
      },
      {
        id: 6,
        name: "Test 6",
        description: "Two elements, tricky prefix",
        input: "2\n10 2\n",
        expectedOutput: "210",
      },
      {
        id: 7,
        name: "Test 7",
        description: "Two elements simple",
        input: "2\n9 1\n",
        expectedOutput: "91",
      },
      {
        id: 8,
        name: "Test 8",
        description: "Two identical max values",
        input: "2\n999999999 999999999\n",
        expectedOutput: "999999999999999999",
      },
      {
        id: 9,
        name: "Test 9",
        description: "Two identical large values",
        input: "2\n1000000000 1000000000\n",
        expectedOutput: "10000000001000000000",
      },
      {
        id: 10,
        name: "Test 10",
        description: "Nearly all zeros, one positive",
        input: "5\n0 0 0 0 1\n",
        expectedOutput: "10000",
      },
      {
        id: 11,
        name: "Test 11",
        description: "Same leading digit, different lengths",
        input: "4\n9 90 900 9000\n",
        expectedOutput: "9909009000",
      },
      {
        id: 12,
        name: "Test 12",
        description: "Shared prefix, different length",
        input: "2\n121 12\n",
        expectedOutput: "12121",
      },
      {
        id: 13,
        name: "Test 13",
        description: "Mixed single and double digit",
        input: "5\n3 30 34 5 9\n",
        expectedOutput: "9534330",
      },
      {
        id: 14,
        name: "Test 14",
        description: "All identical max allowed values",
        input: "5\n1000000000 1000000000 1000000000 1000000000 1000000000\n",
        expectedOutput: "10000000001000000000100000000010000000001000000000",
      },
      {
        id: 15,
        name: "Test 15",
        description: "Sequential 1 to 10",
        input: "10\n1 2 3 4 5 6 7 8 9 10\n",
        expectedOutput: "98765432110",
      },
      {
        id: 16,
        name: "Test 16",
        description: "Alternating zeros and nines",
        input: "5\n0 9 0 9 0\n",
        expectedOutput: "99000",
      },
      {
        id: 17,
        name: "Test 17",
        description: "Powers of ten descending",
        input: "3\n100 10 1\n",
        expectedOutput: "110100",
      },
      {
        id: 18,
        name: "Test 18",
        description: "Three identical large values",
        input: "3\n2000000000 2000000000 2000000000\n",
        expectedOutput: "200000000020000000002000000000",
      },
      {
        id: 19,
        name: "Test 19",
        description: "Pairs with swapped digits",
        input: "4\n56 65 6 5\n",
        expectedOutput: "665565",
      },
      {
        id: 20,
        name: "Test 20",
        description: "Complex ordering with shared digits",
        input: "5\n8 89 9 98 1\n",
        expectedOutput: "9988981",
      },
    ],
  },
];

// Helper to get a problem by slug (derived from title)
export function getProblemBySlug(slug: string): Problem | undefined {
  return problems.find((p) => slugify(p.title) === slug);
}
