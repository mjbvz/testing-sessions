require 'sinatra'
require 'json'
require 'time'

# Configure Sinatra
set :port, ENV['PORT'] || 3000
set :bind, '0.0.0.0'

# Enable CORS for all routes
before do
  headers['Access-Control-Allow-Origin'] = '*'
  headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE'
  headers['Access-Control-Allow-Headers'] = 'Content-Type'
end

# Handle preflight requests
options '*' do
  200
end

# Home page route
get '/' do
  content_type 'text/html'
  <<~HTML
    <!DOCTYPE html>
    <html>
      <head>
        <title>Testing Sessions Server</title>
      </head>
      <body>
        <h1>Welcome to Testing Sessions Server</h1>
        <p>This is a simple Ruby server.</p>
        <p>Available endpoints:</p>
        <ul>
          <li><a href="/">/ - This home page</a></li>
          <li><a href="/api/status">/api/status - Server status</a></li>
          <li><a href="/api/time">/api/time - Current server time</a></li>
        </ul>
      </body>
    </html>
  HTML
end

# API status endpoint
get '/api/status' do
  content_type 'application/json'
  {
    status: 'running',
    message: 'Server is working correctly',
    timestamp: Time.now.iso8601
  }.to_json
end

# API time endpoint
get '/api/time' do
  content_type 'application/json'
  now = Time.now
  {
    time: now.iso8601,
    timestamp: now.to_i
  }.to_json
end

# 404 handler
not_found do
  content_type 'application/json'
  {
    error: 'Not Found',
    message: "Path #{request.path} not found"
  }.to_json
end

# Graceful shutdown handling
trap 'TERM' do
  puts 'SIGTERM received, shutting down gracefully...'
  puts 'Server closed'
  exit 0
end

trap 'INT' do
  puts 'SIGINT received, shutting down gracefully...'
  puts 'Server closed'
  exit 0
end

# Server startup message
configure do
  puts "Server is running on http://localhost:#{settings.port}"
  puts "Available endpoints:"
  puts "  GET /           - Home page"
  puts "  GET /api/status - Server status"
  puts "  GET /api/time   - Current time"
end