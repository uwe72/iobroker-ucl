// Current Version: 1.0.63

// ===================================================================================================
// WORKFLOW nach Änderungen hier in einer TS-Datei:
// ===================================================================================================

// 1.) "Aus TS Dateien JS Dateien machen: (unten im TERMINAL-Fenster)
tsc date.ts test.ts main.ts html.ts homematicClasses.ts homematicFunctions.ts zigbeeClasses.ts zigbeeFunctions.ts camera.ts alexa.ts

// 2.) In package.json eine Nummer hochzählen bei der Version

// 3.) Danach auf NPM Repository pushen: (unten im TERMINAL-Fenster) --> https://www.npmjs.com/package/iobroker-ucl
npm publish

// 4.) In docker iobroker Container rein: (PUTTY)
docker exec -it iobroker bash

// 5.) Im Docker iobroker container drin das NPM module aktualisieren: (PUTTY)
 npm update iobroker-ucl
 npm ls --depth=0              (um sicher zu gehen, dass richtige Version auch gezogen wurde)
 npm uninstall iobroker-ucl      Danach: npm install iobroker-ucl            (Manchmal wird in iobroekr die Version incht gezogen warum auch immer)

// 6.) In iobroker Weboberfläche die Javascript Instance restarten