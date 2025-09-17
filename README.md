# testing-sessions

Ein einfacher Node.js-Server für Testsitzungen.

## Funktionen

- Grundlegender HTTP-Server mit mehreren Endpunkten
- JSON-API-Antworten
- HTML-Startseite
- CORS-Unterstützung
- Elegante Shutdown-Behandlung
- Fehlerbehandlung mit 404-Antworten

## Verfügbare Endpunkte

- `GET /` - Startseite mit Serverinformationen
- `GET /api/status` - Serverstatusinformationen
- `GET /api/time` - Aktuelle Serverzeit

## Erste Schritte

### Voraussetzungen

- Node.js (v14 oder höher)
- npm

### Installation

1. Dieses Repository klonen
2. Abhängigkeiten installieren (keine für grundlegende Funktionalität erforderlich)

### Server starten

```bash
# Server starten
npm start

# Oder direkt ausführen
node server.js
```

Der Server startet standardmäßig auf `http://localhost:3000`. Sie können einen benutzerdefinierten Port mit der Umgebungsvariable `PORT` festlegen:

```bash
PORT=8080 npm start
```

### Testen

Sie können den Server mit curl oder einem beliebigen HTTP-Client testen:

```bash
# Startseite testen
curl http://localhost:3000/

# Status-Endpunkt testen
curl http://localhost:3000/api/status

# Zeit-Endpunkt testen
curl http://localhost:3000/api/time
```

## Server-Funktionen

- **CORS aktiviert**: Der Server enthält CORS-Header für Cross-Origin-Anfragen
- **Elegantes Herunterfahren**: Behandelt SIGTERM- und SIGINT-Signale für sauberes Herunterfahren
- **JSON-Antworten**: API-Endpunkte geben ordnungsgemäß formatierte JSON zurück
- **Fehlerbehandlung**: Gibt 404 für unbekannte Routen mit hilfreichen Fehlermeldungen zurück