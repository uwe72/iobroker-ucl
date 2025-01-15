const { AbstractZigbee, ColorScheme, RGBColorScheme, WhiteColorScheme, ZigbeeLampeRGB, LampeWeissTasterScheme, LampeWeissAlexaScheme, ZigbeeLampeWeiss, ZigbeeSteckdose, ZigbeeSchalter, ZigbeeRepeater, ZigbeeFenstersensor, ZigbeeRauchmelder, ZigbeeBewegungsmelder, ZigbeeWandtaster, ZigbeeDosenrelais,AlexaInputConverter, deviceZigbeeSteckdose, deviceZigbeeBewegungsmelder, deviceZigbeeLampeRGB, deviceZigbeeLampeWeiss, deviceZigbeeRauchmelder, deviceZigbeeWandtaster, deviceZigbeeDosenrelais, deviceZigbeeSchalter, deviceZigbeeRepeater, deviceZigbeeFenstersensor  } = require('./zigbeeClasses.js');

// Alexa:
const attribute_AlexaSmartNamesForOn = "alexaSmartNamesForOn";
const attribute_AlexaActionNamesForOn = "alexaActionNamesForOn";
const attribute_AlexaSmartNamesForOff = "alexaSmartNamesForOff";
const attribute_AlexaActionNamesForOff = "alexaActionNamesForOff";

// Lampe Weiss spezifisch:
const attributeLampeWeissGroup = "group";

const attributeLampWeiss_AlexaColorSchemeForOn_Weiss_aktiv = "alexaColorSchemeForOn_Weiss_aktiv";
const attributeLampWeiss_AlexaColorSchemeForOn_Weiss_level = "alexaColorSchemeForOn_Weiss_level";
const attributeLampWeiss_AlexaColorSchemeForOn_Weiss_ct = "alexaColorSchemeForOn_Weiss_ct";

const attributeLampWeiss_ColorSchemes_Weiss1_aktiv = "alexaColorSchemeForOn_Weiss1_aktiv";
const attributeLampWeiss_ColorSchemes_Weiss1_name = "alexaColorSchemeForOn_Weiss1_name";
const attributeLampWeiss_ColorSchemes_Weiss1_level = "alexaColorSchemeForOn_Weiss1_level";
const attributeLampWeiss_ColorSchemes_Weiss1_ct = "alexaColorSchemeForOn_Weiss1_ct";

const attributeLampWeiss_ColorSchemes_Weiss2_aktiv = "alexaColorSchemeForOn_Weiss2_aktiv";
const attributeLampWeiss_ColorSchemes_Weiss2_name = "alexaColorSchemeForOn_Weiss2_name";
const attributeLampWeiss_ColorSchemes_Weiss2_level = "alexaColorSchemeForOn_Weiss2_level";
const attributeLampWeiss_ColorSchemes_Weiss2_ct = "alexaColorSchemeForOn_Weiss2_ct";

const attributeLampWeiss_ColorSchemes_Weiss3_aktiv = "alexaColorSchemeForOn_Weiss3_aktiv";
const attributeLampWeiss_ColorSchemes_Weiss3_name = "alexaColorSchemeForOn_Weiss3_name";
const attributeLampWeiss_ColorSchemes_Weiss3_level = "alexaColorSchemeForOn_Weiss3_level";
const attributeLampWeiss_ColorSchemes_Weiss3_ct = "alexaColorSchemeForOn_Weiss3_ct";

const attributeLampWeiss_ColorSchemes_Weiss4_aktiv = "alexaColorSchemeForOn_Weiss4_aktiv";
const attributeLampWeiss_ColorSchemes_Weiss4_name = "alexaColorSchemeForOn_Weiss4_name";
const attributeLampWeiss_ColorSchemes_Weiss4_level = "alexaColorSchemeForOn_Weiss4_level";
const attributeLampWeiss_ColorSchemes_Weiss4_ct = "alexaColorSchemeForOn_Weiss4_ct";

const attributeLampWeiss_tasterBoolOn1_aktiv = "tasterBoolOn1_aktiv";
const attributeLampWeiss_tasterBoolOn1_name = "tasterBoolOn1_name";
const attributeLampWeiss_tasterBoolOn1_level = "tasterBoolOn1_level";
const attributeLampWeiss_tasterBoolOn1_ct = "tasterBoolOn1_ct";

const attributeLampWeiss_tasterBoolOn2_aktiv = "tasterBoolOn2_aktiv";
const attributeLampWeiss_tasterBoolOn2_name = "tasterBoolOn2_name";
const attributeLampWeiss_tasterBoolOn2_level = "tasterBoolOn2_level";
const attributeLampWeiss_tasterBoolOn2_ct = "tasterBoolOn2_ct";

const attributeLampWeiss_tasterBoolOn3_aktiv = "tasterBoolOn3_aktiv";
const attributeLampWeiss_tasterBoolOn3_name = "tasterBoolOn3_name";
const attributeLampWeiss_tasterBoolOn3_level = "tasterBoolOn3_level";
const attributeLampWeiss_tasterBoolOn3_ct = "tasterBoolOn3_ct";

const attributeLampWeiss_tasterBoolOn4_aktiv = "tasterBoolOn4_aktiv";
const attributeLampWeiss_tasterBoolOn4_name = "tasterBoolOn4_name";
const attributeLampWeiss_tasterBoolOn4_level = "tasterBoolOn4_level";
const attributeLampWeiss_tasterBoolOn4_ct = "tasterBoolOn4_ct";

// LampeRGB spezifisch:
const attributeRGBLamp_Group = "group";
const attributeRGBLamp_Groupmembers = "groupMembers";

const attributeRGBLamp_AlexaColorSchemeForOn_Farbe_aktiv = "alexaColorSchemeForOn_Farbe_aktiv";
const attributeRGBLamp_AlexaColorSchemeForOn_Farbe_level = "alexaColorSchemeForOn_Farbe_level";
const attributeRGBLamp_AlexaColorSchemeForOn_Farbe_hue = "alexaColorSchemeForOn_Farbe_hue";
const attributeRGBLamp_AlexaColorSchemeForOn_Farbe_sat = "alexaColorSchemeForOn_Farbe_sat";
const attributeRGBLamp_AlexaColorSchemeForOn_Weiss_aktiv = "alexaColorSchemeForOn_Weiss_aktiv";
const attributeRGBLamp_AlexaColorSchemeForOn_Weiss_level = "alexaColorSchemeForOn_Weiss_level";
const attributeRGBLamp_AlexaColorSchemeForOn_Weiss_ct = "alexaColorSchemeForOn_Weiss_ct";

const attributeRGBLamp_ColorSchemes_Farbe1_aktiv = "alexaColorSchemeForOn_Farbe1_aktiv";
const attributeRGBLamp_ColorSchemes_Farbe1_name = "alexaColorSchemeForOn_Farbe1_name";
const attributeRGBLamp_ColorSchemes_Farbe1_level = "alexaColorSchemeForOn_Farbe1_level";
const attributeRGBLamp_ColorSchemes_Farbe1_hue = "alexaColorSchemeForOn_Farbe1_hue";
const attributeRGBLamp_ColorSchemes_Farbe1_sat = "alexaColorSchemeForOn_Farbe1_sat";

const attributeRGBLamp_ColorSchemes_Farbe2_aktiv = "alexaColorSchemeForOn_Farbe2_aktiv";
const attributeRGBLamp_ColorSchemes_Farbe2_name = "alexaColorSchemeForOn_Farbe2_name";
const attributeRGBLamp_ColorSchemes_Farbe2_level = "alexaColorSchemeForOn_Farbe2_level";
const attributeRGBLamp_ColorSchemes_Farbe2_hue = "alexaColorSchemeForOn_Farbe2_hue";
const attributeRGBLamp_ColorSchemes_Farbe2_sat = "alexaColorSchemeForOn_Farbe2_sat";

const attributeRGBLamp_ColorSchemes_Farbe3_aktiv = "alexaColorSchemeForOn_Farbe3_aktiv";
const attributeRGBLamp_ColorSchemes_Farbe3_name = "alexaColorSchemeForOn_Farbe3_name";
const attributeRGBLamp_ColorSchemes_Farbe3_level = "alexaColorSchemeForOn_Farbe3_level";
const attributeRGBLamp_ColorSchemes_Farbe3_hue = "alexaColorSchemeForOn_Farbe3_hue";
const attributeRGBLamp_ColorSchemes_Farbe3_sat = "alexaColorSchemeForOn_Farbe3_sat";

