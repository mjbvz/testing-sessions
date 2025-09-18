const http = require('http');
const url = require('url');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Route handling
  if (path === '/' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Testing Sessions Server</title>
        </head>
        <body>
          <h1>Welcome to Testing Sessions Server</h1>
          <p>This is a simple Node.js server running on <strong>http://localhost:${PORT}</strong></p>
          <p>Available endpoints:</p>
          <ul>
            <li><a href="/">/ - This home page</a></li>
            <li><a href="/api/status">/api/status - Server status</a></li>
            <li><a href="/api/time">/api/time - Current server time</a></li>
            <li><a href="/api/info">/api/info - Server information</a></li>
            <li><a href="/api/test/200">/api/test/:code - Test endpoint (try /api/test/404)</a></li>
          </ul>
        </body>
      </html>
    `);
  } else if (path === '/api/status' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'running',
      message: 'Server is working correctly',
      timestamp: new Date().toISOString()
    }));
  } else if (path === '/api/time' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      time: new Date().toISOString(),
      timestamp: Date.now()
    }));
  } else if (path === '/api/info' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      name: 'testing-sessions',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      port: PORT,
      url: `http://localhost:${PORT}`,
      endpoints: [
        { path: '/', method: 'GET', description: 'Home page' },
        { path: '/api/status', method: 'GET', description: 'Server status' },
        { path: '/api/time', method: 'GET', description: 'Current time' },
        { path: '/api/info', method: 'GET', description: 'Server information' },
        { path: '/api/test/:code', method: 'GET', description: 'Test endpoint for different HTTP status codes' }
      ]
    }));
  } else if (path.startsWith('/api/test/') && method === 'GET') {
    const statusCode = parseInt(path.split('/')[3]) || 200;
    const validCodes = [200, 201, 400, 401, 403, 404, 500, 502, 503];
    
    if (validCodes.includes(statusCode)) {
      res.writeHead(statusCode, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        code: statusCode,
        message: `Test response with status code ${statusCode}`,
        timestamp: new Date().toISOString(),
        url: `http://localhost:${PORT}${path}`
      }));
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Invalid status code',
        message: `Status code ${statusCode} is not supported. Valid codes: ${validCodes.join(', ')}`,
        validCodes: validCodes
      }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: 'Not Found',
      message: `Path ${path} not found`
    }));
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Available endpoints:`);
  console.log(`  GET /                - Home page`);
  console.log(`  GET /api/status      - Server status`);
  console.log(`  GET /api/time        - Current time`);
  console.log(`  GET /api/info        - Server information`);
  console.log(`  GET /api/test/:code  - Test endpoint for different HTTP status codes`);
});

module.exports = server;