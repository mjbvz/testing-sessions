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
            <li><a href="/calculator">/calculator - Calculator web interface</a></li>
            <li><a href="/api/status">/api/status - Server status</a></li>
            <li><a href="/api/time">/api/time - Current server time</a></li>
            <li>/api/calculator - Calculator API (POST)</li>
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
  } else if (path === '/api/calculator' && method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const { operation, a, b } = JSON.parse(body);
        
        if (typeof a !== 'number' || typeof b !== 'number') {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            error: 'Bad Request',
            message: 'Parameters a and b must be numbers'
          }));
          return;
        }
        
        let result;
        switch (operation) {
          case 'add':
            result = a + b;
            break;
          case 'subtract':
            result = a - b;
            break;
          case 'multiply':
            result = a * b;
            break;
          case 'divide':
            if (b === 0) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({
                error: 'Bad Request',
                message: 'Division by zero is not allowed'
              }));
              return;
            }
            result = a / b;
            break;
          default:
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              error: 'Bad Request',
              message: 'Operation must be one of: add, subtract, multiply, divide'
            }));
            return;
        }
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          operation,
          a,
          b,
          result,
          timestamp: new Date().toISOString()
        }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          error: 'Bad Request',
          message: 'Invalid JSON in request body'
        }));
      }
    });
  } else if (path === '/calculator' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Calculator - Testing Sessions Server</title>
          <style>
            body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
            .calculator { background: #f5f5f5; padding: 20px; border-radius: 8px; }
            .input-group { margin: 10px 0; }
            label { display: inline-block; width: 100px; }
            input, select { padding: 8px; margin: 5px; border: 1px solid #ddd; border-radius: 4px; }
            button { padding: 10px 20px; background: #007cba; color: white; border: none; border-radius: 4px; cursor: pointer; }
            button:hover { background: #005a87; }
            .result { margin-top: 20px; padding: 10px; background: #e8f4f8; border-radius: 4px; }
            .error { background: #ffe8e8; color: #d00; }
          </style>
        </head>
        <body>
          <h1>Calculator</h1>
          <p><a href="/">← Back to Home</a></p>
          
          <div class="calculator">
            <h2>Basic Calculator</h2>
            <form id="calculatorForm">
              <div class="input-group">
                <label for="numberA">First Number:</label>
                <input type="number" id="numberA" step="any" required>
              </div>
              
              <div class="input-group">
                <label for="operation">Operation:</label>
                <select id="operation" required>
                  <option value="add">Add (+)</option>
                  <option value="subtract">Subtract (-)</option>
                  <option value="multiply">Multiply (×)</option>
                  <option value="divide">Divide (÷)</option>
                </select>
              </div>
              
              <div class="input-group">
                <label for="numberB">Second Number:</label>
                <input type="number" id="numberB" step="any" required>
              </div>
              
              <button type="submit">Calculate</button>
            </form>
            
            <div id="result" class="result" style="display: none;"></div>
          </div>
          
          <script>
            document.getElementById('calculatorForm').addEventListener('submit', async function(e) {
              e.preventDefault();
              
              const a = parseFloat(document.getElementById('numberA').value);
              const b = parseFloat(document.getElementById('numberB').value);
              const operation = document.getElementById('operation').value;
              
              const resultDiv = document.getElementById('result');
              
              try {
                const response = await fetch('/api/calculator', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ operation, a, b })
                });
                
                const data = await response.json();
                
                if (response.ok) {
                  resultDiv.className = 'result';
                  resultDiv.innerHTML = \`
                    <h3>Result</h3>
                    <p><strong>\${a} \${getOperationSymbol(operation)} \${b} = \${data.result}</strong></p>
                    <p><small>Calculation performed at: \${new Date(data.timestamp).toLocaleString()}</small></p>
                  \`;
                } else {
                  resultDiv.className = 'result error';
                  resultDiv.innerHTML = \`
                    <h3>Error</h3>
                    <p>\${data.message}</p>
                  \`;
                }
                
                resultDiv.style.display = 'block';
              } catch (error) {
                resultDiv.className = 'result error';
                resultDiv.innerHTML = \`
                  <h3>Error</h3>
                  <p>Failed to connect to server</p>
                \`;
                resultDiv.style.display = 'block';
              }
            });
            
            function getOperationSymbol(operation) {
              switch (operation) {
                case 'add': return '+';
                case 'subtract': return '-';
                case 'multiply': return '×';
                case 'divide': return '÷';
                default: return operation;
              }
            }
          </script>
        </body>
      </html>
    `);
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
  console.log(`  GET /              - Home page`);
  console.log(`  GET /calculator    - Calculator web interface`);
  console.log(`  GET /api/status    - Server status`);
  console.log(`  GET /api/time      - Current time`);
  console.log(`  POST /api/calculator - Calculator API`);
});

module.exports = server;