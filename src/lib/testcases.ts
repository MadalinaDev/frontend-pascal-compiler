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
  {
    title: "Indice bursier",
    statement: `For more info about the problem statement visit: https://ance.gov.md/sites/default/files/ol23_informatica_probleme.pdf`,
    testCases: [
      {
        id: 1,
        name: "Test 1",
        description: "Given example from problem",
        input: "5\n-2 4 -3 2 3\n3\n",
        expectedOutput: "-3",
      },
      {
        id: 2,
        name: "Test 2",
        description: "K=1, only minimum element",
        input: "6\n9 3 7 1 5 2\n1\n",
        expectedOutput: "1",
      },
      {
        id: 3,
        name: "Test 3",
        description: "K=N, must sum all elements",
        input: "5\n3 1 4 1 5\n5\n",
        expectedOutput: "14",
      },
      {
        id: 4,
        name: "Test 4",
        description: "All negatives K=N",
        input: "4\n-5 -3 -8 -1\n4\n",
        expectedOutput: "-17",
      },
      {
        id: 5,
        name: "Test 5",
        description: "All negatives K<N",
        input: "5\n-5 -3 -8 -1 -4\n3\n",
        expectedOutput: "-17",
      },
      {
        id: 6,
        name: "Test 6",
        description: "All positive numbers",
        input: "5\n10 20 30 40 50\n2\n",
        expectedOutput: "30",
      },
      {
        id: 7,
        name: "Test 7",
        description: "All zeros",
        input: "5\n0 0 0 0 0\n3\n",
        expectedOutput: "0",
      },
      {
        id: 8,
        name: "Test 8",
        description: "Zeros and positives",
        input: "6\n0 5 0 3 0 7\n3\n",
        expectedOutput: "0",
      },
      {
        id: 9,
        name: "Test 9",
        description: "Zeros and negatives",
        input: "6\n0 -5 0 -3 0 -7\n3\n",
        expectedOutput: "-15",
      },
      {
        id: 10,
        name: "Test 10",
        description: "Minimum input N=1 K=1",
        input: "1\n42\n1\n",
        expectedOutput: "42",
      },
      {
        id: 11,
        name: "Test 11",
        description: "N=2 K=1",
        input: "2\n-100 100\n1\n",
        expectedOutput: "-100",
      },
      {
        id: 12,
        name: "Test 12",
        description: "N=2 K=2",
        input: "2\n-100 100\n2\n",
        expectedOutput: "0",
      },
      {
        id: 13,
        name: "Test 13",
        description: "Already sorted ascending",
        input: "6\n1 2 3 4 5 6\n4\n",
        expectedOutput: "10",
      },
      {
        id: 14,
        name: "Test 14",
        description: "Already sorted descending",
        input: "6\n6 5 4 3 2 1\n4\n",
        expectedOutput: "10",
      },
      {
        id: 15,
        name: "Test 15",
        description: "All identical numbers",
        input: "6\n7 7 7 7 7 7\n4\n",
        expectedOutput: "28",
      },
      {
        id: 16,
        name: "Test 16",
        description: "Max and min boundary values",
        input: "6\n1000000 -1000000 999999 -999999 500000 -500000\n3\n",
        expectedOutput: "-2499999",
      },
      {
        id: 17,
        name: "Test 17",
        description: "Large array 50 elements random",
        input:
          "50\n309 -772 -949 518 -437 -499 -543 -715 508 -791 385 516 827 116 -822 209 -136 -935 -939 -809 -553 -524 34 232 -946 149 -593 466 330 436 116 -141 -549 -81 206 -431 657 780 -987 554 650 -674 429 -135 -304 -431 -682 -560 960 563\n20\n",
        expectedOutput: "-14279",
      },
      {
        id: 18,
        name: "Test 18",
        description: "Large array 100 elements all negative",
        input:
          "100\n-647056 -892825 -902749 -601618 -898586 -623583 -111338 -639337 -366948 -722630 -153665 -954439 -234821 -518259 -437725 -869111 -32904 -603078 -917373 -421144 -692581 -130307 -340824 -351436 -71537 -96435 -620799 -394603 -798371 -261203 -927067 -951950 -306616 -761032 -189380 -696555 -916333 -103135 -755902 -91427 -894093 -601409 -708524 -524565 -333437 -125372 -617446 -829445 -611838 -627472 -780316 -297271 -720054 -264089 -17847 -283249 -320486 -925130 -361280 -334178 -820549 -439914 -235456 -743298 -828661 -515286 -602113 -716940 -29658 -328912 -278410 -415996 -769717 -282130 -659965 -116206 -194365 -186306 -941345 -759826 -138278 -966341 -155849 -669224 -579349 -719254 -930597 -778769 -42508 -11288 -405269 -81062 -247213 -670037 -777045 -312723 -476519 -585150 -72343 -41028\n50\n",
        expectedOutput: "-37751447",
      },
      {
        id: 19,
        name: "Test 19",
        description: "Large array 100 elements K=1",
        input:
          "100\n348158 -37718 -700377 -444507 -707174 -482785 562355 177274 130317 -448991 566601 225965 -101510 882871 223757 -162397 -240839 -540052 -709898 68554 34977 -809350 584990 -901190 805863 -770050 -679469 315849 -664494 661110 427072 -114667 250760 -866773 -193085 -199687 249668 -18429 109633 -472747 160198 805185 976420 -975923 426657 511463 -759768 429650 855535 126108 574704 -440428 611868 344194 -286601 -766059 -384486 -88232 -668320 -48473 -993195 514336 836796 509279 -447634 49805 597950 -625340 64685 913919 -776841 825609 311349 -374116 765108 339974 64646 277103 -582854 -679473 -215846 599101 -661208 131159 999633 632898 934484 112232 926220 -998801 256077 -320196 24680 -959155 -765397 948461 -238775 842813 744129 691929\n1\n",
        expectedOutput: "-998801",
      },
      {
        id: 20,
        name: "Test 20",
        description: "Large array 200 elements K=N",
        input:
          "200\n-177549 -248917 -439262 -247428 420659 94916 492948 -417418 -410186 267460 9597 355662 -427426 297549 58582 303035 -368131 -365372 191798 -1631 492842 76510 -326852 -222068 53306 414812 136059 -56308 -277914 474036 65492 291952 265388 223378 -289078 247581 -173142 -81627 204314 181446 -108441 -40619 443313 42717 -26583 -373118 -240053 -264388 -432864 -145492 -477944 116886 80828 -258708 117024 -269086 -492460 -425559 242225 161759 -438267 -259938 -429326 449401 -467062 401393 -153521 -425701 39131 -250435 -207996 201474 8993 -275357 65427 -361261 258490 480957 425245 98782 104201 -4369 -245199 322733 -4052 346721 -73167 -300341 -401093 -398361 190993 -48011 -128493 -55846 -68929 -10290 405798 264491 -443198 206073 185197 177568 -396802 -436444 -77821 263587 -144216 339482 403529 -385424 -239265 -299104 -300552 62336 -29595 -353009 -57626 -307599 -207925 -14900 -238059 416964 468114 -420954 -35344 347272 403189 397546 77057 -397336 -446955 183823 66847 376638 -484526 -402207 471366 290170 389921 -252139 -325611 -73844 9231 4740 -275870 406651 -79479 446279 -438517 -327366 -102618 -497740 -90614 -221915 471524 322157 323267 -22890 -200895 -56445 230429 265990 321414 82765 194022 253305 10311 -337684 -300878 -188880 -271725 -438676 107314 271476 68532 -436082 284309 -171162 -440058 -447422 112554 -52 27276 464047 394141 56926 -334920 -440358 32496 -415998 392697 -305149 -428151 123939 -428738 208011 403682 -253371 -76611 -374290\n200\n",
        expectedOutput: "-5563180",
      },
    ],
  },

  {
    title: "Masini",
    statement: `For more info about the problem statement visit: <a href="/01MasiniRom.pdf" target="_blank" style="text-decoration: underline;">Masini</a>`,
    testCases: [
      {
        id: 1,
        name: "Test 1",
        description: "Example 1 from problem – PAR, COMPUS, ABUNDENT, div3",
        input: "312\n",
        expectedOutput: "PAR\nCOMPUS\nABUNDENT\nSE DIVIDE CU 3\n",
      },
      {
        id: 2,
        name: "Test 2",
        description:
          "Example 2 from problem – IMPAR, COMPUS, DEFICIENT, div3, div11",
        input: "363\n",
        expectedOutput:
          "IMPAR\nCOMPUS\nDEFICIENT\nSE DIVIDE CU 3\nSE DIVIDE CU 11\n",
      },
      {
        id: 3,
        name: "Test 3",
        description: "Minimum boundary n=100 – PAR, COMPUS, ABUNDENT, div5",
        input: "100\n",
        expectedOutput: "PAR\nCOMPUS\nABUNDENT\nSE DIVIDE CU 5\n",
      },
      {
        id: 4,
        name: "Test 4",
        description:
          "Maximum boundary n=999 – IMPAR, COMPUS, DEFICIENT, div3, div9",
        input: "999\n",
        expectedOutput:
          "IMPAR\nCOMPUS\nDEFICIENT\nSE DIVIDE CU 3\nSE DIVIDE CU 9\n",
      },
      {
        id: 5,
        name: "Test 5",
        description:
          "Smallest 3-digit prime – IMPAR, PRIM, DEFICIENT, no divisors",
        input: "101\n",
        expectedOutput: "IMPAR\nPRIM\nDEFICIENT\n",
      },
      {
        id: 6,
        name: "Test 6",
        description:
          "Largest 3-digit prime – IMPAR, PRIM, DEFICIENT, no divisors",
        input: "997\n",
        expectedOutput: "IMPAR\nPRIM\nDEFICIENT\n",
      },
      {
        id: 7,
        name: "Test 7",
        description: "Only perfect number in range – PAR, COMPUS, PERFECT",
        input: "496\n",
        expectedOutput: "PAR\nCOMPUS\nPERFECT\n",
      },
      {
        id: 8,
        name: "Test 8",
        description:
          "Only odd abundant in range – IMPAR, COMPUS, ABUNDENT, div3, div5, div9",
        input: "945\n",
        expectedOutput:
          "IMPAR\nCOMPUS\nABUNDENT\nSE DIVIDE CU 3\nSE DIVIDE CU 5\nSE DIVIDE CU 9\n",
      },
      {
        id: 9,
        name: "Test 9",
        description:
          "Divisible by all four (3,5,9,11), odd – IMPAR, COMPUS, DEFICIENT",
        input: "495\n",
        expectedOutput:
          "IMPAR\nCOMPUS\nDEFICIENT\nSE DIVIDE CU 3\nSE DIVIDE CU 5\nSE DIVIDE CU 9\nSE DIVIDE CU 11\n",
      },
      {
        id: 10,
        name: "Test 10",
        description:
          "Divisible by all four (3,5,9,11), even – PAR, COMPUS, ABUNDENT",
        input: "990\n",
        expectedOutput:
          "PAR\nCOMPUS\nABUNDENT\nSE DIVIDE CU 3\nSE DIVIDE CU 5\nSE DIVIDE CU 9\nSE DIVIDE CU 11\n",
      },
      {
        id: 11,
        name: "Test 11",
        description: "Divisible by 3, 5, 11 only – IMPAR, COMPUS, DEFICIENT",
        input: "165\n",
        expectedOutput:
          "IMPAR\nCOMPUS\nDEFICIENT\nSE DIVIDE CU 3\nSE DIVIDE CU 5\nSE DIVIDE CU 11\n",
      },
      {
        id: 12,
        name: "Test 12",
        description: "Divisible by 3, 9, 11 only – PAR, COMPUS, ABUNDENT",
        input: "396\n",
        expectedOutput:
          "PAR\nCOMPUS\nABUNDENT\nSE DIVIDE CU 3\nSE DIVIDE CU 9\nSE DIVIDE CU 11\n",
      },
      {
        id: 13,
        name: "Test 13",
        description: "Divisible by 5 and 11 only – IMPAR, COMPUS, DEFICIENT",
        input: "275\n",
        expectedOutput:
          "IMPAR\nCOMPUS\nDEFICIENT\nSE DIVIDE CU 5\nSE DIVIDE CU 11\n",
      },
      {
        id: 14,
        name: "Test 14",
        description:
          "Divisible by 11 only – IMPAR, COMPUS, DEFICIENT (11 squared)",
        input: "121\n",
        expectedOutput: "IMPAR\nCOMPUS\nDEFICIENT\nSE DIVIDE CU 11\n",
      },
      {
        id: 15,
        name: "Test 15",
        description: "Divisible by 3, 5, 9 only – PAR, COMPUS, ABUNDENT",
        input: "270\n",
        expectedOutput:
          "PAR\nCOMPUS\nABUNDENT\nSE DIVIDE CU 3\nSE DIVIDE CU 5\nSE DIVIDE CU 9\n",
      },
      {
        id: 16,
        name: "Test 16",
        description: "Divisible by 5 only – PAR, COMPUS, ABUNDENT",
        input: "500\n",
        expectedOutput: "PAR\nCOMPUS\nABUNDENT\nSE DIVIDE CU 5\n",
      },
      {
        id: 17,
        name: "Test 17",
        description: "Power of 2, no special divisors – PAR, COMPUS, DEFICIENT",
        input: "128\n",
        expectedOutput: "PAR\nCOMPUS\nDEFICIENT\n",
      },
      {
        id: 18,
        name: "Test 18",
        description: "Prime, no divisibility matches – IMPAR, PRIM, DEFICIENT",
        input: "113\n",
        expectedOutput: "IMPAR\nPRIM\nDEFICIENT\n",
      },
      {
        id: 19,
        name: "Test 19",
        description: "Divisible by 5 and 11, even – PAR, COMPUS, ABUNDENT",
        input: "550\n",
        expectedOutput:
          "PAR\nCOMPUS\nABUNDENT\nSE DIVIDE CU 5\nSE DIVIDE CU 11\n",
      },
      {
        id: 20,
        name: "Test 20",
        description: "Divisible by 3, 5, 11, even – PAR, COMPUS, ABUNDENT",
        input: "330\n",
        expectedOutput:
          "PAR\nCOMPUS\nABUNDENT\nSE DIVIDE CU 3\nSE DIVIDE CU 5\nSE DIVIDE CU 11\n",
      },
    ],
  },
  {
    title: "Bilete",
    statement: `For more info about the problem statement visit: <a href="/02Bilete RO.pdf" target="_blank" style="text-decoration: underline;">Bilete</a>`,
    testCases: [
      {
        id: 1,
        name: "Test 1",
        description: "Example from problem – class B, 3 matches out of 6",
        input: "6\nB\n120 A\n200 B\n400 B\n170 F\n40 A\n15 B\n",
        expectedOutput: "400 200 15\n",
      },
      {
        id: 2,
        name: "Test 2",
        description: "Single ticket, matches the class",
        input: "1\nA\n500 A\n",
        expectedOutput: "500\n",
      },
      {
        id: 3,
        name: "Test 3",
        description: "All tickets same class Z – must sort descending",
        input: "3\nZ\n100 Z\n200 Z\n300 Z\n",
        expectedOutput: "300 200 100\n",
      },
      {
        id: 4,
        name: "Test 4",
        description: "All tickets same price – output all equal values",
        input: "5\nA\n100 A\n100 A\n100 A\n100 A\n100 A\n",
        expectedOutput: "100 100 100 100 100\n",
      },
      {
        id: 5,
        name: "Test 5",
        description: "Duplicate prices mixed – sort stability check",
        input: "4\nB\n50 B\n50 B\n100 B\n100 B\n",
        expectedOutput: "100 100 50 50\n",
      },
      {
        id: 6,
        name: "Test 6",
        description: "Max and min boundary prices for class C",
        input: "3\nC\n99999 C\n1 C\n50000 C\n",
        expectedOutput: "99999 50000 1\n",
      },
      {
        id: 7,
        name: "Test 7",
        description: "Only the last ticket matches – class F",
        input: "5\nF\n10 A\n20 B\n30 C\n40 D\n50 F\n",
        expectedOutput: "50\n",
      },
      {
        id: 8,
        name: "Test 8",
        description: "Only the first ticket matches – class A",
        input: "5\nA\n50 A\n40 B\n30 C\n20 D\n10 E\n",
        expectedOutput: "50\n",
      },
      {
        id: 9,
        name: "Test 9",
        description: "Large prices including max value 100000",
        input: "4\nM\n100000 M\n99999 M\n1 M\n2 M\n",
        expectedOutput: "100000 99999 2 1\n",
      },
      {
        id: 10,
        name: "Test 10",
        description: "Input already sorted ascending – must reverse",
        input: "6\nA\n1 A\n2 A\n3 A\n4 A\n5 A\n6 A\n",
        expectedOutput: "6 5 4 3 2 1\n",
      },
      {
        id: 11,
        name: "Test 11",
        description: "Input already sorted descending – must keep order",
        input: "6\nA\n6 A\n5 A\n4 A\n3 A\n2 A\n1 A\n",
        expectedOutput: "6 5 4 3 2 1\n",
      },
      {
        id: 12,
        name: "Test 12",
        description: "All tickets identical max price 100000",
        input: "3\nX\n100000 X\n100000 X\n100000 X\n",
        expectedOutput: "100000 100000 100000\n",
      },
      {
        id: 13,
        name: "Test 13",
        description: "All tickets identical minimum price 1",
        input: "5\nB\n1 B\n1 B\n1 B\n1 B\n1 B\n",
        expectedOutput: "1 1 1 1 1\n",
      },
      {
        id: 14,
        name: "Test 14",
        description: "Matching tickets interleaved between other classes",
        input: "7\nD\n300 D\n100 A\n200 D\n400 B\n500 D\n50 C\n150 D\n",
        expectedOutput: "500 300 200 150\n",
      },
      {
        id: 15,
        name: "Test 15",
        description: "Two matches scattered among non-matching tickets",
        input: "6\nE\n200 A\n300 B\n100 E\n400 C\n500 E\n600 D\n",
        expectedOutput: "500 100\n",
      },
      {
        id: 16,
        name: "Test 16",
        description: "Two matches at non-adjacent positions",
        input: "5\nA\n10 B\n20 C\n30 A\n40 D\n50 A\n",
        expectedOutput: "50 30\n",
      },
      {
        id: 17,
        name: "Test 17",
        description: "Max boundary prices 100000 and 99999 with 1",
        input: "3\nP\n100000 P\n1 P\n99999 P\n",
        expectedOutput: "100000 99999 1\n",
      },
      {
        id: 18,
        name: "Test 18",
        description: "All 8 tickets match class C – full sort required",
        input: "8\nC\n5 C\n3 C\n8 C\n1 C\n9 C\n2 C\n7 C\n4 C\n",
        expectedOutput: "9 8 7 5 4 3 2 1\n",
      },
      {
        id: 19,
        name: "Test 19",
        description:
          "Near-duplicate large prices – small differences must sort correctly",
        input: "5\nA\n50000 A\n50000 A\n50000 A\n49999 A\n50001 A\n",
        expectedOutput: "50001 50000 50000 50000 49999\n",
      },
      {
        id: 20,
        name: "Test 20",
        description: "Random order class Z with varied prices",
        input: "4\nZ\n999 Z\n1 Z\n500 Z\n250 Z\n",
        expectedOutput: "999 500 250 1\n",
      },
    ],
  },
];

// Helper to get a problem by slug (derived from title)
export function getProblemBySlug(slug: string): Problem | undefined {
  return problems.find((p) => slugify(p.title) === slug);
}