const attributeRGBLamp_ColorSchemes_Farbe4_aktiv = "alexaColorSchemeForOn_Farbe4_aktiv";
const attributeRGBLamp_ColorSchemes_Farbe4_name = "alexaColorSchemeForOn_Farbe4_name";
const attributeRGBLamp_ColorSchemes_Farbe4_level = "alexaColorSchemeForOn_Farbe4_level";
const attributeRGBLamp_ColorSchemes_Farbe4_hue = "alexaColorSchemeForOn_Farbe4_hue";
const attributeRGBLamp_ColorSchemes_Farbe4_sat = "alexaColorSchemeForOn_Farbe4_sat";

const attributeRGBLamp_ColorSchemes_Weiss1_aktiv = "alexaColorSchemeForOn_Weiss1_aktiv";
const attributeRGBLamp_ColorSchemes_Weiss1_name = "alexaColorSchemeForOn_Weiss1_name";
const attributeRGBLamp_ColorSchemes_Weiss1_level = "alexaColorSchemeForOn_Weiss1_level";
const attributeRGBLamp_ColorSchemes_Weiss1_ct = "alexaColorSchemeForOn_Weiss1_ct";

const attributeRGBLamp_ColorSchemes_Weiss2_aktiv = "alexaColorSchemeForOn_Weiss2_aktiv";
const attributeRGBLamp_ColorSchemes_Weiss2_name = "alexaColorSchemeForOn_Weiss2_name";
const attributeRGBLamp_ColorSchemes_Weiss2_level = "alexaColorSchemeForOn_Weiss2_level";
const attributeRGBLamp_ColorSchemes_Weiss2_ct = "alexaColorSchemeForOn_Weiss2_ct";

const attributeRGBLamp_ColorSchemes_Weiss3_aktiv = "alexaColorSchemeForOn_Weiss3_aktiv";
const attributeRGBLamp_ColorSchemes_Weiss3_name = "alexaColorSchemeForOn_Weiss3_name";
const attributeRGBLamp_ColorSchemes_Weiss3_level = "alexaColorSchemeForOn_Weiss3_level";
const attributeRGBLamp_ColorSchemes_Weiss3_ct = "alexaColorSchemeForOn_Weiss3_ct";

const attributeRGBLamp_ColorSchemes_Weiss4_aktiv = "alexaColorSchemeForOn_Weiss4_aktiv";
const attributeRGBLamp_ColorSchemes_Weiss4_name = "alexaColorSchemeForOn_Weiss4_name";
const attributeRGBLamp_ColorSchemes_Weiss4_level = "alexaColorSchemeForOn_Weiss4_level";
const attributeRGBLamp_ColorSchemes_Weiss4_ct = "alexaColorSchemeForOn_Weiss4_ct";

// Dosenrelais:
const attributeDosenrelais_smartNames = "smartNames";

// Lampen/Steckdosen allgemein:
const attribute_TasterBooleanOn = "tasterBooleanOn";
const attribute_TasterBooleanOff = "tasterBooleanOff";
const attribute_Nachtbeleuchtung = "nachtbeleuchtung";
const attribute_TurnOffExitHouseSummer = "turnOffExitHouseSummer";
const attribute_TurnOffExitHouseWinter = "turnOffExitHouseWinter";
const attribute_TurnOnEnterHouseSummer = "turnOnEnterHouseSummer";
const attribute_TurnOnEnterHouseWinter = "turnOnEnterHouseWinter";

// Datenpunkttyp:
const attributeTypeNumber = "number";
const attributeTypeString = "string";
const attributeTypeBoolean = "boolean";

// Allgemein:
const attributeRawID = "rawId";
const attributeBaseState = "baseState";
const attributeEtage = "etage";
const attributeRaum = "raum";
const attributeDevice = "device";
const attributeCategory = "category";

// Standarddevices, ohne zusätzliche Attribute:
export function createZigbeeDevice(adapter:any, rawId: number, baseState: string, etage:string, raum:string, device:string, category:string) {
    createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRawID, rawId, category);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeCategory, category, category);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeBaseState, baseState, category);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeEtage, etage, category);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRaum, raum, category);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeDevice, device, category);
}

