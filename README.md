# testing-sessions

A simple Node.js server for testing sessions.

## Features

- Basic HTTP server with multiple endpoints
- JSON API responses
- HTML home page
- Calculator web interface with real-time calculations
- Calculator API for arithmetic operations
- CORS support
- Graceful shutdown handling
- Error handling with 404 responses

## Available Endpoints

- `GET /` - Home page with server information
- `GET /calculator` - Calculator web interface
- `GET /api/status` - Server status information
- `GET /api/time` - Current server time
- `POST /api/calculator` - Calculator API for arithmetic operations

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

# Test the calculator API
curl -X POST http://localhost:3000/api/calculator \
  -H "Content-Type: application/json" \
  -d '{"operation": "add", "a": 5, "b": 3}'

# Test other calculator operations
curl -X POST http://localhost:3000/api/calculator \
  -H "Content-Type: application/json" \
  -d '{"operation": "multiply", "a": 4, "b": 7}'
```

#### Calculator API

The calculator API accepts POST requests to `/api/calculator` with the following JSON body:

```json
{
  "operation": "add|subtract|multiply|divide",
  "a": number,
  "b": number
}
```

**Supported operations:**
- `add` - Addition
- `subtract` - Subtraction
- `multiply` - Multiplication
- `divide` - Division (returns error for division by zero)

**Example responses:**

Success:
```json
{
  "operation": "add",
  "a": 5,
  "b": 3,
  "result": 8,
  "timestamp": "2025-09-18T07:27:01.000Z"
}
```

Error:
```json
{
  "error": "Bad Request",
  "message": "Division by zero is not allowed"
}
```

## Server Features

- **CORS Enabled**: The server includes CORS headers for cross-origin requests
- **Graceful Shutdown**: Handles SIGTERM and SIGINT signals for clean shutdown
- **JSON Responses**: API endpoints return properly formatted JSON
- **Error Handling**: Returns 404 for unknown routes with helpful error messages
- **Calculator**: Full-featured calculator with both web interface and API
  - Web interface with real-time calculations
  - REST API supporting basic arithmetic operations
  - Input validation and error handling (division by zero, invalid operations)
  - Timestamps for calculation history