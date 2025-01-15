"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadHomematicDevicesAll = exports.loadHomematicDimmer = exports.loadHomematicHeizkoerper = exports.loadHomematicSteckdosen = exports.loadHomematicWindows = exports.loadHomematicFunktschaltaktoren = exports.loadHomematicRauchmelder = exports.loadHomematicTemperatursensoren = exports.loadHomematicAccessPoints = exports.loadHomematicWandtaster = exports.loadHomematicFussbodenheizungen = exports.loadHomematicWandschalter = exports.loadHomematicDoors = exports.loadHomematicWetterstationen = exports.loadHomematicPraesenzmelder = exports.loadHomematicWandthermostate = exports.loadHomematicRollladen = exports.createHomeaticWandschalter = exports.createHomeaticDimmer = exports.createHomematicDevice = void 0;
var _a = require('./homematicClasses.js'), HomematicWindow = _a.HomematicWindow, HomematicSteckdose = _a.HomematicSteckdose, HomematicHeizkoerper = _a.HomematicHeizkoerper, HomematicDimmer = _a.HomematicDimmer, HomematicWandthermostat = _a.HomematicWandthermostat, HomematicFussbodenheizung = _a.HomematicFussbodenheizung, HomematicWandschalter = _a.HomematicWandschalter, HomematicDoor = _a.HomematicDoor, HomematicWetterstation = _a.HomematicWetterstation, HomematicAccessPoint = _a.HomematicAccessPoint, HomematicRollladen = _a.HomematicRollladen, HomematicWandtaster = _a.HomematicWandtaster, HomematicTemperatursensor = _a.HomematicTemperatursensor, HomematicRauchmelder = _a.HomematicRauchmelder, HomematicPraesenzmelder = _a.HomematicPraesenzmelder, AbstractHomematic = _a.AbstractHomematic, HomematicFunkschaltaktor = _a.HomematicFunkschaltaktor, DimmerAlexaScheme = _a.DimmerAlexaScheme, DimmerTasterScheme = _a.DimmerTasterScheme, deviceHomematicWandthermostat = _a.deviceHomematicWandthermostat, deviceHomematicPraesenzmelder = _a.deviceHomematicPraesenzmelder, deviceHomematicWetterstation = _a.deviceHomematicWetterstation, deviceHomematicDoor = _a.deviceHomematicDoor, deviceHomematicRollladen = _a.deviceHomematicRollladen, deviceHomematicWandschalter = _a.deviceHomematicWandschalter, deviceHomematicFussbodenheizung = _a.deviceHomematicFussbodenheizung, deviceHomematicWandtaster = _a.deviceHomematicWandtaster, deviceHomematicAccessPoint = _a.deviceHomematicAccessPoint, deviceHomematicTemperatursensor = _a.deviceHomematicTemperatursensor, deviceHomematicRauchmelder = _a.deviceHomematicRauchmelder, deviceHomematicFunkSchaltaktor = _a.deviceHomematicFunkSchaltaktor, deviceHomematicWindow = _a.deviceHomematicWindow, deviceHomematicSteckdose = _a.deviceHomematicSteckdose, deviceHomematicHeizkoerper = _a.deviceHomematicHeizkoerper, deviceHomematicDimmer = _a.deviceHomematicDimmer;
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
// Scheme Dimmer:
var attributeDimmer_alexaScheme1_aktiv = "alexaScheme1_aktiv";
var attributeDimmer_alexaScheme1_name = "alexaScheme1_name";
var attributeDimmer_alexaScheme1_level = "alexaScheme1_level";
var attributeDimmer_alexaScheme2_aktiv = "alexaScheme2_aktiv";
var attributeDimmer_alexaScheme2_name = "alexaScheme2_name";
var attributeDimmer_alexaScheme2_level = "alexaScheme2_level";
var attributeDimmer_alexaScheme3_aktiv = "alexaScheme3_aktiv";
var attributeDimmer_alexaScheme3_name = "alexaScheme3_name";
var attributeDimmer_alexaScheme3_level = "alexaScheme3_level";
var attributeDimmer_alexaScheme4_aktiv = "alexaScheme4_aktiv";
var attributeDimmer_alexaScheme4_name = "alexaScheme4_name";
var attributeDimmer_alexaScheme4_level = "alexaScheme4_level";
// Scheme Dimmer:
var attributeDimmer_tasterScheme1_aktiv = "tasterScheme1_aktiv";
var attributeDimmer_tasterScheme1_name = "tasterScheme1_name";
var attributeDimmer_tasterScheme1_level = "tasterScheme1_level";
var attributeDimmer_tasterScheme2_aktiv = "tasterScheme2_aktiv";
var attributeDimmer_tasterScheme2_name = "tasterScheme2_name";
var attributeDimmer_tasterScheme2_level = "tasterScheme2_level";
var attributeDimmer_tasterScheme3_aktiv = "tasterScheme3_aktiv";
var attributeDimmer_tasterScheme3_name = "tasterScheme3_name";
var attributeDimmer_tasterScheme3_level = "tasterScheme3_level";
var attributeDimmer_tasterScheme4_aktiv = "tasterScheme4_aktiv";
var attributeDimmer_tasterScheme4_name = "tasterScheme4_name";
var attributeDimmer_tasterScheme4_level = "tasterScheme4_level";
function createHomematicDevice(adapter, rawId, baseState, etage, raum, device, category) {
    createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRawID, rawId, category);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeCategory, category, category);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeBaseState, baseState, category);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeEtage, etage, category);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRaum, raum, category);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeDevice, device, category);
}
exports.createHomematicDevice = createHomematicDevice;
// Dimmer:
function createHomeaticDimmer(adapter, rawId, baseState, etage, raum, device, alexaSmartNamesForOn, alexaActionNamesForOn, alexaLevelSchemeForOn, alexaSmartNamesForOff, alexaActionNamesForOff, alexaScheme1, alexaScheme2, alexaScheme3, alexaScheme4, tasterBooleanOnScheme1, tasterBooleanOnScheme2, tasterBooleanOnScheme3, tasterBooleanOnScheme4, tasterBooleanOff, nachtbeleuchtung, turnOffExitHouseSummer, turnOffExitHouseWinter, turnOnEnterHouseSummer, turnOnEnterHouseWinter) {
    // Allgemein:
    createHomematicDevice(adapter, rawId, baseState, etage, raum, device, deviceHomematicDimmer);
    // alexaScheme1: InstanceType<typeof DimmerAlexaScheme>
    if (alexaScheme1 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_alexaScheme1_aktiv, true, deviceHomematicDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeDimmer_alexaScheme1_name, alexaScheme1.getAlexaName(), deviceHomematicDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeDimmer_alexaScheme1_level, alexaScheme1.getLevel(), deviceHomematicDimmer);
    }
    else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_alexaScheme1_aktiv, false, deviceHomematicDimmer);
    }
    // alexaScheme2: InstanceType<typeof DimmerAlexaScheme>
    if (alexaScheme2 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_alexaScheme2_aktiv, true, deviceHomematicDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeDimmer_alexaScheme2_name, alexaScheme1.getAlexaName(), deviceHomematicDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeDimmer_alexaScheme2_level, alexaScheme1.getLevel(), deviceHomematicDimmer);
    }
    else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_alexaScheme2_aktiv, false, deviceHomematicDimmer);
    }
    // alexaScheme3: InstanceType<typeof DimmerAlexaScheme>
    if (alexaScheme3 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_alexaScheme3_aktiv, true, deviceHomematicDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeDimmer_alexaScheme3_name, alexaScheme1.getAlexaName(), deviceHomematicDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeDimmer_alexaScheme3_level, alexaScheme1.getLevel(), deviceHomematicDimmer);
    }
    else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_alexaScheme3_aktiv, false, deviceHomematicDimmer);
    }
    // alexaScheme4: InstanceType<typeof DimmerAlexaScheme>
    if (alexaScheme4 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_alexaScheme4_aktiv, true, deviceHomematicDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeDimmer_alexaScheme4_name, alexaScheme1.getAlexaName(), deviceHomematicDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeDimmer_alexaScheme4_level, alexaScheme1.getLevel(), deviceHomematicDimmer);
    }
    else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_alexaScheme4_aktiv, false, deviceHomematicDimmer);
    }
    if (tasterBooleanOnScheme1 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_tasterScheme1_aktiv, true, deviceHomematicDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeDimmer_tasterScheme1_name, tasterBooleanOnScheme1.getTasterBooleanOnName(), deviceHomematicDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeDimmer_tasterScheme1_level, tasterBooleanOnScheme1.getLevel(), deviceHomematicDimmer);
    }
    else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_tasterScheme1_aktiv, false, deviceHomematicDimmer);
    }
    if (tasterBooleanOnScheme2 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_tasterScheme2_aktiv, true, deviceHomematicDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeDimmer_tasterScheme2_name, tasterBooleanOnScheme1.getTasterBooleanOnName(), deviceHomematicDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeDimmer_tasterScheme2_level, tasterBooleanOnScheme1.getLevel(), deviceHomematicDimmer);
    }
    else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_tasterScheme2_aktiv, false, deviceHomematicDimmer);
    }
    if (tasterBooleanOnScheme3 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_tasterScheme3_aktiv, true, deviceHomematicDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeDimmer_tasterScheme3_name, tasterBooleanOnScheme1.getTasterBooleanOnName(), deviceHomematicDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeDimmer_tasterScheme3_level, tasterBooleanOnScheme1.getLevel(), deviceHomematicDimmer);
    }
    else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_tasterScheme3_aktiv, false, deviceHomematicDimmer);
    }
    if (tasterBooleanOnScheme4 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_tasterScheme4_aktiv, true, deviceHomematicDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeDimmer_tasterScheme4_name, tasterBooleanOnScheme1.getTasterBooleanOnName(), deviceHomematicDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeDimmer_tasterScheme4_level, tasterBooleanOnScheme1.getLevel(), deviceHomematicDimmer);
    }
    else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_tasterScheme4_aktiv, false, deviceHomematicDimmer);
    }
    // alexaLevelSchemeForOn: InstanceType<typeof DimmerAlexaScheme>
    if (alexaLevelSchemeForOn != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_alexaScheme_aktiv, true, deviceHomematicDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeDimmer_alexaScheme_name, alexaLevelSchemeForOn.getAlexaName(), deviceHomematicDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeDimmer_alexaScheme_level, alexaLevelSchemeForOn.getLevel(), deviceHomematicDimmer);
    }
    else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_alexaScheme_aktiv, false, deviceHomematicDimmer);
    }
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
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_TasterBooleanOff, db_additionalStates4TurnOff, deviceHomematicDimmer);
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
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaSmartNamesForOn, db_alexaSmartNamesForOn, deviceHomematicDimmer);
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
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaActionNamesForOn, db_alexaActionNamesForOn, deviceHomematicDimmer);
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
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaSmartNamesForOff, db_alexaSmartNamesForOff, deviceHomematicDimmer);
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
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaActionNamesForOff, db_alexaActionNamesForOff, deviceHomematicDimmer);
    // Weitere:
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_Nachtbeleuchtung, nachtbeleuchtung, deviceHomematicDimmer);
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_TurnOffExitHouseSummer, turnOffExitHouseSummer, deviceHomematicDimmer);
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_TurnOffExitHouseWinter, turnOffExitHouseWinter, deviceHomematicDimmer);
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_TurnOnEnterHouseSummer, turnOnEnterHouseSummer, deviceHomematicDimmer);
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_TurnOnEnterHouseWinter, turnOnEnterHouseWinter, deviceHomematicDimmer);
}
exports.createHomeaticDimmer = createHomeaticDimmer;
// Wandschalter:
function createHomeaticWandschalter(adapter, rawId, baseState, etage, raum, device, alexaSmartNamesForOn, alexaActionNamesForOn, alexaSmartNamesForOff, alexaActionNamesForOff, nachtbeleuchtung, turnOffExitHouseSummer, turnOffExitHouseWinter, turnOnEnterHouseSummer, turnOnEnterHouseWinter) {
    // Allgemein:
    //export function createHomematicDevice(adapter: any, rawId: number, baseState: string, etage: string, raum: string, device: string, category: string) {
    createHomematicDevice(adapter, rawId, baseState, etage, raum, device, deviceHomematicWandschalter);
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
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaSmartNamesForOn, db_alexaSmartNamesForOn, deviceHomematicWandschalter);
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
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaActionNamesForOn, db_alexaActionNamesForOn, deviceHomematicWandschalter);
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
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaSmartNamesForOff, db_alexaSmartNamesForOff, deviceHomematicWandschalter);
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
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaActionNamesForOff, db_alexaActionNamesForOff, deviceHomematicWandschalter);
    // Weitere:
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_Nachtbeleuchtung, nachtbeleuchtung, deviceHomematicWandschalter);
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_TurnOffExitHouseSummer, turnOffExitHouseSummer, deviceHomematicWandschalter);
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_TurnOffExitHouseWinter, turnOffExitHouseWinter, deviceHomematicWandschalter);
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_TurnOnEnterHouseSummer, turnOnEnterHouseSummer, deviceHomematicWandschalter);
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_TurnOnEnterHouseWinter, turnOnEnterHouseWinter, deviceHomematicWandschalter);
}
exports.createHomeaticWandschalter = createHomeaticWandschalter;
function createDatenpunktSingle(adapter, deviceRawId, attributeType, attributeName, attributeValue, category) {
    var stateDatenpunkt = "0_userdata.0.devices.homematic." + category + "." + deviceRawId + "." + attributeName;
    adapter.createState(stateDatenpunkt, attributeValue, {
        name: "H" + deviceRawId.toString().padStart(2, '0'),
        desc: "",
        type: attributeType,
        read: true,
        write: true
    });
}
var cacheRollladenArray = null;
function loadHomematicRollladen(adapter) {
    if (cacheRollladenArray != null) {
        return cacheRollladenArray;
    }
    // @ts-ignore            
    cacheRollladenArray = [];
    adapter.$('state[id=0_userdata.0.devices.homematic.*.*.category]').each(function (datenpunktKey) {
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceHomematicRollladen) {
            // @ts-ignore                            
            cacheRollladenArray.push(new HomematicRollladen(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
            adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
            adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
            adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
            adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
            ));
        }
    });
    cacheRollladenArray = sortArray(cacheRollladenArray);
    return cacheRollladenArray;
}
exports.loadHomematicRollladen = loadHomematicRollladen;
var cacheWandthermostateArray = null;
function loadHomematicWandthermostate(adapter) {
    if (cacheWandthermostateArray != null) {
        return cacheWandthermostateArray;
    }
    // @ts-ignore            
    cacheWandthermostateArray = [];
    adapter.$('state[id=0_userdata.0.devices.homematic.*.*.category]').each(function (datenpunktKey) {
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceHomematicWandthermostat) {
            // @ts-ignore            
            cacheWandthermostateArray.push(new HomematicWandthermostat(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
            adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
            adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
            adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
            adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
            ));
        }
    });
    cacheWandthermostateArray = sortArray(cacheWandthermostateArray);
    return cacheWandthermostateArray;
}
exports.loadHomematicWandthermostate = loadHomematicWandthermostate;
var cachePraesenzmelderArray = null;
function loadHomematicPraesenzmelder(adapter) {
    if (cachePraesenzmelderArray != null) {
        return cachePraesenzmelderArray;
    }
    // @ts-ignore            
    cachePraesenzmelderArray = [];
    adapter.$('state[id=0_userdata.0.devices.homematic.*.*.category]').each(function (datenpunktKey) {
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceHomematicPraesenzmelder) {
            // @ts-ignore                            
            cachePraesenzmelderArray.push(new HomematicPraesenzmelder(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
            adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
            adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
            adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
            adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
            ));
        }
    });
    cachePraesenzmelderArray = sortArray(cachePraesenzmelderArray);
    return cachePraesenzmelderArray;
}
exports.loadHomematicPraesenzmelder = loadHomematicPraesenzmelder;
var cacheWetterstationenArray = null;
function loadHomematicWetterstationen(adapter) {
    if (cacheWetterstationenArray != null) {
        return cacheWetterstationenArray;
    }
    // @ts-ignore            
    cacheWetterstationenArray = [];
    adapter.$('state[id=0_userdata.0.devices.homematic.*.*.category]').each(function (datenpunktKey) {
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceHomematicWetterstation) {
            // @ts-ignore            
            cacheWetterstationenArray.push(new HomematicWetterstation(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
            adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
            adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
            adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
            adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
            ));
        }
    });
    cacheWetterstationenArray = sortArray(cacheWetterstationenArray);
    return cacheWetterstationenArray;
}
exports.loadHomematicWetterstationen = loadHomematicWetterstationen;
var cacheDoorsArray = null;
function loadHomematicDoors(adapter) {
    if (cacheDoorsArray != null) {
        return cacheDoorsArray;
    }
    // @ts-ignore            
    cacheDoorsArray = [];
    adapter.$('state[id=0_userdata.0.devices.homematic.*.*.category]').each(function (datenpunktKey) {
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceHomematicDoor) {
            // @ts-ignore            
            cacheDoorsArray.push(new HomematicDoor(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
            adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
            adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
            adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
            adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
            ));
        }
    });
    cacheDoorsArray = sortArray(cacheDoorsArray);
    return cacheDoorsArray;
}
exports.loadHomematicDoors = loadHomematicDoors;
var cacheWandschalterArray = null;
function loadHomematicWandschalter(adapter) {
    if (cacheWandschalterArray != null) {
        return cacheWandschalterArray;
    }
    // @ts-ignore            
    cacheWandschalterArray = [];
    adapter.$('state[id=0_userdata.0.devices.homematic.*.*.category]').each(function (datenpunktKey) {
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceHomematicWandschalter) {
            // @ts-ignore            
            cacheWandschalterArray.push(new HomematicWandschalter(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
            adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
            adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
            adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
            adapter.getState(datenpunktPraefix + "." + attributeDevice).val, // [4] Device            (z.B. Stehlampe)            
            toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_AlexaSmartNamesForOn).val), // 08 Alexa-Ein     
            toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_AlexaActionNamesForOn).val), // Alexa-Action-Ein, z.B. "Guten morgen" (Würde auch funktionieren, wenn dies bei [06] eingetragen ist)                                           
            toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_AlexaSmartNamesForOff).val), // 09 Alexa-Aus
            toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_AlexaActionNamesForOff).val), // [10] Alexa-Action Aus, z.B. "Gute Nacht". Wir müssen hier zu [09] unterscheiden, da wir über "Gute Nacht" und isActionTurnedOn=true informiert werden.        
            adapter.getState(datenpunktPraefix + "." + attribute_Nachtbeleuchtung).val, // Gehört zur Nachtbeleuchtung ja/nein
            adapter.getState(datenpunktPraefix + "." + attribute_TurnOffExitHouseSummer).val, // turnOffExitHouseSummer (Ausschalten, wenn Haus verlassen - Sommer)
            adapter.getState(datenpunktPraefix + "." + attribute_TurnOffExitHouseWinter).val, // turnOffExitHouseWinter (Ausschalten, wenn Haus verlassen - Winter)
            adapter.getState(datenpunktPraefix + "." + attribute_TurnOnEnterHouseSummer).val, // turnOnEnterHouseSummer (Einschalten, wenn Haus betreten - Sommer)
            adapter.getState(datenpunktPraefix + "." + attribute_TurnOnEnterHouseWinter).val // turnOnEnterHouseWinter (Einschalten, wenn Haus betreten - Winter)                
            ));
        }
    });
    cacheWandschalterArray = sortArray(cacheWandschalterArray);
    return cacheWandschalterArray;
}
exports.loadHomematicWandschalter = loadHomematicWandschalter;
var cacheFussbodenheizungenArray = null;
function loadHomematicFussbodenheizungen(adapter) {
    if (cacheFussbodenheizungenArray != null) {
        return cacheFussbodenheizungenArray;
    }
    // @ts-ignore            
    cacheFussbodenheizungenArray = [];
    adapter.$('state[id=0_userdata.0.devices.homematic.*.*.category]').each(function (datenpunktKey) {
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceHomematicFussbodenheizung) {
            // @ts-ignore            
            cacheFussbodenheizungenArray.push(new HomematicFussbodenheizung(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
            adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
            adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
            adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
            adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
            ));
        }
    });
    cacheFussbodenheizungenArray = sortArray(cacheFussbodenheizungenArray);
    return cacheFussbodenheizungenArray;
}
exports.loadHomematicFussbodenheizungen = loadHomematicFussbodenheizungen;
var cacheWandtasterArray = null;
function loadHomematicWandtaster(adapter) {
    if (cacheWandtasterArray != null) {
        return cacheWandtasterArray;
    }
    // @ts-ignore            
    cacheWandtasterArray = [];
    adapter.$('state[id=0_userdata.0.devices.homematic.*.*.category]').each(function (datenpunktKey) {
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceHomematicWandtaster) {
            // @ts-ignore            
            cacheWandtasterArray.push(new HomematicWandtaster(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
            adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
            adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
            adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
            adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
            ));
        }
    });
    cacheWandtasterArray = sortArray(cacheWandtasterArray);
    return cacheWandtasterArray;
}
exports.loadHomematicWandtaster = loadHomematicWandtaster;
var cacheAccessPointsArray = null;
function loadHomematicAccessPoints(adapter) {
    if (cacheAccessPointsArray != null) {
        return cacheAccessPointsArray;
    }
    // @ts-ignore            
    cacheAccessPointsArray = [];
    adapter.$('state[id=0_userdata.0.devices.homematic.*.*.category]').each(function (datenpunktKey) {
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceHomematicAccessPoint) {
            // @ts-ignore            
            cacheAccessPointsArray.push(new HomematicAccessPoint(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
            adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
            adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
            adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
            adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
            ));
        }
    });
    cacheAccessPointsArray = sortArray(cacheAccessPointsArray);
    return cacheAccessPointsArray;
}
exports.loadHomematicAccessPoints = loadHomematicAccessPoints;
var cacheTemperatursensorenArray = null;
function loadHomematicTemperatursensoren(adapter) {
    if (cacheTemperatursensorenArray != null) {
        return cacheTemperatursensorenArray;
    }
    // @ts-ignore            
    cacheTemperatursensorenArray = [];
    adapter.$('state[id=0_userdata.0.devices.homematic.*.*.category]').each(function (datenpunktKey) {
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceHomematicTemperatursensor) {
            // @ts-ignore            
            cacheTemperatursensorenArray.push(new HomematicTemperatursensor(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
            adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
            adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
            adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
            adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
            ));
        }
    });
    cacheTemperatursensorenArray = sortArray(cacheTemperatursensorenArray);
    return cacheTemperatursensorenArray;
}
exports.loadHomematicTemperatursensoren = loadHomematicTemperatursensoren;
var cacheRauchmelderArray = null;
function loadHomematicRauchmelder(adapter) {
    if (cacheRauchmelderArray != null) {
        return cacheRauchmelderArray;
    }
    // @ts-ignore            
    cacheRauchmelderArray = [];
    adapter.$('state[id=0_userdata.0.devices.homematic.*.*.category]').each(function (datenpunktKey) {
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceHomematicRauchmelder) {
            // @ts-ignore            
            cacheRauchmelderArray.push(new HomematicRauchmelder(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
            adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
            adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
            adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
            adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
            ));
        }
    });
    cacheRauchmelderArray = sortArray(cacheRauchmelderArray);
    return cacheRauchmelderArray;
}
exports.loadHomematicRauchmelder = loadHomematicRauchmelder;
var cacheFunkschaltaktorenArray = null;
function loadHomematicFunktschaltaktoren(adapter) {
    if (cacheFunkschaltaktorenArray != null) {
        return cacheFunkschaltaktorenArray;
    }
    // @ts-ignore            
    cacheFunkschaltaktorenArray = [];
    adapter.$('state[id=0_userdata.0.devices.homematic.*.*.category]').each(function (datenpunktKey) {
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceHomematicFunkSchaltaktor) {
            // @ts-ignore            
            cacheFunkschaltaktorenArray.push(new HomematicFunkschaltaktor(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
            adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
            adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
            adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
            adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
            ));
        }
    });
    cacheFunkschaltaktorenArray = sortArray(cacheFunkschaltaktorenArray);
    return cacheFunkschaltaktorenArray;
}
exports.loadHomematicFunktschaltaktoren = loadHomematicFunktschaltaktoren;
var cacheWindowsArray = null;
function loadHomematicWindows(adapter) {
    if (cacheWindowsArray != null) {
        return cacheWindowsArray;
    }
    // @ts-ignore            
    cacheWindowsArray = [];
    adapter.$('state[id=0_userdata.0.devices.homematic.*.*.category]').each(function (datenpunktKey) {
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceHomematicWindow) {
            // @ts-ignore            
            cacheWindowsArray.push(new HomematicWindow(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
            adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
            adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
            adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
            adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
            ));
        }
    });
    cacheWindowsArray = sortArray(cacheWindowsArray);
    return cacheWindowsArray;
}
exports.loadHomematicWindows = loadHomematicWindows;
var cacheSteckdosenArray = null;
function loadHomematicSteckdosen(adapter) {
    if (cacheSteckdosenArray != null) {
        return cacheSteckdosenArray;
    }
    // @ts-ignore            
    cacheSteckdosenArray = [];
    adapter.$('state[id=0_userdata.0.devices.homematic.*.*.category]').each(function (datenpunktKey) {
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceHomematicSteckdose) {
            // @ts-ignore            
            cacheSteckdosenArray.push(new HomematicSteckdose(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
            adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
            adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
            adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
            adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
            ));
        }
    });
    cacheSteckdosenArray = sortArray(cacheSteckdosenArray);
    return cacheSteckdosenArray;
}
exports.loadHomematicSteckdosen = loadHomematicSteckdosen;
var cacheHeizkoerperArray = null;
function loadHomematicHeizkoerper(adapter) {
    if (cacheHeizkoerperArray != null) {
        return cacheHeizkoerperArray;
    }
    // @ts-ignore            
    cacheHeizkoerperArray = [];
    adapter.$('state[id=0_userdata.0.devices.homematic.*.*.category]').each(function (datenpunktKey) {
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceHomematicHeizkoerper) {
            // @ts-ignore            
            cacheHeizkoerperArray.push(new HomematicHeizkoerper(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
            adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
            adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
            adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
            adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
            ));
        }
    });
    cacheHeizkoerperArray = sortArray(cacheHeizkoerperArray);
    return cacheHeizkoerperArray;
}
exports.loadHomematicHeizkoerper = loadHomematicHeizkoerper;
var cacheDimmerArray = null;
function loadHomematicDimmer(adapter) {
    if (cacheDimmerArray != null) {
        return cacheDimmerArray;
    }
    // @ts-ignore            
    cacheDimmerArray = [];
    adapter.$('state[id=0_userdata.0.devices.homematic.*.*.category]').each(function (datenpunktKey) {
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceHomematicDimmer) {
            // Einschalt-Scheme:
            var alexaOnScheme = null;
            if (adapter.getState(datenpunktPraefix + "." + attributeDimmer_alexaScheme_aktiv).val == true) {
                // @ts-ignore                                                
                alexaOnScheme = new DimmerAlexaScheme(null, adapter.getState(datenpunktPraefix + "." + attributeDimmer_alexaScheme_level).val);
            }
            // Weitere Schemes als Array:
            var schemeArray = [];
            // alexaScheme1: InstanceType<typeof DimmerAlexaScheme>
            if (adapter.getState(datenpunktPraefix + "." + attributeDimmer_alexaScheme1_aktiv).val == true) {
                // @ts-ignore                                                                    
                schemeArray.push(new DimmerAlexaScheme(adapter.getState(datenpunktPraefix + "." + attributeDimmer_alexaScheme1_name).val, adapter.getState(datenpunktPraefix + "." + attributeDimmer_alexaScheme1_level).val));
            }
            // alexaScheme2: InstanceType<typeof DimmerAlexaScheme>
            if (adapter.getState(datenpunktPraefix + "." + attributeDimmer_alexaScheme2_aktiv).val == true) {
                // @ts-ignore                                                                    
                schemeArray.push(new DimmerAlexaScheme(adapter.getState(datenpunktPraefix + "." + attributeDimmer_alexaScheme2_name).val, adapter.getState(datenpunktPraefix + "." + attributeDimmer_alexaScheme2_level).val));
            }
            // alexaScheme3: InstanceType<typeof DimmerAlexaScheme>
            if (adapter.getState(datenpunktPraefix + "." + attributeDimmer_alexaScheme3_aktiv).val == true) {
                // @ts-ignore                                                                    
                schemeArray.push(new DimmerAlexaScheme(adapter.getState(datenpunktPraefix + "." + attributeDimmer_alexaScheme3_name).val, adapter.getState(datenpunktPraefix + "." + attributeDimmer_alexaScheme3_level).val));
            }
            // alexaScheme4: InstanceType<typeof DimmerAlexaScheme>
            if (adapter.getState(datenpunktPraefix + "." + attributeDimmer_alexaScheme4_aktiv).val == true) {
                // @ts-ignore                                                                    
                schemeArray.push(new DimmerAlexaScheme(adapter.getState(datenpunktPraefix + "." + attributeDimmer_alexaScheme4_name).val, adapter.getState(datenpunktPraefix + "." + attributeDimmer_alexaScheme4_level).val));
            }
            // Weitere Schemes als Array:
            var tasterSchemeArray = [];
            // tasterScheme1: InstanceType<typeof DimmerTasterScheme>
            if (adapter.getState(datenpunktPraefix + "." + attributeDimmer_tasterScheme1_aktiv).val == true) {
                // @ts-ignore                                                                    
                tasterSchemeArray.push(new DimmerTasterScheme(adapter.getState(datenpunktPraefix + "." + attributeDimmer_tasterScheme1_name).val, adapter.getState(datenpunktPraefix + "." + attributeDimmer_tasterScheme1_level).val));
            }
            // tasterScheme2: InstanceType<typeof DimmerTasterScheme>
            if (adapter.getState(datenpunktPraefix + "." + attributeDimmer_tasterScheme2_aktiv).val == true) {
                // @ts-ignore                                                                    
                tasterSchemeArray.push(new DimmerTasterScheme(adapter.getState(datenpunktPraefix + "." + attributeDimmer_tasterScheme2_name).val, adapter.getState(datenpunktPraefix + "." + attributeDimmer_tasterScheme2_level).val));
            }
            // tasterScheme3: InstanceType<typeof DimmerTasterScheme>
            if (adapter.getState(datenpunktPraefix + "." + attributeDimmer_tasterScheme3_aktiv).val == true) {
                // @ts-ignore                                                                    
                tasterSchemeArray.push(new DimmerTasterScheme(adapter.getState(datenpunktPraefix + "." + attributeDimmer_tasterScheme3_name).val, adapter.getState(datenpunktPraefix + "." + attributeDimmer_tasterScheme3_level).val));
            }
            // tasterScheme4: InstanceType<typeof DimmerTasterScheme>
            if (adapter.getState(datenpunktPraefix + "." + attributeDimmer_tasterScheme4_aktiv).val == true) {
                // @ts-ignore                                                                    
                tasterSchemeArray.push(new DimmerTasterScheme(adapter.getState(datenpunktPraefix + "." + attributeDimmer_tasterScheme4_name).val, adapter.getState(datenpunktPraefix + "." + attributeDimmer_tasterScheme4_level).val));
            }
            // @ts-ignore            
            cacheDimmerArray.push(new HomematicDimmer(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
            adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
            adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
            adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
            adapter.getState(datenpunktPraefix + "." + attributeDevice).val, // [4] Device            (z.B. Stehlampe)            
            toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_AlexaSmartNamesForOn).val), // 08 Alexa-Ein     
            toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_AlexaActionNamesForOn).val), // Alexa-Action-Ein, z.B. "Guten morgen" (Würde auch funktionieren, wenn dies bei [06] eingetragen ist)                                           
            alexaOnScheme, // [06 A.-Ein-Scheme]
            toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_AlexaSmartNamesForOff).val), // 09 Alexa-Aus
            toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_AlexaActionNamesForOff).val), // [10] Alexa-Action Aus, z.B. "Gute Nacht". Wir müssen hier zu [09] unterscheiden, da wir über "Gute Nacht" und isActionTurnedOn=true informiert werden.        
            schemeArray, // [08 Alexa-Schemes]   
            tasterSchemeArray, // /* [09 TasterBoolOn ]
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
exports.loadHomematicDimmer = loadHomematicDimmer;
//var homematicAllArray = null;
function loadHomematicDevicesAll(adapter) {
    /*if (homematicAllArray != null) {
        return homematicAllArray;
    }*/
    // @ts-ignore            
    var homematicAllArray = [];
    adapter.loadHomematicWandthermostate(adapter).forEach(function (homematic) {
        // @ts-ignore            
        homematicAllArray.push(homematic);
    });
    adapter.loadHomematicPraesenzmelder(adapter).forEach(function (homematic) {
        // @ts-ignore                    
        homematicAllArray.push(homematic);
    });
    adapter.loadHomematicWetterstationen(adapter).forEach(function (homematic) {
        // @ts-ignore                    
        homematicAllArray.push(homematic);
    });
    adapter.loadHomematicDoors(adapter).forEach(function (homematic) {
        // @ts-ignore                    
        homematicAllArray.push(homematic);
    });
    adapter.loadHomematicRollladen(adapter).forEach(function (homematic) {
        // @ts-ignore                    
        homematicAllArray.push(homematic);
    });
    adapter.loadHomematicWandschalter(adapter).forEach(function (homematic) {
        // @ts-ignore                    
        homematicAllArray.push(homematic);
    });
    adapter.loadHomematicFussbodenheizungen(adapter).forEach(function (homematic) {
        // @ts-ignore                    
        homematicAllArray.push(homematic);
    });
    adapter.loadHomematicWandtaster(adapter).forEach(function (homematic) {
        // @ts-ignore                    
        homematicAllArray.push(homematic);
    });
    adapter.loadHomematicAccessPoints(adapter).forEach(function (homematic) {
        // @ts-ignore                    
        homematicAllArray.push(homematic);
    });
    adapter.loadHomematicTemperatursensoren(adapter).forEach(function (homematic) {
        // @ts-ignore                    
        homematicAllArray.push(homematic);
    });
    adapter.loadHomematicRauchmelder(adapter).forEach(function (homematic) {
        // @ts-ignore                    
        homematicAllArray.push(homematic);
    });
    adapter.loadHomematicFunktschaltaktoren(adapter).forEach(function (homematic) {
        // @ts-ignore                    
        homematicAllArray.push(homematic);
    });
    adapter.loadHomematicWindows(adapter).forEach(function (homematic) {
        // @ts-ignore                    
        homematicAllArray.push(homematic);
    });
    adapter.loadHomematicSteckdosen(adapter).forEach(function (homematic) {
        // @ts-ignore                    
        homematicAllArray.push(homematic);
    });
    adapter.loadHomematicHeizkoerper(adapter).forEach(function (homematic) {
        // @ts-ignore                    
        homematicAllArray.push(homematic);
    });
    adapter.loadHomematicDimmer(adapter).forEach(function (homematic) {
        // @ts-ignore                    
        homematicAllArray.push(homematic);
    });
    homematicAllArray = sortArray(homematicAllArray);
    return homematicAllArray;
}
exports.loadHomematicDevicesAll = loadHomematicDevicesAll;
function toStringArray(databaseValue) {
    var stringArray = [];
    if (databaseValue == null) {
        return stringArray;
    }
    else {
        return databaseValue.split('|');
    }
}
function clearHomematicCaches(adapter) {
    //homematicAllArray = null;
    cacheDimmerArray = null;
    cacheHeizkoerperArray = null;
    cacheSteckdosenArray = null;
    cacheWindowsArray = null;
    cacheFunkschaltaktorenArray = null;
    cacheRauchmelderArray = null;
    cacheTemperatursensorenArray = null;
    cacheAccessPointsArray = null;
    cacheWandtasterArray = null;
    cacheFussbodenheizungenArray = null;
    cacheWandschalterArray = null;
    cacheDoorsArray = null;
    cacheWetterstationenArray = null;
    cachePraesenzmelderArray = null;
    cacheWandthermostateArray = null;
    cacheRollladenArray = null;
    adapter.log(">>> Homematic cache cleared!! <<<");
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
module.exports = { createHomematicDevice: createHomematicDevice, createHomeaticDimmer: createHomeaticDimmer, createHomeaticWandschalter: createHomeaticWandschalter, loadHomematicWandthermostate: loadHomematicWandthermostate, loadHomematicPraesenzmelder: loadHomematicPraesenzmelder, loadHomematicWetterstationen: loadHomematicWetterstationen, loadHomematicDoors: loadHomematicDoors, loadHomematicRollladen: loadHomematicRollladen, loadHomematicWandschalter: loadHomematicWandschalter, loadHomematicFussbodenheizungen: loadHomematicFussbodenheizungen, loadHomematicWandtaster: loadHomematicWandtaster, loadHomematicAccessPoints: loadHomematicAccessPoints, loadHomematicTemperatursensoren: loadHomematicTemperatursensoren, loadHomematicRauchmelder: loadHomematicRauchmelder, loadHomematicFunktschaltaktoren: loadHomematicFunktschaltaktoren, loadHomematicWindows: loadHomematicWindows, loadHomematicSteckdosen: loadHomematicSteckdosen, loadHomematicHeizkoerper: loadHomematicHeizkoerper, loadHomematicDimmer: loadHomematicDimmer, loadHomematicDevicesAll: loadHomematicDevicesAll, clearHomematicCaches: clearHomematicCaches };
