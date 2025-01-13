"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadShellyDevicesAll = exports.loadShellySteckdosen = exports.loadShellyLampenWeiss = exports.loadShellyDimmer = exports.loadShellySensoren = exports.loadShellyRollladen = exports.createShellySteckdose = exports.createShellyLampe = exports.createShellyDimmer = exports.createShellyRollladen = exports.createShellyLampeRGB = exports.createShellySensor = exports.createShellyDevice = void 0;
var _a = require('./shellyClasses.js'), ShellyLampeWeiss = _a.ShellyLampeWeiss, ShellyDimmerAlexaScheme = _a.ShellyDimmerAlexaScheme, ShellyDimmerTasterScheme = _a.ShellyDimmerTasterScheme, ShellyDimmer = _a.ShellyDimmer, ShellyRGBAlexaScheme = _a.ShellyRGBAlexaScheme, ShellyRGBTasterScheme = _a.ShellyRGBTasterScheme, ShellyLampeRGB = _a.ShellyLampeRGB, ShellySteckdose = _a.ShellySteckdose, ShellyRollladen = _a.ShellyRollladen, ShellySensor = _a.ShellySensor, deviceShellyLampeWeiss = _a.deviceShellyLampeWeiss, deviceShellyDimmer = _a.deviceShellyDimmer, deviceShellyLampeRGB = _a.deviceShellyLampeRGB, deviceShellySteckdose = _a.deviceShellySteckdose, deviceShellyRollladen = _a.deviceShellyRollladen, deviceShellySensor = _a.deviceShellySensor;
var attributeRawID = "rawId";
var attributeBaseState = "baseState";
var attributeEtage = "etage";
var attributeRaum = "raum";
var attributeDevice = "device";
var attributeCategory = "category";
// Datenpunkttyp:
var attributeTypeNumber = "number";
var attributeTypeString = "string";
var attributeTypeBoolean = "boolean";
// Alexa:
var attribute_AlexaSmartNamesForOn = "alexaSmartNamesForOn";
var attribute_AlexaActionNamesForOn = "alexaActionNamesForOn";
var attribute_AlexaSmartNamesForOff = "alexaSmartNamesForOff";
var attribute_AlexaActionNamesForOff = "alexaActionNamesForOff";
// Lampen/Steckdosen allgemein:
var attribute_TasterBooleanOn = "tasterBooleanOn";
var attribute_TasterBooleanOff = "tasterBooleanOff";
var attribute_Nachtbeleuchtung = "nachtbeleuchtung";
var attribute_TurnOffExitHouseSummer = "turnOffExitHouseSummer";
var attribute_TurnOffExitHouseWinter = "turnOffExitHouseWinter";
var attribute_TurnOnEnterHouseSummer = "turnOnEnterHouseSummer";
var attribute_TurnOnEnterHouseWinter = "turnOnEnterHouseWinter";
// Scheme Dimmer:
var attributeDimmer_alexaScheme_aktiv = "alexaScheme_aktiv";
var attributeDimmer_alexaScheme_name = "alexaScheme_name";
var attributeDimmer_alexaScheme_level = "alexaScheme_level";
// Scheme Dimmer 1:
var attributeDimmer_alexaScheme_aktiv1 = "alexaScheme1_aktiv";
var attributeDimmer_alexaScheme_name1 = "alexaScheme1_name";
var attributeDimmer_alexaScheme_level1 = "alexaScheme1_level";
// Scheme Dimmer 2:
var attributeDimmer_alexaScheme_aktiv2 = "alexaScheme2_aktiv";
var attributeDimmer_alexaScheme_name2 = "alexaScheme2_name";
var attributeDimmer_alexaScheme_level2 = "alexaScheme2_level";
// Scheme Dimmer 3:
var attributeDimmer_alexaScheme_aktiv3 = "alexaScheme3_aktiv";
var attributeDimmer_alexaScheme_name3 = "alexaScheme3_name";
var attributeDimmer_alexaScheme_level3 = "alexaScheme3_level";
// Scheme Dimmer 4:
var attributeDimmer_alexaScheme_aktiv4 = "alexaScheme4_aktiv";
var attributeDimmer_alexaScheme_name4 = "alexaScheme4_name";
var attributeDimmer_alexaScheme_level4 = "alexaScheme4_level";
// Taster Scheme Dimmer 1:
var attributeDimmer_tasterScheme_aktiv1 = "tasterScheme1_aktiv";
var attributeDimmer_tasterScheme_name1 = "tasterScheme1_name";
var attributeDimmer_tasterScheme_level1 = "tasterScheme1_level";
// Taster Scheme Dimmer 2:
var attributeDimmer_tasterScheme_aktiv2 = "tasterScheme2_aktiv";
var attributeDimmer_tasterScheme_name2 = "tasterScheme2_name";
var attributeDimmer_tasterScheme_level2 = "tasterScheme2_level";
// Taster Scheme Dimmer 3:
var attributeDimmer_tasterScheme_aktiv3 = "tasterScheme3_aktiv";
var attributeDimmer_tasterScheme_name3 = "tasterScheme3_name";
var attributeDimmer_tasterScheme_level3 = "tasterScheme3_level";
// Taster Scheme Dimmer 4:
var attributeDimmer_tasterScheme_aktiv4 = "tasterScheme4_aktiv";
var attributeDimmer_tasterScheme_name4 = "tasterScheme4_name";
var attributeDimmer_tasterScheme_level4 = "tasterScheme4_level";
var attributeChannel = "channel";
function createShellyDevice(adapter, rawId, etage, raum, device, baseState, category) {
    createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRawID, rawId, category);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeCategory, category, category);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeBaseState, baseState, category);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeEtage, etage, category);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRaum, raum, category);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeDevice, device, category);
}
exports.createShellyDevice = createShellyDevice;
function createDatenpunktSingle(adapter, deviceRawId, attributeType, attributeName, attributeValue, category) {
    var stateDatenpunkt = "0_userdata.0.devices.shelly." + category + "." + deviceRawId + "." + attributeName;
    adapter.createState(stateDatenpunkt, attributeValue, {
        name: "S" + deviceRawId.toString().padStart(2, '0'),
        desc: "",
        type: attributeType,
        read: true,
        write: true
    });
}
console.log("test");
// Sensor:
function createShellySensor(adapter, rawId, etage, raum, device, baseState) {
    // Allgemein:
    createShellyDevice(adapter, rawId, etage, raum, device, baseState, deviceShellySensor);
}
exports.createShellySensor = createShellySensor;
// Lampe RGB:
function createShellyLampeRGB(adapter, rawId, etage, raum, device, baseState) {
    // Allgemein:
    createShellyDevice(adapter, rawId, etage, raum, device, baseState, deviceShellyLampeRGB);
}
exports.createShellyLampeRGB = createShellyLampeRGB;
// Rollladen:
function createShellyRollladen(adapter, rawId, etage, raum, device, baseState) {
    // Allgemein:
    createShellyDevice(adapter, rawId, etage, raum, device, baseState, deviceShellyRollladen);
}
exports.createShellyRollladen = createShellyRollladen;
// Dimmer:
function createShellyDimmer(adapter, rawId, etage, raum, device, baseState, alexaSmartNamesForOn, alexaActionNamesForOn, alexaLevelSchemeForOn, alexaSmartNamesForOff, alexaActionNamesForOff, levelScheme1, levelScheme2, levelScheme3, levelScheme4, tasterBooleanOn1, tasterBooleanOn2, tasterBooleanOn3, tasterBooleanOn4, tasterBooleanOff, nachtbeleuchtung, turnOffExitHouseSummer, turnOffExitHouseWinter, turnOnEnterHouseSummer, turnOnEnterHouseWinter) {
    // Allgemein:
    createShellyDevice(adapter, rawId, etage, raum, device, baseState, deviceShellyDimmer);
    // alexaLevelSchemeForOn:  InstanceType<typeof ShellyDimmerAlexaScheme>
    if (alexaLevelSchemeForOn != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_alexaScheme_aktiv, true, deviceShellyDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeDimmer_alexaScheme_name, alexaLevelSchemeForOn.getAlexaName(), deviceShellyDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeDimmer_alexaScheme_level, alexaLevelSchemeForOn.getLevel(), deviceShellyDimmer);
    }
    else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_alexaScheme_aktiv, false, deviceShellyDimmer);
    }
    // levelScheme1:  InstanceType<typeof ShellyDimmerAlexaScheme>
    if (levelScheme1 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_alexaScheme_aktiv1, true, deviceShellyDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeDimmer_alexaScheme_name1, levelScheme1.getAlexaName(), deviceShellyDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeDimmer_alexaScheme_level1, levelScheme1.getLevel(), deviceShellyDimmer);
    }
    else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_alexaScheme_aktiv1, false, deviceShellyDimmer);
    }
    // levelScheme2:  InstanceType<typeof ShellyDimmerAlexaScheme>
    if (levelScheme2 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_alexaScheme_aktiv2, true, deviceShellyDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeDimmer_alexaScheme_name2, levelScheme2.getAlexaName(), deviceShellyDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeDimmer_alexaScheme_level2, levelScheme2.getLevel(), deviceShellyDimmer);
    }
    else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_alexaScheme_aktiv2, false, deviceShellyDimmer);
    }
    // levelScheme3:  InstanceType<typeof ShellyDimmerAlexaScheme>
    if (levelScheme3 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_alexaScheme_aktiv3, true, deviceShellyDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeDimmer_alexaScheme_name3, levelScheme3.getAlexaName(), deviceShellyDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeDimmer_alexaScheme_level3, levelScheme3.getLevel(), deviceShellyDimmer);
    }
    else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_alexaScheme_aktiv3, false, deviceShellyDimmer);
    }
    // levelScheme4:  InstanceType<typeof ShellyDimmerAlexaScheme>
    if (levelScheme4 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_alexaScheme_aktiv4, true, deviceShellyDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeDimmer_alexaScheme_name4, levelScheme4.getAlexaName(), deviceShellyDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeDimmer_alexaScheme_level4, levelScheme4.getLevel(), deviceShellyDimmer);
    }
    else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_alexaScheme_aktiv4, false, deviceShellyDimmer);
    }
    // tasterBooleanOn1: InstanceType<typeof ShellyDimmerTasterScheme>
    if (tasterBooleanOn1 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_tasterScheme_aktiv1, true, deviceShellyDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeDimmer_tasterScheme_name1, tasterBooleanOn1.getTasterBooleanOnName(), deviceShellyDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeDimmer_tasterScheme_level1, tasterBooleanOn1.getLevel(), deviceShellyDimmer);
    }
    else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_tasterScheme_aktiv1, false, deviceShellyDimmer);
    }
    // tasterBooleanOn2: InstanceType<typeof ShellyDimmerTasterScheme>
    if (tasterBooleanOn2 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_tasterScheme_aktiv2, true, deviceShellyDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeDimmer_tasterScheme_name2, tasterBooleanOn1.getTasterBooleanOnName(), deviceShellyDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeDimmer_tasterScheme_level2, tasterBooleanOn1.getLevel(), deviceShellyDimmer);
    }
    else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_tasterScheme_aktiv2, false, deviceShellyDimmer);
    }
    // tasterBooleanOn3: InstanceType<typeof ShellyDimmerTasterScheme>
    if (tasterBooleanOn3 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_tasterScheme_aktiv3, true, deviceShellyDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeDimmer_tasterScheme_name3, tasterBooleanOn1.getTasterBooleanOnName(), deviceShellyDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeDimmer_tasterScheme_level3, tasterBooleanOn1.getLevel(), deviceShellyDimmer);
    }
    else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_tasterScheme_aktiv3, false, deviceShellyDimmer);
    }
    // tasterBooleanOn4: InstanceType<typeof ShellyDimmerTasterScheme>
    if (tasterBooleanOn4 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_tasterScheme_aktiv4, true, deviceShellyDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeDimmer_tasterScheme_name4, tasterBooleanOn1.getTasterBooleanOnName(), deviceShellyDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeDimmer_tasterScheme_level4, tasterBooleanOn1.getLevel(), deviceShellyDimmer);
    }
    else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_tasterScheme_aktiv4, false, deviceShellyDimmer);
    }
    // alexaSmartNamesForOn:string[]
    var db_alexaSmartNamesForOn = null;
    alexaSmartNamesForOn.forEach(function (value) {
        if (db_alexaSmartNamesForOn == null) {
            // @ts-ignore            
            db_alexaSmartNamesForOn = value;
        }
        else {
            // @ts-ignore            
            db_alexaSmartNamesForOn += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaSmartNamesForOn, db_alexaSmartNamesForOn, deviceShellyDimmer);
    // alexaActionNamesForOn:string[]
    var db_alexaActionNamesForOn = null;
    alexaActionNamesForOn.forEach(function (value) {
        if (db_alexaActionNamesForOn == null) {
            // @ts-ignore            
            db_alexaActionNamesForOn = value;
        }
        else {
            // @ts-ignore                        
            db_alexaActionNamesForOn += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaActionNamesForOn, db_alexaActionNamesForOn, deviceShellyDimmer);
    // alexaSmartNamesForOff:string[]
    var db_alexaSmartNamesForOff = null;
    alexaSmartNamesForOff.forEach(function (value) {
        if (db_alexaSmartNamesForOff == null) {
            // @ts-ignore            
            db_alexaSmartNamesForOff = value;
        }
        else {
            // @ts-ignore                        
            db_alexaSmartNamesForOff += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaSmartNamesForOff, db_alexaSmartNamesForOff, deviceShellyDimmer);
    // alexaActionNamesForOff:string[]
    var db_alexaActionNamesForOff = null;
    alexaActionNamesForOff.forEach(function (value) {
        if (db_alexaActionNamesForOff == null) {
            // @ts-ignore                        
            db_alexaActionNamesForOff = value;
        }
        else {
            // @ts-ignore                        
            db_alexaActionNamesForOff += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaActionNamesForOff, db_alexaActionNamesForOff, deviceShellyDimmer);
    // additionalStates4TurnOff: string[]
    var db_additionalStates4TurnOff = null;
    tasterBooleanOff.forEach(function (value) {
        if (db_additionalStates4TurnOff == null) {
            // @ts-ignore                        
            db_additionalStates4TurnOff = value;
        }
        else {
            // @ts-ignore                        
            db_additionalStates4TurnOff += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_TasterBooleanOff, db_additionalStates4TurnOff, deviceShellyDimmer);
    // Weitere:
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_Nachtbeleuchtung, nachtbeleuchtung, deviceShellyDimmer);
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_TurnOffExitHouseSummer, turnOffExitHouseSummer, deviceShellyDimmer);
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_TurnOffExitHouseWinter, turnOffExitHouseWinter, deviceShellyDimmer);
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_TurnOnEnterHouseSummer, turnOnEnterHouseSummer, deviceShellyDimmer);
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_TurnOnEnterHouseWinter, turnOnEnterHouseWinter, deviceShellyDimmer);
}
exports.createShellyDimmer = createShellyDimmer;
// Lampe Weiss:
function createShellyLampe(adapter, rawId, etage, raum, device, baseState, channel, alexaSmartNamesForOn, alexaActionNamesForOn, alexaSmartNamesForOff, alexaActionNamesForOff, additionalStates4TurnOn, additionalStates4TurnOff, nachtbeleuchtung, turnOffExitHouseSummer, turnOffExitHouseWinter, turnOnEnterHouseSummer, turnOnEnterHouseWinter) {
    // Allgemein:
    createShellyDevice(adapter, rawId, etage, raum, device, baseState, deviceShellyLampeWeiss);
    // attributeChannel
    createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeChannel, channel, deviceShellyLampeWeiss);
    // alexaSmartNamesForOn:string[]
    var db_alexaSmartNamesForOn = null;
    alexaSmartNamesForOn.forEach(function (value) {
        if (db_alexaSmartNamesForOn == null) {
            // @ts-ignore            
            db_alexaSmartNamesForOn = value;
        }
        else {
            // @ts-ignore            
            db_alexaSmartNamesForOn += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaSmartNamesForOn, db_alexaSmartNamesForOn, deviceShellyLampeWeiss);
    // alexaActionNamesForOn:string[]
    var db_alexaActionNamesForOn = null;
    alexaActionNamesForOn.forEach(function (value) {
        if (db_alexaActionNamesForOn == null) {
            // @ts-ignore            
            db_alexaActionNamesForOn = value;
        }
        else {
            // @ts-ignore                        
            db_alexaActionNamesForOn += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaActionNamesForOn, db_alexaActionNamesForOn, deviceShellyLampeWeiss);
    // alexaSmartNamesForOff:string[]
    var db_alexaSmartNamesForOff = null;
    alexaSmartNamesForOff.forEach(function (value) {
        if (db_alexaSmartNamesForOff == null) {
            // @ts-ignore            
            db_alexaSmartNamesForOff = value;
        }
        else {
            // @ts-ignore                        
            db_alexaSmartNamesForOff += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaSmartNamesForOff, db_alexaSmartNamesForOff, deviceShellyLampeWeiss);
    // alexaActionNamesForOff:string[]
    var db_alexaActionNamesForOff = null;
    alexaActionNamesForOff.forEach(function (value) {
        if (db_alexaActionNamesForOff == null) {
            // @ts-ignore                        
            db_alexaActionNamesForOff = value;
        }
        else {
            // @ts-ignore                        
            db_alexaActionNamesForOff += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaActionNamesForOff, db_alexaActionNamesForOff, deviceShellyLampeWeiss);
    // additionalStates4TurnOn: string[]
    var db_additionalStates4TurnOn = null;
    additionalStates4TurnOn.forEach(function (value) {
        if (db_additionalStates4TurnOn == null) {
            // @ts-ignore                        
            db_additionalStates4TurnOn = value;
        }
        else {
            // @ts-ignore                        
            db_additionalStates4TurnOn += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_TasterBooleanOn, db_additionalStates4TurnOn, deviceShellyLampeWeiss);
    // additionalStates4TurnOff: string[]
    var db_additionalStates4TurnOff = null;
    additionalStates4TurnOff.forEach(function (value) {
        if (db_additionalStates4TurnOff == null) {
            // @ts-ignore                        
            db_additionalStates4TurnOff = value;
        }
        else {
            // @ts-ignore                        
            db_additionalStates4TurnOff += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_TasterBooleanOff, db_additionalStates4TurnOff, deviceShellyLampeWeiss);
    // Weitere:
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_Nachtbeleuchtung, nachtbeleuchtung, deviceShellyLampeWeiss);
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_TurnOffExitHouseSummer, turnOffExitHouseSummer, deviceShellyLampeWeiss);
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_TurnOffExitHouseWinter, turnOffExitHouseWinter, deviceShellyLampeWeiss);
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_TurnOnEnterHouseSummer, turnOnEnterHouseSummer, deviceShellyLampeWeiss);
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_TurnOnEnterHouseWinter, turnOnEnterHouseWinter, deviceShellyLampeWeiss);
}
exports.createShellyLampe = createShellyLampe;
// Steckdose:
function createShellySteckdose(adapter, rawId, etage, raum, device, baseState, channel, alexaSmartNamesForOn, alexaActionNamesForOn, alexaSmartNamesForOff, alexaActionNamesForOff, additionalStates4TurnOn, additionalStates4TurnOff, nachtbeleuchtung, turnOffExitHouseSummer, turnOffExitHouseWinter, turnOnEnterHouseSummer, turnOnEnterHouseWinter) {
    // Allgemein:
    createShellyDevice(adapter, rawId, etage, raum, device, baseState, deviceShellySteckdose);
    // attributeChannel
    createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeChannel, channel, deviceShellySteckdose);
    // alexaSmartNamesForOn:string[]
    var db_alexaSmartNamesForOn = null;
    alexaSmartNamesForOn.forEach(function (value) {
        if (db_alexaSmartNamesForOn == null) {
            // @ts-ignore            
            db_alexaSmartNamesForOn = value;
        }
        else {
            // @ts-ignore            
            db_alexaSmartNamesForOn += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaSmartNamesForOn, db_alexaSmartNamesForOn, deviceShellySteckdose);
    // alexaActionNamesForOn:string[]
    var db_alexaActionNamesForOn = null;
    alexaActionNamesForOn.forEach(function (value) {
        if (db_alexaActionNamesForOn == null) {
            // @ts-ignore            
            db_alexaActionNamesForOn = value;
        }
        else {
            // @ts-ignore                        
            db_alexaActionNamesForOn += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaActionNamesForOn, db_alexaActionNamesForOn, deviceShellySteckdose);
    // alexaSmartNamesForOff:string[]
    var db_alexaSmartNamesForOff = null;
    alexaSmartNamesForOff.forEach(function (value) {
        if (db_alexaSmartNamesForOff == null) {
            // @ts-ignore            
            db_alexaSmartNamesForOff = value;
        }
        else {
            // @ts-ignore                        
            db_alexaSmartNamesForOff += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaSmartNamesForOff, db_alexaSmartNamesForOff, deviceShellySteckdose);
    // alexaActionNamesForOff:string[]
    var db_alexaActionNamesForOff = null;
    alexaActionNamesForOff.forEach(function (value) {
        if (db_alexaActionNamesForOff == null) {
            // @ts-ignore                        
            db_alexaActionNamesForOff = value;
        }
        else {
            // @ts-ignore                        
            db_alexaActionNamesForOff += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaActionNamesForOff, db_alexaActionNamesForOff, deviceShellySteckdose);
    // additionalStates4TurnOn: string[]
    var db_additionalStates4TurnOn = null;
    additionalStates4TurnOn.forEach(function (value) {
        if (db_additionalStates4TurnOn == null) {
            // @ts-ignore                        
            db_additionalStates4TurnOn = value;
        }
        else {
            // @ts-ignore                        
            db_additionalStates4TurnOn += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_TasterBooleanOn, db_additionalStates4TurnOn, deviceShellySteckdose);
    // additionalStates4TurnOff: string[]
    var db_additionalStates4TurnOff = null;
    additionalStates4TurnOff.forEach(function (value) {
        if (db_additionalStates4TurnOff == null) {
            // @ts-ignore                        
            db_additionalStates4TurnOff = value;
        }
        else {
            // @ts-ignore                        
            db_additionalStates4TurnOff += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_TasterBooleanOff, db_additionalStates4TurnOff, deviceShellySteckdose);
    // Weitere:
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_Nachtbeleuchtung, nachtbeleuchtung, deviceShellySteckdose);
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_TurnOffExitHouseSummer, turnOffExitHouseSummer, deviceShellySteckdose);
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_TurnOffExitHouseWinter, turnOffExitHouseWinter, deviceShellySteckdose);
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_TurnOnEnterHouseSummer, turnOnEnterHouseSummer, deviceShellySteckdose);
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_TurnOnEnterHouseWinter, turnOnEnterHouseWinter, deviceShellySteckdose);
}
exports.createShellySteckdose = createShellySteckdose;
var cacheRollladenArray = null;
function loadShellyRollladen(adapter) {
    if (cacheRollladenArray != null) {
        return cacheRollladenArray;
    }
    // @ts-ignore            
    cacheRollladenArray = [];
    adapter.$('state[id=0_userdata.0.devices.shelly.*.*.category]').each(function (datenpunktKey) {
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceShellyRollladen) {
            // @ts-ignore            
            cacheRollladenArray.push(new ShellyRollladen(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
            adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [1] Etage/Bereich     (z.B. EG)
            adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [2] Raum/Unterbereich (z.B. Wohnzimmer)
            adapter.getState(datenpunktPraefix + "." + attributeDevice).val, // [3] Device            (z.B. Stehlampe)            
            adapter.getState(datenpunktPraefix + "." + attributeBaseState).val // [4] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)                
            ));
        }
    });
    cacheRollladenArray = sortArray(cacheRollladenArray);
    return cacheRollladenArray;
}
exports.loadShellyRollladen = loadShellyRollladen;
var cacheSensorenArray = null;
function loadShellySensoren(adapter) {
    if (cacheSensorenArray != null) {
        return cacheSensorenArray;
    }
    // @ts-ignore            
    cacheSensorenArray = [];
    adapter.$('state[id=0_userdata.0.devices.shelly.*.*.category]').each(function (datenpunktKey) {
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceShellySensor) {
            // @ts-ignore            
            cacheSensorenArray.push(new ShellySensor(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
            adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [1] Etage/Bereich     (z.B. EG)
            adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [2] Raum/Unterbereich (z.B. Wohnzimmer)
            adapter.getState(datenpunktPraefix + "." + attributeDevice).val, // [3] Device            (z.B. Stehlampe)            
            adapter.getState(datenpunktPraefix + "." + attributeBaseState).val // [4] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)                
            ));
        }
    });
    cacheSensorenArray = sortArray(cacheSensorenArray);
    return cacheSensorenArray;
}
exports.loadShellySensoren = loadShellySensoren;
/*var cacheLampenRGBArray = null;
export function loadShellyLampenRGB(adapter: any) {
    if (cacheLampenRGBArray != null) {
        return cacheLampenRGBArray;
    }
    // @ts-ignore
    cacheLampenRGBArray = [];
    adapter.$('state[id=0_userdata.0.devices.shelly.*.*.category]').each(datenpunktKey => {
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceShellyLampeRGB) {
            // @ts-ignore
            cacheLampenRGBArray.push(new ShellySensor(adapter,
                adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [1] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [2] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val,     // [3] Device            (z.B. Stehlampe)
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val // [4] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
            ));
        }
    });
    return cacheLampenRGBArray;
}*/
var cacheDimmerArray = null;
function loadShellyDimmer(adapter) {
    adapter.log("loadShelly Modul inside");
    if (cacheDimmerArray != null) {
        adapter.log("loadShelly Modul inside_b_ääääääääääääääääää" + cacheDimmerArray);
        return cacheDimmerArray;
    }
    adapter.log("loadShelly Modul inside_b");
    // @ts-ignore            
    cacheDimmerArray = [];
    adapter.$('state[id=0_userdata.0.devices.shelly.*.*.category]').each(function (datenpunktKey) {
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceShellyDimmer) {
            adapter.log("loadShelly Modul inside_c" + datenpunktKey);
            // Einschalt-Scheme:
            var alexaOnScheme = null;
            if (adapter.getState(datenpunktPraefix + "." + attributeDimmer_alexaScheme_aktiv).val == true) {
                // @ts-ignore                                                
                alexaOnScheme = new ShellyDimmerAlexaScheme(null, adapter.getState(datenpunktPraefix + "." + attributeDimmer_alexaScheme_level).val);
            }
            // Weitere Schemes als Array:
            var schemeArray = [];
            // alexaScheme1: InstanceType<typeof ShellyDimmerAlexaScheme>
            if (adapter.getState(datenpunktPraefix + "." + attributeDimmer_alexaScheme_aktiv1).val == true) {
                // @ts-ignore                                                                    
                schemeArray.push(new ShellyDimmerAlexaScheme(adapter.getState(datenpunktPraefix + "." + attributeDimmer_alexaScheme_name1).val, adapter.getState(datenpunktPraefix + "." + attributeDimmer_alexaScheme_level1).val));
            }
            // alexaScheme2: InstanceType<typeof ShellyDimmerAlexaScheme>
            if (adapter.getState(datenpunktPraefix + "." + attributeDimmer_alexaScheme_aktiv2).val == true) {
                // @ts-ignore                                                                    
                schemeArray.push(new ShellyDimmerAlexaScheme(adapter.getState(datenpunktPraefix + "." + attributeDimmer_alexaScheme_name2).val, adapter.getState(datenpunktPraefix + "." + attributeDimmer_alexaScheme_level2).val));
            }
            // alexaScheme3: InstanceType<typeof ShellyDimmerAlexaScheme>
            if (adapter.getState(datenpunktPraefix + "." + attributeDimmer_alexaScheme_aktiv3).val == true) {
                // @ts-ignore                                                                    
                schemeArray.push(new ShellyDimmerAlexaScheme(adapter.getState(datenpunktPraefix + "." + attributeDimmer_alexaScheme_name3).val, adapter.getState(datenpunktPraefix + "." + attributeDimmer_alexaScheme_level3).val));
            }
            // alexaScheme4: InstanceType<typeof ShellyDimmerAlexaScheme>
            if (adapter.getState(datenpunktPraefix + "." + attributeDimmer_alexaScheme_aktiv4).val == true) {
                // @ts-ignore                                                                    
                schemeArray.push(new ShellyDimmerAlexaScheme(adapter.getState(datenpunktPraefix + "." + attributeDimmer_alexaScheme_name4).val, adapter.getState(datenpunktPraefix + "." + attributeDimmer_alexaScheme_level4).val));
            }
            // Weitere Schemes als Array:
            var tasterSchemeArray = [];
            // tasterScheme1: InstanceType<typeof ShellyDimmerTasterScheme>
            if (adapter.getState(datenpunktPraefix + "." + attributeDimmer_tasterScheme_aktiv1).val == true) {
                // @ts-ignore                                                                    
                tasterSchemeArray.push(new ShellyDimmerTasterScheme(adapter.getState(datenpunktPraefix + "." + attributeDimmer_tasterScheme_name1).val, adapter.getState(datenpunktPraefix + "." + attributeDimmer_tasterScheme_level1).val));
            }
            // tasterScheme2: InstanceType<typeof ShellyDimmerTasterScheme>
            if (adapter.getState(datenpunktPraefix + "." + attributeDimmer_tasterScheme_aktiv2).val == true) {
                // @ts-ignore                                                                    
                tasterSchemeArray.push(new ShellyDimmerTasterScheme(adapter.getState(datenpunktPraefix + "." + attributeDimmer_tasterScheme_name2).val, adapter.getState(datenpunktPraefix + "." + attributeDimmer_tasterScheme_level2).val));
            }
            // tasterScheme3: InstanceType<typeof ShellyDimmerTasterScheme>
            if (adapter.getState(datenpunktPraefix + "." + attributeDimmer_tasterScheme_aktiv3).val == true) {
                // @ts-ignore                                                                    
                tasterSchemeArray.push(new ShellyDimmerTasterScheme(adapter.getState(datenpunktPraefix + "." + attributeDimmer_tasterScheme_name3).val, adapter.getState(datenpunktPraefix + "." + attributeDimmer_tasterScheme_level3).val));
            }
            // tasterScheme4: InstanceType<typeof ShellyDimmerTasterScheme>
            if (adapter.getState(datenpunktPraefix + "." + attributeDimmer_tasterScheme_aktiv4).val == true) {
                // @ts-ignore                                                                    
                tasterSchemeArray.push(new ShellyDimmerTasterScheme(adapter.getState(datenpunktPraefix + "." + attributeDimmer_tasterScheme_name4).val, adapter.getState(datenpunktPraefix + "." + attributeDimmer_tasterScheme_level4).val));
            }
            // @ts-ignore            
            cacheDimmerArray.push(new ShellyDimmer(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
            adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [1] Etage/Bereich     (z.B. EG)
            adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [2] Raum/Unterbereich (z.B. Wohnzimmer)
            adapter.getState(datenpunktPraefix + "." + attributeDevice).val, // [3] Device            (z.B. Stehlampe)            
            adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [4] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)  
            toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_AlexaSmartNamesForOn).val), // 08 Alexa-Ein     
            toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_AlexaActionNamesForOn).val), // Alexa-Action-Ein, z.B. "Guten morgen" (Würde auch funktionieren, wenn dies bei [06] eingetragen ist)                                                                         
            alexaOnScheme, // 08] A.-Ein-Schem
            toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_AlexaSmartNamesForOff).val), // 09 Alexa-Aus
            toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_AlexaActionNamesForOff).val), // [10] Alexa-Action Aus, z.B. "Gute Nacht". Wir müssen hier zu [09] unterscheiden, da wir über "Gute Nacht" und isActionTurnedOn=true informiert werden.        
            schemeArray, //   [11] Alexa-Schemes
            tasterSchemeArray, // [12 Level-Schemes]
            toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_TasterBooleanOff).val), // 14 TasterBoolOff
            adapter.getState(datenpunktPraefix + "." + attribute_Nachtbeleuchtung).val, // Gehört zur Nachtbeleuchtung ja/nein
            adapter.getState(datenpunktPraefix + "." + attribute_TurnOffExitHouseSummer).val, // turnOffExitHouseSummer (Ausschalten, wenn Haus verlassen - Sommer)
            adapter.getState(datenpunktPraefix + "." + attribute_TurnOffExitHouseWinter).val, // turnOffExitHouseWinter (Ausschalten, wenn Haus verlassen - Winter)
            adapter.getState(datenpunktPraefix + "." + attribute_TurnOnEnterHouseSummer).val, // turnOnEnterHouseSummer (Einschalten, wenn Haus betreten - Sommer)
            adapter.getState(datenpunktPraefix + "." + attribute_TurnOnEnterHouseWinter).val // turnOnEnterHouseWinter (Einschalten, wenn Haus betreten - Winter)                
            ));
        }
    });
    cacheDimmerArray = sortArray(cacheDimmerArray);
    return cacheDimmerArray;
}
exports.loadShellyDimmer = loadShellyDimmer;
var cacheLampenWeissArray = null;
function loadShellyLampenWeiss(adapter) {
    if (cacheLampenWeissArray != null) {
        return cacheLampenWeissArray;
    }
    // @ts-ignore            
    cacheLampenWeissArray = [];
    adapter.$('state[id=0_userdata.0.devices.shelly.*.*.category]').each(function (datenpunktKey) {
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceShellyLampeWeiss) {
            // @ts-ignore            
            cacheLampenWeissArray.push(new ShellyLampeWeiss(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
            adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [1] Etage/Bereich     (z.B. EG)
            adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [2] Raum/Unterbereich (z.B. Wohnzimmer)
            adapter.getState(datenpunktPraefix + "." + attributeDevice).val, // [3] Device            (z.B. Stehlampe)            
            adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [4] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)  
            adapter.getState(datenpunktPraefix + "." + attributeChannel).val, // [4] Channel                
            toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_AlexaSmartNamesForOn).val), // 08 Alexa-Ein     
            toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_AlexaActionNamesForOn).val), // Alexa-Action-Ein, z.B. "Guten morgen" (Würde auch funktionieren, wenn dies bei [06] eingetragen ist)                                                                         
            toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_AlexaSmartNamesForOff).val), // 09 Alexa-Aus
            toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_AlexaActionNamesForOff).val), // [10] Alexa-Action Aus, z.B. "Gute Nacht". Wir müssen hier zu [09] unterscheiden, da wir über "Gute Nacht" und isActionTurnedOn=true informiert werden.        
            toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_TasterBooleanOn).val), // 14 TasterBoolOn
            toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_TasterBooleanOff).val), // 14 TasterBoolOff
            adapter.getState(datenpunktPraefix + "." + attribute_Nachtbeleuchtung).val, // Gehört zur Nachtbeleuchtung ja/nein
            adapter.getState(datenpunktPraefix + "." + attribute_TurnOffExitHouseSummer).val, // turnOffExitHouseSummer (Ausschalten, wenn Haus verlassen - Sommer)
            adapter.getState(datenpunktPraefix + "." + attribute_TurnOffExitHouseWinter).val, // turnOffExitHouseWinter (Ausschalten, wenn Haus verlassen - Winter)
            adapter.getState(datenpunktPraefix + "." + attribute_TurnOnEnterHouseSummer).val, // turnOnEnterHouseSummer (Einschalten, wenn Haus betreten - Sommer)
            adapter.getState(datenpunktPraefix + "." + attribute_TurnOnEnterHouseWinter).val // turnOnEnterHouseWinter (Einschalten, wenn Haus betreten - Winter)                
            ));
        }
    });
    cacheLampenWeissArray = sortArray(cacheLampenWeissArray);
    return cacheLampenWeissArray;
}
exports.loadShellyLampenWeiss = loadShellyLampenWeiss;
var cacheSteckdosenArray = null;
function loadShellySteckdosen(adapter) {
    if (cacheSteckdosenArray != null) {
        return cacheSteckdosenArray;
    }
    // @ts-ignore            
    cacheSteckdosenArray = [];
    adapter.$('state[id=0_userdata.0.devices.shelly.*.*.category]').each(function (datenpunktKey) {
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceShellySteckdose) {
            // @ts-ignore            
            cacheSteckdosenArray.push(new ShellySteckdose(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
            adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [1] Etage/Bereich     (z.B. EG)
            adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [2] Raum/Unterbereich (z.B. Wohnzimmer)
            adapter.getState(datenpunktPraefix + "." + attributeDevice).val, // [3] Device            (z.B. Stehlampe)            
            adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [4] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)  
            adapter.getState(datenpunktPraefix + "." + attributeChannel).val, // [4] Channel                                
            toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_AlexaSmartNamesForOn).val), // 08 Alexa-Ein     
            toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_AlexaActionNamesForOn).val), // Alexa-Action-Ein, z.B. "Guten morgen" (Würde auch funktionieren, wenn dies bei [06] eingetragen ist)                                                                         
            toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_AlexaSmartNamesForOff).val), // 09 Alexa-Aus
            toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_AlexaActionNamesForOff).val), // [10] Alexa-Action Aus, z.B. "Gute Nacht". Wir müssen hier zu [09] unterscheiden, da wir über "Gute Nacht" und isActionTurnedOn=true informiert werden.        
            toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_TasterBooleanOn).val), // 14 TasterBoolOn
            toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_TasterBooleanOff).val), // 14 TasterBoolOff
            adapter.getState(datenpunktPraefix + "." + attribute_Nachtbeleuchtung).val, // Gehört zur Nachtbeleuchtung ja/nein
            adapter.getState(datenpunktPraefix + "." + attribute_TurnOffExitHouseSummer).val, // turnOffExitHouseSummer (Ausschalten, wenn Haus verlassen - Sommer)
            adapter.getState(datenpunktPraefix + "." + attribute_TurnOffExitHouseWinter).val, // turnOffExitHouseWinter (Ausschalten, wenn Haus verlassen - Winter)
            adapter.getState(datenpunktPraefix + "." + attribute_TurnOnEnterHouseSummer).val, // turnOnEnterHouseSummer (Einschalten, wenn Haus betreten - Sommer)
            adapter.getState(datenpunktPraefix + "." + attribute_TurnOnEnterHouseWinter).val // turnOnEnterHouseWinter (Einschalten, wenn Haus betreten - Winter)                
            ));
        }
    });
    cacheSteckdosenArray = sortArray(cacheSteckdosenArray);
    return cacheSteckdosenArray;
}
exports.loadShellySteckdosen = loadShellySteckdosen;
var shellyAllArray = null;
function loadShellyDevicesAll(adapter) {
    if (shellyAllArray != null) {
        return shellyAllArray;
    }
    // @ts-ignore            
    shellyAllArray = [];
    adapter.loadShellyLampenWeiss(adapter).forEach(function (shelly) {
        // @ts-ignore            
        shellyAllArray.push(shelly);
    });
    adapter.loadShellyDimmer(adapter).forEach(function (shelly) {
        // @ts-ignore                    
        shellyAllArray.push(shelly);
    });
    adapter.loadShellyRollladen(adapter).forEach(function (shelly) {
        // @ts-ignore                    
        shellyAllArray.push(shelly);
    });
    adapter.loadShellySensoren(adapter).forEach(function (shelly) {
        // @ts-ignore                    
        shellyAllArray.push(shelly);
    });
    adapter.loadShellySteckdosen(adapter).forEach(function (shelly) {
        // @ts-ignore                    
        shellyAllArray.push(shelly);
    });
    shellyAllArray = sortArray(shellyAllArray);
    return shellyAllArray;
}
exports.loadShellyDevicesAll = loadShellyDevicesAll;
function toStringArray(databaseValue) {
    var stringArray = [];
    if (databaseValue == null) {
        return stringArray;
    }
    else {
        return databaseValue.split('|');
    }
}
function clearShellyCaches(adapter) {
    shellyAllArray = null;
    cacheSteckdosenArray = null;
    cacheLampenWeissArray = null;
    cacheDimmerArray = null;
    cacheSensorenArray = null;
    cacheRollladenArray = null;
    adapter.log(">>> Shelly cache cleared!! <<<");
}
function sortArray(inputArray) {
    inputArray.sort(function (a, b) {
        var elementA = a;
        var elementB = b;
        var etageA = elementA.getEtage();
        var etageB = elementB.getEtage();
        var compareEtage = getEtageSortIndex(etageA).localeCompare(getEtageSortIndex(etageB));
        if (compareEtage != 0) {
            return compareEtage;
        }
        var typA = elementA.getCategory();
        var typB = elementB.getCategory();
        var compareTyp = typA.localeCompare(typB);
        if (compareTyp != 0) {
            return compareTyp;
        }
        var raumA = elementA.getRaum();
        var raumB = elementB.getRaum();
        var compareRaum = raumA.localeCompare(raumB);
        if (compareRaum != 0) {
            return compareRaum;
        }
        var deviceA = elementA.getDevice();
        var deviceB = elementB.getDevice();
        var compareDevice = deviceA.localeCompare(deviceB);
        if (compareDevice != 0) {
            return compareDevice;
        }
        return 0;
    });
    return inputArray;
}
function getEtageSortIndex(etage) {
    if (etage == "OG") {
        return "a";
    }
    else if (etage == "EG") {
        return "b";
    }
    else if (etage == "UG") {
        return "c";
    }
    else {
        return "d";
    }
}
module.exports = { createShellyDevice: createShellyDevice, createShellySensor: createShellySensor, createShellyLampeRGB: createShellyLampeRGB, createShellyRollladen: createShellyRollladen, createShellyDimmer: createShellyDimmer, createShellyLampe: createShellyLampe, createShellySteckdose: createShellySteckdose, loadShellyRollladen: loadShellyRollladen, loadShellySensoren: loadShellySensoren, loadShellyDimmer: loadShellyDimmer, loadShellyLampenWeiss: loadShellyLampenWeiss, loadShellySteckdosen: loadShellySteckdosen, loadShellyDevicesAll: loadShellyDevicesAll, clearShellyCaches: clearShellyCaches };
