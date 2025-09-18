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
  } else if (path === '/api/hidden' && method === 'GET') {
    // Very hidden easter egg - requires specific conditions
    const userAgent = req.headers['user-agent'] || '';
    const secretParam = parsedUrl.query.secret;
    const konamiCode = 'up-up-down-down-left-right-left-right-b-a';
    
    if (userAgent.includes('KonamiCode') && secretParam === konamiCode) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        message: '🎉 Congratulations! You found the hidden easter egg! 🥚',
        achievement: 'Secret Agent',
        hint: 'The Konami Code never gets old...',
        bonus: {
          ascii_art: [
            '    ╔══════════════════╗',
            '    ║  EASTER EGG FOUND ║',
            '    ╚══════════════════╝',
            '        🐰    🥚    🌟'
          ],
          unlocked_at: new Date().toISOString(),
          secret_level: 'Maximum'
        }
      }));
    } else {
      // Respond like any other 404 to hide the easter egg
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Not Found',
        message: `Path ${path} not found`
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
  console.log(`  GET /           - Home page`);
  console.log(`  GET /api/status - Server status`);
  console.log(`  GET /api/time   - Current time`);
});

module.exports = server;