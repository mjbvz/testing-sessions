````markdown
# test-sitzig 🐄🏔️

E simpels Node.js Server für Test-Sitzige uf dr Alp, so schnell wie ne Kuh am Grase frässe!

## Funktione (so guet wie frische Alpchäs)

- Basis HTTP Server mit mehrere Endpünkt (wie Kuhpfad uf dr Alp)
- JSON API Antwörte (so frisch wie Morgemilch)
- HTML Heimetsiite (gmüetlich wie ne Berghütte)
- CORS Understützig (chunnt über alli Gränze wie d'Küeh)
- Fini Server-Abschaltig (sanft wie Alphorn-Musig)
- Fähler-Handlig mit 404 Antwörte (verlaufe wie ne Kuh im Näbel)

## Verfüegbari Endpünkt (wie Bergpfad zu verschiedene Alpe)

- `GET /` - Heimetsiite mit Server-Informatione (wie ne Poschtkartegruess us dr Schwiiz)
- `GET /api/status` - Server Status Informatione (isch dr Server no am laufe oder hets e Chuhpause?)
- `GET /api/time` - Aktuelli Server-Ziit (Schwiizer Präzision wie ne Uhremacher)

## Wie fangt me aa

### Vorussetzige

- Node.js (v14 oder höcher)
- npm

### Installatione (so eifach wie Chäs mache)

1. Dis Repository klone (wie ne Kuh uf d'Alp bringe)
2. Abhängigkeite installiere (keini nötig für basis Funktionalität - so eifach wie Gras frässe)

### Server laufe laa (wie Küeh uf d'Weide)

```bash
# Server starte (wie Alphorn blase)
npm start

# Oder direkt laufe laa (wie Kuh melke)
node server.js
```

Dr Server startet per default uf `http://localhost:3000` (wie e gmüetlichi Berghütte). Du chasch e custom Port setze mit dr `PORT` Umgäbigs-Variable (wie verschiedeni Alpe):

```bash
PORT=8080 npm start
```

### Teste (wie Chäs probiere)

Du chasch dr Server teste mit curl oder jedem HTTP Client (wie verschiedeni Chäs-Sorte probiere):

```bash
# Heimetsiite teste (wie heime choo zur Kuh)
curl http://localhost:3000/

# Status Endpunkt teste (isch d'Kuh gsund?)
curl http://localhost:3000/api/status

# Ziit Endpunkt teste (weles Ziit melkt me?)
curl http://localhost:3000/api/time
```

## Server Funktione (wie ne gueti Schwiizer Uhr)

- **CORS Aktiviert**: Dr Server het CORS Headers für cross-origin Aafroge (wie Küeh wo über Gränze laufe)
- **Fini Abschaltig**: Handled SIGTERM und SIGINT Signäl für e sauberi Abschaltig (wie Küeh sanft i Stall bringe)
- **JSON Antwörte**: API Endpünkt gönd richtig formatierti JSON zrugg (so strukturiert wie Chäs-Reifig im Chäller)
- **Fähler-Handlig**: Git 404 zrugg für unbekannti Route mit hilfriche Fähler-Nachrichte (wie wenn d'Kuh dr Wäg nid findt)
````