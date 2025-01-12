
const { DateHelper } = require('./date.js');
const { DateCalendarTest } = require('./test.js');
const { AbstractColumn, HtmlTable, HtmlCreator, StaticIconColumn, AbstractStandardTextColumn } = require('./html.js');
const { HomematicWindow, HomematicSteckdose, HomematicHeizkoerper, HomematicDimmer, HomematicWandthermostat, HomematicFussbodenheizung, HomematicWandschalter, HomematicDoor, HomematicWetterstation, HomematicAccessPoint, HomematicRollladen, HomematicWandtaster, HomematicTemperatursensor, HomematicRauchmelder, HomematicPraesenzmelder, AbstractHomematic, HomematicFunkschaltaktor, deviceHomematicWandthermostat, deviceHomematicPraesenzmelder, deviceHomematicWetterstation, deviceHomematicDoor, deviceHomematicRollladen, deviceHomematicWandschalter, deviceHomematicFussbodenheizung, deviceHomematicWandtaster, deviceHomematicAccessPoint, deviceHomematicTemperatursensor, deviceHomematicRauchmelder, deviceHomematicFunkSchaltaktor, deviceHomematicWindow, deviceHomematicSteckdose, deviceHomematicHeizkoerper, deviceHomematicDimmer,DimmerAlexaScheme, DimmerTasterScheme} = require('./homematicClasses.js');
const { createHomematicDevice, loadHomematicWandthermostate, loadHomematicPraesenzmelder, loadHomematicWetterstationen, loadHomematicDoors, loadHomematicRollladen, loadHomematicWandschalter, loadHomematicFussbodenheizungen, loadHomematicWandtaster, loadHomematicAccessPoints, loadHomematicTemperatursensoren, loadHomematicRauchmelder, loadHomematicFunktschaltaktoren, loadHomematicWindows, loadHomematicSteckdosen, loadHomematicHeizkoerper, loadHomematicDimmer, loadHomematicDevicesAll } = require('./homematicFunctions.js');
const { AbstractZigbee, ColorScheme, RGBColorScheme, WhiteColorScheme, ZigbeeLampeRGB, LampeWeissTasterScheme, LampeWeissAlexaScheme, ZigbeeLampeWeiss, ZigbeeSteckdose, ZigbeeSchalter, ZigbeeRepeater, ZigbeeFenstersensor, ZigbeeRauchmelder, ZigbeeBewegungsmelder, ZigbeeWandtaster, ZigbeeDosenrelais, deviceZigbeeSteckdose, deviceZigbeeBewegungsmelder, deviceZigbeeLampeRGB, deviceZigbeeLampeWeiss, deviceZigbeeRauchmelder, deviceZigbeeWandtaster, deviceZigbeeDosenrelais, deviceZigbeeSchalter, deviceZigbeeRepeater, deviceZigbeeFenstersensor } = require('./zigbeeClasses.js');
const { createZigbeeDevice, createZigbeeDosenrelais, createZigbeeLampeRGB, createZigbeeLampeWeiss, createZigbeeSteckdose, loadZigbeeSteckdosen, loadZigbeeBewegungsmelder, loadZigbeeLampenRGB, loadZigbeeLampenWeiss, loadZigbeeRauchmelder, loadZigbeeWandtaster, loadZigbeeDosenrelais, loadZigbeeSchalter, loadZigbeeRepeater, loadZigbeeFenstersensor, loadZigbeeDevicesAll } = require('./zigbeeFunctions.js');
const { sendToPictureGartenToTelegram, sendToPictureSeiteToTelegram, sendToPictureHaustuereToTelegram, sendToPictureDoorbellToTelegram, sendToPictureGarageToTelegram } = require('./camera.js');
const { AlexaInputConverter } = require('./alexa.js');
const { AbstractShelly, ShellyLampeWeiss, ShellyDimmerAlexaScheme, ShellyDimmerTasterScheme, ShellyDimmer, ShellyRGBAlexaScheme, ShellyRGBTasterScheme, ShellyLampeRGB, ShellySteckdose, ShellyRollladen,ShellySensor, deviceShellyLampeWeiss, deviceShellyDimmer, deviceShellyLampeRGB, deviceShellySteckdose, deviceShellyRollladen, deviceShellySensor } = require('./shellyClasses.js');
const { createShellyDevice, createShellySensor, createShellyLampeRGB, createShellyRollladen, createShellyDimmer, createShellyLampe, createShellySteckdose, loadShellyRollladen, loadShellySensoren, loadShellyDimmer, loadShellyLampenWeiss, loadShellySteckdosen, loadShellyDevicesAll } = require('./shellyFunctions.js');

