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
          <p>This is a simple Node.js server.</p>
          <p>Available endpoints:</p>
          <ul>
            <li><a href="/">/ - This home page</a></li>
            <li><a href="/api/status">/api/status - Server status</a></li>
            <li><a href="/api/time">/api/time - Current server time</a></li>
            <li><a href="/api/hello">/api/hello - Hello message (GET, optional ?name=parameter)</a></li>
            <li><a href="/api/random">/api/random - Random data generation</a></li>
            <li><a href="/api/headers">/api/headers - Request headers inspection</a></li>
            <li><a href="/health">/health - Health check endpoint</a></li>
            <li>/api/echo - Echo POST requests back (POST only)</li>
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
  } else if (path === '/api/hello' && method === 'GET') {
    const name = parsedUrl.query.name || 'World';
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: `Hello, ${name}!`,
      timestamp: new Date().toISOString()
    }));
  } else if (path === '/api/echo' && method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        echo: body,
        received_at: new Date().toISOString(),
        content_length: body.length
      }));
    });
  } else if (path === '/api/random' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      random_number: Math.floor(Math.random() * 1000),
      random_uuid: require('crypto').randomUUID(),
      timestamp: new Date().toISOString()
    }));
  } else if (path === '/api/headers' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      headers: req.headers,
      method: req.method,
      url: req.url,
      timestamp: new Date().toISOString()
    }));
  } else if (path === '/health' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'healthy',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      timestamp: new Date().toISOString()
    }));
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
  console.log(`  GET /           - Home page`);
  console.log(`  GET /api/status - Server status`);
  console.log(`  GET /api/time   - Current time`);
  console.log(`  GET /api/hello  - Hello message (optional ?name=parameter)`);
  console.log(`  POST /api/echo  - Echo POST data back`);
  console.log(`  GET /api/random - Random data generation`);
  console.log(`  GET /api/headers- Request headers inspection`);
  console.log(`  GET /health     - Health check`);
});

module.exports = server;