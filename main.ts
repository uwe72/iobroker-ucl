
const { DateHelper } = require('./date.js');
const { DateCalendarTest } = require('./test.js');
const { AbstractColumn, HtmlTable, HtmlCreator, StaticIconColumn, AbstractStandardTextColumn } = require('./html.js');

const { sendToPictureGartenToTelegram, sendToPictureSeiteToTelegram, sendToPictureHaustuereToTelegram, sendToPictureDoorbellToTelegram, sendToPictureGarageToTelegram } = require('./camera.js');
const { AlexaInputConverter } = require('./alexa.js');

const { AbstractShelly, ShellyLampeWeiss, ShellyDimmerAlexaScheme, ShellyDimmerTasterScheme, ShellyDimmer, ShellyRGBAlexaScheme, ShellyRGBTasterScheme, ShellyLampeRGB, ShellySteckdose, ShellyRollladen,ShellySensor, deviceShellyLampeWeiss, deviceShellyDimmer, deviceShellyLampeRGB, deviceShellySteckdose, deviceShellyRollladen, deviceShellySensor } = require('./shellyClasses.js');
const { createShellyDevice, createShellySensor, createShellyRollladen, createShellyDimmer, createShellyLampe, createShellySteckdose, loadShellyRollladen, loadShellySensoren, loadShellyDimmer, loadShellyLampenWeiss, loadShellySteckdosen, loadShellyDevicesAll, clearShellyCaches } = require('./shellyFunctions.js');

const { HomematicWindow, HomematicSteckdose, HomematicHeizkoerper, HomematicDimmer, HomematicWandthermostat, HomematicFussbodenheizung, HomematicWandschalter, HomematicDoor, HomematicWetterstation, HomematicAccessPoint, HomematicRollladen, HomematicWandtaster, HomematicTemperatursensor, HomematicRauchmelder, HomematicPraesenzmelder, AbstractHomematic, HomematicFunkschaltaktor, deviceHomematicWandthermostat, deviceHomematicPraesenzmelder, deviceHomematicWetterstation, deviceHomematicDoor, deviceHomematicRollladen, deviceHomematicWandschalter, deviceHomematicFussbodenheizung, deviceHomematicWandtaster, deviceHomematicAccessPoint, deviceHomematicTemperatursensor, deviceHomematicRauchmelder, deviceHomematicFunkSchaltaktor, deviceHomematicWindow, deviceHomematicSteckdose, deviceHomematicHeizkoerper, deviceHomematicDimmer,DimmerAlexaScheme, DimmerTasterScheme} = require('./homematicClasses.js');
const { createHomematicHeizkoerper, createHomematicWindow, createHomematicFunkSchaltaktor, createHomematicRauchmelder, createHomematicTemperatursensor, createHomematicAccessPoint, createHomematicWandtaster, createHomematicPraesenzmelder, createHomematicWandthermostat, createHomematicWetterstation, createHomematicDoor, createHomematicRollladen, createHomematicFussbodenheizung, createHomeaticDimmer, createHomeaticWandschalter, loadHomematicWandthermostate, loadHomematicPraesenzmelder, loadHomematicWetterstationen, loadHomematicDoors, loadHomematicRollladen, loadHomematicWandschalter, loadHomematicFussbodenheizungen, loadHomematicWandtaster, loadHomematicAccessPoints, loadHomematicTemperatursensoren, loadHomematicRauchmelder, loadHomematicFunktschaltaktoren, loadHomematicWindows, loadHomematicSteckdosen, loadHomematicHeizkoerper, loadHomematicDimmer, loadHomematicDevicesAll, clearHomematicCaches } = require('./homematicFunctions.js');

const { AbstractZigbee, ColorConverter, ColorScheme, RGBColorScheme, WhiteColorScheme, ZigbeeLampeRGB, LampeWeissTasterScheme, LampeWeissAlexaScheme, ZigbeeLampeWeiss, ZigbeeSteckdose, ZigbeeSchalter, ZigbeeRepeater, ZigbeeFenstersensor, ZigbeeRauchmelder, ZigbeeBewegungsmelder, ZigbeeWandtaster, ZigbeeDosenrelais, deviceZigbeeSteckdose, deviceZigbeeBewegungsmelder, deviceZigbeeLampeRGB, deviceZigbeeLampeWeiss, deviceZigbeeRauchmelder, deviceZigbeeWandtaster, deviceZigbeeDosenrelais, deviceZigbeeSchalter, deviceZigbeeRepeater, deviceZigbeeFenstersensor } = require('./zigbeeClasses.js');
const { createZigbeeBewegungsmelder, createZigbeeRauchmelder, createZigbeeWandtaster, createZigbeeSchalter, createZigbeeRepeater, createZigbeeFenstersensor, createZigbeeDosenrelais, createZigbeeLampeRGB, createZigbeeLampeWeiss, createZigbeeSteckdose, loadZigbeeSteckdosen, loadZigbeeBewegungsmelder, loadZigbeeLampenRGB, loadZigbeeLampenWeiss, loadZigbeeRauchmelder, loadZigbeeWandtaster, loadZigbeeDosenrelais, loadZigbeeSchalter, loadZigbeeRepeater, loadZigbeeFenstersensor, loadZigbeeDevicesAll, clearZigbeeCaches } = require('./zigbeeFunctions.js');