// Dosenrelais:
export function createZigbeeDosenrelais(adapter:any, rawId: number, baseState: string, etage:string, raum:string, device:string, smartNames:string[]) {

    // Allgemein:
    createZigbeeDevice(adapter, rawId, baseState, etage, raum, device, deviceZigbeeDosenrelais);

    // Spezifisch:
    var db_smartNames = null;
    smartNames.forEach(value => {
        if (db_smartNames == null) {
            // @ts-ignore                        
            db_smartNames = value;
        } else {
            // @ts-ignore                        
            db_smartNames += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeDosenrelais_smartNames, db_smartNames, deviceZigbeeDosenrelais);
}

// Steckdose:
export function createZigbeeSteckdose(adapter:any, rawId: number, baseState: string, etage: string, raum: string, device: string, alexaSmartNamesForOn:string[],
    alexaActionNamesForOn:string[], alexaSmartNamesForOff: string[],alexaActionNamesForOff: string[], additionalStates4TurnOn:string[], additionalStates4TurnOff:string[]) {

    // Allgemein:
    createZigbeeDevice(adapter, rawId, baseState, etage, raum, device, deviceZigbeeSteckdose);

    // alexaSmartNamesForOn:string[]
    var db_alexaSmartNamesForOn = null;
    alexaSmartNamesForOn.forEach(value => {
        if (db_alexaSmartNamesForOn == null) {
            // @ts-ignore            
            db_alexaSmartNamesForOn = value;
        } else {
            // @ts-ignore            
            db_alexaSmartNamesForOn += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaSmartNamesForOn, db_alexaSmartNamesForOn, deviceZigbeeSteckdose);

    // alexaActionNamesForOn:string[]
    var db_alexaActionNamesForOn = null;
    alexaActionNamesForOn.forEach(value => {
        if (db_alexaActionNamesForOn == null) {
            // @ts-ignore            
            db_alexaActionNamesForOn = value;
        } else {
            // @ts-ignore                        
            db_alexaActionNamesForOn += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaActionNamesForOn, db_alexaActionNamesForOn, deviceZigbeeSteckdose);

    // alexaSmartNamesForOff:string[]
    var db_alexaSmartNamesForOff = null;
    alexaSmartNamesForOff.forEach(value => {
        if (db_alexaSmartNamesForOff == null) {
            // @ts-ignore            
            db_alexaSmartNamesForOff = value;
        } else {
            // @ts-ignore                        
            db_alexaSmartNamesForOff += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaSmartNamesForOff, db_alexaSmartNamesForOff, deviceZigbeeSteckdose);

    // alexaActionNamesForOff:string[]
    var db_alexaActionNamesForOff = null;
    alexaActionNamesForOff.forEach(value => {
        if (db_alexaActionNamesForOff == null) {
            // @ts-ignore                        
            db_alexaActionNamesForOff = value;
        } else {
            // @ts-ignore                        
            db_alexaActionNamesForOff += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaActionNamesForOff, db_alexaActionNamesForOff, deviceZigbeeSteckdose);

    // additionalStates4TurnOn: string[]
    var db_additionalStates4TurnOn = null;
    additionalStates4TurnOn.forEach(value => {
        if (db_additionalStates4TurnOn == null) {
            // @ts-ignore                        
            db_additionalStates4TurnOn = value;
        } else {
            // @ts-ignore                        
            db_additionalStates4TurnOn += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_TasterBooleanOn, db_additionalStates4TurnOn, deviceZigbeeSteckdose);

    // additionalStates4TurnOff: string[]
    var db_additionalStates4TurnOff = null;
    additionalStates4TurnOff.forEach(value => {
        if (db_additionalStates4TurnOff == null) {
            // @ts-ignore                        
            db_additionalStates4TurnOff = value;
        } else {
            // @ts-ignore                        
            db_additionalStates4TurnOff += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_TasterBooleanOff, db_additionalStates4TurnOff, deviceZigbeeSteckdose);
}

// LampeWeiss:
export function createZigbeeLampeWeiss(adapter:any, rawId: number, baseState: string, etage: string, raum: string, device: string, alexaSmartNamesForOn:string[], 
    alexaActionNamesForOn:string[], alexaLevelSchemeForOn: InstanceType<typeof LampeWeissAlexaScheme>, alexaSmartNamesForOff: string[], alexaActionNamesForOff: string[], 
        colorSchemesWeiss1: InstanceType<typeof LampeWeissAlexaScheme>, colorSchemesWeiss2: InstanceType<typeof LampeWeissAlexaScheme>, colorSchemesWeiss3: InstanceType<typeof LampeWeissAlexaScheme>, colorSchemesWeiss4: InstanceType<typeof LampeWeissAlexaScheme>, 
        isGroup: boolean, 
            tasterBooleanOn1: InstanceType<typeof LampeWeissTasterScheme>, tasterBooleanOn2: InstanceType<typeof LampeWeissTasterScheme>, tasterBooleanOn3: InstanceType<typeof LampeWeissTasterScheme>, tasterBooleanOn4: InstanceType<typeof LampeWeissTasterScheme>, 
            tasterBooleanOff: string[], nachtbeleuchtung:boolean, 
            turnOffExitHouseSummer:boolean, turnOffExitHouseWinter:boolean, turnOnEnterHouseSummer:boolean, turnOnEnterHouseWinter:boolean) {

    // Allgemein:
    createZigbeeDevice(adapter, rawId, baseState, etage, raum, device, deviceZigbeeLampeWeiss);

    // alexaSmartNamesForOn:string[]
    var db_alexaSmartNamesForOn = null;
    alexaSmartNamesForOn.forEach(value => {
        if (db_alexaSmartNamesForOn == null) {
            // @ts-ignore                                    
            db_alexaSmartNamesForOn = value;
        } else {
            // @ts-ignore                                    
            db_alexaSmartNamesForOn += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaSmartNamesForOn, db_alexaSmartNamesForOn, deviceZigbeeLampeWeiss);

    // alexaActionNamesForOn:string[]
    var db_alexaActionNamesForOn = null;
    alexaActionNamesForOn.forEach(value => {
        if (db_alexaActionNamesForOn == null) {
            // @ts-ignore                                    
            db_alexaActionNamesForOn = value;
        } else {
            // @ts-ignore                                    
            db_alexaActionNamesForOn += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaActionNamesForOn, db_alexaActionNamesForOn, deviceZigbeeLampeWeiss);

    // alexaSmartNamesForOff:string[]
    var db_alexaSmartNamesForOff = null;
    alexaSmartNamesForOff.forEach(value => {
        if (db_alexaSmartNamesForOff == null) {
            // @ts-ignore                                    
            db_alexaSmartNamesForOff = value;
        } else {
            // @ts-ignore                                    
            db_alexaSmartNamesForOff += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaSmartNamesForOff, db_alexaSmartNamesForOff, deviceZigbeeLampeWeiss);

    // alexaActionNamesForOff:string[]
    var db_alexaActionNamesForOff = null;
    alexaActionNamesForOff.forEach(value => {
        if (db_alexaActionNamesForOff == null) {
            // @ts-ignore                                    
            db_alexaActionNamesForOff = value;
        } else {
            // @ts-ignore                                    
            db_alexaActionNamesForOff += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaActionNamesForOff, db_alexaActionNamesForOff, deviceZigbeeLampeWeiss);

    // tasterBooleanOn1 : LampeWeissTasterScheme
    if (tasterBooleanOn1 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeLampWeiss_tasterBoolOn1_aktiv, true, deviceZigbeeLampeWeiss);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeLampWeiss_tasterBoolOn1_name, tasterBooleanOn1.getTasterBooleanOnName(), deviceZigbeeLampeWeiss);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_tasterBoolOn1_level, tasterBooleanOn1.getLevel(), deviceZigbeeLampeWeiss);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_tasterBoolOn1_ct, tasterBooleanOn1.getCt(), deviceZigbeeLampeWeiss);        
    } else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeLampWeiss_tasterBoolOn1_aktiv, false, deviceZigbeeLampeWeiss);
        /*createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeLampWeiss_tasterBoolOn1_name, null, deviceZigbeeLampeWeiss);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_tasterBoolOn1_level, null, deviceZigbeeLampeWeiss);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_tasterBoolOn1_ct, null, deviceZigbeeLampeWeiss);        */
    }    

    // tasterBooleanOn2 : LampeWeissTasterScheme
    if (tasterBooleanOn2 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeLampWeiss_tasterBoolOn2_aktiv, true, deviceZigbeeLampeWeiss);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeLampWeiss_tasterBoolOn2_name, tasterBooleanOn2.getTasterBooleanOnName(), deviceZigbeeLampeWeiss);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_tasterBoolOn2_level, tasterBooleanOn2.getLevel(), deviceZigbeeLampeWeiss);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_tasterBoolOn2_ct, tasterBooleanOn2.getCt(), deviceZigbeeLampeWeiss);        
    } else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeLampWeiss_tasterBoolOn2_aktiv, false, deviceZigbeeLampeWeiss);
        /*createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeLampWeiss_tasterBoolOn2_name, null, deviceZigbeeLampeWeiss);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_tasterBoolOn2_level, null, deviceZigbeeLampeWeiss);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_tasterBoolOn2_ct, null, deviceZigbeeLampeWeiss);        */
    }    

    // tasterBooleanOn3 : LampeWeissTasterScheme
    if (tasterBooleanOn3 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeLampWeiss_tasterBoolOn3_aktiv, true, deviceZigbeeLampeWeiss);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeLampWeiss_tasterBoolOn3_name, tasterBooleanOn3.getTasterBooleanOnName(), deviceZigbeeLampeWeiss);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_tasterBoolOn3_level, tasterBooleanOn3.getLevel(), deviceZigbeeLampeWeiss);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_tasterBoolOn3_ct, tasterBooleanOn3.getCt(), deviceZigbeeLampeWeiss);        
    } else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeLampWeiss_tasterBoolOn3_aktiv, false, deviceZigbeeLampeWeiss);
        /*createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeLampWeiss_tasterBoolOn3_name, null, deviceZigbeeLampeWeiss);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_tasterBoolOn3_level, null, deviceZigbeeLampeWeiss);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_tasterBoolOn3_ct, null, deviceZigbeeLampeWeiss);        */
    }    

    // tasterBooleanOn4 : LampeWeissTasterScheme
    if (tasterBooleanOn4 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeLampWeiss_tasterBoolOn4_aktiv, true, deviceZigbeeLampeWeiss);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeLampWeiss_tasterBoolOn4_name, tasterBooleanOn4.getTasterBooleanOnName(), deviceZigbeeLampeWeiss);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_tasterBoolOn4_level, tasterBooleanOn4.getLevel(), deviceZigbeeLampeWeiss);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_tasterBoolOn4_ct, tasterBooleanOn4.getCt(), deviceZigbeeLampeWeiss);        
    } else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeLampWeiss_tasterBoolOn4_aktiv, false, deviceZigbeeLampeWeiss);
        /*createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeLampWeiss_tasterBoolOn4_name, null, deviceZigbeeLampeWeiss);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_tasterBoolOn4_level, null, deviceZigbeeLampeWeiss);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_tasterBoolOn4_ct, null, deviceZigbeeLampeWeiss);        */
    }    

    // tasterBooleanOff: string[]
    var db_tasterBooleanOff = null;
    tasterBooleanOff.forEach(value => {
        if (db_tasterBooleanOff == null) {
            // @ts-ignore                                    
            db_tasterBooleanOff = value;
        } else {
            // @ts-ignore                                    
            db_tasterBooleanOff += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_TasterBooleanOff, db_tasterBooleanOff, deviceZigbeeLampeWeiss);

    // Weitere:
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_Nachtbeleuchtung, nachtbeleuchtung, deviceZigbeeLampeWeiss);
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_TurnOffExitHouseSummer, turnOffExitHouseSummer, deviceZigbeeLampeWeiss);
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_TurnOffExitHouseWinter, turnOffExitHouseWinter, deviceZigbeeLampeWeiss);
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_TurnOnEnterHouseSummer, turnOnEnterHouseSummer, deviceZigbeeLampeWeiss);
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_TurnOnEnterHouseWinter, turnOnEnterHouseWinter, deviceZigbeeLampeWeiss);

    // Gruppe:
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeLampeWeissGroup, isGroup, deviceZigbeeLampeWeiss);

    // alexaLevelSchemeForOn: LampeWeissAlexaScheme
    if (alexaLevelSchemeForOn != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeLampWeiss_AlexaColorSchemeForOn_Weiss_aktiv, true, deviceZigbeeLampeWeiss);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_AlexaColorSchemeForOn_Weiss_level, alexaLevelSchemeForOn.getLevel(), deviceZigbeeLampeWeiss);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_AlexaColorSchemeForOn_Weiss_ct, alexaLevelSchemeForOn.getCt(), deviceZigbeeLampeWeiss);
    } else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeLampWeiss_AlexaColorSchemeForOn_Weiss_aktiv, false, deviceZigbeeLampeWeiss);
        /*createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_AlexaColorSchemeForOn_Weiss_level, null, deviceZigbeeLampeWeiss);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_AlexaColorSchemeForOn_Weiss_ct, null, deviceZigbeeLampeWeiss);*/
    }

    // colorSchemesWeiss1: LampeWeissAlexaScheme
    if (colorSchemesWeiss1 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeLampWeiss_ColorSchemes_Weiss1_aktiv, true, deviceZigbeeLampeWeiss);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeLampWeiss_ColorSchemes_Weiss1_name, colorSchemesWeiss1.getAlexaName(), deviceZigbeeLampeWeiss);        
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_ColorSchemes_Weiss1_level, colorSchemesWeiss1.getLevel(), deviceZigbeeLampeWeiss);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_ColorSchemes_Weiss1_ct, colorSchemesWeiss1.getCt(), deviceZigbeeLampeWeiss);
    } else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeLampWeiss_ColorSchemes_Weiss1_aktiv, false, deviceZigbeeLampeWeiss);
        /*createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeLampWeiss_ColorSchemes_Weiss1_name, null, deviceZigbeeLampeWeiss);        
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_ColorSchemes_Weiss1_level, null, deviceZigbeeLampeWeiss);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_ColorSchemes_Weiss1_ct, null, deviceZigbeeLampeWeiss);*/
    }

    // colorSchemesWeiss2: LampeWeissAlexaScheme
    if (colorSchemesWeiss2 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeLampWeiss_ColorSchemes_Weiss2_aktiv, true, deviceZigbeeLampeWeiss);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeLampWeiss_ColorSchemes_Weiss2_name, colorSchemesWeiss2.getAlexaName(), deviceZigbeeLampeWeiss);        
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_ColorSchemes_Weiss2_level, colorSchemesWeiss2.getLevel(), deviceZigbeeLampeWeiss);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_ColorSchemes_Weiss2_ct, colorSchemesWeiss2.getCt(), deviceZigbeeLampeWeiss);
    } else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeLampWeiss_ColorSchemes_Weiss2_aktiv, false, deviceZigbeeLampeWeiss);
        /*createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeLampWeiss_ColorSchemes_Weiss2_name, null, deviceZigbeeLampeWeiss);        
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_ColorSchemes_Weiss2_level, null, deviceZigbeeLampeWeiss);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_ColorSchemes_Weiss2_ct, null, deviceZigbeeLampeWeiss);*/
    }

    // colorSchemesWeiss3: LampeWeissAlexaScheme
    if (colorSchemesWeiss3 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeLampWeiss_ColorSchemes_Weiss3_aktiv, true, deviceZigbeeLampeWeiss);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeLampWeiss_ColorSchemes_Weiss3_name, colorSchemesWeiss3.getAlexaName(), deviceZigbeeLampeWeiss);        
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_ColorSchemes_Weiss3_level, colorSchemesWeiss3.getLevel(), deviceZigbeeLampeWeiss);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_ColorSchemes_Weiss3_ct, colorSchemesWeiss3.getCt(), deviceZigbeeLampeWeiss);
    } else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeLampWeiss_ColorSchemes_Weiss3_aktiv, false, deviceZigbeeLampeWeiss);
        /*createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeLampWeiss_ColorSchemes_Weiss3_name, null, deviceZigbeeLampeWeiss);        
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_ColorSchemes_Weiss3_level, null, deviceZigbeeLampeWeiss);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_ColorSchemes_Weiss3_ct, null, deviceZigbeeLampeWeiss);*/
    }

    // colorSchemesWeiss4: LampeWeissAlexaScheme
    if (colorSchemesWeiss4 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeLampWeiss_ColorSchemes_Weiss4_aktiv, true, deviceZigbeeLampeWeiss);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeLampWeiss_ColorSchemes_Weiss4_name, colorSchemesWeiss4.getAlexaName(), deviceZigbeeLampeWeiss);        
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_ColorSchemes_Weiss4_level, colorSchemesWeiss4.getLevel(), deviceZigbeeLampeWeiss);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_ColorSchemes_Weiss4_ct, colorSchemesWeiss4.getCt(), deviceZigbeeLampeWeiss);
    } else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeLampWeiss_ColorSchemes_Weiss4_aktiv, false, deviceZigbeeLampeWeiss);
        /*createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeLampWeiss_ColorSchemes_Weiss4_name, null, deviceZigbeeLampeWeiss);        
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_ColorSchemes_Weiss4_level, null, deviceZigbeeLampeWeiss);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeLampWeiss_ColorSchemes_Weiss4_ct, null, deviceZigbeeLampeWeiss);*/
    }
}

