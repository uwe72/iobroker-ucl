
// ===================================================================================================
// WORKFLOW nach Änderungen hier in einer TS-Datei:
// ===================================================================================================

// 1.) "Aus TS Dateien JS Dateien machen: (unten im TERMINAL-Fenster)
tsc date.ts test.ts main.ts html.ts homematicClasses.ts homematicFunctions.ts zigbeeClasses.ts zigbeeFunctions.ts camera.ts alexa.ts shellyClasses.ts shellyFunctions.ts

// 2.) In package.json eine Nummer hochzählen bei der Version

// 3.) Danach auf NPM Repository pushen: (unten im TERMINAL-Fenster) --> https://www.npmjs.com/package/iobroker-ucl
npm publish

// 4.) In docker iobroker Container rein: (PUTTY)
docker exec -it iobroker bash

// 5.) Im Docker iobroker container drin das NPM module aktualisieren: (PUTTY)
npm update iobroker-ucl                  (initial installieren mit: npm install iobroker-ucl)
 npm ls --depth=0              (um sicher zu gehen, dass richtige Version auch gezogen wurde)
 

// 6.) In iobroker Weboberfläche die Javascript Instance restarten




Neuer Rechner alles wieder einrichten:

Basierend auf:
https://www.youtube.com/watch?v=NqANV4wXhx4

1.) Node.js installieren auf Windows (Checkbox bei Installation "Chocolatey" aktivieren)
https://nodejs.org/en/download/

2.) IDE Visual Studio Code installieren
https://code.visualstudio.com/download

3.) Download Git für Windows:
https://git-scm.com/downloads/win

Auf Github gehen:
uwe72@gmx.de

URL vom Projekt kopieren:
https://github.com/uwe72/iobroker-ucl.git

Mit DOS-Konsole gehen auf c:/Projects
Dann Befehl
git clone https://github.com/uwe72/iobroker-ucl.git

Dann Visual Studio Code rein und links auf "Open Folder klicker"

Iin Git Bash:
$ git config --global user.name "John Doe"
$ git config --global user.email johndoe@example.com

npm adduser

User is: uwe72.iobroker
https://www.npmjs.com/settings/uwe72.iobroker/packages


npm install -g typescript