console.log("ddd33333d");

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
    createHomematicDevice, loadHomematicWandthermostate, loadHomematicPraesenzmelder, loadHomematicWetterstationen, loadHomematicDoors, loadHomematicRollladen, loadHomematicWandschalter, loadHomematicFussbodenheizungen, loadHomematicWandtaster, loadHomematicAccessPoints, loadHomematicTemperatursensoren, loadHomematicRauchmelder, loadHomematicFunktschaltaktoren, loadHomematicWindows, loadHomematicSteckdosen, loadHomematicHeizkoerper, loadHomematicDimmer, loadHomematicDevicesAll,

    // zigbeeClasses.ts
    AbstractZigbee, ColorScheme, RGBColorScheme, WhiteColorScheme, ZigbeeLampeRGB, LampeWeissTasterScheme, LampeWeissAlexaScheme, ZigbeeLampeWeiss, ZigbeeSteckdose, ZigbeeSchalter, ZigbeeRepeater, ZigbeeFenstersensor, ZigbeeRauchmelder, ZigbeeBewegungsmelder, ZigbeeWandtaster, ZigbeeDosenrelais,
    deviceZigbeeSteckdose, deviceZigbeeBewegungsmelder, deviceZigbeeLampeRGB, deviceZigbeeLampeWeiss, deviceZigbeeRauchmelder, deviceZigbeeWandtaster, deviceZigbeeDosenrelais, deviceZigbeeSchalter, deviceZigbeeRepeater, deviceZigbeeFenstersensor,
    
    // zigbeeFunctions.ts
    createZigbeeDevice, createZigbeeDosenrelais, createZigbeeLampeRGB, createZigbeeLampeWeiss, createZigbeeSteckdose, loadZigbeeSteckdosen, loadZigbeeBewegungsmelder, loadZigbeeLampenRGB, loadZigbeeLampenWeiss, loadZigbeeRauchmelder, loadZigbeeWandtaster, loadZigbeeDosenrelais, loadZigbeeSchalter, loadZigbeeRepeater, loadZigbeeFenstersensor, loadZigbeeDevicesAll,

    // camera.ts
    sendToPictureGartenToTelegram, sendToPictureSeiteToTelegram, sendToPictureHaustuereToTelegram, sendToPictureDoorbellToTelegram, sendToPictureGarageToTelegram,

    // alexa.ts
    AlexaInputConverter,

    // shellyClasses.ts
    AbstractShelly, ShellyLampeWeiss, ShellyDimmerAlexaScheme, ShellyDimmerTasterScheme, ShellyDimmer, ShellyRGBAlexaScheme, ShellyRGBTasterScheme, ShellyLampeRGB, ShellySteckdose, ShellyRollladen,ShellySensor, deviceShellyLampeWeiss, deviceShellyDimmer, deviceShellyLampeRGB, deviceShellySteckdose, deviceShellyRollladen, deviceShellySensor , 

    // ShellyFunctions.ts
    createShellyDevice, createShellySensor, createShellyLampeRGB, createShellyRollladen, createShellyDimmer, createShellyLampe, createShellySteckdose, loadShellyRollladen, loadShellySensoren, loadShellyDimmer, loadShellyLampenWeiss, loadShellySteckdosen, loadShellyDevicesAll
};