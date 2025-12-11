import os
import signal
import sys
from datetime import datetime
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

PORT = int(os.environ.get('PORT', 3000))


@app.route('/', methods=['GET'])
def home():
    """Home page with HTML content"""
    return """
    <!DOCTYPE html>
    <html>
      <head>
        <title>Testing Sessions Server</title>
      </head>
      <body>
        <h1>Welcome to Testing Sessions Server</h1>
        <p>This is a simple Python server.</p>
        <p>Available endpoints:</p>
        <ul>
          <li><a href="/">/ - This home page</a></li>
          <li><a href="/api/status">/api/status - Server status</a></li>
          <li><a href="/api/time">/api/time - Current server time</a></li>
        </ul>
      </body>
    </html>
    """, 200, {'Content-Type': 'text/html'}


@app.route('/api/status', methods=['GET'])
def status():
    """Server status endpoint"""
    return jsonify({
        'status': 'running',
        'message': 'Server is working correctly',
        'timestamp': datetime.utcnow().isoformat() + 'Z'
    })


@app.route('/api/time', methods=['GET'])
def time():
    """Current time endpoint"""
    now = datetime.utcnow()
    return jsonify({
        'time': now.isoformat() + 'Z',
        'timestamp': int(now.timestamp() * 1000)
    })


@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({
        'error': 'Not Found',
        'message': f'Path {request.path} not found'
    }), 404


def signal_handler(sig, frame):
    """Handle graceful shutdown"""
    print(f'\n{signal.Signals(sig).name} received, shutting down gracefully...')
    print('Server closed')
    sys.exit(0)


if __name__ == '__main__':
    # Set up signal handlers for graceful shutdown
    signal.signal(signal.SIGTERM, signal_handler)
    signal.signal(signal.SIGINT, signal_handler)
    
    print(f'Server is running on http://localhost:{PORT}')
    print('Available endpoints:')
    print('  GET /           - Home page')
    print('  GET /api/status - Server status')
    print('  GET /api/time   - Current time')
    
    app.run(host='0.0.0.0', port=PORT, debug=False)