module.exports = {

    // date.ts:
    DateHelper,
    
    // test.ts:
    DateCalendarTest,
    
    // html.ts:
    AbstractColumn, HtmlTable, HtmlCreator, StaticIconColumn, AbstractStandardTextColumn,
    
    // homematicClasses.ts
    HomematicWindow, HomematicSteckdose, HomematicHeizkoerper, HomematicDimmer, HomematicWandthermostat, HomematicFussbodenheizung, HomematicWandschalter, HomematicDoor, HomematicWetterstation, HomematicAccessPoint, HomematicRollladen, HomematicWandtaster, HomematicTemperatursensor, HomematicRauchmelder, HomematicPraesenzmelder, AbstractHomematic, HomematicFunkschaltaktor,DimmerAlexaScheme, DimmerTasterScheme,
    deviceHomematicWandthermostat, deviceHomematicPraesenzmelder, deviceHomematicWetterstation, deviceHomematicDoor, deviceHomematicRollladen, deviceHomematicWandschalter, deviceHomematicFussbodenheizung, deviceHomematicWandtaster, deviceHomematicAccessPoint, deviceHomematicTemperatursensor, deviceHomematicRauchmelder, deviceHomematicFunkSchaltaktor, deviceHomematicWindow, deviceHomematicSteckdose, deviceHomematicHeizkoerper, deviceHomematicDimmer,

    // homematicFunctions.ts
    createHomematicHeizkoerper, createHomematicWindow, createHomematicFunkSchaltaktor, createHomematicRauchmelder, createHomematicTemperatursensor, createHomematicAccessPoint, createHomematicWandtaster, createHomematicPraesenzmelder, createHomematicWandthermostat, createHomematicWetterstation, createHomematicDoor, createHomematicRollladen, createHomematicFussbodenheizung, createHomeaticDimmer, createHomeaticWandschalter, loadHomematicWandthermostate, loadHomematicPraesenzmelder, loadHomematicWetterstationen, loadHomematicDoors, loadHomematicRollladen, loadHomematicWandschalter, loadHomematicFussbodenheizungen, loadHomematicWandtaster, loadHomematicAccessPoints, loadHomematicTemperatursensoren, loadHomematicRauchmelder, loadHomematicFunktschaltaktoren, loadHomematicWindows, loadHomematicSteckdosen, loadHomematicHeizkoerper, loadHomematicDimmer, loadHomematicDevicesAll, clearHomematicCaches,

    // zigbeeClasses.ts
    AbstractZigbee, ColorConverter, ColorScheme, RGBColorScheme, WhiteColorScheme, ZigbeeLampeRGB, LampeWeissTasterScheme, LampeWeissAlexaScheme, ZigbeeLampeWeiss, ZigbeeSteckdose, ZigbeeSchalter, ZigbeeRepeater, ZigbeeFenstersensor, ZigbeeRauchmelder, ZigbeeBewegungsmelder, ZigbeeWandtaster, ZigbeeDosenrelais,
    deviceZigbeeSteckdose, deviceZigbeeBewegungsmelder, deviceZigbeeLampeRGB, deviceZigbeeLampeWeiss, deviceZigbeeRauchmelder, deviceZigbeeWandtaster, deviceZigbeeDosenrelais, deviceZigbeeSchalter, deviceZigbeeRepeater, deviceZigbeeFenstersensor,
    
    // zigbeeFunctions.ts
    createZigbeeBewegungsmelder, createZigbeeRauchmelder, createZigbeeWandtaster, createZigbeeSchalter, createZigbeeRepeater, createZigbeeFenstersensor, createZigbeeDosenrelais, createZigbeeLampeRGB, createZigbeeLampeWeiss, createZigbeeSteckdose, loadZigbeeSteckdosen, loadZigbeeBewegungsmelder, loadZigbeeLampenRGB, loadZigbeeLampenWeiss, loadZigbeeRauchmelder, loadZigbeeWandtaster, loadZigbeeDosenrelais, loadZigbeeSchalter, loadZigbeeRepeater, loadZigbeeFenstersensor, loadZigbeeDevicesAll, clearZigbeeCaches,

    // camera.ts
    sendToPictureGartenToTelegram, sendToPictureSeiteToTelegram, sendToPictureHaustuereToTelegram, sendToPictureDoorbellToTelegram, sendToPictureGarageToTelegram,

    // alexa.ts
    AlexaInputConverter,

    // shellyClasses.ts
    AbstractShelly, ShellyLampeWeiss, ShellyDimmerAlexaScheme, ShellyDimmerTasterScheme, ShellyDimmer, ShellyRGBAlexaScheme, ShellyRGBTasterScheme, ShellyLampeRGB, ShellySteckdose, ShellyRollladen,ShellySensor, deviceShellyLampeWeiss, deviceShellyDimmer, deviceShellyLampeRGB, deviceShellySteckdose, deviceShellyRollladen, deviceShellySensor , 

    // ShellyFunctions.ts
    createShellyDevice, createShellySensor, createShellyRollladen, createShellyDimmer, createShellyLampe, createShellySteckdose, loadShellyRollladen, loadShellySensoren, loadShellyDimmer, loadShellyLampenWeiss, loadShellySteckdosen, loadShellyDevicesAll, clearShellyCaches
};