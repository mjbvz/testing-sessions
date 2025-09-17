# testing-sessions

Ein ziemlich cooler Node.js-Server für epische Testsitzungen (garantiert ohne Sauerkraut, aber mit extra Effizienz!).

## Funktionen

- Grundlegender HTTP-Server mit mehreren Endpunkten (mehr als ein Schweizer Taschenmesser!)
- JSON-API-Antworten (frischer als Brezeln am Morgen)
- HTML-Startseite (hübscher als ein Biergarten im Sommer)
- CORS-Unterstützung (öffnet Türen wie ein freundlicher Türsteher)
- Elegante Shutdown-Behandlung (verabschiedet sich höflicher als ein Bayer beim Oktoberfest)
- Fehlerbehandlung mit 404-Antworten (findet verlorene Pfade besser als ein GPS im Schwarzwald)

## Verfügbare Endpunkte

- `GET /` - Startseite mit Serverinformationen (die digitale Visitenkarte)
- `GET /api/status` - Serverstatusinformationen (Gesundheitscheck für Computer)
- `GET /api/time` - Aktuelle Serverzeit (präziser als eine Kuckucksuhr!)

## Erste Schritte

### Voraussetzungen

- Node.js (v14 oder höher) - so alt wie ein guter Wein
- npm (kommt normalerweise mit Node.js, wie Senf zur Bratwurst)

### Installation

1. Dieses Repository klonen (kopieren wie ein fleißiger Schüler)
2. Abhängigkeiten installieren (keine für grundlegende Funktionalität erforderlich - so minimalistisch wie ein IKEA-Möbelstück)

### Server starten

```bash
# Server starten (zum Leben erwecken!)
npm start

# Oder direkt ausführen (der Mut zur Direktheit)
node server.js
```

Der Server startet standardmäßig auf `http://localhost:3000` (wie ein Schweizer Uhrwerk). Sie können einen benutzerdefinierten Port mit der Umgebungsvariable `PORT` festlegen:

```bash
PORT=8080 npm start
```

### Testen

Sie können den Server mit curl oder einem beliebigen HTTP-Client testen (experimentieren Sie wie ein verrückter Wissenschaftler):

```bash
# Startseite testen (Hauptgericht probieren)
curl http://localhost:3000/

# Status-Endpunkt testen (Puls fühlen)
curl http://localhost:3000/api/status

# Zeit-Endpunkt testen (Zeit ist Geld, wie die Banker sagen)
curl http://localhost:3000/api/time
```

## Server-Funktionen

- **CORS aktiviert**: Der Server enthält CORS-Header für Cross-Origin-Anfragen (internationaler als ein Diplomat)
- **Elegantes Herunterfahren**: Behandelt SIGTERM- und SIGINT-Signale für sauberes Herunterfahren (macht Schluss wie ein Gentleman)
- **JSON-Antworten**: API-Endpunkte geben ordnungsgemäß formatierte JSON zurück (strukturierter als deutsche Bürokratie)
- **Fehlerbehandlung**: Gibt 404 für unbekannte Routen mit hilfreichen Fehlermeldungen zurück (hilfsbereit wie ein bayerischer Wanderführer)