// LampeRGB:
export function createZigbeeLampeRGB(adapter:any, rawId: number, baseState: string, etage:string, raum:string, device:string, isGroup:boolean, groupMembers:string[], 
    alexaSmartNamesForOn:string[], alexaActionNamesForOn:string[], alexaColorSchemeForOnFarbe: InstanceType<typeof RGBColorScheme>, alexaColorSchemeForOnWeiss: InstanceType<typeof WhiteColorScheme>, alexaSmartNamesForOff: string[],alexaActionNamesForOff: string[], 
    colorSchemesFarbe1: InstanceType<typeof RGBColorScheme>, colorSchemesFarbe2: InstanceType<typeof RGBColorScheme>, colorSchemesFarbe3: InstanceType<typeof RGBColorScheme>, colorSchemesFarbe4: InstanceType<typeof RGBColorScheme>, 
    colorSchemesWeiss1: InstanceType<typeof WhiteColorScheme>, colorSchemesWeiss2: InstanceType<typeof WhiteColorScheme>, colorSchemesWeiss3: InstanceType<typeof WhiteColorScheme>, colorSchemesWeiss4: InstanceType<typeof WhiteColorScheme>, 
    tasterBooleanOn: string[], tasterBooleanOff: string[],nachtbeleuchtung:boolean, turnOffExitHouseSummer:boolean, turnOffExitHouseWinter:boolean, 
    turnOnEnterHouseSummer:boolean, turnOnEnterHouseWinter:boolean) {

    var category: string = deviceZigbeeLampeRGB;

    // Allgemein:
    createZigbeeDevice(adapter, rawId, baseState, etage, raum, device, deviceZigbeeLampeRGB);

    // Lampe-RGB spezifisch:
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeRGBLamp_Group, isGroup, category);
    
    // groupMembers:string[]
    var db_groupMembers = null;
    groupMembers.forEach(value => {
        if (db_groupMembers == null) {
            // @ts-ignore                                    
            db_groupMembers = value;
        } else {
            // @ts-ignore                                    
            db_groupMembers += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRGBLamp_Groupmembers, db_groupMembers, category);

    // alexaSmartNamesForOn:string[]
    var db_alexaSmartNamesForOn = null;
    alexaSmartNamesForOn.forEach(value => {
        if (db_alexaSmartNamesForOn == null) {
            // @ts-ignore                                    
            db_alexaSmartNamesForOn = value;
        } else {
            // @ts-ignore                                    
            db_alexaSmartNamesForOn += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaSmartNamesForOn, db_alexaSmartNamesForOn, category);

    // alexaActionNamesForOn:string[]
    var db_alexaActionNamesForOn = null;
    alexaActionNamesForOn.forEach(value => {
        if (db_alexaActionNamesForOn == null) {
            // @ts-ignore                                    
            db_alexaActionNamesForOn = value;
        } else {
            // @ts-ignore                                    
            db_alexaActionNamesForOn += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaActionNamesForOn, db_alexaActionNamesForOn, category);

    // alexaSmartNamesForOff:string[]
    var db_alexaSmartNamesForOff = null;
    alexaSmartNamesForOff.forEach(value => {
        if (db_alexaSmartNamesForOff == null) {
            // @ts-ignore                                    
            db_alexaSmartNamesForOff = value;
        } else {
            // @ts-ignore                                    
            db_alexaSmartNamesForOff += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaSmartNamesForOff, db_alexaSmartNamesForOff, category);

    // alexaActionNamesForOff:string[]
    var db_alexaActionNamesForOff = null;
    alexaActionNamesForOff.forEach(value => {
        if (db_alexaActionNamesForOff == null) {
            // @ts-ignore                                    
            db_alexaActionNamesForOff = value;
        } else {
            // @ts-ignore                                    
            db_alexaActionNamesForOff += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaActionNamesForOff, db_alexaActionNamesForOff, category);

    // tasterBooleanOn: string[]
    var db_tasterBooleanOn = null;
    tasterBooleanOn.forEach(value => {
        if (db_tasterBooleanOn == null) {
            // @ts-ignore                                    
            db_tasterBooleanOn = value;
        } else {
            // @ts-ignore                                    
            db_tasterBooleanOn += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_TasterBooleanOn, db_tasterBooleanOn, category);

    // tasterBooleanOff: string[]
    var db_tasterBooleanOff = null;
    tasterBooleanOff.forEach(value => {
        if (db_tasterBooleanOff == null) {
            // @ts-ignore                                    
            db_tasterBooleanOff = value;
        } else {
            // @ts-ignore                                    
            db_tasterBooleanOff += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_TasterBooleanOff, db_tasterBooleanOff, category);

    // Weitere:
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_Nachtbeleuchtung, nachtbeleuchtung, category);
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_TurnOffExitHouseSummer, turnOffExitHouseSummer, category);
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_TurnOffExitHouseWinter, turnOffExitHouseWinter, category);
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_TurnOnEnterHouseSummer, turnOnEnterHouseSummer, category);
    createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attribute_TurnOnEnterHouseWinter, turnOnEnterHouseWinter, category);

    // alexaColorSchemeForOnFarbe: RGBColorScheme
    if (alexaColorSchemeForOnFarbe != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeRGBLamp_AlexaColorSchemeForOn_Farbe_aktiv, true, category);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_AlexaColorSchemeForOn_Farbe_level, alexaColorSchemeForOnFarbe.getLevel(), category);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_AlexaColorSchemeForOn_Farbe_hue, alexaColorSchemeForOnFarbe.getHue(), category);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_AlexaColorSchemeForOn_Farbe_sat, alexaColorSchemeForOnFarbe.getSat(), category);
    } else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeRGBLamp_AlexaColorSchemeForOn_Farbe_aktiv, false, category);
        /*createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_AlexaColorSchemeForOn_Farbe_level, null, category);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_AlexaColorSchemeForOn_Farbe_hue, null, category);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_AlexaColorSchemeForOn_Farbe_sat, null, category);*/
    }

    // alexaColorSchemeForOnWeiss: WhiteColorScheme
    if (alexaColorSchemeForOnWeiss != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeRGBLamp_AlexaColorSchemeForOn_Weiss_aktiv, true, category);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_AlexaColorSchemeForOn_Weiss_level, alexaColorSchemeForOnWeiss.getLevel(), category);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_AlexaColorSchemeForOn_Weiss_ct, alexaColorSchemeForOnWeiss.getCt(), category);
    } else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeRGBLamp_AlexaColorSchemeForOn_Weiss_aktiv, false, category);
        /*createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_AlexaColorSchemeForOn_Weiss_level, null, category);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_AlexaColorSchemeForOn_Weiss_ct, null, category);*/
    }

    // colorSchemesFarbe1: RGBColorScheme
    if (colorSchemesFarbe1 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeRGBLamp_ColorSchemes_Farbe1_aktiv, true, category);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRGBLamp_ColorSchemes_Farbe1_name, colorSchemesFarbe1.getAlexaName(), category);        
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe1_level, colorSchemesFarbe1.getLevel(), category);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe1_hue, colorSchemesFarbe1.getHue(), category);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe1_sat, colorSchemesFarbe1.getSat(), category);
    } else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeRGBLamp_ColorSchemes_Farbe1_aktiv, false, category);
        /*createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRGBLamp_ColorSchemes_Farbe1_name, null, category);        
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe1_level, null, category);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe1_hue, null, category);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe1_sat, null, category);*/
    }

    // colorSchemesFarbe2: RGBColorScheme
    if (colorSchemesFarbe2 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeRGBLamp_ColorSchemes_Farbe2_aktiv, true, category);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRGBLamp_ColorSchemes_Farbe2_name, colorSchemesFarbe2.getAlexaName(), category);        
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe2_level, colorSchemesFarbe2.getLevel(), category);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe2_hue, colorSchemesFarbe2.getHue(), category);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe2_sat, colorSchemesFarbe2.getSat(), category);
    } else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeRGBLamp_ColorSchemes_Farbe2_aktiv, false, category);
        /*createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRGBLamp_ColorSchemes_Farbe2_name, null, category);        
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe2_level, null, category);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe2_hue, null, category);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe2_sat, null, category);*/
    }

    // colorSchemesFarbe3: RGBColorScheme
    if (colorSchemesFarbe3 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeRGBLamp_ColorSchemes_Farbe3_aktiv, true, category);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRGBLamp_ColorSchemes_Farbe3_name, colorSchemesFarbe3.getAlexaName(), category);        
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe3_level, colorSchemesFarbe3.getLevel(), category);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe3_hue, colorSchemesFarbe3.getHue(), category);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe3_sat, colorSchemesFarbe3.getSat(), category);
    } else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeRGBLamp_ColorSchemes_Farbe3_aktiv, false, category);
        /*createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRGBLamp_ColorSchemes_Farbe3_name, null, category);        
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe3_level, null, category);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe3_hue, null, category);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe3_sat, null, category);*/
    }

    // colorSchemesFarbe4: RGBColorScheme
    if (colorSchemesFarbe4 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeRGBLamp_ColorSchemes_Farbe4_aktiv, true, category);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRGBLamp_ColorSchemes_Farbe4_name, colorSchemesFarbe4.getAlexaName(), category);        
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe4_level, colorSchemesFarbe4.getLevel(), category);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe4_hue, colorSchemesFarbe4.getHue(), category);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe4_sat, colorSchemesFarbe4.getSat(), category);
    } else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeRGBLamp_ColorSchemes_Farbe4_aktiv, false, category);
        /*createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRGBLamp_ColorSchemes_Farbe4_name, null, category);        
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe4_level, null, category);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe4_hue, null, category);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Farbe4_sat, null, category);*/
    }

    // colorSchemesWeiss1: WhiteColorScheme
    if (colorSchemesWeiss1 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeRGBLamp_ColorSchemes_Weiss1_aktiv, true, category);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRGBLamp_ColorSchemes_Weiss1_name, colorSchemesWeiss1.getAlexaName(), category);        
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Weiss1_level, colorSchemesWeiss1.getLevel(), category);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Weiss1_ct, colorSchemesWeiss1.getCt(), category);
    } else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeRGBLamp_ColorSchemes_Weiss1_aktiv, false, category);
        /*createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRGBLamp_ColorSchemes_Weiss1_name, null, category);        
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Weiss1_level, null, category);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Weiss1_ct, null, category);*/
    }

    // colorSchemesWeiss2: WhiteColorScheme
    if (colorSchemesWeiss2 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeRGBLamp_ColorSchemes_Weiss2_aktiv, true, category);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRGBLamp_ColorSchemes_Weiss2_name, colorSchemesWeiss2.getAlexaName(), category);        
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Weiss2_level, colorSchemesWeiss2.getLevel(), category);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Weiss2_ct, colorSchemesWeiss2.getCt(), category);
    } else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeRGBLamp_ColorSchemes_Weiss2_aktiv, false, category);
        /*createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRGBLamp_ColorSchemes_Weiss2_name, null, category);        
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Weiss2_level, null, category);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Weiss2_ct, null, category);*/
    }

    // colorSchemesWeiss3: WhiteColorScheme
    if (colorSchemesWeiss3 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeRGBLamp_ColorSchemes_Weiss3_aktiv, true, category);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRGBLamp_ColorSchemes_Weiss3_name, colorSchemesWeiss3.getAlexaName(), category);        
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Weiss3_level, colorSchemesWeiss3.getLevel(), category);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Weiss3_ct, colorSchemesWeiss3.getCt(), category);
    } else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeRGBLamp_ColorSchemes_Weiss3_aktiv, false, category);
       
        /*createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRGBLamp_ColorSchemes_Weiss3_name, null, category);        
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Weiss3_level, null, category);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Weiss3_ct, null, category);*/
    }

    // colorSchemesWeiss4: WhiteColorScheme
    if (colorSchemesWeiss4 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeRGBLamp_ColorSchemes_Weiss4_aktiv, true, category);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRGBLamp_ColorSchemes_Weiss4_name, colorSchemesWeiss4.getAlexaName(), category);        
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Weiss4_level, colorSchemesWeiss4.getLevel(), category);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Weiss4_ct, colorSchemesWeiss4.getCt(), category);
    } else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeRGBLamp_ColorSchemes_Weiss4_aktiv, false, category);
        /*createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRGBLamp_ColorSchemes_Weiss4_name, null, category);        
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Weiss4_level, null, category);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRGBLamp_ColorSchemes_Weiss4_ct, null, category);*/
    }
}

