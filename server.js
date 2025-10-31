const http = require('http');
const url = require('url');
const { binarySearchIterative, binarySearchWithSteps } = require('./binarySearch');

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
          <p>This is a simple Node.js server.</p>
          <p>Available endpoints:</p>
          <ul>
            <li><a href="/">/ - This home page</a></li>
            <li><a href="/api/status">/api/status - Server status</a></li>
            <li><a href="/api/time">/api/time - Current server time</a></li>
            <li><a href="/api/binary-search?array=1,3,5,7,9,11,13,15,17,19&target=7">/api/binary-search - Binary search demo</a></li>
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
  } else if (path === '/api/binary-search' && method === 'GET') {
    // Binary search endpoint
    const query = parsedUrl.query;
    
    try {
      // Parse array parameter
      const arrayParam = query.array || '1,3,5,7,9,11,13,15,17,19';
      const arr = arrayParam.split(',').map(num => parseInt(num.trim(), 10));
      
      // Parse target parameter
      const target = parseInt(query.target || '7', 10);
      
      // Validate inputs
      if (arr.some(isNaN)) {
        throw new Error('Invalid array values');
      }
      if (isNaN(target)) {
        throw new Error('Invalid target value');
      }
      
      // Perform binary search with steps
      const result = binarySearchWithSteps(arr, target);
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        array: arr,
        target: target,
        result: result,
        usage: 'Add query parameters: ?array=1,2,3,4,5&target=3'
      }));
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Bad Request',
        message: error.message,
        usage: 'Example: /api/binary-search?array=1,2,3,4,5&target=3'
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
  console.log(`  GET /                  - Home page`);
  console.log(`  GET /api/status        - Server status`);
  console.log(`  GET /api/time          - Current time`);
  console.log(`  GET /api/binary-search - Binary search demo`);
});

module.exports = server;