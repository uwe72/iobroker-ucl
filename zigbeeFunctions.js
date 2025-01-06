"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getZigbeeDevicesAll = exports.getZigbeeDevices = exports.createLampeRGB = exports.createLampeWeiss = exports.createSteckdose = exports.createZigbeeDevice = void 0;
var _a = require('./zigbeeClasses.js'), AbstractZigbee = _a.AbstractZigbee, ColorScheme = _a.ColorScheme, RGBColorScheme = _a.RGBColorScheme, WhiteColorScheme = _a.WhiteColorScheme, ZigbeeLampeRGB = _a.ZigbeeLampeRGB, LampeWeissTasterScheme = _a.LampeWeissTasterScheme, LampeWeissAlexaScheme = _a.LampeWeissAlexaScheme, ZigbeeLampeWeiss = _a.ZigbeeLampeWeiss, ZigbeeSteckdose = _a.ZigbeeSteckdose, ZigbeeSchalter = _a.ZigbeeSchalter, ZigbeeRepeater = _a.ZigbeeRepeater, ZigbeeFenstersensor = _a.ZigbeeFenstersensor, ZigbeeRauchmelder = _a.ZigbeeRauchmelder, ZigbeeBewegungsmelder = _a.ZigbeeBewegungsmelder, ZigbeeWandtaster = _a.ZigbeeWandtaster, ZigbeeDosenrelais = _a.ZigbeeDosenrelais, AlexaInputConverter = _a.AlexaInputConverter, deviceZigbeeSteckdose = _a.deviceZigbeeSteckdose, deviceZigbeeBewegungsmelder = _a.deviceZigbeeBewegungsmelder, deviceZigbeeLampeRGB = _a.deviceZigbeeLampeRGB, deviceZigbeeLampeWeiss = _a.deviceZigbeeLampeWeiss, deviceZigbeeRauchmelder = _a.deviceZigbeeRauchmelder, deviceZigbeeWandtaster = _a.deviceZigbeeWandtaster, deviceZigbeeDosenrelais = _a.deviceZigbeeDosenrelais, deviceZigbeeSchalter = _a.deviceZigbeeSchalter, deviceZigbeeRepeater = _a.deviceZigbeeRepeater, deviceZigbeeFenstersensor = _a.deviceZigbeeFenstersensor;
// Alexa:
var attribute_AlexaSmartNamesForOn = "alexaSmartNamesForOn";
var attribute_AlexaActionNamesForOn = "alexaActionNamesForOn";
var attribute_AlexaSmartNamesForOff = "alexaSmartNamesForOff";
var attribute_AlexaActionNamesForOff = "alexaActionNamesForOff";
// Lampe Weiss spezifisch:
var attributeLampeWeissGroup = "group";
var attributeLampWeiss_AlexaColorSchemeForOn_Weiss_aktiv = "alexaColorSchemeForOn_Weiss_aktiv";
var attributeLampWeiss_AlexaColorSchemeForOn_Weiss_level = "alexaColorSchemeForOn_Weiss_level";
var attributeLampWeiss_AlexaColorSchemeForOn_Weiss_ct = "alexaColorSchemeForOn_Weiss_ct";
var attributeLampWeiss_ColorSchemes_Weiss1_aktiv = "alexaColorSchemeForOn_Weiss1_aktiv";
var attributeLampWeiss_ColorSchemes_Weiss1_name = "alexaColorSchemeForOn_Weiss1_name";
var attributeLampWeiss_ColorSchemes_Weiss1_level = "alexaColorSchemeForOn_Weiss1_level";
var attributeLampWeiss_ColorSchemes_Weiss1_ct = "alexaColorSchemeForOn_Weiss1_ct";
var attributeLampWeiss_ColorSchemes_Weiss2_aktiv = "alexaColorSchemeForOn_Weiss2_aktiv";
var attributeLampWeiss_ColorSchemes_Weiss2_name = "alexaColorSchemeForOn_Weiss2_name";
var attributeLampWeiss_ColorSchemes_Weiss2_level = "alexaColorSchemeForOn_Weiss2_level";
var attributeLampWeiss_ColorSchemes_Weiss2_ct = "alexaColorSchemeForOn_Weiss2_ct";
var attributeLampWeiss_ColorSchemes_Weiss3_aktiv = "alexaColorSchemeForOn_Weiss3_aktiv";
var attributeLampWeiss_ColorSchemes_Weiss3_name = "alexaColorSchemeForOn_Weiss3_name";
var attributeLampWeiss_ColorSchemes_Weiss3_level = "alexaColorSchemeForOn_Weiss3_level";
var attributeLampWeiss_ColorSchemes_Weiss3_ct = "alexaColorSchemeForOn_Weiss3_ct";
var attributeLampWeiss_ColorSchemes_Weiss4_aktiv = "alexaColorSchemeForOn_Weiss4_aktiv";
var attributeLampWeiss_ColorSchemes_Weiss4_name = "alexaColorSchemeForOn_Weiss4_name";
var attributeLampWeiss_ColorSchemes_Weiss4_level = "alexaColorSchemeForOn_Weiss4_level";
var attributeLampWeiss_ColorSchemes_Weiss4_ct = "alexaColorSchemeForOn_Weiss4_ct";
var attributeLampWeiss_tasterBoolOn1_aktiv = "tasterBoolOn1_aktiv";
var attributeLampWeiss_tasterBoolOn1_name = "tasterBoolOn1_name";
var attributeLampWeiss_tasterBoolOn1_level = "tasterBoolOn1_level";
var attributeLampWeiss_tasterBoolOn1_ct = "tasterBoolOn1_ct";
var attributeLampWeiss_tasterBoolOn2_aktiv = "tasterBoolOn2_aktiv";
var attributeLampWeiss_tasterBoolOn2_name = "tasterBoolOn2_name";
var attributeLampWeiss_tasterBoolOn2_level = "tasterBoolOn2_level";
var attributeLampWeiss_tasterBoolOn2_ct = "tasterBoolOn2_ct";
var attributeLampWeiss_tasterBoolOn3_aktiv = "tasterBoolOn3_aktiv";
var attributeLampWeiss_tasterBoolOn3_name = "tasterBoolOn3_name";
var attributeLampWeiss_tasterBoolOn3_level = "tasterBoolOn3_level";
var attributeLampWeiss_tasterBoolOn3_ct = "tasterBoolOn3_ct";
var attributeLampWeiss_tasterBoolOn4_aktiv = "tasterBoolOn4_aktiv";
var attributeLampWeiss_tasterBoolOn4_name = "tasterBoolOn4_name";
var attributeLampWeiss_tasterBoolOn4_level = "tasterBoolOn4_level";
var attributeLampWeiss_tasterBoolOn4_ct = "tasterBoolOn4_ct";
// LampeRGB spezifisch:
var attributeRGBLamp_Group = "group";
var attributeRGBLamp_Groupmembers = "groupMembers";
var attributeRGBLamp_AlexaColorSchemeForOn_Farbe_aktiv = "alexaColorSchemeForOn_Farbe_aktiv";
var attributeRGBLamp_AlexaColorSchemeForOn_Farbe_level = "alexaColorSchemeForOn_Farbe_level";
var attributeRGBLamp_AlexaColorSchemeForOn_Farbe_hue = "alexaColorSchemeForOn_Farbe_hue";
var attributeRGBLamp_AlexaColorSchemeForOn_Farbe_sat = "alexaColorSchemeForOn_Farbe_sat";
var attributeRGBLamp_AlexaColorSchemeForOn_Weiss_aktiv = "alexaColorSchemeForOn_Weiss_aktiv";
var attributeRGBLamp_AlexaColorSchemeForOn_Weiss_level = "alexaColorSchemeForOn_Weiss_level";
var attributeRGBLamp_AlexaColorSchemeForOn_Weiss_ct = "alexaColorSchemeForOn_Weiss_ct";
var attributeRGBLamp_ColorSchemes_Farbe1_aktiv = "alexaColorSchemeForOn_Farbe1_aktiv";
var attributeRGBLamp_ColorSchemes_Farbe1_name = "alexaColorSchemeForOn_Farbe1_name";
var attributeRGBLamp_ColorSchemes_Farbe1_level = "alexaColorSchemeForOn_Farbe1_level";
var attributeRGBLamp_ColorSchemes_Farbe1_hue = "alexaColorSchemeForOn_Farbe1_hue";
var attributeRGBLamp_ColorSchemes_Farbe1_sat = "alexaColorSchemeForOn_Farbe1_sat";
var attributeRGBLamp_ColorSchemes_Farbe2_aktiv = "alexaColorSchemeForOn_Farbe2_aktiv";
var attributeRGBLamp_ColorSchemes_Farbe2_name = "alexaColorSchemeForOn_Farbe2_name";
var attributeRGBLamp_ColorSchemes_Farbe2_level = "alexaColorSchemeForOn_Farbe2_level";
var attributeRGBLamp_ColorSchemes_Farbe2_hue = "alexaColorSchemeForOn_Farbe2_hue";
var attributeRGBLamp_ColorSchemes_Farbe2_sat = "alexaColorSchemeForOn_Farbe2_sat";
var attributeRGBLamp_ColorSchemes_Farbe3_aktiv = "alexaColorSchemeForOn_Farbe3_aktiv";
var attributeRGBLamp_ColorSchemes_Farbe3_name = "alexaColorSchemeForOn_Farbe3_name";
var attributeRGBLamp_ColorSchemes_Farbe3_level = "alexaColorSchemeForOn_Farbe3_level";
var attributeRGBLamp_ColorSchemes_Farbe3_hue = "alexaColorSchemeForOn_Farbe3_hue";
var attributeRGBLamp_ColorSchemes_Farbe3_sat = "alexaColorSchemeForOn_Farbe3_sat";
var attributeRGBLamp_ColorSchemes_Farbe4_aktiv = "alexaColorSchemeForOn_Farbe4_aktiv";
var attributeRGBLamp_ColorSchemes_Farbe4_name = "alexaColorSchemeForOn_Farbe4_name";
var attributeRGBLamp_ColorSchemes_Farbe4_level = "alexaColorSchemeForOn_Farbe4_level";
var attributeRGBLamp_ColorSchemes_Farbe4_hue = "alexaColorSchemeForOn_Farbe4_hue";
var attributeRGBLamp_ColorSchemes_Farbe4_sat = "alexaColorSchemeForOn_Farbe4_sat";
var attributeRGBLamp_ColorSchemes_Weiss1_aktiv = "alexaColorSchemeForOn_Weiss1_aktiv";
var attributeRGBLamp_ColorSchemes_Weiss1_name = "alexaColorSchemeForOn_Weiss1_name";
var attributeRGBLamp_ColorSchemes_Weiss1_level = "alexaColorSchemeForOn_Weiss1_level";
var attributeRGBLamp_ColorSchemes_Weiss1_ct = "alexaColorSchemeForOn_Weiss1_ct";
var attributeRGBLamp_ColorSchemes_Weiss2_aktiv = "alexaColorSchemeForOn_Weiss2_aktiv";
var attributeRGBLamp_ColorSchemes_Weiss2_name = "alexaColorSchemeForOn_Weiss2_name";
var attributeRGBLamp_ColorSchemes_Weiss2_level = "alexaColorSchemeForOn_Weiss2_level";
var attributeRGBLamp_ColorSchemes_Weiss2_ct = "alexaColorSchemeForOn_Weiss2_ct";
var attributeRGBLamp_ColorSchemes_Weiss3_aktiv = "alexaColorSchemeForOn_Weiss3_aktiv";
var attributeRGBLamp_ColorSchemes_Weiss3_name = "alexaColorSchemeForOn_Weiss3_name";
var attributeRGBLamp_ColorSchemes_Weiss3_level = "alexaColorSchemeForOn_Weiss3_level";
var attributeRGBLamp_ColorSchemes_Weiss3_ct = "alexaColorSchemeForOn_Weiss3_ct";
var attributeRGBLamp_ColorSchemes_Weiss4_aktiv = "alexaColorSchemeForOn_Weiss4_aktiv";
var attributeRGBLamp_ColorSchemes_Weiss4_name = "alexaColorSchemeForOn_Weiss4_name";
var attributeRGBLamp_ColorSchemes_Weiss4_level = "alexaColorSchemeForOn_Weiss4_level";
var attributeRGBLamp_ColorSchemes_Weiss4_ct = "alexaColorSchemeForOn_Weiss4_ct";
// Lampen/Steckdosen allgemein:
var attribute_TasterBooleanOn = "tasterBooleanOn";
var attribute_TasterBooleanOff = "tasterBooleanOff";
var attribute_Nachtbeleuchtung = "nachtbeleuchtung";
var attribute_TurnOffExitHouseSummer = "turnOffExitHouseSummer";
var attribute_TurnOffExitHouseWinter = "turnOffExitHouseWinter";
var attribute_TurnOnEnterHouseSummer = "turnOnEnterHouseSummer";
var attribute_TurnOnEnterHouseWinter = "turnOnEnterHouseWinter";
// Datenpunkttyp:
var attributeTypeNumber = "number";
var attributeTypeString = "string";
var attributeTypeBoolean = "boolean";
// Allgemein:
var attributeRawID = "rawId";
var attributeBaseState = "baseState";
var attributeEtage = "etage";
var attributeRaum = "raum";
var attributeDevice = "device";
var attributeCategory = "category";
// Standarddevices, ohne zusätzliche Attribute:
function createZigbeeDevice(adapter, rawId, baseState, etage, raum, device, category) {
    createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRawID, rawId);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeCategory, category);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeBaseState, baseState);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeEtage, etage);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRaum, raum);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeDevice, device);
}
exports.createZigbeeDevice = createZigbeeDevice;
// Steckdose:
function createSteckdose(adapter, rawId, baseState, etage, raum, device, alexaSmartNamesForOn, alexaActionNamesForOn, alexaSmartNamesForOff, alexaActionNamesForOff, additionalStates4TurnOn, additionalStates4TurnOff) {
    // Allgemein:
    createZigbeeDevice(adapter, rawId, baseState, etage, raum, device, deviceZigbeeSteckdose);
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
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaSmartNamesForOn, db_alexaSmartNamesForOn);
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
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaActionNamesForOn, db_alexaActionNamesForOn);
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
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaSmartNamesForOff, db_alexaSmartNamesForOff);
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
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaActionNamesForOff, db_alexaActionNamesForOff);
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
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_TasterBooleanOn, db_additionalStates4TurnOn);
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
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_TasterBooleanOff, db_additionalStates4TurnOff);
}
exports.createSteckdose = createSteckdose;
// LampeWeiss:
function createLampeWeiss(adapter, rawId, baseState, etage, raum, device, alexaSmartNamesForOn, alexaActionNamesForOn, alexaLevelSchemeForOn, alexaSmartNamesForOff, alexaActionNamesForOff, colorSchemesWeiss1, colorSchemesWeiss2, colorSchemesWeiss3, colorSchemesWeiss4, isGroup, tasterBooleanOn1, tasterBooleanOn2, tasterBooleanOn3, tasterBooleanOn4, tasterBooleanOff, nachtbeleuchtung, turnOffExitHouseSummer, turnOffExitHouseWinter, turnOnEnterHouseSummer, turnOnEnterHouseWinter) {
    // Allgemein:
    createZigbeeDevice(adapter, rawId, baseState, etage, raum, device, deviceZigbeeLampeWeiss);
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
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaSmartNamesForOn, db_alexaSmartNamesForOn);
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
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaActionNamesForOn, db_alexaActionNamesForOn);
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
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaSmartNamesForOff, db_alexaSmartNamesForOff);
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
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaActionNamesForOff, db_alexaActionNamesForOff);
    // tasterBooleanOn1 : LampeWeissTasterScheme
    if (tasterBooleanOn1 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeLampWeiss_tasterBoolOn1_aktiv, true);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeLampWeiss_tasterBoolOn1_name, tasterBooleanOn1.getTasterBooleanOnName());
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_tasterBoolOn1_level, tasterBooleanOn1.getLevel());
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_tasterBoolOn1_ct, tasterBooleanOn1.getCt());
    }
    else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeLampWeiss_tasterBoolOn1_aktiv, false);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeLampWeiss_tasterBoolOn1_name, null);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_tasterBoolOn1_level, null);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_tasterBoolOn1_ct, null);
    }
    // tasterBooleanOn2 : LampeWeissTasterScheme
    if (tasterBooleanOn2 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeLampWeiss_tasterBoolOn2_aktiv, true);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeLampWeiss_tasterBoolOn2_name, tasterBooleanOn2.getTasterBooleanOnName());
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_tasterBoolOn2_level, tasterBooleanOn2.getLevel());
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_tasterBoolOn2_ct, tasterBooleanOn2.getCt());
    }
    else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeLampWeiss_tasterBoolOn2_aktiv, false);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeLampWeiss_tasterBoolOn2_name, null);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_tasterBoolOn2_level, null);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_tasterBoolOn2_ct, null);
    }
    // tasterBooleanOn3 : LampeWeissTasterScheme
    if (tasterBooleanOn3 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeLampWeiss_tasterBoolOn3_aktiv, true);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeLampWeiss_tasterBoolOn3_name, tasterBooleanOn3.getTasterBooleanOnName());
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_tasterBoolOn3_level, tasterBooleanOn3.getLevel());
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_tasterBoolOn3_ct, tasterBooleanOn3.getCt());
    }
    else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeLampWeiss_tasterBoolOn3_aktiv, false);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeLampWeiss_tasterBoolOn3_name, null);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_tasterBoolOn3_level, null);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_tasterBoolOn3_ct, null);
    }
    // tasterBooleanOn4 : LampeWeissTasterScheme
    if (tasterBooleanOn4 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeLampWeiss_tasterBoolOn4_aktiv, true);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeLampWeiss_tasterBoolOn4_name, tasterBooleanOn4.getTasterBooleanOnName());
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_tasterBoolOn4_level, tasterBooleanOn4.getLevel());
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_tasterBoolOn4_ct, tasterBooleanOn4.getCt());
    }
    else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeLampWeiss_tasterBoolOn4_aktiv, false);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeLampWeiss_tasterBoolOn4_name, null);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_tasterBoolOn4_level, null);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_tasterBoolOn4_ct, null);
    }
    // tasterBooleanOff: string[]
    var db_tasterBooleanOff = null;
    tasterBooleanOff.forEach(function (value) {
        if (db_tasterBooleanOff == null) {
            // @ts-ignore                                    
            db_tasterBooleanOff = value;
        }
        else {
            // @ts-ignore                                    
            db_tasterBooleanOff += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_TasterBooleanOff, db_tasterBooleanOff);
    // Weitere:
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_Nachtbeleuchtung, nachtbeleuchtung);
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_TurnOffExitHouseSummer, turnOffExitHouseSummer);
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_TurnOffExitHouseWinter, turnOffExitHouseWinter);
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_TurnOnEnterHouseSummer, turnOnEnterHouseSummer);
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_TurnOnEnterHouseWinter, turnOnEnterHouseWinter);
    // Gruppe:
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeLampeWeissGroup, isGroup);
    // alexaLevelSchemeForOn: LampeWeissColorScheme
    if (alexaLevelSchemeForOn != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeLampWeiss_AlexaColorSchemeForOn_Weiss_aktiv, true);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_AlexaColorSchemeForOn_Weiss_level, alexaLevelSchemeForOn.getLevel());
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_AlexaColorSchemeForOn_Weiss_ct, alexaLevelSchemeForOn.getCt());
    }
    else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeLampWeiss_AlexaColorSchemeForOn_Weiss_aktiv, false);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_AlexaColorSchemeForOn_Weiss_level, null);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_AlexaColorSchemeForOn_Weiss_ct, null);
    }
    // colorSchemesWeiss1: LampeWeissAlexaScheme
    if (colorSchemesWeiss1 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeLampWeiss_ColorSchemes_Weiss1_aktiv, true);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeLampWeiss_ColorSchemes_Weiss1_name, colorSchemesWeiss1.getAlexaName());
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_ColorSchemes_Weiss1_level, colorSchemesWeiss1.getLevel());
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_ColorSchemes_Weiss1_ct, colorSchemesWeiss1.getCt());
    }
    else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeLampWeiss_ColorSchemes_Weiss1_aktiv, false);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeLampWeiss_ColorSchemes_Weiss1_name, null);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_ColorSchemes_Weiss1_level, null);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_ColorSchemes_Weiss1_ct, null);
    }
    // colorSchemesWeiss2: LampeWeissAlexaScheme
    if (colorSchemesWeiss2 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeLampWeiss_ColorSchemes_Weiss2_aktiv, true);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeLampWeiss_ColorSchemes_Weiss2_name, colorSchemesWeiss2.getAlexaName());
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_ColorSchemes_Weiss2_level, colorSchemesWeiss2.getLevel());
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_ColorSchemes_Weiss2_ct, colorSchemesWeiss2.getCt());
    }
    else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeLampWeiss_ColorSchemes_Weiss2_aktiv, false);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeLampWeiss_ColorSchemes_Weiss2_name, null);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_ColorSchemes_Weiss2_level, null);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_ColorSchemes_Weiss2_ct, null);
    }
    // colorSchemesWeiss3: LampeWeissAlexaScheme
    if (colorSchemesWeiss3 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeLampWeiss_ColorSchemes_Weiss3_aktiv, true);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeLampWeiss_ColorSchemes_Weiss3_name, colorSchemesWeiss3.getAlexaName());
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_ColorSchemes_Weiss3_level, colorSchemesWeiss3.getLevel());
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_ColorSchemes_Weiss3_ct, colorSchemesWeiss3.getCt());
    }
    else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeLampWeiss_ColorSchemes_Weiss3_aktiv, false);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeLampWeiss_ColorSchemes_Weiss3_name, null);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_ColorSchemes_Weiss3_level, null);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_ColorSchemes_Weiss3_ct, null);
    }
    // colorSchemesWeiss4: LampeWeissAlexaScheme
    if (colorSchemesWeiss4 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeLampWeiss_ColorSchemes_Weiss4_aktiv, true);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeLampWeiss_ColorSchemes_Weiss4_name, colorSchemesWeiss4.getAlexaName());
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_ColorSchemes_Weiss4_level, colorSchemesWeiss4.getLevel());
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_ColorSchemes_Weiss4_ct, colorSchemesWeiss4.getCt());
    }
    else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeLampWeiss_ColorSchemes_Weiss4_aktiv, false);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeLampWeiss_ColorSchemes_Weiss4_name, null);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_ColorSchemes_Weiss4_level, null);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_ColorSchemes_Weiss4_ct, null);
    }
}
exports.createLampeWeiss = createLampeWeiss;
// LampeRGB:
function createLampeRGB(adapter, rawId, baseState, etage, raum, device, isGroup, groupMembers, alexaSmartNamesForOn, alexaActionNamesForOn, alexaColorSchemeForOnFarbe, alexaColorSchemeForOnWeiss, alexaSmartNamesForOff, alexaActionNamesForOff, colorSchemesFarbe1, colorSchemesFarbe2, colorSchemesFarbe3, colorSchemesFarbe4, colorSchemesWeiss1, colorSchemesWeiss2, colorSchemesWeiss3, colorSchemesWeiss4, tasterBooleanOn, tasterBooleanOff, nachtbeleuchtung, turnOffExitHouseSummer, turnOffExitHouseWinter, turnOnEnterHouseSummer, turnOnEnterHouseWinter) {
    // Allgemein:
    createZigbeeDevice(adapter, rawId, baseState, etage, raum, device, deviceZigbeeLampeRGB);
    // Lampe-RGB spezifisch:
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeRGBLamp_Group, isGroup);
    // groupMembers:string[]
    var db_groupMembers = null;
    groupMembers.forEach(function (value) {
        if (db_groupMembers == null) {
            // @ts-ignore                                    
            db_groupMembers = value;
        }
        else {
            // @ts-ignore                                    
            db_groupMembers += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRGBLamp_Groupmembers, db_groupMembers);
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
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaSmartNamesForOn, db_alexaSmartNamesForOn);
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
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaActionNamesForOn, db_alexaActionNamesForOn);
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
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaSmartNamesForOff, db_alexaSmartNamesForOff);
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
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaActionNamesForOff, db_alexaActionNamesForOff);
    // tasterBooleanOn: string[]
    var db_tasterBooleanOn = null;
    tasterBooleanOn.forEach(function (value) {
        if (db_tasterBooleanOn == null) {
            // @ts-ignore                                    
            db_tasterBooleanOn = value;
        }
        else {
            // @ts-ignore                                    
            db_tasterBooleanOn += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_TasterBooleanOn, db_tasterBooleanOn);
    // tasterBooleanOff: string[]
    var db_tasterBooleanOff = null;
    tasterBooleanOff.forEach(function (value) {
        if (db_tasterBooleanOff == null) {
            // @ts-ignore                                    
            db_tasterBooleanOff = value;
        }
        else {
            // @ts-ignore                                    
            db_tasterBooleanOff += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_TasterBooleanOff, db_tasterBooleanOff);
    // Weitere:
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_Nachtbeleuchtung, nachtbeleuchtung);
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_TurnOffExitHouseSummer, turnOffExitHouseSummer);
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_TurnOffExitHouseWinter, turnOffExitHouseWinter);
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_TurnOnEnterHouseSummer, turnOnEnterHouseSummer);
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_TurnOnEnterHouseWinter, turnOnEnterHouseWinter);
    // alexaColorSchemeForOnFarbe: RGBColorScheme
    if (alexaColorSchemeForOnFarbe != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeRGBLamp_AlexaColorSchemeForOn_Farbe_aktiv, true);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_AlexaColorSchemeForOn_Farbe_level, alexaColorSchemeForOnFarbe.getLevel());
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_AlexaColorSchemeForOn_Farbe_hue, alexaColorSchemeForOnFarbe.getHue());
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_AlexaColorSchemeForOn_Farbe_sat, alexaColorSchemeForOnFarbe.getSat());
    }
    else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeRGBLamp_AlexaColorSchemeForOn_Farbe_aktiv, false);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_AlexaColorSchemeForOn_Farbe_level, null);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_AlexaColorSchemeForOn_Farbe_hue, null);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_AlexaColorSchemeForOn_Farbe_sat, null);
    }
    // alexaColorSchemeForOnWeiss: WhiteColorScheme
    if (alexaColorSchemeForOnWeiss != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeRGBLamp_AlexaColorSchemeForOn_Weiss_aktiv, true);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_AlexaColorSchemeForOn_Weiss_level, alexaColorSchemeForOnWeiss.getLevel());
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_AlexaColorSchemeForOn_Weiss_ct, alexaColorSchemeForOnWeiss.getCt());
    }
    else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeRGBLamp_AlexaColorSchemeForOn_Weiss_aktiv, false);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_AlexaColorSchemeForOn_Weiss_level, null);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_AlexaColorSchemeForOn_Weiss_ct, null);
    }
    // colorSchemesFarbe1: RGBColorScheme
    if (colorSchemesFarbe1 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeRGBLamp_ColorSchemes_Farbe1_aktiv, true);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRGBLamp_ColorSchemes_Farbe1_name, colorSchemesFarbe1.getAlexaName());
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe1_level, colorSchemesFarbe1.getLevel());
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe1_hue, colorSchemesFarbe1.getHue());
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe1_sat, colorSchemesFarbe1.getSat());
    }
    else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeRGBLamp_ColorSchemes_Farbe1_aktiv, false);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRGBLamp_ColorSchemes_Farbe1_name, null);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe1_level, null);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe1_hue, null);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe1_sat, null);
    }
    // colorSchemesFarbe2: RGBColorScheme
    if (colorSchemesFarbe2 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeRGBLamp_ColorSchemes_Farbe2_aktiv, true);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRGBLamp_ColorSchemes_Farbe2_name, colorSchemesFarbe2.getAlexaName());
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe2_level, colorSchemesFarbe2.getLevel());
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe2_hue, colorSchemesFarbe2.getHue());
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe2_sat, colorSchemesFarbe2.getSat());
    }
    else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeRGBLamp_ColorSchemes_Farbe2_aktiv, false);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRGBLamp_ColorSchemes_Farbe2_name, null);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe2_level, null);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe2_hue, null);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe2_sat, null);
    }
    // colorSchemesFarbe3: RGBColorScheme
    if (colorSchemesFarbe3 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeRGBLamp_ColorSchemes_Farbe3_aktiv, true);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRGBLamp_ColorSchemes_Farbe3_name, colorSchemesFarbe3.getAlexaName());
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe3_level, colorSchemesFarbe3.getLevel());
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe3_hue, colorSchemesFarbe3.getHue());
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe3_sat, colorSchemesFarbe3.getSat());
    }
    else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeRGBLamp_ColorSchemes_Farbe3_aktiv, false);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRGBLamp_ColorSchemes_Farbe3_name, null);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe3_level, null);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe3_hue, null);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe3_sat, null);
    }
    // colorSchemesFarbe4: RGBColorScheme
    if (colorSchemesFarbe4 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeRGBLamp_ColorSchemes_Farbe4_aktiv, true);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRGBLamp_ColorSchemes_Farbe4_name, colorSchemesFarbe4.getAlexaName());
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe4_level, colorSchemesFarbe4.getLevel());
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe4_hue, colorSchemesFarbe4.getHue());
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe4_sat, colorSchemesFarbe4.getSat());
    }
    else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeRGBLamp_ColorSchemes_Farbe4_aktiv, false);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRGBLamp_ColorSchemes_Farbe4_name, null);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe4_level, null);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe4_hue, null);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe4_sat, null);
    }
    // colorSchemesWeiss1: WhiteColorScheme
    if (colorSchemesWeiss1 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeRGBLamp_ColorSchemes_Weiss1_aktiv, true);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRGBLamp_ColorSchemes_Weiss1_name, colorSchemesWeiss1.getAlexaName());
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Weiss1_level, colorSchemesWeiss1.getLevel());
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Weiss1_ct, colorSchemesWeiss1.getCt());
    }
    else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeRGBLamp_ColorSchemes_Weiss1_aktiv, false);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRGBLamp_ColorSchemes_Weiss1_name, null);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Weiss1_level, null);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Weiss1_ct, null);
    }
    // colorSchemesWeiss2: WhiteColorScheme
    if (colorSchemesWeiss2 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeRGBLamp_ColorSchemes_Weiss2_aktiv, true);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRGBLamp_ColorSchemes_Weiss2_name, colorSchemesWeiss2.getAlexaName());
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Weiss2_level, colorSchemesWeiss2.getLevel());
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Weiss2_ct, colorSchemesWeiss2.getCt());
    }
    else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeRGBLamp_ColorSchemes_Weiss2_aktiv, false);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRGBLamp_ColorSchemes_Weiss2_name, null);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Weiss2_level, null);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Weiss2_ct, null);
    }
    // colorSchemesWeiss3: WhiteColorScheme
    if (colorSchemesWeiss3 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeRGBLamp_ColorSchemes_Weiss3_aktiv, true);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRGBLamp_ColorSchemes_Weiss3_name, colorSchemesWeiss3.getAlexaName());
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Weiss3_level, colorSchemesWeiss3.getLevel());
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Weiss3_ct, colorSchemesWeiss3.getCt());
    }
    else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeRGBLamp_ColorSchemes_Weiss3_aktiv, false);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRGBLamp_ColorSchemes_Weiss3_name, null);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Weiss3_level, null);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Weiss3_ct, null);
    }
    // colorSchemesWeiss4: WhiteColorScheme
    if (colorSchemesWeiss4 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeRGBLamp_ColorSchemes_Weiss4_aktiv, true);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRGBLamp_ColorSchemes_Weiss4_name, colorSchemesWeiss4.getAlexaName());
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Weiss4_level, colorSchemesWeiss4.getLevel());
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Weiss4_ct, colorSchemesWeiss4.getCt());
    }
    else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeRGBLamp_ColorSchemes_Weiss4_aktiv, false);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRGBLamp_ColorSchemes_Weiss4_name, null);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Weiss4_level, null);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Weiss4_ct, null);
    }
}
exports.createLampeRGB = createLampeRGB;
function createDatenpunktSingle(adapter, deviceRawId, attributeType, attributeName, attributeValue) {
    var stateDatenpunkt = "0_userdata.0.devices.zigbee." + deviceRawId + "." + attributeName;
    adapter.createState(stateDatenpunkt, null, {
        name: stateDatenpunkt,
        desc: stateDatenpunkt,
        type: attributeType,
        read: true,
        write: true
    });
    adapter.setState(stateDatenpunkt, attributeValue);
}
function getZigbeeDevices(adapter, filterCategory) {
    var zigbeeArray = [];
    adapter.$('state[id=0_userdata.0.devices.zigbee.*.category]').each(function (datenpunktKey) {
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == filterCategory) {
            //constructor(adapter:any, id: number, baseState: string, etage: string, raum: string, 
            // device: string, 
            // alexaSmartNamesForOn:string[],alexaActionNamesForOn:string[], alexaSmartNamesForOff: string[],alexaActionNamesForOff: string[], additionalStates4TurnOn:string[], additionalStates4TurnOff:string[]) {
            if (filterCategory == deviceZigbeeSteckdose) {
                // @ts-ignore            
                zigbeeArray.push(new ZigbeeSteckdose(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val, // [4] Device            (z.B. Stehlampe)            
                adapter.getState(datenpunktPraefix + "." + attribute_AlexaSmartNamesForOn).val.split('|'), // 08 Alexa-Ein
                adapter.getState(datenpunktPraefix + "." + attribute_AlexaActionNamesForOn).val.split('|'), // Alexa-Action-Ein, z.B. "Guten morgen" (Würde auch funktionieren, wenn dies bei [06] eingetragen ist)                
                adapter.getState(datenpunktPraefix + "." + attribute_AlexaSmartNamesForOff).val.split('|'), // 09 Alexa-Aus
                adapter.getState(datenpunktPraefix + "." + attribute_AlexaActionNamesForOff).val.split('|'), // [10] Alexa-Action Aus, z.B. "Gute Nacht". Wir müssen hier zu [09] unterscheiden, da wir über "Gute Nacht" und isActionTurnedOn=true informiert werden.        
                adapter.getState(datenpunktPraefix + "." + attribute_TasterBooleanOn).val.split('|'), // 07 TunrnOn-DP
                adapter.getState(datenpunktPraefix + "." + attribute_TasterBooleanOff).val.split('|') // 08 TasterBoolOff-DP                    
                ));
            }
            else if (filterCategory == deviceZigbeeBewegungsmelder) {
                // @ts-ignore                            
                zigbeeArray.push(new ZigbeeBewegungsmelder(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
                ));
            }
            else if (filterCategory == deviceZigbeeLampeRGB) {
                // Einschalt-Scheme:
                var alexaOnScheme = null;
                if (adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_AlexaColorSchemeForOn_Farbe_aktiv).val == true) {
                    alexaOnScheme = new RGBColorScheme(null, adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_AlexaColorSchemeForOn_Farbe_level).val, adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_AlexaColorSchemeForOn_Farbe_hue).val, adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_AlexaColorSchemeForOn_Farbe_sat).val);
                }
                else if (adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_AlexaColorSchemeForOn_Weiss_aktiv).val == true) {
                    alexaOnScheme = new WhiteColorScheme(null, adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_AlexaColorSchemeForOn_Weiss_level).val, adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_AlexaColorSchemeForOn_Weiss_ct).val);
                }
                // Weitere Schemes als Array:
                var schemeArray = [];
                // RGBColorScheme1:
                if (adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Farbe1_aktiv).val == true) {
                    // @ts-ignore                                                
                    schemeArray.push(new RGBColorScheme(adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Farbe1_name).val, adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Farbe1_level).val, adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Farbe1_hue).val, adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Farbe1_sat).val));
                }
                // RGBColorScheme2:
                if (adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Farbe2_aktiv).val == true) {
                    // @ts-ignore                                                
                    schemeArray.push(new RGBColorScheme(adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Farbe2_name).val, adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Farbe2_level).val, adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Farbe2_hue).val, adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Farbe2_sat).val));
                }
                // RGBColorScheme3:
                if (adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Farbe3_aktiv).val == true) {
                    // @ts-ignore                                                
                    schemeArray.push(new RGBColorScheme(adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Farbe3_name).val, adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Farbe3_level).val, adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Farbe3_hue).val, adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Farbe3_sat).val));
                }
                // RGBColorScheme4:
                if (adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Farbe4_aktiv).val == true) {
                    // @ts-ignore                                                
                    schemeArray.push(new RGBColorScheme(adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Farbe4_name).val, adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Farbe4_level).val, adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Farbe4_hue).val, adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Farbe4_sat).val));
                }
                // WhiteColorScheme1:
                if (adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Weiss1_aktiv).val == true) {
                    // @ts-ignore                                                
                    schemeArray.push(new WhiteColorScheme(adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Weiss1_name).val, adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Weiss1_level).val, adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Weiss1_ct).val));
                }
                // WhiteColorScheme2:
                if (adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Weiss2_aktiv).val == true) {
                    // @ts-ignore                                                
                    schemeArray.push(new WhiteColorScheme(adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Weiss2_name).val, adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Weiss2_level).val, adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Weiss2_ct).val));
                }
                // WhiteColorScheme3:
                if (adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Weiss3_aktiv).val == true) {
                    // @ts-ignore                                                
                    schemeArray.push(new WhiteColorScheme(adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Weiss3_name).val, adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Weiss3_level).val, adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Weiss3_ct).val));
                }
                // WhiteColorScheme4:
                if (adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Weiss4_aktiv).val == true) {
                    // @ts-ignore                                                
                    schemeArray.push(new WhiteColorScheme(adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Weiss4_name).val, adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Weiss4_level).val, adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Weiss4_ct).val));
                }
                // @ts-ignore            
                zigbeeArray.push(new ZigbeeLampeRGB(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val, // [4] Device            (z.B. Stehlampe)            
                adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_Group).val, // [5] Gruppe
                adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_Groupmembers).val.split('|'), // [6] Gruppenmitglieder
                adapter.getState(datenpunktPraefix + "." + attribute_AlexaSmartNamesForOn).val.split('|'), // 08 Alexa-Ein
                adapter.getState(datenpunktPraefix + "." + attribute_AlexaActionNamesForOn).val.split('|'), // Alexa-Action-Ein, z.B. "Guten morgen" (Würde auch funktionieren, wenn dies bei [06] eingetragen ist)                
                alexaOnScheme, // [09 A.-Ein-Scheme]   
                adapter.getState(datenpunktPraefix + "." + attribute_AlexaSmartNamesForOff).val.split('|'), // 10 Alexa-Aus                   
                adapter.getState(datenpunktPraefix + "." + attribute_AlexaActionNamesForOff).val.split('|'), // [10] Alexa-Action Aus, z.B. "Gute Nacht". Wir müssen hier zu [09] unterscheiden, da wir über "Gute Nacht" und isActionTurnedOn=true informiert werden.                
                schemeArray, // [12 Alexa-Schemes]  
                adapter.getState(datenpunktPraefix + "." + attribute_TasterBooleanOn).val.split('|'), // 13 TasterBoolOn
                adapter.getState(datenpunktPraefix + "." + attribute_TasterBooleanOff).val.split('|'), // 14 TasterBoolOff
                adapter.getState(datenpunktPraefix + "." + attribute_Nachtbeleuchtung).val, // Gehört zur Nachtbeleuchtung ja/nein
                adapter.getState(datenpunktPraefix + "." + attribute_TurnOffExitHouseSummer).val, // turnOffExitHouseSummer (Ausschalten, wenn Haus verlassen - Sommer)
                adapter.getState(datenpunktPraefix + "." + attribute_TurnOffExitHouseWinter).val, // turnOffExitHouseWinter (Ausschalten, wenn Haus verlassen - Winter)
                adapter.getState(datenpunktPraefix + "." + attribute_TurnOnEnterHouseSummer).val, // turnOnEnterHouseSummer (Einschalten, wenn Haus betreten - Sommer)
                adapter.getState(datenpunktPraefix + "." + attribute_TurnOnEnterHouseWinter).val // turnOnEnterHouseWinter (Einschalten, wenn Haus betreten - Winter)
                ));
            }
            else if (filterCategory == deviceZigbeeLampeWeiss) {
                // Einschalt-Scheme:
                var alexaOnScheme = null;
                if (adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_AlexaColorSchemeForOn_Weiss_aktiv).val == true) {
                    // @ts-ignore                                                
                    alexaOnScheme = new LampeWeissColorScheme(null, adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_AlexaColorSchemeForOn_Weiss_level).val, adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_AlexaColorSchemeForOn_Weiss_ct).val);
                }
                // Weitere Schemes als Array:
                var schemeArray = [];
                // WhiteColorScheme1:
                if (adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_ColorSchemes_Weiss1_aktiv).val == true) {
                    // @ts-ignore                                                                    
                    schemeArray.push(new LampeWeissAlexaScheme(adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_ColorSchemes_Weiss1_name).val, adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_ColorSchemes_Weiss1_level).val, adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_ColorSchemes_Weiss1_ct).val));
                }
                // WhiteColorScheme2:
                if (adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_ColorSchemes_Weiss2_aktiv).val == true) {
                    // @ts-ignore                                                                    
                    schemeArray.push(new LampeWeissAlexaScheme(adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_ColorSchemes_Weiss2_name).val, adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_ColorSchemes_Weiss2_level).val, adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_ColorSchemes_Weiss2_ct).val));
                }
                // WhiteColorScheme3:
                if (adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_ColorSchemes_Weiss3_aktiv).val == true) {
                    // @ts-ignore                                                                    
                    schemeArray.push(new LampeWeissAlexaScheme(adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_ColorSchemes_Weiss3_name).val, adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_ColorSchemes_Weiss3_level).val, adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_ColorSchemes_Weiss3_ct).val));
                }
                // WhiteColorScheme4:
                if (adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_ColorSchemes_Weiss4_aktiv).val == true) {
                    // @ts-ignore                                                                    
                    schemeArray.push(new LampeWeissAlexaScheme(adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_ColorSchemes_Weiss4_name).val, adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_ColorSchemes_Weiss4_level).val, adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_ColorSchemes_Weiss4_ct).val));
                }
                // Taster Boolean On Schemes:
                var tasterOnBoolschemeArray = [];
                // LampeWeissTasterScheme1:
                //constructor(tasterBooleanOn: string, level: number, ct: number) {
                if (adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_tasterBoolOn1_aktiv).val == true) {
                    // @ts-ignore                                                                    
                    tasterOnBoolschemeArray.push(new LampeWeissTasterScheme(adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_tasterBoolOn1_name).val, adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_tasterBoolOn1_level).val, adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_tasterBoolOn1_ct).val));
                }
                // LampeWeissTasterScheme2:
                if (adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_tasterBoolOn2_aktiv).val == true) {
                    // @ts-ignore                                                                    
                    tasterOnBoolschemeArray.push(new LampeWeissTasterScheme(adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_tasterBoolOn2_name).val, adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_tasterBoolOn2_level).val, adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_tasterBoolOn2_ct).val));
                }
                // LampeWeissTasterScheme3:
                if (adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_tasterBoolOn3_aktiv).val == true) {
                    // @ts-ignore                                                                    
                    tasterOnBoolschemeArray.push(new LampeWeissTasterScheme(adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_tasterBoolOn3_name).val, adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_tasterBoolOn3_level).val, adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_tasterBoolOn3_ct).val));
                }
                // LampeWeissTasterScheme4:
                if (adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_tasterBoolOn4_aktiv).val == true) {
                    // @ts-ignore                                                                    
                    tasterOnBoolschemeArray.push(new LampeWeissTasterScheme(adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_tasterBoolOn4_name).val, adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_tasterBoolOn4_level).val, adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_tasterBoolOn4_ct).val));
                }
                // @ts-ignore            
                zigbeeArray.push(new ZigbeeLampeWeiss(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val, // [4] Device            (z.B. Stehlampe)            
                adapter.getState(datenpunktPraefix + "." + attribute_AlexaSmartNamesForOn).val.split('|'), // 08 Alexa-Ein
                adapter.getState(datenpunktPraefix + "." + attribute_AlexaActionNamesForOn).val.split('|'), // Alexa-Action-Ein, z.B. "Guten morgen" (Würde auch funktionieren, wenn dies bei [06] eingetragen ist)                
                alexaOnScheme, // [06 A.-Ein-Scheme]   */  new LampeWeissAlexaScheme(null, 100, -1), // Letzter Paramter = -1 heußt, dass diese Lampe keine Farbtemperatur unterstützt. Ansonsten hier die Temperatur angeben
                adapter.getState(datenpunktPraefix + "." + attribute_AlexaSmartNamesForOff).val.split('|'), // 09 Alexa-Aus
                adapter.getState(datenpunktPraefix + "." + attribute_AlexaActionNamesForOff).val.split('|'), // [10] Alexa-Action Aus, z.B. "Gute Nacht". Wir müssen hier zu [09] unterscheiden, da wir über "Gute Nacht" und isActionTurnedOn=true informiert werden.        
                schemeArray, //  [08 Alexa-Schemes]  
                adapter.getState(datenpunktPraefix + "." + attributeLampeWeissGroup).val, // [6] Gruppe
                tasterOnBoolschemeArray, // [07 TasterBoolOn ]
                adapter.getState(datenpunktPraefix + "." + attribute_TasterBooleanOff).val.split('|'), // 14 TasterBoolOff
                adapter.getState(datenpunktPraefix + "." + attribute_Nachtbeleuchtung).val, // Gehört zur Nachtbeleuchtung ja/nein
                adapter.getState(datenpunktPraefix + "." + attribute_TurnOffExitHouseSummer).val, // turnOffExitHouseSummer (Ausschalten, wenn Haus verlassen - Sommer)
                adapter.getState(datenpunktPraefix + "." + attribute_TurnOffExitHouseWinter).val, // turnOffExitHouseWinter (Ausschalten, wenn Haus verlassen - Winter)
                adapter.getState(datenpunktPraefix + "." + attribute_TurnOnEnterHouseSummer).val, // turnOnEnterHouseSummer (Einschalten, wenn Haus betreten - Sommer)
                adapter.getState(datenpunktPraefix + "." + attribute_TurnOnEnterHouseWinter).val // turnOnEnterHouseWinter (Einschalten, wenn Haus betreten - Winter)
                ));
            }
            else if (filterCategory == deviceZigbeeRauchmelder) {
                // @ts-ignore                            
                zigbeeArray.push(new ZigbeeRauchmelder(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
                ));
            }
            else if (filterCategory == deviceZigbeeWandtaster) {
                // @ts-ignore            
                zigbeeArray.push(new ZigbeeWandtaster(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
                ));
            }
            else if (filterCategory == deviceZigbeeDosenrelais) {
                // @ts-ignore            
                zigbeeArray.push(new ZigbeeDosenrelais(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
                ));
            }
            else if (filterCategory == deviceZigbeeSchalter) {
                // @ts-ignore            
                zigbeeArray.push(new ZigbeeSchalter(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
                ));
            }
            else if (filterCategory == deviceZigbeeRepeater) {
                // @ts-ignore            
                zigbeeArray.push(new ZigbeeRepeater(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
                ));
            }
            else if (filterCategory == deviceZigbeeFenstersensor) { // TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                // @ts-ignore            
                zigbeeArray.push(new Zigbee(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
                ));
            }
        }
    });
    return zigbeeArray;
}
exports.getZigbeeDevices = getZigbeeDevices;
function getZigbeeDevicesAll(adapter) {
    var zigbeeArray = [];
    adapter.getZigbeeDevices(adapter, deviceZigbeeSteckdose).forEach(function (zigbee) {
        // @ts-ignore            
        zigbeeArray.push(zigbee);
    });
    adapter.getZigbeeDevices(adapter, deviceZigbeeBewegungsmelder).forEach(function (zigbee) {
        // @ts-ignore                    
        zigbeeArray.push(zigbee);
    });
    adapter.getZigbeeDevices(adapter, deviceZigbeeLampeRGB).forEach(function (zigbee) {
        // @ts-ignore                    
        zigbeeArray.push(zigbee);
    });
    adapter.getZigbeeDevices(adapter, deviceZigbeeLampeWeiss).forEach(function (zigbee) {
        // @ts-ignore                    
        zigbeeArray.push(zigbee);
    });
    adapter.getZigbeeDevices(adapter, deviceZigbeeRauchmelder).forEach(function (zigbee) {
        // @ts-ignore                    
        zigbeeArray.push(zigbee);
    });
    adapter.getZigbeeDevices(adapter, deviceZigbeeWandtaster).forEach(function (zigbee) {
        // @ts-ignore                    
        zigbeeArray.push(zigbee);
    });
    adapter.getZigbeeDevices(adapter, deviceZigbeeDosenrelais).forEach(function (zigbee) {
        // @ts-ignore                    
        zigbeeArray.push(zigbee);
    });
    adapter.getZigbeeDevices(adapter, deviceZigbeeSchalter).forEach(function (zigbee) {
        // @ts-ignore                    
        zigbeeArray.push(zigbee);
    });
    adapter.getZigbeeDevices(adapter, deviceZigbeeRepeater).forEach(function (zigbee) {
        // @ts-ignore                    
        zigbeeArray.push(zigbee);
    });
    adapter.getZigbeeDevices(adapter, deviceZigbeeFenstersensor).forEach(function (zigbee) {
        // @ts-ignore                    
        zigbeeArray.push(zigbee);
    });
    return zigbeeArray;
}
exports.getZigbeeDevicesAll = getZigbeeDevicesAll;
module.exports = { createZigbeeDevice: createZigbeeDevice, createLampeWeiss: createLampeWeiss, createSteckdose: createSteckdose, getZigbeeDevices: getZigbeeDevices, getZigbeeDevicesAll: getZigbeeDevicesAll };
