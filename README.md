# testing-sessions

A simple Ruby server for testing sessions.

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

## Getting Started

### Prerequisites

- Ruby (v3.0 or higher)
- Bundler gem

### Installation

1. Clone this repository
2. Install dependencies:

```bash
gem install bundler
bundle install
```

### Running the Server

```bash
# Start the server
ruby server.rb

# Or using npm scripts (if you prefer)
npm start
```

The server will start on `http://localhost:4567` by default (Sinatra's default port). You can set a custom port using the `PORT` environment variable:

```bash
PORT=3000 ruby server.rb
```

### Testing

You can test the server using curl or any HTTP client:

```bash
# Test the home page
curl http://localhost:4567/

# Test the status endpoint
curl http://localhost:4567/api/status

# Test the time endpoint
curl http://localhost:4567/api/time
```

## Server Features

- **CORS Enabled**: The server includes CORS headers for cross-origin requests
- **Graceful Shutdown**: Handles SIGTERM and SIGINT signals for clean shutdown
- **JSON Responses**: API endpoints return properly formatted JSON
- **Error Handling**: Returns 404 for unknown routes with helpful error messages

## Ruby Dependencies

- **Sinatra**: Lightweight web framework for Ruby
- **JSON**: Built-in JSON support for API responses