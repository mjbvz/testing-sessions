# testing-sessions

A simple Node.js server for testing sessions.

## Features

- Basic HTTP server with multiple endpoints
- JSON API responses
- HTML home page
- CORS support
- Graceful shutdown handling
- Error handling with 404 responses

## Available Endpoints

- `GET /` - Home page with server information
- `GET /api/status` - Server status information
- `GET /api/time` - Current server time
- `GET /api/binary-search` - Binary search demonstration (accepts `array` and `target` query parameters)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Clone this repository
2. Install dependencies (none required for basic functionality)

### Running the Server

```bash
# Start the server
npm start

# Or run directly
node server.js
```

The server will start on `http://localhost:3000` by default. You can set a custom port using the `PORT` environment variable:

```bash
PORT=8080 npm start
```

### Testing

You can test the server using curl or any HTTP client:

```bash
# Test the home page
curl http://localhost:3000/

# Test the status endpoint
curl http://localhost:3000/api/status

# Test the time endpoint
curl http://localhost:3000/api/time

# Test the binary search endpoint
curl "http://localhost:3000/api/binary-search?array=1,3,5,7,9,11,13,15,17,19&target=7"

# Test binary search with custom parameters
curl "http://localhost:3000/api/binary-search?array=10,20,30,40,50,60,70,80,90,100&target=70"
```

## Server Features

- **CORS Enabled**: The server includes CORS headers for cross-origin requests
- **Graceful Shutdown**: Handles SIGTERM and SIGINT signals for clean shutdown
- **JSON Responses**: API endpoints return properly formatted JSON
- **Error Handling**: Returns 404 for unknown routes with helpful error messages

## Binary Search Implementation

This repository includes a comprehensive binary search implementation in JavaScript with multiple examples.

### What is Binary Search?

Binary search is an efficient algorithm for finding a target value within a sorted array. It works by repeatedly dividing the search interval in half:

1. Compare the target value to the middle element of the array
2. If the target equals the middle element, return its position
3. If the target is less than the middle element, search the left half
4. If the target is greater than the middle element, search the right half
5. Repeat until the target is found or the search space is empty

**Time Complexity:** O(log n)  
**Space Complexity:** O(1) for iterative, O(log n) for recursive

### Running the Binary Search Examples

```bash
# Run all examples and see how binary search works
node binarySearch.js
```

### Code Examples

#### Example 1: Basic Iterative Binary Search

```javascript
function binarySearchIterative(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (arr[mid] === target) {
      return mid;
    }

    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

// Usage
const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
console.log(binarySearchIterative(sortedArray, 7));  // Output: 3
console.log(binarySearchIterative(sortedArray, 20)); // Output: -1
```

#### Example 2: Recursive Binary Search

```javascript
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) {
    return -1;
  }

  const mid = left + Math.floor((right - left) / 2);

  if (arr[mid] === target) {
    return mid;
  }

  if (arr[mid] < target) {
    return binarySearchRecursive(arr, target, mid + 1, right);
  }

  return binarySearchRecursive(arr, target, left, mid - 1);
}

// Usage
const sortedArray = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
console.log(binarySearchRecursive(sortedArray, 10)); // Output: 4
console.log(binarySearchRecursive(sortedArray, 25)); // Output: -1
```

#### Example 3: Real-World Use Case - Finding Objects by Property

```javascript
// Array of users sorted by ID
const users = [
  { id: 101, name: 'Alice' },
  { id: 203, name: 'Bob' },
  { id: 305, name: 'Charlie' },
  { id: 407, name: 'David' },
  { id: 509, name: 'Eve' }
];

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

console.log(findUserById(users, 407)); // Output: { id: 407, name: 'David' }
console.log(findUserById(users, 999)); // Output: null
```

### Key Points to Remember

1. **Array must be sorted**: Binary search only works on sorted arrays
2. **Efficient for large datasets**: Much faster than linear search for large arrays
3. **Two implementations**: Both iterative and recursive approaches work
4. **Edge cases**: Handle empty arrays, single elements, and not-found scenarios
5. **Index calculation**: Use `left + Math.floor((right - left) / 2)` to avoid overflow

### Visual Example

Searching for `70` in `[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]`:

```
Step 1: [0...4...9]   mid=4, value=50  → 70 > 50, search right
Step 2: [5...7...9]   mid=7, value=80  → 70 < 80, search left
Step 3: [5...5...6]   mid=5, value=60  → 70 > 60, search right
Step 4: [6...6...6]   mid=6, value=70  → Found at index 6!
```

See `binarySearch.js` for complete implementation with more examples and detailed comments.