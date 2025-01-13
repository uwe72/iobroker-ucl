
const { DateHelper } = require('./date.js');
const { DateCalendarTest } = require('./test.js');
const { AbstractColumn, HtmlTable, HtmlCreator, StaticIconColumn, AbstractStandardTextColumn } = require('./html.js');
const { HomematicWindow, HomematicSteckdose, HomematicHeizkoerper, HomematicDimmer, HomematicWandthermostat, HomematicFussbodenheizung, HomematicWandschalter, HomematicDoor, HomematicWetterstation, HomematicAccessPoint, HomematicRollladen, HomematicWandtaster, HomematicTemperatursensor, HomematicRauchmelder, HomematicPraesenzmelder, AbstractHomematic, HomematicFunkschaltaktor, deviceHomematicWandthermostat, deviceHomematicPraesenzmelder, deviceHomematicWetterstation, deviceHomematicDoor, deviceHomematicRollladen, deviceHomematicWandschalter, deviceHomematicFussbodenheizung, deviceHomematicWandtaster, deviceHomematicAccessPoint, deviceHomematicTemperatursensor, deviceHomematicRauchmelder, deviceHomematicFunkSchaltaktor, deviceHomematicWindow, deviceHomematicSteckdose, deviceHomematicHeizkoerper, deviceHomematicDimmer,DimmerAlexaScheme, DimmerTasterScheme} = require('./homematicClasses.js');
const { createHomematicDevice, createHomeaticDimmer, createHomeaticWandschalter, loadHomematicWandthermostate, loadHomematicPraesenzmelder, loadHomematicWetterstationen, loadHomematicDoors, loadHomematicRollladen, loadHomematicWandschalter, loadHomematicFussbodenheizungen, loadHomematicWandtaster, loadHomematicAccessPoints, loadHomematicTemperatursensoren, loadHomematicRauchmelder, loadHomematicFunktschaltaktoren, loadHomematicWindows, loadHomematicSteckdosen, loadHomematicHeizkoerper, loadHomematicDimmer, loadHomematicDevicesAll, clearHomematicCaches } = require('./homematicFunctions.js');
const { AbstractZigbee, ColorConverter, ColorScheme, RGBColorScheme, WhiteColorScheme, ZigbeeLampeRGB, LampeWeissTasterScheme, LampeWeissAlexaScheme, ZigbeeLampeWeiss, ZigbeeSteckdose, ZigbeeSchalter, ZigbeeRepeater, ZigbeeFenstersensor, ZigbeeRauchmelder, ZigbeeBewegungsmelder, ZigbeeWandtaster, ZigbeeDosenrelais, deviceZigbeeSteckdose, deviceZigbeeBewegungsmelder, deviceZigbeeLampeRGB, deviceZigbeeLampeWeiss, deviceZigbeeRauchmelder, deviceZigbeeWandtaster, deviceZigbeeDosenrelais, deviceZigbeeSchalter, deviceZigbeeRepeater, deviceZigbeeFenstersensor } = require('./zigbeeClasses.js');
const { createZigbeeDevice, createZigbeeDosenrelais, createZigbeeLampeRGB, createZigbeeLampeWeiss, createZigbeeSteckdose, loadZigbeeSteckdosen, loadZigbeeBewegungsmelder, loadZigbeeLampenRGB, loadZigbeeLampenWeiss, loadZigbeeRauchmelder, loadZigbeeWandtaster, loadZigbeeDosenrelais, loadZigbeeSchalter, loadZigbeeRepeater, loadZigbeeFenstersensor, loadZigbeeDevicesAll, clearZigbeeCaches } = require('./zigbeeFunctions.js');
const { sendToPictureGartenToTelegram, sendToPictureSeiteToTelegram, sendToPictureHaustuereToTelegram, sendToPictureDoorbellToTelegram, sendToPictureGarageToTelegram } = require('./camera.js');
const { AlexaInputConverter } = require('./alexa.js');
const { AbstractShelly, ShellyLampeWeiss, ShellyDimmerAlexaScheme, ShellyDimmerTasterScheme, ShellyDimmer, ShellyRGBAlexaScheme, ShellyRGBTasterScheme, ShellyLampeRGB, ShellySteckdose, ShellyRollladen,ShellySensor, deviceShellyLampeWeiss, deviceShellyDimmer, deviceShellyLampeRGB, deviceShellySteckdose, deviceShellyRollladen, deviceShellySensor } = require('./shellyClasses.js');
const { createShellyDevice, createShellySensor, createShellyLampeRGB, createShellyRollladen, createShellyDimmer, createShellyLampe, createShellySteckdose, loadShellyRollladen, loadShellySensoren, loadShellyDimmer, loadShellyLampenWeiss, loadShellySteckdosen, loadShellyDevicesAll, clearShellyCaches } = require('./shellyFunctions.js');

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
    createHomematicDevice, createHomeaticDimmer, createHomeaticWandschalter, loadHomematicWandthermostate, loadHomematicPraesenzmelder, loadHomematicWetterstationen, loadHomematicDoors, loadHomematicRollladen, loadHomematicWandschalter, loadHomematicFussbodenheizungen, loadHomematicWandtaster, loadHomematicAccessPoints, loadHomematicTemperatursensoren, loadHomematicRauchmelder, loadHomematicFunktschaltaktoren, loadHomematicWindows, loadHomematicSteckdosen, loadHomematicHeizkoerper, loadHomematicDimmer, loadHomematicDevicesAll, clearHomematicCaches,

    // zigbeeClasses.ts
    AbstractZigbee, ColorConverter, ColorScheme, RGBColorScheme, WhiteColorScheme, ZigbeeLampeRGB, LampeWeissTasterScheme, LampeWeissAlexaScheme, ZigbeeLampeWeiss, ZigbeeSteckdose, ZigbeeSchalter, ZigbeeRepeater, ZigbeeFenstersensor, ZigbeeRauchmelder, ZigbeeBewegungsmelder, ZigbeeWandtaster, ZigbeeDosenrelais,
    deviceZigbeeSteckdose, deviceZigbeeBewegungsmelder, deviceZigbeeLampeRGB, deviceZigbeeLampeWeiss, deviceZigbeeRauchmelder, deviceZigbeeWandtaster, deviceZigbeeDosenrelais, deviceZigbeeSchalter, deviceZigbeeRepeater, deviceZigbeeFenstersensor,
    
    // zigbeeFunctions.ts
    createZigbeeDevice, createZigbeeDosenrelais, createZigbeeLampeRGB, createZigbeeLampeWeiss, createZigbeeSteckdose, loadZigbeeSteckdosen, loadZigbeeBewegungsmelder, loadZigbeeLampenRGB, loadZigbeeLampenWeiss, loadZigbeeRauchmelder, loadZigbeeWandtaster, loadZigbeeDosenrelais, loadZigbeeSchalter, loadZigbeeRepeater, loadZigbeeFenstersensor, loadZigbeeDevicesAll, clearZigbeeCaches,

    // camera.ts
    sendToPictureGartenToTelegram, sendToPictureSeiteToTelegram, sendToPictureHaustuereToTelegram, sendToPictureDoorbellToTelegram, sendToPictureGarageToTelegram,

    // alexa.ts
    AlexaInputConverter,

    // shellyClasses.ts
    AbstractShelly, ShellyLampeWeiss, ShellyDimmerAlexaScheme, ShellyDimmerTasterScheme, ShellyDimmer, ShellyRGBAlexaScheme, ShellyRGBTasterScheme, ShellyLampeRGB, ShellySteckdose, ShellyRollladen,ShellySensor, deviceShellyLampeWeiss, deviceShellyDimmer, deviceShellyLampeRGB, deviceShellySteckdose, deviceShellyRollladen, deviceShellySensor , 

    // ShellyFunctions.ts
    createShellyDevice, createShellySensor, createShellyLampeRGB, createShellyRollladen, createShellyDimmer, createShellyLampe, createShellySteckdose, loadShellyRollladen, loadShellySensoren, loadShellyDimmer, loadShellyLampenWeiss, loadShellySteckdosen, loadShellyDevicesAll, clearShellyCaches
};