function createDatenpunktSingle(adapter:any, deviceRawId, attributeType, attributeName, attributeValue, category:string) {
    var stateDatenpunkt = "0_userdata.0.devices.zigbee." + category + "." + deviceRawId + "." + attributeName;
    adapter.createState(stateDatenpunkt, attributeValue, {
        name: "Z" + deviceRawId.toString().padStart(3, '0'),
        desc: "",
        type: attributeType, 
        read: true,
        write: true
    });
    /*if (adapter.getState(stateDatenpunkt).val != attributeValue) {
        adapter.setState(stateDatenpunkt, attributeValue);
    }*/
}

function toStringArray(databaseValue) { // z.B. "Werkbank|Arbeiten|Keller"
    var stringArray = [];
    if (databaseValue == null) {
        return stringArray;
    } else {
        return databaseValue.split('|');
    }
}

var cacheSteckdosenArray = null;
export function loadZigbeeSteckdosen(adapter: any) {
    if (cacheSteckdosenArray != null) {
        return cacheSteckdosenArray;
    }
    // @ts-ignore            
    cacheSteckdosenArray = [];
    adapter.$('state[id=0_userdata.0.devices.zigbee.*.*.category]').each(datenpunktKey => {  // 0_userdata.0.devices.zigbee.Steckdose.30.category;
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceZigbeeSteckdose) {
            // @ts-ignore            
            cacheSteckdosenArray.push(new ZigbeeSteckdose(adapter,
                adapter.getState(datenpunktPraefix + "." + attributeRawID).val,                                 // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val,                             // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val,                                 // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val,                                  // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val,                                // [4] Device            (z.B. Stehlampe)            
                toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_AlexaSmartNamesForOn).val),     // 08 Alexa-Ein
                toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_AlexaActionNamesForOn).val),     // Alexa-Action-Ein, z.B. "Guten morgen" (Würde auch funktionieren, wenn dies bei [06] eingetragen ist)                
                toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_AlexaSmartNamesForOff).val),    // 09 Alexa-Aus
                toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_AlexaActionNamesForOff).val),    // [10] Alexa-Action Aus, z.B. "Gute Nacht". Wir müssen hier zu [09] unterscheiden, da wir über "Gute Nacht" und isActionTurnedOn=true informiert werden.        
                toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_TasterBooleanOn).val),           // 07 TunrnOn-DP
                toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_TasterBooleanOff).val)           // 08 TasterBoolOff-DP                    
            ));                    
        }
    });
    cacheSteckdosenArray = sortArray(cacheSteckdosenArray);                                            
    return cacheSteckdosenArray;
}

