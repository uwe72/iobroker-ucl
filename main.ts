// https://stackoverflow.com/questions/8595509/how-do-you-share-constants-in-nodejs-modules

const deviceHomematicWandthermostat: string = "Wandthermostat";
const deviceHomematicPraesenzmelder: string = "Praesenzmelder";
const deviceHomematicWetterstation: string = "Wetterstation";
const deviceHomematicDoor: string = "Door";
const deviceHomematicRollladen: string = "Rollladen";
const deviceHomematicWandschalter: string = "Wandschalter";
const deviceHomematicFussbodenheizung: string = "Fussbodenheizung";
const deviceHomematicWandtaster: string = "Wandtaster";
const deviceHomematicAccessPoint: string = "AccessPoint";
const deviceHomematicTemperatursensor: string = "Temperatursensor";
const deviceHomematicRauchmelder: string = "Rauchmelder";
const deviceHomematicFunkSchaltaktor: string = "FunkSchaltaktor";
const deviceHomematicWindow: string = "Window";
const deviceHomematicSteckdose: string = "Steckdose";
const deviceHomematicHeizkoerper: string = "Heizkoerper";
const deviceHomematicDimmer: string = "Dimmer";

const { DateHelper } = require('./date.js');
const { DateCalendarTest } = require('./test.js');
const { AbstractColumn, HtmlTable, HtmlCreator, StaticIconColumn, AbstractStandardTextColumn } = require('./html.js');
const { HomematicWindow, HomematicSteckdose, HomematicHeizkoerper, HomematicDimmer, HomematicWandthermostat, HomematicFussbodenheizung, HomematicWandschalter, HomematicDoor, HomematicWetterstation, HomematicAccessPoint, HomematicRollladen, HomematicWandtaster, HomematicTemperatursensor, HomematicRauchmelder, HomematicPraesenzmelder, AbstractHomematic, HomematicFunkschaltaktor } = require('./homematic.js');

module.exports = {
    DateHelper,
    DateCalendarTest,
    AbstractColumn, HtmlTable, HtmlCreator, StaticIconColumn, AbstractStandardTextColumn,
    HomematicWindow, HomematicSteckdose, HomematicHeizkoerper, HomematicDimmer, HomematicWandthermostat, HomematicFussbodenheizung, HomematicWandschalter, HomematicDoor, HomematicWetterstation, HomematicAccessPoint, HomematicRollladen, HomematicWandtaster, HomematicTemperatursensor, HomematicRauchmelder, HomematicPraesenzmelder, AbstractHomematic, HomematicFunkschaltaktor,
    deviceHomematicWandthermostat, deviceHomematicPraesenzmelder, deviceHomematicWetterstation, deviceHomematicDoor, deviceHomematicRollladen, deviceHomematicWandschalter, deviceHomematicFussbodenheizung, deviceHomematicWandtaster, deviceHomematicAccessPoint, deviceHomematicTemperatursensor, deviceHomematicRauchmelder, deviceHomematicFunkSchaltaktor, deviceHomematicWindow, deviceHomematicSteckdose, deviceHomematicHeizkoerper, deviceHomematicDimmer
};