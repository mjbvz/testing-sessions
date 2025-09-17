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
          <h1>🍺 Willkommen zum Testing Sessions Server! 🥨</h1>
          <p>Dies ist ein ziemlich cooler Node.js-Server (läuft wie geschmiert!).</p>
          <p>Verfügbare Endpunkte (mehr Auswahl als beim Oktoberfest):</p>
          <ul>
            <li><a href="/">/ - Diese fantastische Startseite</a></li>
            <li><a href="/api/status">/api/status - Serverstatus (bin ich noch am Leben?)</a></li>
            <li><a href="/api/time">/api/time - Aktuelle Serverzeit (tickt wie eine Kuckucksuhr)</a></li>
          </ul>
        </body>
      </html>
    `);
  } else if (path === '/api/status' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'läuft wie geschmiert',
      message: 'Server brummt wie ein zufriedener Bienenstock! 🐝',
      timestamp: new Date().toISOString()
    }));
  } else if (path === '/api/time' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      time: new Date().toISOString(),
      timestamp: Date.now()
    }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: 'Verschollen im Datennirvana! 🌌',
      message: `Pfad ${path} ist verschwunden wie Socken in der Waschmaschine`
    }));
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM empfangen, fahre elegant herunter (wie ein Schwan auf dem See)...');
  server.close(() => {
    console.log('Server geschlossen (und träumt jetzt von elektrischen Schafen) 🐑');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT empfangen, fahre elegant herunter (wie ein Schwan auf dem See)...');
  server.close(() => {
    console.log('Server geschlossen (und träumt jetzt von elektrischen Schafen) 🐑');
    process.exit(0);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server läuft auf http://localhost:${PORT} (besser als ein ICE-Zug!)`);
  console.log(`🎯 Verfügbare Endpunkte (mehr Optionen als in einem deutschen Supermarkt):`);
  console.log(`  GET /           - Startseite (das digitale Zuhause)`);
  console.log(`  GET /api/status - Serverstatus (Gesundheitscheck)`);
  console.log(`  GET /api/time   - Aktuelle Zeit (Zeit ist Wurst... äh, Geld!)`);
});

module.exports = server;