#!/usr/bin/env ruby
# 🐄🏔️ Test-Sitzig Alp-Server - So gmüetlich wie ne Kuh uf dr Weide! 🎺🧀

require 'webrick'
require 'json'
require 'time'

# Get port from environment or use default
PORT = ENV['PORT']&.to_i || 3000

# Create server
server = WEBrick::HTTPServer.new(
  Port: PORT,
  Logger: WEBrick::Log.new(nil, WEBrick::Log::ERROR), # Quiet logging
  AccessLog: [] # Disable access log
)

# Add CORS headers to response
def add_cors_headers(res)
  res['Access-Control-Allow-Origin'] = '*'
  res['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE'
  res['Access-Control-Allow-Headers'] = 'Content-Type'
end

# Handle all requests
server.mount_proc '/' do |req, res|
  add_cors_headers(res)
  
  if req.request_method == 'OPTIONS'
    res.status = 200
    res.body = ''
    return
  end
  
  case "#{req.path}:#{req.request_method}"
  when '/:GET'
    res.content_type = 'text/html'
    res.body = <<~HTML
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
          <p>Das isch e simpels Ruby Server, so gmüetlich wie ne Kuh uf dr Weide.</p>
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
    HTML
    
  when '/api/status:GET'
    res.content_type = 'application/json'
    res.body = {
      status: 'am laufe wie ne fröhlichi Kuh uf dr Alp',
      message: 'Server funktioniert tadellos, so guet wie frische Alpemilch! 🐄🥛',
      muh_counter: rand(1..100),
      cheese_quality: 'erstklassig',
      timestamp: Time.now.iso8601
    }.to_json
    
  when '/api/time:GET'
    now = Time.now
    res.content_type = 'application/json'
    res.body = {
      time: now.iso8601,
      timestamp: (now.to_f * 1000).to_i,
      alpine_time: 'Ziit für Alphorn und Chäs! 🎺🧀',
      cow_says: "Muuuuh! Es isch #{now.strftime('%H:%M:%S')} i dr Schwiiz!",
      milk_time: (now.hour >= 5 && now.hour <= 7) ? 'Jetzt ischs Melkziit! 🥛' : 'Nume zweimal am Tag melke!'
    }.to_json
    
  else
    res.status = 404
    res.content_type = 'application/json'
    res.body = {
      error: 'Verlaufe wie ne Kuh im Näbel',
      message: "Pfad #{req.path} nid gfunde - vilicht ischs hinder dr Alp versteckt? 🏔️🐄",
      suggestion: 'Probier emol e andere Wäg, wie Küeh wo dr richtige Pfad sueche!',
      muh: 'Muuuuh? 🐄'
    }.to_json
  end
end

# Graceful shutdown (wie Küeh sanft i Stall bringe)
trap('INT') do
  puts '🐄 SIGINT empfange, mache Schluss wie nach em Melke...'
  server.shutdown
  puts '🏔️ Server gschlosse - bis spöter uf dr Alp!'
  exit 0
end

trap('TERM') do
  puts '🐄 SIGTERM empfange, fahre sanft abe wie Küeh am Abend...'
  server.shutdown
  puts '🏔️ Server gschlosse - gueti Nacht us dr Alp!'
  exit 0
end

# Start server
puts "🏔️ Grüezi! Dr Alp-Server lauft uf http://localhost:#{PORT} 🐄"
puts "🎺 Wie schön tönt ds Alphorn am Morge!"
puts "🧀 Verfüegbari Endpünkt (wie Pfad zu verschiedene Alpe):"
puts "  GET /           - Heimetsiite (wie ne Poschtkartegruess)"
puts "  GET /api/status - Server Status (isch d'Kuh gsund?)"
puts "  GET /api/time   - Aktuelli Ziit (weles Ziit melkt me?)"
puts "🥛 Muh! Viel Spass mit üsem gmüetliche Server!"

server.start