var cacheBewegungsmelderArray = null;
export function loadZigbeeBewegungsmelder(adapter: any) {
    if (cacheBewegungsmelderArray != null) {
        return cacheBewegungsmelderArray;
    }
    // @ts-ignore            
    cacheBewegungsmelderArray = [];
    adapter.$('state[id=0_userdata.0.devices.zigbee.*.*.category]').each(datenpunktKey => {  // 0_userdata.0.devices.zigbee.Steckdose.30.category;
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceZigbeeBewegungsmelder) {
            // @ts-ignore            
            cacheBewegungsmelderArray.push(new ZigbeeBewegungsmelder(adapter,
                adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
            ));
        }
    });
    cacheBewegungsmelderArray = sortArray(cacheBewegungsmelderArray);                                        
    return cacheBewegungsmelderArray;
}

var cacheLampenRGBArray = null;
export function loadZigbeeLampenRGB(adapter: any) {
    if (cacheLampenRGBArray != null) {
        return cacheLampenRGBArray;
    }
    // @ts-ignore            
    cacheLampenRGBArray = [];
    adapter.$('state[id=0_userdata.0.devices.zigbee.*.*.category]').each(datenpunktKey => {  // 0_userdata.0.devices.zigbee.Steckdose.30.category;
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceZigbeeLampeRGB) {

            // Einschalt-Scheme:
            var alexaOnScheme = null;
            if (adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_AlexaColorSchemeForOn_Farbe_aktiv).val == true) {
                alexaOnScheme = new RGBColorScheme(null,
                    adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_AlexaColorSchemeForOn_Farbe_level).val,
                    adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_AlexaColorSchemeForOn_Farbe_hue).val,
                    adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_AlexaColorSchemeForOn_Farbe_sat).val
                );
            } else if (adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_AlexaColorSchemeForOn_Weiss_aktiv).val == true) {
                alexaOnScheme = new WhiteColorScheme(null,
                    adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_AlexaColorSchemeForOn_Weiss_level).val,
                    adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_AlexaColorSchemeForOn_Weiss_ct).val
                );
            }

            // Weitere Schemes als Array:
            var schemeArray = [];

            // RGBColorScheme1:
            if (adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Farbe1_aktiv).val == true) {
                // @ts-ignore                                                
                schemeArray.push(new RGBColorScheme(
                    adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Farbe1_name).val,
                    adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Farbe1_level).val,
                    adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Farbe1_hue).val,
                    adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Farbe1_sat).val
                ));
            }

            // RGBColorScheme2:
            if (adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Farbe2_aktiv).val == true) {
                // @ts-ignore                                                
                schemeArray.push(new RGBColorScheme(
                    adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Farbe2_name).val,
                    adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Farbe2_level).val,
                    adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Farbe2_hue).val,
                    adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Farbe2_sat).val
                ));
            }

            // RGBColorScheme3:
            if (adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Farbe3_aktiv).val == true) {
                // @ts-ignore                                                
                schemeArray.push(new RGBColorScheme(
                    adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Farbe3_name).val,
                    adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Farbe3_level).val,
                    adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Farbe3_hue).val,
                    adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Farbe3_sat).val
                ));
            }

            // RGBColorScheme4:
            if (adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Farbe4_aktiv).val == true) {
                // @ts-ignore                                                
                schemeArray.push(new RGBColorScheme(
                    adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Farbe4_name).val,
                    adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Farbe4_level).val,
                    adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Farbe4_hue).val,
                    adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Farbe4_sat).val
                ));
            }

            // WhiteColorScheme1:
            if (adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Weiss1_aktiv).val == true) {
                // @ts-ignore                                                
                schemeArray.push(new WhiteColorScheme(
                    adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Weiss1_name).val,
                    adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Weiss1_level).val,
                    adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Weiss1_ct).val
                ));
            }

            // WhiteColorScheme2:
            if (adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Weiss2_aktiv).val == true) {
                // @ts-ignore                                                
                schemeArray.push(new WhiteColorScheme(
                    adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Weiss2_name).val,
                    adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Weiss2_level).val,
                    adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Weiss2_ct).val
                ));
            }

            // WhiteColorScheme3:
            if (adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Weiss3_aktiv).val == true) {
                // @ts-ignore                                                
                schemeArray.push(new WhiteColorScheme(
                    adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Weiss3_name).val,
                    adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Weiss3_level).val,
                    adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Weiss3_ct).val
                ));
            }

            // WhiteColorScheme4:
            if (adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Weiss4_aktiv).val == true) {
                // @ts-ignore                                                
                schemeArray.push(new WhiteColorScheme(
                    adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Weiss4_name).val,
                    adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Weiss4_level).val,
                    adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_ColorSchemes_Weiss4_ct).val
                ));
            }

            // @ts-ignore            
            cacheLampenRGBArray.push(new ZigbeeLampeRGB(adapter,
                adapter.getState(datenpunktPraefix + "." + attributeRawID).val,             // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val,         // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val,             // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val,              // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val,            // [4] Device            (z.B. Stehlampe)            
                adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_Group).val,     // [5] Gruppe
                toStringArray(adapter.getState(datenpunktPraefix + "." + attributeRGBLamp_Groupmembers).val),           // [6] Gruppenmitglieder
                toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_AlexaSmartNamesForOn).val),   // 08 Alexa-Ein
                toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_AlexaActionNamesForOn).val),   // Alexa-Action-Ein, z.B. "Guten morgen" (Würde auch funktionieren, wenn dies bei [06] eingetragen ist)                
                alexaOnScheme,                                                                                      // [09 A.-Ein-Scheme]   
                toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_AlexaSmartNamesForOff).val),   // 10 Alexa-Aus                   
                toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_AlexaActionNamesForOff).val),   // [10] Alexa-Action Aus, z.B. "Gute Nacht". Wir müssen hier zu [09] unterscheiden, da wir über "Gute Nacht" und isActionTurnedOn=true informiert werden.                
                schemeArray, // [12 Alexa-Schemes]  
                toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_TasterBooleanOn).val),           // 13 TasterBoolOn
                toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_TasterBooleanOff).val),           // 14 TasterBoolOff
                adapter.getState(datenpunktPraefix + "." + attribute_Nachtbeleuchtung).val,     // Gehört zur Nachtbeleuchtung ja/nein
                adapter.getState(datenpunktPraefix + "." + attribute_TurnOffExitHouseSummer).val, // turnOffExitHouseSummer (Ausschalten, wenn Haus verlassen - Sommer)
                adapter.getState(datenpunktPraefix + "." + attribute_TurnOffExitHouseWinter).val, // turnOffExitHouseWinter (Ausschalten, wenn Haus verlassen - Winter)
                adapter.getState(datenpunktPraefix + "." + attribute_TurnOnEnterHouseSummer).val, // turnOnEnterHouseSummer (Einschalten, wenn Haus betreten - Sommer)
                adapter.getState(datenpunktPraefix + "." + attribute_TurnOnEnterHouseWinter).val  // turnOnEnterHouseWinter (Einschalten, wenn Haus betreten - Winter)
            ));
        }
    });
    cacheLampenRGBArray = sortArray(cacheLampenRGBArray);                                    
    return cacheLampenRGBArray;
}

