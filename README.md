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
- `GET /api/hello` - Hello message (optional `?name=parameter`)
- `POST /api/echo` - Echo POST request data back
- `GET /api/random` - Random data generation (number and UUID)
- `GET /api/headers` - Request headers inspection
- `GET /health` - Health check with uptime and memory usage

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

# Test the hello endpoint
curl http://localhost:3000/api/hello
curl "http://localhost:3000/api/hello?name=YourName"

# Test the echo endpoint (POST)
curl -X POST -d "Hello World" http://localhost:3000/api/echo

# Test the random data endpoint
curl http://localhost:3000/api/random

# Test the headers inspection endpoint
curl http://localhost:3000/api/headers

# Test the health check endpoint
curl http://localhost:3000/health
```

## Server Features

- **CORS Enabled**: The server includes CORS headers for cross-origin requests
- **Graceful Shutdown**: Handles SIGTERM and SIGINT signals for clean shutdown
- **JSON Responses**: API endpoints return properly formatted JSON
- **Error Handling**: Returns 404 for unknown routes with helpful error messages