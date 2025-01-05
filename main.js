// https://stackoverflow.com/questions/8595509/how-do-you-share-constants-in-nodejs-modules
var deviceHomematicWandthermostat = "Wandthermostat";
var deviceHomematicPraesenzmelder = "Praesenzmelder";
var deviceHomematicWetterstation = "Wetterstation";
var deviceHomematicDoor = "Door";
var deviceHomematicRollladen = "Rollladen";
var deviceHomematicWandschalter = "Wandschalter";
var deviceHomematicFussbodenheizung = "Fussbodenheizung";
var deviceHomematicWandtaster = "Wandtaster";
var deviceHomematicAccessPoint = "AccessPoint";
var deviceHomematicTemperatursensor = "Temperatursensor";
var deviceHomematicRauchmelder = "Rauchmelder";
var deviceHomematicFunkSchaltaktor = "FunkSchaltaktor";
var deviceHomematicWindow = "Window";
var deviceHomematicSteckdose = "Steckdose";
var deviceHomematicHeizkoerper = "Heizkoerper";
var deviceHomematicDimmer = "Dimmer";
var DateHelper = require('./date.js').DateHelper;
var DateCalendarTest = require('./test.js').DateCalendarTest;
var _a = require('./html.js'), AbstractColumn = _a.AbstractColumn, HtmlTable = _a.HtmlTable, HtmlCreator = _a.HtmlCreator, StaticIconColumn = _a.StaticIconColumn, AbstractStandardTextColumn = _a.AbstractStandardTextColumn;
var _b = require('./homematic.js'), HomematicWindow = _b.HomematicWindow, HomematicSteckdose = _b.HomematicSteckdose, HomematicHeizkoerper = _b.HomematicHeizkoerper, HomematicDimmer = _b.HomematicDimmer, HomematicWandthermostat = _b.HomematicWandthermostat, HomematicFussbodenheizung = _b.HomematicFussbodenheizung, HomematicWandschalter = _b.HomematicWandschalter, HomematicDoor = _b.HomematicDoor, HomematicWetterstation = _b.HomematicWetterstation, HomematicAccessPoint = _b.HomematicAccessPoint, HomematicRollladen = _b.HomematicRollladen, HomematicWandtaster = _b.HomematicWandtaster, HomematicTemperatursensor = _b.HomematicTemperatursensor, HomematicRauchmelder = _b.HomematicRauchmelder, HomematicPraesenzmelder = _b.HomematicPraesenzmelder, AbstractHomematic = _b.AbstractHomematic, HomematicFunkschaltaktor = _b.HomematicFunkschaltaktor;
module.exports = {
    DateHelper: DateHelper,
    DateCalendarTest: DateCalendarTest,
    AbstractColumn: AbstractColumn,
    HtmlTable: HtmlTable,
    HtmlCreator: HtmlCreator,
    StaticIconColumn: StaticIconColumn,
    AbstractStandardTextColumn: AbstractStandardTextColumn,
    HomematicWindow: HomematicWindow,
    HomematicSteckdose: HomematicSteckdose,
    HomematicHeizkoerper: HomematicHeizkoerper,
    HomematicDimmer: HomematicDimmer,
    HomematicWandthermostat: HomematicWandthermostat,
    HomematicFussbodenheizung: HomematicFussbodenheizung,
    HomematicWandschalter: HomematicWandschalter,
    HomematicDoor: HomematicDoor,
    HomematicWetterstation: HomematicWetterstation,
    HomematicAccessPoint: HomematicAccessPoint,
    HomematicRollladen: HomematicRollladen,
    HomematicWandtaster: HomematicWandtaster,
    HomematicTemperatursensor: HomematicTemperatursensor,
    HomematicRauchmelder: HomematicRauchmelder,
    HomematicPraesenzmelder: HomematicPraesenzmelder,
    AbstractHomematic: AbstractHomematic,
    HomematicFunkschaltaktor: HomematicFunkschaltaktor,
    deviceHomematicWandthermostat: deviceHomematicWandthermostat,
    deviceHomematicPraesenzmelder: deviceHomematicPraesenzmelder,
    deviceHomematicWetterstation: deviceHomematicWetterstation,
    deviceHomematicDoor: deviceHomematicDoor,
    deviceHomematicRollladen: deviceHomematicRollladen,
    deviceHomematicWandschalter: deviceHomematicWandschalter,
    deviceHomematicFussbodenheizung: deviceHomematicFussbodenheizung,
    deviceHomematicWandtaster: deviceHomematicWandtaster,
    deviceHomematicAccessPoint: deviceHomematicAccessPoint,
    deviceHomematicTemperatursensor: deviceHomematicTemperatursensor,
    deviceHomematicRauchmelder: deviceHomematicRauchmelder,
    deviceHomematicFunkSchaltaktor: deviceHomematicFunkSchaltaktor,
    deviceHomematicWindow: deviceHomematicWindow,
    deviceHomematicSteckdose: deviceHomematicSteckdose,
    deviceHomematicHeizkoerper: deviceHomematicHeizkoerper,
    deviceHomematicDimmer: deviceHomematicDimmer
};
