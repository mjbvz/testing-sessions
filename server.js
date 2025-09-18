// 🐄🏔️ Test-Sitzig Alp-Server - So gmüetlich wie ne Kuh uf dr Weide! 🎺🧀
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
          <title>Test-Sitzig Alp-Server 🐄🏔️</title>
          <style>
            body { font-family: Arial, sans-serif; background: linear-gradient(to bottom, #87CEEB, #98FB98); }
            h1 { color: #8B4513; }
            .cow { font-size: 2em; }
          </style>
        </head>
        <body>
          <h1>🏔️ Grüezi uf em Test-Sitzig Alp-Server! 🐄</h1>
          <p>Das isch e simpels Node.js Server, so gmüetlich wie ne Kuh uf dr Weide.</p>
          <p class="cow">🐄 Muh! 🐄</p>
          <p>Verfüegbari Endpünkt (wie Bergpfad zu verschiedene Alpe):</p>
          <ul>
            <li><a href="/">/ - Disi Heimetsiite (wie ne Poschtkartegruess us dr Schwiiz)</a></li>
            <li><a href="/api/status">/api/status - Server Status (isch dr Server no am laufe oder hets e Chuhpause?)</a></li>
            <li><a href="/api/time">/api/time - Aktuelli Server-Ziit (Schwiizer Präzision wie ne Uhremacher)</a></li>
          </ul>
          <p>🧀 Viel Spass mit üsem Alphorn-Server! 🎺</p>
        </body>
      </html>
    `);
  } else if (path === '/api/status' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'am laufe wie ne fröhlichi Kuh uf dr Alp',
      message: 'Server funktioniert tadellos, so guet wie frische Alpemilch! 🐄🥛',
      muh_counter: Math.floor(Math.random() * 100) + 1,
      cheese_quality: 'erstklassig',
      timestamp: new Date().toISOString()
    }));
  } else if (path === '/api/time' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      time: new Date().toISOString(),
      timestamp: Date.now(),
      alpine_time: 'Ziit für Alphorn und Chäs! 🎺🧀',
      cow_says: 'Muuuuh! Es isch ' + new Date().toLocaleTimeString('de-CH') + ' i dr Schwiiz!',
      milk_time: new Date().getHours() >= 5 && new Date().getHours() <= 7 ? 'Jetzt ischs Melkziit! 🥛' : 'Nume zweimal am Tag melke!'
    }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: 'Verlaufe wie ne Kuh im Näbel',
      message: `Pfad ${path} nid gfunde - vilicht ischs hinder dr Alp versteckt? 🏔️🐄`,
      suggestion: 'Probier emol e andere Wäg, wie K-üeh wo dr richtige Pfad sueche!',
      muh: 'Muuuuh? 🐄'
    }));
  }
});

// Graceful shutdown (wie Küeh sanft i Stall bringe)
process.on('SIGTERM', () => {
  console.log('🐄 SIGTERM empfange, fahre sanft abe wie Küeh am Abend...');
  server.close(() => {
    console.log('🏔️ Server gschlosse - gueti Nacht us dr Alp!');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('🐄 SIGINT empfange, mache Schluss wie nach em Melke...');
  server.close(() => {
    console.log('🏔️ Server gschlosse - bis spöter uf dr Alp!');
    process.exit(0);
  });
});

server.listen(PORT, () => {
  console.log(`🏔️ Grüezi! Dr Alp-Server lauft uf http://localhost:${PORT} 🐄`);
  console.log(`🎺 Wie schön tönt ds Alphorn am Morge!`);
  console.log(`🧀 Verfüegbari Endpünkt (wie Pfad zu verschiedene Alpe):`);
  console.log(`  GET /           - Heimetsiite (wie ne Poschtkartegruess)`);
  console.log(`  GET /api/status - Server Status (isch d'Kuh gsund?)`);
  console.log(`  GET /api/time   - Aktuelli Ziit (weles Ziit melkt me?)`);
  console.log(`🥛 Muh! Viel Spass mit üsem gmüetliche Server!`);
});

module.exports = server;