var cacheLampenWeissArray = null;
export function loadZigbeeLampenWeiss(adapter: any) {
    if (cacheLampenWeissArray != null) {
        return cacheLampenWeissArray;
    }
    // @ts-ignore            
    cacheLampenWeissArray = [];
    adapter.$('state[id=0_userdata.0.devices.zigbee.*.*.category]').each(datenpunktKey => {  // 0_userdata.0.devices.zigbee.Steckdose.30.category;
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceZigbeeLampeWeiss) {
            // Einschalt-Scheme:
            var alexaOnScheme = null;
            if (adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_AlexaColorSchemeForOn_Weiss_aktiv).val == true) {
                // @ts-ignore                                                
                alexaOnScheme = new LampeWeissAlexaScheme(null,
                    adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_AlexaColorSchemeForOn_Weiss_level).val,
                    adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_AlexaColorSchemeForOn_Weiss_ct).val
                );
            }

            // Weitere Schemes als Array:
            var schemeArray = [];

            // WhiteColorScheme1:
            if (adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_ColorSchemes_Weiss1_aktiv).val == true) {
                // @ts-ignore                                                                    
                schemeArray.push(new LampeWeissAlexaScheme(
                    adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_ColorSchemes_Weiss1_name).val,
                    adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_ColorSchemes_Weiss1_level).val,
                    adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_ColorSchemes_Weiss1_ct).val
                ));
            }

            // WhiteColorScheme2:
            if (adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_ColorSchemes_Weiss2_aktiv).val == true) {
                // @ts-ignore                                                                    
                schemeArray.push(new LampeWeissAlexaScheme(
                    adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_ColorSchemes_Weiss2_name).val,
                    adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_ColorSchemes_Weiss2_level).val,
                    adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_ColorSchemes_Weiss2_ct).val
                ));
            }

            // WhiteColorScheme3:
            if (adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_ColorSchemes_Weiss3_aktiv).val == true) {
                // @ts-ignore                                                                    
                schemeArray.push(new LampeWeissAlexaScheme(
                    adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_ColorSchemes_Weiss3_name).val,
                    adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_ColorSchemes_Weiss3_level).val,
                    adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_ColorSchemes_Weiss3_ct).val
                ));
            }

            // WhiteColorScheme4:
            if (adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_ColorSchemes_Weiss4_aktiv).val == true) {
                // @ts-ignore                                                                    
                schemeArray.push(new LampeWeissAlexaScheme(
                    adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_ColorSchemes_Weiss4_name).val,
                    adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_ColorSchemes_Weiss4_level).val,
                    adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_ColorSchemes_Weiss4_ct).val
                ));
            }

            // Taster Boolean On Schemes:
            var tasterOnBoolschemeArray = [];

            // LampeWeissTasterScheme1:
            //constructor(tasterBooleanOn: string, level: number, ct: number) {
            if (adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_tasterBoolOn1_aktiv).val == true) {
                // @ts-ignore                                                                    
                tasterOnBoolschemeArray.push(new LampeWeissTasterScheme( 
                    adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_tasterBoolOn1_name).val,
                    adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_tasterBoolOn1_level).val,
                    adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_tasterBoolOn1_ct).val
                ));
            }

            // LampeWeissTasterScheme2:
            if (adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_tasterBoolOn2_aktiv).val == true) {
                // @ts-ignore                                                                    
                tasterOnBoolschemeArray.push(new LampeWeissTasterScheme (
                    adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_tasterBoolOn2_name).val,
                    adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_tasterBoolOn2_level).val,
                    adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_tasterBoolOn2_ct).val
                ));
            }

            // LampeWeissTasterScheme3:
            if (adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_tasterBoolOn3_aktiv).val == true) {
                // @ts-ignore                                                                    
                tasterOnBoolschemeArray.push(new LampeWeissTasterScheme (
                    adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_tasterBoolOn3_name).val,
                    adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_tasterBoolOn3_level).val,
                    adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_tasterBoolOn3_ct).val
                ));
            }

            // LampeWeissTasterScheme4:
            if (adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_tasterBoolOn4_aktiv).val == true) {
                // @ts-ignore                                                                    
                tasterOnBoolschemeArray.push(new LampeWeissTasterScheme (
                    adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_tasterBoolOn4_name).val,
                    adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_tasterBoolOn4_level).val,
                    adapter.getState(datenpunktPraefix + "." + attributeLampWeiss_tasterBoolOn4_ct).val
                ));
            }

            // @ts-ignore            
            cacheLampenWeissArray.push(new ZigbeeLampeWeiss(adapter,
                adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val,     // [4] Device            (z.B. Stehlampe)            
                toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_AlexaSmartNamesForOn).val),   // 08 Alexa-Ein
                toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_AlexaActionNamesForOn).val),   // Alexa-Action-Ein, z.B. "Guten morgen" (Würde auch funktionieren, wenn dies bei [06] eingetragen ist)                
                alexaOnScheme,                                                    // [06 A.-Ein-Scheme]   */  new LampeWeissAlexaScheme(null, 100, -1), // Letzter Paramter = -1 heußt, dass diese Lampe keine Farbtemperatur unterstützt. Ansonsten hier die Temperatur angeben
                toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_AlexaSmartNamesForOff).val),   // 09 Alexa-Aus
                toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_AlexaActionNamesForOff).val),   // [10] Alexa-Action Aus, z.B. "Gute Nacht". Wir müssen hier zu [09] unterscheiden, da wir über "Gute Nacht" und isActionTurnedOn=true informiert werden.        
                schemeArray, //  [08 Alexa-Schemes]  
                adapter.getState(datenpunktPraefix + "." + attributeLampeWeissGroup).val,     // [6] Gruppe
                tasterOnBoolschemeArray, // [07 TasterBoolOn ]
                toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_TasterBooleanOff).val),           // 14 TasterBoolOff
                adapter.getState(datenpunktPraefix + "." + attribute_Nachtbeleuchtung).val,     // Gehört zur Nachtbeleuchtung ja/nein
                adapter.getState(datenpunktPraefix + "." + attribute_TurnOffExitHouseSummer).val, // turnOffExitHouseSummer (Ausschalten, wenn Haus verlassen - Sommer)
                adapter.getState(datenpunktPraefix + "." + attribute_TurnOffExitHouseWinter).val, // turnOffExitHouseWinter (Ausschalten, wenn Haus verlassen - Winter)
                adapter.getState(datenpunktPraefix + "." + attribute_TurnOnEnterHouseSummer).val, // turnOnEnterHouseSummer (Einschalten, wenn Haus betreten - Sommer)
                adapter.getState(datenpunktPraefix + "." + attribute_TurnOnEnterHouseWinter).val  // turnOnEnterHouseWinter (Einschalten, wenn Haus betreten - Winter)
            ));
        }
    });
    cacheLampenWeissArray = sortArray(cacheLampenWeissArray);                                
    return cacheLampenWeissArray;
}

