````markdown
# test-sitzig 🐄🏔️

E simpels Ruby Server für Test-Sitzige uf dr Alp, so schnell wie ne Kuh am Grase frässe!

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

- Ruby (v2.7 oder höcher)

### Installatione (so eifach wie Chäs mache)

1. Dis Repository klone (wie ne Kuh uf d'Alp bringe)
2. Keini Abhängigkeite nötig - Ruby hets alles scho dabei (wie Kuh wo alles cha)

### Server laufe laa (wie Küeh uf d'Weide)

```bash
# Server starte (wie Alphorn blase)
ruby server.rb

# Oder mit npm (für Kompatibilität)
npm start

# Oder direkt ausführe (wie Kuh melke)
./server.rb
```

Dr Server startet per default uf `http://localhost:3000` (wie e gmüetlichi Berghütte). Du chasch e custom Port setze mit dr `PORT` Umgäbigs-Variable (wie verschiedeni Alpe):

```bash
PORT=8080 ruby server.rb
```

**Kompatibilität:** Dr alte Node.js Server isch no vorhanden als `server.js` und cha mit `npm run start-nodejs` gstartet werde.

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