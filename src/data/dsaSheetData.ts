import { DSATopic } from '../types';

export const INITIAL_DSA_TOPICS: DSATopic[] = [
  {
    id: 'beginner-problems',
    title: 'Beginner Problems',
    subTopics: [
      {
        id: 'bp-patterns',
        title: 'Step 1: Patterns & Logic Building',
        problems: [
          {
            id: 'bp-1',
            title: 'Pattern 1: Rectangular Star Pattern',
            difficulty: 'Easy',
            tier: 'basic',
            topicId: 'beginner-problems',
            isSolved: true,
            isBookmarked: false,
            youtubeUrl: 'https://youtube.com/watch?v=tNm_NQDvd',
            articleUrl: 'https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/',
            description: 'Given an integer N, print an N x N grid of asterisks (*).',
            starterCode: `function printPattern(n: number): string[] {
  const result: string[] = [];
  for (let i = 0; i < n; i++) {
    result.push('*'.repeat(n));
  }
  return result;
}`,
            testCases: [{ input: 'n = 4', expected: '["****","****","****","****"]' }]
          },
          {
            id: 'bp-2',
            title: 'Pattern 2: Right-Angled Triangle Star Pattern',
            difficulty: 'Easy',
            tier: 'basic',
            topicId: 'beginner-problems',
            isSolved: false,
            isBookmarked: false,
            youtubeUrl: 'https://youtube.com/watch?v=tNm_NQDvd',
            articleUrl: 'https://takeuforward.org/patterns/pattern-2-right-angled-triangle-pattern/',
            description: 'Given an integer N, print a right-angled triangle of asterisks (*).',
            starterCode: `function printTriangle(n: number): string[] {
  const res: string[] = [];
  for (let i = 1; i <= n; i++) {
    res.push('*'.repeat(i));
  }
  return res;
}`,
            testCases: [{ input: 'n = 3', expected: '["*","**","***"]' }]
          },
          {
            id: 'bp-3',
            title: 'Count Digits in a Number',
            difficulty: 'Easy',
            tier: 'basic',
            topicId: 'beginner-problems',
            isSolved: true,
            isBookmarked: true,
            youtubeUrl: 'https://youtube.com/watch?v=1xNbjMdbjug',
            articleUrl: 'https://takeuforward.org/data-structure/count-digits-in-a-number/',
            description: 'Given an integer N, return the total count of digits in N.',
            starterCode: `function countDigits(n: number): number {
  return Math.abs(n).toString().length;
}`,
            testCases: [{ input: 'n = 12345', expected: '5' }]
          },
          {
            id: 'bp-4',
            title: 'Reverse a Number',
            difficulty: 'Easy',
            tier: 'basic',
            topicId: 'beginner-problems',
            isSolved: false,
            isBookmarked: false,
            youtubeUrl: 'https://youtube.com/watch?v=1xNbjMdbjug',
            articleUrl: 'https://takeuforward.org/c-programs/reverse-a-number-in-c/',
            description: 'Given an integer N, return the integer with its digits reversed. Respect 32-bit bounds.',
            starterCode: `function reverseNumber(n: number): number {
  const sign = n < 0 ? -1 : 1;
  const rev = parseInt(Math.abs(n).toString().split('').reverse().join('')) * sign;
  return rev;
}`,
            testCases: [{ input: 'n = -123', expected: '-321' }]
          },
          {
            id: 'bp-5',
            title: 'Check Palindrome Number',
            difficulty: 'Easy',
            tier: 'basic',
            topicId: 'beginner-problems',
            isSolved: true,
            isBookmarked: false,
            youtubeUrl: 'https://youtube.com/watch?v=1xNbjMdbjug',
            description: 'Given an integer x, return true if x is a palindrome, and false otherwise.'
          }
        ]
      }
    ]
  },
  {
    id: 'sorting',
    title: 'Sorting',
    subTopics: [
      {
        id: 'sort-basic',
        title: 'Step 2.1: Sorting-I',
        problems: [
          {
            id: 'sort-1',
            title: 'Selection Sort',
            difficulty: 'Easy',
            tier: 'basic',
            topicId: 'sorting',
            isSolved: true,
            isBookmarked: false,
            youtubeUrl: 'https://youtube.com/watch?v=HGk_ypEuS24',
            description: 'Sort an array of N integers in ascending order using Selection Sort algorithm.',
            starterCode: `function selectionSort(arr: number[]): number[] {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}`,
            testCases: [{ input: '[64, 25, 12, 22, 11]', expected: '[11, 12, 22, 25, 64]' }]
          },
          {
            id: 'sort-2',
            title: 'Bubble Sort',
            difficulty: 'Easy',
            tier: 'basic',
            topicId: 'sorting',
            isSolved: true,
            isBookmarked: false,
            youtubeUrl: 'https://youtube.com/watch?v=HGk_ypEuS24',
            description: 'Sort an array of N integers using the Bubble Sort algorithm with early exit optimization.'
          },
          {
            id: 'sort-3',
            title: 'Insertion Sort',
            difficulty: 'Easy',
            tier: 'basic',
            topicId: 'sorting',
            isSolved: true,
            isBookmarked: false,
            youtubeUrl: 'https://youtube.com/watch?v=HGk_ypEuS24',
            description: 'Sort an array of N integers using Insertion Sort.'
          }
        ]
      },
      {
        id: 'sort-advanced',
        title: 'Step 2.2: Sorting-II',
        problems: [
          {
            id: 'sort-4',
            title: 'Merge Sort',
            difficulty: 'Medium',
            tier: 'core',
            topicId: 'sorting',
            isSolved: false,
            isBookmarked: true,
            youtubeUrl: 'https://youtube.com/watch?v=ogjf7ORKfd8',
            description: 'Implement divide and conquer Merge Sort on an array of integers.'
          },
          {
            id: 'sort-5',
            title: 'Recursive Bubble Sort',
            difficulty: 'Easy',
            tier: 'basic',
            topicId: 'sorting',
            isSolved: false,
            isBookmarked: false
          },
          {
            id: 'sort-6',
            title: 'Quick Sort',
            difficulty: 'Medium',
            tier: 'core',
            topicId: 'sorting',
            isSolved: false,
            isBookmarked: true,
            youtubeUrl: 'https://youtube.com/watch?v=WIrA4YexLRQ',
            description: 'Implement in-place Quick Sort with Lomuto or Hoare partitioning.'
          }
        ]
      }
    ]
  },
  {
    id: 'arrays',
    title: 'Arrays',
    subTopics: [
      {
        id: 'arr-easy',
        title: 'Step 3.1: Easy Array Problems',
        problems: [
          {
            id: 'arr-1',
            title: 'Largest Element in an Array',
            difficulty: 'Easy',
            tier: 'basic',
            topicId: 'arrays',
            isSolved: true,
            isBookmarked: false,
            youtubeUrl: 'https://youtube.com/watch?v=37E9ckMDdtk',
            description: 'Given an array arr[] of size N, find the maximum element.'
          },
          {
            id: 'arr-2',
            title: 'Second Largest Element in an Array without sorting',
            difficulty: 'Easy',
            tier: 'basic',
            topicId: 'arrays',
            isSolved: true,
            isBookmarked: true,
            youtubeUrl: 'https://youtube.com/watch?v=37E9ckMDdtk',
            description: 'Find second largest element in single pass O(N) time and O(1) space.'
          },
          {
            id: 'arr-3',
            title: 'Check if the array is sorted and rotated',
            difficulty: 'Easy',
            tier: 'basic',
            topicId: 'arrays',
            isSolved: true,
            isBookmarked: false,
            leetcodeUrl: 'https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/'
          },
          {
            id: 'arr-4',
            title: 'Remove duplicates from Sorted array',
            difficulty: 'Easy',
            tier: 'basic',
            topicId: 'arrays',
            isSolved: true,
            isBookmarked: false,
            leetcodeUrl: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/'
          },
          {
            id: 'arr-5',
            title: 'Left Rotate an array by one place',
            difficulty: 'Easy',
            tier: 'basic',
            topicId: 'arrays',
            isSolved: false,
            isBookmarked: false
          },
          {
            id: 'arr-6',
            title: 'Move Zeros to end',
            difficulty: 'Easy',
            tier: 'basic',
            topicId: 'arrays',
            isSolved: false,
            isBookmarked: false
          },
          {
            id: 'arr-7',
            title: 'Find the Union and Intersection of two sorted arrays',
            difficulty: 'Easy',
            tier: 'basic',
            topicId: 'arrays',
            isSolved: false,
            isBookmarked: false
          },
          {
            id: 'arr-8',
            title: 'Find missing number in an array',
            difficulty: 'Easy',
            tier: 'basic',
            topicId: 'arrays',
            isSolved: false,
            isBookmarked: false
          }
        ]
      },
      {
        id: 'arr-medium',
        title: 'Step 3.2: Medium Array Problems',
        problems: [
          {
            id: 'arr-9',
            title: 'Two Sum Problem',
            difficulty: 'Medium',
            tier: 'core',
            topicId: 'arrays',
            isSolved: false,
            isBookmarked: true,
            youtubeUrl: 'https://youtube.com/watch?v=UXDSeD9mN-k',
            leetcodeUrl: 'https://leetcode.com/problems/two-sum/',
            description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
            starterCode: `function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
            testCases: [{ input: 'nums = [2,7,11,15], target = 9', expected: '[0,1]' }]
          },
          {
            id: 'arr-10',
            title: 'Sort an array of 0s, 1s and 2s (Dutch National Flag)',
            difficulty: 'Medium',
            tier: 'core',
            topicId: 'arrays',
            isSolved: false,
            isBookmarked: true,
            youtubeUrl: 'https://youtube.com/watch?v=tp8JIuCXBaU',
            leetcodeUrl: 'https://leetcode.com/problems/sort-colors/'
          },
          {
            id: 'arr-11',
            title: 'Majority Element (>n/2 times) - Moore\'s Voting Algorithm',
            difficulty: 'Medium',
            tier: 'core',
            topicId: 'arrays',
            isSolved: false,
            isBookmarked: false,
            youtubeUrl: 'https://youtube.com/watch?v=nP_ns3uVOAc'
          },
          {
            id: 'arr-12',
            title: 'Kadane\'s Algorithm, maximum subarray sum',
            difficulty: 'Medium',
            tier: 'core',
            topicId: 'arrays',
            isSolved: false,
            isBookmarked: true,
            youtubeUrl: 'https://youtube.com/watch?v=w_KEocd__20',
            description: 'Find subarray with largest sum and return its sum in O(N).'
          },
          {
            id: 'arr-13',
            title: 'Stock Buy and Sell',
            difficulty: 'Easy',
            tier: 'core',
            topicId: 'arrays',
            isSolved: false,
            isBookmarked: false
          },
          {
            id: 'arr-14',
            title: 'Next Permutation',
            difficulty: 'Medium',
            tier: 'core',
            topicId: 'arrays',
            isSolved: false,
            isBookmarked: true
          }
        ]
      },
      {
        id: 'arr-hard',
        title: 'Step 3.3: Hard Array Problems',
        problems: [
          {
            id: 'arr-15',
            title: 'Pascal\'s Triangle',
            difficulty: 'Hard',
            tier: 'pro',
            topicId: 'arrays',
            isSolved: false,
            isBookmarked: false
          },
          {
            id: 'arr-16',
            title: '3-Sum Problem',
            difficulty: 'Hard',
            tier: 'pro',
            topicId: 'arrays',
            isSolved: false,
            isBookmarked: true,
            youtubeUrl: 'https://youtube.com/watch?v=DhFh8Kw7ymk'
          },
          {
            id: 'arr-17',
            title: '4-Sum Problem',
            difficulty: 'Hard',
            tier: 'pro',
            topicId: 'arrays',
            isSolved: false,
            isBookmarked: false
          },
          {
            id: 'arr-18',
            title: 'Trapping Rain Water',
            difficulty: 'Hard',
            tier: 'pro',
            topicId: 'arrays',
            isSolved: false,
            isBookmarked: true,
            youtubeUrl: 'https://youtube.com/watch?v=m18Hntz4go8'
          }
        ]
      }
    ]
  },
  {
    id: 'hashing',
    title: 'Hashing',
    subTopics: [
      {
        id: 'hash-basics',
        title: 'Step 4: Hashing Basics & Maps',
        problems: [
          {
            id: 'hash-1',
            title: 'Counting frequencies of array elements',
            difficulty: 'Easy',
            tier: 'basic',
            topicId: 'hashing',
            isSolved: false,
            isBookmarked: false
          },
          {
            id: 'hash-2',
            title: 'Find the highest / lowest frequency element',
            difficulty: 'Easy',
            tier: 'basic',
            topicId: 'hashing',
            isSolved: false,
            isBookmarked: false
          }
        ]
      }
    ]
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    subTopics: [
      {
        id: 'bs-1d',
        title: 'Step 5.1: BS on 1D Arrays',
        problems: [
          {
            id: 'bs-1',
            title: 'Binary Search to find X in sorted array',
            difficulty: 'Easy',
            tier: 'core',
            topicId: 'binary-search',
            isSolved: false,
            isBookmarked: false,
            youtubeUrl: 'https://youtube.com/watch?v=MHf6X4BRpe6'
          },
          {
            id: 'bs-2',
            title: 'Implement Lower Bound and Upper Bound',
            difficulty: 'Easy',
            tier: 'core',
            topicId: 'binary-search',
            isSolved: false,
            isBookmarked: true
          },
          {
            id: 'bs-3',
            title: 'Search in Rotated Sorted Array I & II',
            difficulty: 'Medium',
            tier: 'core',
            topicId: 'binary-search',
            isSolved: false,
            isBookmarked: true,
            youtubeUrl: 'https://youtube.com/watch?v=r3pMQ8-Ad5s'
          },
          {
            id: 'bs-4',
            title: 'Find Minimum in Rotated Sorted Array',
            difficulty: 'Medium',
            tier: 'core',
            topicId: 'binary-search',
            isSolved: false,
            isBookmarked: false
          }
        ]
      },
      {
        id: 'bs-answers',
        title: 'Step 5.2: BS on Answers & Optimization',
        problems: [
          {
            id: 'bs-5',
            title: 'Koko Eating Bananas',
            difficulty: 'Medium',
            tier: 'pro',
            topicId: 'binary-search',
            isSolved: false,
            isBookmarked: true,
            youtubeUrl: 'https://youtube.com/watch?v=qyfekrNni90'
          },
          {
            id: 'bs-6',
            title: 'Book Allocation Problem (Allocate minimum number of pages)',
            difficulty: 'Hard',
            tier: 'pro',
            topicId: 'binary-search',
            isSolved: false,
            isBookmarked: true
          }
        ]
      }
    ]
  },
  {
    id: 'strings',
    title: 'Strings (Basic and Medium)',
    subTopics: [
      {
        id: 'str-core',
        title: 'Step 6: String Manipulation',
        problems: [
          {
            id: 'str-1',
            title: 'Reverse Words in a String',
            difficulty: 'Medium',
            tier: 'core',
            topicId: 'strings',
            isSolved: false,
            isBookmarked: false,
            youtubeUrl: 'https://youtube.com/watch?v=vhnRAaJybpA'
          },
          {
            id: 'str-2',
            title: 'Longest Common Prefix',
            difficulty: 'Easy',
            tier: 'basic',
            topicId: 'strings',
            isSolved: false,
            isBookmarked: false
          },
          {
            id: 'str-3',
            title: 'Valid Anagram',
            difficulty: 'Easy',
            tier: 'basic',
            topicId: 'strings',
            isSolved: false,
            isBookmarked: false
          },
          {
            id: 'str-4',
            title: 'Isomorphic String',
            difficulty: 'Easy',
            tier: 'basic',
            topicId: 'strings',
            isSolved: false,
            isBookmarked: false
          }
        ]
      }
    ]
  },
  {
    id: 'recursion',
    title: 'Recursion',
    subTopics: [
      {
        id: 'rec-subsets',
        title: 'Step 7: Subsequences & Backtracking',
        problems: [
          {
            id: 'rec-1',
            title: 'Generate all Parentheses',
            difficulty: 'Medium',
            tier: 'core',
            topicId: 'recursion',
            isSolved: false,
            isBookmarked: true
          },
          {
            id: 'rec-2',
            title: 'Combination Sum I & II',
            difficulty: 'Medium',
            tier: 'core',
            topicId: 'recursion',
            isSolved: false,
            isBookmarked: true,
            youtubeUrl: 'https://youtube.com/watch?v=OyZFFqQtu98'
          },
          {
            id: 'rec-3',
            title: 'Subset Sum I & II',
            difficulty: 'Medium',
            tier: 'core',
            topicId: 'recursion',
            isSolved: false,
            isBookmarked: false
          },
          {
            id: 'rec-4',
            title: 'N-Queen Problem',
            difficulty: 'Hard',
            tier: 'pro',
            topicId: 'recursion',
            isSolved: false,
            isBookmarked: true,
            youtubeUrl: 'https://youtube.com/watch?v=i05Ju7AftcM'
          }
        ]
      }
    ]
  },
  {
    id: 'linked-list',
    title: 'Linked-List',
    subTopics: [
      {
        id: 'll-singly',
        title: 'Step 8.1: Singly Linked List',
        problems: [
          {
            id: 'll-1',
            title: 'Reverse a Linked List (Iterative & Recursive)',
            difficulty: 'Easy',
            tier: 'core',
            topicId: 'linked-list',
            isSolved: false,
            isBookmarked: false,
            youtubeUrl: 'https://youtube.com/watch?v=D2vI2DNJNe8'
          },
          {
            id: 'll-2',
            title: 'Detect a loop in LL (Floyd\'s Cycle)',
            difficulty: 'Easy',
            tier: 'core',
            topicId: 'linked-list',
            isSolved: false,
            isBookmarked: false,
            youtubeUrl: 'https://youtube.com/watch?v=wiOo4DC5GGA'
          },
          {
            id: 'll-3',
            title: 'Find starting point of loop in LL',
            difficulty: 'Medium',
            tier: 'core',
            topicId: 'linked-list',
            isSolved: false,
            isBookmarked: true
          },
          {
            id: 'll-4',
            title: 'Delete Middle Node of LL',
            difficulty: 'Easy',
            tier: 'basic',
            topicId: 'linked-list',
            isSolved: false,
            isBookmarked: false
          }
        ]
      },
      {
        id: 'll-hard',
        title: 'Step 8.2: Hard Linked List',
        problems: [
          {
            id: 'll-5',
            title: 'Reverse Nodes in k-Group',
            difficulty: 'Hard',
            tier: 'pro',
            topicId: 'linked-list',
            isSolved: false,
            isBookmarked: true,
            youtubeUrl: 'https://youtube.com/watch?v=Of0HPkk3JgI'
          },
          {
            id: 'll-6',
            title: 'Rotate a Linked List',
            difficulty: 'Medium',
            tier: 'core',
            topicId: 'linked-list',
            isSolved: false,
            isBookmarked: false
          }
        ]
      }
    ]
  },
  {
    id: 'bit-manipulation',
    title: 'Bit Manipulation',
    subTopics: [
      {
        id: 'bit-core',
        title: 'Step 9: Bit Operations & Tricks',
        problems: [
          {
            id: 'bit-1',
            title: 'Check if the i-th bit is set or not',
            difficulty: 'Easy',
            tier: 'basic',
            topicId: 'bit-manipulation',
            isSolved: false,
            isBookmarked: false
          },
          {
            id: 'bit-2',
            title: 'Count total set bits in a number',
            difficulty: 'Easy',
            tier: 'basic',
            topicId: 'bit-manipulation',
            isSolved: false,
            isBookmarked: false
          },
          {
            id: 'bit-3',
            title: 'Single Number: Find the number that appears once',
            difficulty: 'Easy',
            tier: 'basic',
            topicId: 'bit-manipulation',
            isSolved: false,
            isBookmarked: false
          }
        ]
      }
    ]
  },
  {
    id: 'greedy-algorithms',
    title: 'Greedy Algorithms',
    subTopics: [
      {
        id: 'greedy-core',
        title: 'Step 10: Greedy Scheduling & Choices',
        problems: [
          {
            id: 'grd-1',
            title: 'Assign Cookies',
            difficulty: 'Easy',
            tier: 'basic',
            topicId: 'greedy-algorithms',
            isSolved: false,
            isBookmarked: false
          },
          {
            id: 'grd-2',
            title: 'Fractional Knapsack Problem',
            difficulty: 'Medium',
            tier: 'core',
            topicId: 'greedy-algorithms',
            isSolved: false,
            isBookmarked: true,
            youtubeUrl: 'https://youtube.com/watch?v=F_DDzYnxO14'
          },
          {
            id: 'grd-3',
            title: 'N meetings in one room',
            difficulty: 'Medium',
            tier: 'core',
            topicId: 'greedy-algorithms',
            isSolved: false,
            isBookmarked: true,
            youtubeUrl: 'https://youtube.com/watch?v=II6ziNnub1Q'
          }
        ]
      }
    ]
  },
  {
    id: 'sliding-window',
    title: 'Sliding Window / 2 Pointer',
    subTopics: [
      {
        id: 'sw-core',
        title: 'Step 11: Window Sizing & Two Pointers',
        problems: [
          {
            id: 'sw-1',
            title: 'Longest Substring Without Repeating Characters',
            difficulty: 'Medium',
            tier: 'core',
            topicId: 'sliding-window',
            isSolved: true,
            isBookmarked: true,
            youtubeUrl: 'https://youtube.com/watch?v=qtVh-XEpsCo',
            description: 'Find length of the longest substring without repeating characters in O(N).'
          },
          {
            id: 'sw-2',
            title: 'Max Consecutive Ones III',
            difficulty: 'Medium',
            tier: 'core',
            topicId: 'sliding-window',
            isSolved: true,
            isBookmarked: false,
            youtubeUrl: 'https://youtube.com/watch?v=3E4JBHSLpYk'
          },
          {
            id: 'sw-3',
            title: 'Fruit Into Baskets',
            difficulty: 'Medium',
            tier: 'core',
            topicId: 'sliding-window',
            isSolved: false,
            isBookmarked: false
          },
          {
            id: 'sw-4',
            title: 'Longest Repeating Character Replacement',
            difficulty: 'Hard',
            tier: 'pro',
            topicId: 'sliding-window',
            isSolved: false,
            isBookmarked: true
          }
        ]
      }
    ]
  },
  {
    id: 'stack-queues',
    title: 'Stack / Queues',
    subTopics: [
      {
        id: 'stk-monotonic',
        title: 'Step 12: Monotonic Stack & Queue',
        problems: [
          {
            id: 'stk-1',
            title: 'Next Greater Element I & II',
            difficulty: 'Medium',
            tier: 'core',
            topicId: 'stack-queues',
            isSolved: false,
            isBookmarked: true,
            youtubeUrl: 'https://youtube.com/watch?v=Du881K7Jtk8'
          },
          {
            id: 'stk-2',
            title: 'Trapping Rainwater using Monotonic Stack',
            difficulty: 'Hard',
            tier: 'pro',
            topicId: 'stack-queues',
            isSolved: false,
            isBookmarked: true
          },
          {
            id: 'stk-3',
            title: 'Largest Rectangle in Histogram',
            difficulty: 'Hard',
            tier: 'pro',
            topicId: 'stack-queues',
            isSolved: false,
            isBookmarked: true,
            youtubeUrl: 'https://youtube.com/watch?v=X0X6G-eNwQ8'
          }
        ]
      }
    ]
  },
  {
    id: 'binary-trees',
    title: 'Binary Trees',
    subTopics: [
      {
        id: 'bt-traversals',
        title: 'Step 13: Traversals & Views',
        problems: [
          {
            id: 'bt-1',
            title: 'Tree Traversals (Inorder, Preorder, Postorder)',
            difficulty: 'Easy',
            tier: 'core',
            topicId: 'binary-trees',
            isSolved: false,
            isBookmarked: false
          },
          {
            id: 'bt-2',
            title: 'Maximum Depth / Height of Binary Tree',
            difficulty: 'Easy',
            tier: 'core',
            topicId: 'binary-trees',
            isSolved: false,
            isBookmarked: false
          },
          {
            id: 'bt-3',
            title: 'Diameter of Binary Tree',
            difficulty: 'Medium',
            tier: 'core',
            topicId: 'binary-trees',
            isSolved: false,
            isBookmarked: true,
            youtubeUrl: 'https://youtube.com/watch?v=Rezetez59X8'
          },
          {
            id: 'bt-4',
            title: 'Lowest Common Ancestor for two given Nodes',
            difficulty: 'Medium',
            tier: 'core',
            topicId: 'binary-trees',
            isSolved: false,
            isBookmarked: true,
            youtubeUrl: 'https://youtube.com/watch?v=_-QHfMDde90'
          }
        ]
      }
    ]
  },
  {
    id: 'binary-search-trees',
    title: 'Binary Search Trees',
    subTopics: [
      {
        id: 'bst-core',
        title: 'Step 14: BST Properties & Search',
        problems: [
          {
            id: 'bst-1',
            title: 'Search in a Binary Search Tree',
            difficulty: 'Easy',
            tier: 'core',
            topicId: 'binary-search-trees',
            isSolved: false,
            isBookmarked: false
          },
          {
            id: 'bst-2',
            title: 'Validate Binary Search Tree',
            difficulty: 'Medium',
            tier: 'core',
            topicId: 'binary-search-trees',
            isSolved: false,
            isBookmarked: true
          }
        ]
      }
    ]
  },
  {
    id: 'heaps',
    title: 'Heaps',
    subTopics: [
      {
        id: 'hp-priority',
        title: 'Step 15: Priority Queues',
        problems: [
          {
            id: 'hp-1',
            title: 'Kth Largest Element in an Array (Min-Heap)',
            difficulty: 'Medium',
            tier: 'core',
            topicId: 'heaps',
            isSolved: false,
            isBookmarked: true
          },
          {
            id: 'hp-2',
            title: 'Merge K Sorted Lists',
            difficulty: 'Hard',
            tier: 'pro',
            topicId: 'heaps',
            isSolved: false,
            isBookmarked: true
          }
        ]
      }
    ]
  },
  {
    id: 'graphs',
    title: 'Graphs',
    subTopics: [
      {
        id: 'grp-traversals',
        title: 'Step 16: BFS, DFS & Shortest Path',
        problems: [
          {
            id: 'grp-1',
            title: 'BFS and DFS Traversal of Graph',
            difficulty: 'Easy',
            tier: 'core',
            topicId: 'graphs',
            isSolved: false,
            isBookmarked: false,
            youtubeUrl: 'https://youtube.com/watch?v=-tgVpUgsQ5A'
          },
          {
            id: 'grp-2',
            title: 'Dijkstra\'s Algorithm using Priority Queue',
            difficulty: 'Medium',
            tier: 'core',
            topicId: 'graphs',
            isSolved: false,
            isBookmarked: true,
            youtubeUrl: 'https://youtube.com/watch?v=V6H1qAeB-l4'
          },
          {
            id: 'grp-3',
            title: 'Topological Sort (Kahn\'s Algorithm)',
            difficulty: 'Medium',
            tier: 'core',
            topicId: 'graphs',
            isSolved: false,
            isBookmarked: true
          }
        ]
      }
    ]
  },
  {
    id: 'dynamic-programming',
    title: 'Dynamic Programming',
    subTopics: [
      {
        id: 'dp-1d',
        title: 'Step 17.1: 1D DP',
        problems: [
          {
            id: 'dp-frog',
            title: 'Frog Jump with K Distances',
            difficulty: 'Medium',
            tier: 'core',
            topicId: 'dynamic-programming',
            isSolved: false,
            isBookmarked: true,
            youtubeUrl: 'https://youtube.com/watch?v=EgG3jsGoPvQ',
            description: 'Geek wants to climb from 0 to N-1 stones. Find minimum energy required.'
          },
          {
            id: 'dp-climbing',
            title: 'Climbing Stairs',
            difficulty: 'Easy',
            tier: 'basic',
            topicId: 'dynamic-programming',
            isSolved: false,
            isBookmarked: false
          }
        ]
      },
      {
        id: 'dp-grid',
        title: 'Step 17.2: 2D Grid DP',
        problems: [
          {
            id: 'dp-grid-paths',
            title: 'Unique Paths I & II in Grid with Obstacles',
            difficulty: 'Medium',
            tier: 'core',
            topicId: 'dynamic-programming',
            isSolved: false,
            isBookmarked: false
          }
        ]
      }
    ]
  }
];