var cacheRauchmelderArray = null;
export function loadZigbeeRauchmelder(adapter: any) {
    if (cacheRauchmelderArray != null) {
        return cacheRauchmelderArray;
    }
    // @ts-ignore            
    cacheRauchmelderArray = [];
    adapter.$('state[id=0_userdata.0.devices.zigbee.*.*.category]').each(datenpunktKey => {  // 0_userdata.0.devices.zigbee.Steckdose.30.category;
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceZigbeeRauchmelder) {
            // @ts-ignore                            
            cacheRauchmelderArray.push(new ZigbeeRauchmelder(adapter,
                adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
            ));
        }
    });
    cacheRauchmelderArray = sortArray(cacheRauchmelderArray);                            
    return cacheRauchmelderArray;
}

var cacheWandtasterArray = null;
export function loadZigbeeWandtaster(adapter: any) {
    if (cacheWandtasterArray != null) {
        return cacheWandtasterArray;
    }
    // @ts-ignore            
    cacheWandtasterArray = [];
    adapter.$('state[id=0_userdata.0.devices.zigbee.*.*.category]').each(datenpunktKey => {  // 0_userdata.0.devices.zigbee.Steckdose.30.category;
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceZigbeeWandtaster) {
            // @ts-ignore            
            cacheWandtasterArray.push(new ZigbeeWandtaster(adapter,
                adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
            ));
        }
    });
    cacheWandtasterArray = sortArray(cacheWandtasterArray);                        
    return cacheWandtasterArray;
}

var cacheDosenrelaisArray = null;
export function loadZigbeeDosenrelais(adapter: any) {
    if (cacheDosenrelaisArray != null) {
        return cacheDosenrelaisArray;
    }
    // @ts-ignore            
    cacheDosenrelaisArray = [];
    adapter.$('state[id=0_userdata.0.devices.zigbee.*.*.category]').each(datenpunktKey => {  // 0_userdata.0.devices.zigbee.Steckdose.30.category;
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceZigbeeDosenrelais) {
            // @ts-ignore            
            cacheDosenrelaisArray.push(new ZigbeeDosenrelais(adapter,
                adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val,     // [4] Device            (z.B. Stehlampe)         
                toStringArray(adapter.getState(datenpunktPraefix + "." + attributeDosenrelais_smartNames).val)           // 14 TasterBoolOff
            ));
        }
    });
    cacheDosenrelaisArray = sortArray(cacheDosenrelaisArray);                    
    return cacheDosenrelaisArray;
}

var cacheSchalterArray = null;
export function loadZigbeeSchalter(adapter: any) {
    if (cacheSchalterArray != null) {
        return cacheSchalterArray;
    }
    // @ts-ignore            
    cacheSchalterArray = [];
    adapter.$('state[id=0_userdata.0.devices.zigbee.*.*.category]').each(datenpunktKey => {  // 0_userdata.0.devices.zigbee.Steckdose.30.category;
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceZigbeeSchalter) {
            // @ts-ignore            
            cacheSchalterArray.push(new ZigbeeSchalter(adapter,
                adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
            ));
        }
    });
    cacheSchalterArray = sortArray(cacheSchalterArray);                
    return cacheSchalterArray;
}

var cacheRepeaterArray = null;
export function loadZigbeeRepeater(adapter: any) {
    if (cacheRepeaterArray != null) {
        return cacheRepeaterArray;
    }
    // @ts-ignore            
    cacheRepeaterArray = [];
    adapter.$('state[id=0_userdata.0.devices.zigbee.*.*.category]').each(datenpunktKey => {  // 0_userdata.0.devices.zigbee.Steckdose.30.category;
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceZigbeeRepeater) {
            // @ts-ignore            
            cacheRepeaterArray.push(new ZigbeeRepeater(adapter,
                adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
            ));
        }
    });
    cacheRepeaterArray = sortArray(cacheRepeaterArray);            
    return cacheRepeaterArray;
}

var cacheFenstersensorenArray = null;
export function loadZigbeeFenstersensor(adapter: any) {
    if (cacheFenstersensorenArray != null) {
        return cacheFenstersensorenArray;
    }
    // @ts-ignore            
    cacheFenstersensorenArray = [];
    adapter.$('state[id=0_userdata.0.devices.zigbee.*.*.category]').each(datenpunktKey => {  // 0_userdata.0.devices.zigbee.Steckdose.30.category;
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceZigbeeFenstersensor) {
            // @ts-ignore            
            cacheFenstersensorenArray.push(new ZigbeeFenstersensor(adapter,
                adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
            ));
        }
    });
    cacheFenstersensorenArray = sortArray(cacheFenstersensorenArray);        
    return cacheFenstersensorenArray;
}

//var zigbeeAllArray = null;
export function loadZigbeeDevicesAll(adapter: any) {
  /*  if (zigbeeAllArray != null) {
        // @ts-ignore            
        return zigbeeAllArray;
    }*/
    
    // @ts-ignore            
    var zigbeeAllArray = [];
    adapter.loadZigbeeSteckdosen(adapter).forEach(zigbee => {
        // @ts-ignore            
        zigbeeAllArray.push(zigbee);
    });
    adapter.loadZigbeeBewegungsmelder(adapter).forEach(zigbee => {
        // @ts-ignore                    
        zigbeeAllArray.push(zigbee);
    });
    adapter.loadZigbeeLampenRGB(adapter).forEach(zigbee => {
        // @ts-ignore                    
        zigbeeAllArray.push(zigbee);
    });
    adapter.loadZigbeeLampenWeiss(adapter).forEach(zigbee => {
        // @ts-ignore                    
        zigbeeAllArray.push(zigbee);
    });
    adapter.loadZigbeeRauchmelder(adapter).forEach(zigbee => {
        // @ts-ignore                    
        zigbeeAllArray.push(zigbee);
    });
    adapter.loadZigbeeWandtaster(adapter).forEach(zigbee => {
        // @ts-ignore                    
        zigbeeAllArray.push(zigbee);
    });
    adapter.loadZigbeeDosenrelais(adapter).forEach(zigbee => {
        // @ts-ignore                    
        zigbeeAllArray.push(zigbee);
    });
    adapter.loadZigbeeSchalter(adapter).forEach(zigbee => {
        // @ts-ignore                    
        zigbeeAllArray.push(zigbee);
    });
    adapter.loadZigbeeRepeater(adapter).forEach(zigbee => {
        // @ts-ignore                    
        zigbeeAllArray.push(zigbee);
    });
    adapter.loadZigbeeFenstersensor(adapter).forEach(zigbee => {
        // @ts-ignore                    
        zigbeeAllArray.push(zigbee);
    });
    zigbeeAllArray = sortArray(zigbeeAllArray);    
    return zigbeeAllArray;
}

function clearZigbeeCaches(adapter: any) {
//    zigbeeAllArray = null;
    cacheFenstersensorenArray = null;
    cacheRepeaterArray = null;
    cacheSchalterArray = null;
    cacheDosenrelaisArray = null;
    cacheWandtasterArray = null;
    cacheRauchmelderArray = null;
    cacheLampenWeissArray = null;
    cacheLampenRGBArray = null;
    cacheBewegungsmelderArray = null;
    cacheSteckdosenArray = null; 
    adapter.log(">>> Zigbee cache cleared!! <<<");
}

function sortArray(inputArray) {
    inputArray.sort((a,b) => {
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

function getEtageSortIndex(etage: string) {
    if (etage == "OG") {
        return "a";
    } else if (etage == "EG") {
        return "b";
    } else if (etage == "UG") {
        return "c";
    } else {
        return "d";
    }
}



module.exports = { createZigbeeDevice, createZigbeeDosenrelais, createZigbeeLampeRGB, createZigbeeLampeWeiss, createZigbeeSteckdose, loadZigbeeSteckdosen, loadZigbeeBewegungsmelder, loadZigbeeLampenRGB, loadZigbeeLampenWeiss, loadZigbeeRauchmelder, loadZigbeeWandtaster, loadZigbeeDosenrelais, loadZigbeeSchalter, loadZigbeeRepeater, loadZigbeeFenstersensor, loadZigbeeDevicesAll, clearZigbeeCaches };