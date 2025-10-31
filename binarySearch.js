/**
 * Binary Search Algorithm Implementation in JavaScript
 * 
 * Binary search is an efficient algorithm for finding an item from a sorted list.
 * It works by repeatedly dividing the search interval in half.
 * 
 * Time Complexity: O(log n)
 * Space Complexity: O(1) for iterative, O(log n) for recursive
 */

/**
 * Iterative Binary Search Implementation
 * @param {number[]} arr - Sorted array of numbers
 * @param {number} target - Target value to find
 * @returns {number} - Index of target if found, -1 otherwise
 */
function binarySearchIterative(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    // Calculate middle index (avoids integer overflow)
    const mid = left + Math.floor((right - left) / 2);

    // Check if target is at mid
    if (arr[mid] === target) {
      return mid;
    }

    // If target is greater, ignore left half
    if (arr[mid] < target) {
      left = mid + 1;
    } 
    // If target is smaller, ignore right half
    else {
      right = mid - 1;
    }
  }

  // Target not found
  return -1;
}

/**
 * Recursive Binary Search Implementation
 * @param {number[]} arr - Sorted array of numbers
 * @param {number} target - Target value to find
 * @param {number} left - Left boundary index
 * @param {number} right - Right boundary index
 * @returns {number} - Index of target if found, -1 otherwise
 */
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
  // Base case: element not found
  if (left > right) {
    return -1;
  }

  // Calculate middle index
  const mid = left + Math.floor((right - left) / 2);

  // Check if target is at mid
  if (arr[mid] === target) {
    return mid;
  }

  // If target is greater, search right half
  if (arr[mid] < target) {
    return binarySearchRecursive(arr, target, mid + 1, right);
  }

  // If target is smaller, search left half
  return binarySearchRecursive(arr, target, left, mid - 1);
}

/**
 * Binary Search with detailed step-by-step logging
 * Useful for understanding how the algorithm works
 * @param {number[]} arr - Sorted array of numbers
 * @param {number} target - Target value to find
 * @returns {object} - Object containing result and steps
 */
function binarySearchWithSteps(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  const steps = [];

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    
    steps.push({
      step: steps.length + 1,
      left,
      right,
      mid,
      midValue: arr[mid],
      searching: `[${left}...${mid}...${right}]`,
      comparison: arr[mid] === target ? 'Found!' : 
                  arr[mid] < target ? 'Target is greater, search right' : 
                  'Target is smaller, search left'
    });

    if (arr[mid] === target) {
      return {
        found: true,
        index: mid,
        steps,
        message: `Target ${target} found at index ${mid}`
      };
    }

    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return {
    found: false,
    index: -1,
    steps,
    message: `Target ${target} not found in array`
  };
}

/**
 * Find a user by ID in a sorted array of user objects
 * @param {Array<{id: number}>} users - Sorted array of user objects with id property
 * @param {number} targetId - Target user ID to find
 * @returns {object|null} - User object if found, null otherwise
 */
function findUserById(users, targetId) {
  let left = 0;
  let right = users.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (users[mid].id === targetId) {
      return users[mid];
    }

    if (users[mid].id < targetId) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return null;
}

// ============================================
// Example Usage and Test Cases
// ============================================

// Only run examples if this file is executed directly
if (require.main === module) {
  // Example 1: Basic usage with iterative approach
  console.log('\n=== Example 1: Iterative Binary Search ===');
  const sortedArray1 = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  console.log('Array:', sortedArray1);
  console.log('Searching for 7:', binarySearchIterative(sortedArray1, 7)); // Output: 3
  console.log('Searching for 15:', binarySearchIterative(sortedArray1, 15)); // Output: 7
  console.log('Searching for 20:', binarySearchIterative(sortedArray1, 20)); // Output: -1

  // Example 2: Recursive approach
  console.log('\n=== Example 2: Recursive Binary Search ===');
  const sortedArray2 = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
  console.log('Array:', sortedArray2);
  console.log('Searching for 10:', binarySearchRecursive(sortedArray2, 10)); // Output: 4
  console.log('Searching for 2:', binarySearchRecursive(sortedArray2, 2)); // Output: 0
  console.log('Searching for 25:', binarySearchRecursive(sortedArray2, 25)); // Output: -1

  // Example 3: Step-by-step demonstration
  console.log('\n=== Example 3: Binary Search with Steps ===');
  const sortedArray3 = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  console.log('Array:', sortedArray3);
  console.log('Searching for 70:');
  const result = binarySearchWithSteps(sortedArray3, 70);
  console.log(JSON.stringify(result, null, 2));

  // Example 4: Edge cases
  console.log('\n=== Example 4: Edge Cases ===');
  console.log('Empty array:', binarySearchIterative([], 5)); // Output: -1
  console.log('Single element (found):', binarySearchIterative([5], 5)); // Output: 0
  console.log('Single element (not found):', binarySearchIterative([5], 3)); // Output: -1
  console.log('First element:', binarySearchIterative([1, 2, 3, 4, 5], 1)); // Output: 0
  console.log('Last element:', binarySearchIterative([1, 2, 3, 4, 5], 5)); // Output: 4

  // Example 5: Large array performance comparison
  console.log('\n=== Example 5: Performance Comparison ===');
  const largeArray = Array.from({ length: 1000000 }, (_, i) => i * 2);
  const searchTarget = 999998;

  console.time('Iterative Binary Search');
  const iterativeResult = binarySearchIterative(largeArray, searchTarget);
  console.timeEnd('Iterative Binary Search');
  console.log('Result:', iterativeResult);

  console.time('Recursive Binary Search');
  const recursiveResult = binarySearchRecursive(largeArray, searchTarget);
  console.timeEnd('Recursive Binary Search');
  console.log('Result:', recursiveResult);

  // Example 6: Real-world use case - Finding a person by ID
  console.log('\n=== Example 6: Real-world Use Case ===');
  const users = [
    { id: 101, name: 'Alice' },
    { id: 203, name: 'Bob' },
    { id: 305, name: 'Charlie' },
    { id: 407, name: 'David' },
    { id: 509, name: 'Eve' }
  ];

  console.log('Users array:', users);
  console.log('Finding user with ID 407:', findUserById(users, 407));
  console.log('Finding user with ID 999:', findUserById(users, 999));
}

// Export functions for use in other modules
module.exports = {
  binarySearchIterative,
  binarySearchRecursive,
  binarySearchWithSteps,
  findUserById
};
