const http = require('http');
const url = require('url');

const PORT = process.env.PORT || 3000;

// CORS middleware
function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// Route handlers
function handleHome(req, res) {
  const html = getHomePageHtml();
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(html);
}

function handleStatus(req, res) {
  const response = {
    status: 'running',
    message: 'Server is working correctly',
    timestamp: new Date().toISOString()
  };
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(response));
}

function handleTime(req, res) {
  const response = {
    time: new Date().toISOString(),
    timestamp: Date.now()
  };
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(response));
}

function handleNotFound(req, res, path) {
  const response = {
    error: 'Not Found',
    message: `Path ${path} not found`
  };
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(response));
}

function handleOptions(req, res) {
  res.writeHead(200);
  res.end();
}

// HTML template
function getHomePageHtml() {
  return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Testing Sessions Server</title>
        </head>
        <body>
          <h1>Welcome to Testing Sessions Server</h1>
          <p>This is a simple Node.js server.</p>
          <p>Available endpoints:</p>
          <ul>
            <li><a href="/">/ - This home page</a></li>
            <li><a href="/api/status">/api/status - Server status</a></li>
            <li><a href="/api/time">/api/time - Current server time</a></li>
          </ul>
        </body>
      </html>
    `;
}

// Request router
function routeRequest(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  // Set CORS headers for all responses
  setCorsHeaders(res);

  // Handle preflight requests
  if (method === 'OPTIONS') {
    return handleOptions(req, res);
  }

  // Route handling
  if (path === '/' && method === 'GET') {
    return handleHome(req, res);
  }
  
  if (path === '/api/status' && method === 'GET') {
    return handleStatus(req, res);
  }
  
  if (path === '/api/time' && method === 'GET') {
    return handleTime(req, res);
  }
  
  return handleNotFound(req, res, path);
}

const server = http.createServer(routeRequest);

// Graceful shutdown handler
function gracefulShutdown(signal) {
  console.log(`${signal} received, shutting down gracefully...`);
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
}

// Register shutdown handlers
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Server startup
function startServer() {
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log('  GET /           - Home page');
    console.log('  GET /api/status - Server status');
    console.log('  GET /api/time   - Current time');
  });
}

// Start the server if this file is run directly
if (require.main === module) {
  startServer();
}

module.exports = server;