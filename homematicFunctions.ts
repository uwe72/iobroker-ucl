const { HomematicWindow, HomematicSteckdose, HomematicHeizkoerper, HomematicDimmer, HomematicWandthermostat, HomematicFussbodenheizung, HomematicWandschalter, HomematicDoor, HomematicWetterstation, HomematicAccessPoint, HomematicRollladen, HomematicWandtaster, HomematicTemperatursensor, HomematicRauchmelder, HomematicPraesenzmelder, AbstractHomematic, HomematicFunkschaltaktor, DimmerAlexaScheme, DimmerTasterScheme,
    deviceHomematicWandthermostat, deviceHomematicPraesenzmelder, deviceHomematicWetterstation, deviceHomematicDoor, deviceHomematicRollladen, deviceHomematicWandschalter, deviceHomematicFussbodenheizung, deviceHomematicWandtaster, deviceHomematicAccessPoint, deviceHomematicTemperatursensor, deviceHomematicRauchmelder, deviceHomematicFunkSchaltaktor, deviceHomematicWindow, deviceHomematicSteckdose, deviceHomematicHeizkoerper, deviceHomematicDimmer } = require('./homematicClasses.js');

const attributeRawID = "rawId";
const attributeBaseState = "baseState";
const attributeEtage = "etage";
const attributeRaum = "raum";
const attributeDevice = "device";
const attributeCategory = "category";

// Datenpunkttyp:
const attributeTypeNumber = "number";
const attributeTypeString = "string";
const attributeTypeBoolean = "boolean";

// Alexa:
const attribute_AlexaSmartNamesForOn = "alexaSmartNamesForOn";
const attribute_AlexaActionNamesForOn = "alexaActionNamesForOn";
const attribute_AlexaSmartNamesForOff = "alexaSmartNamesForOff";
const attribute_AlexaActionNamesForOff = "alexaActionNamesForOff";

// Lampen/Steckdosen allgemein:
const attribute_TasterBooleanOn = "tasterBooleanOn";
const attribute_TasterBooleanOff = "tasterBooleanOff";
const attribute_Nachtbeleuchtung = "nachtbeleuchtung";
const attribute_TurnOffExitHouseSummer = "turnOffExitHouseSummer";
const attribute_TurnOffExitHouseWinter = "turnOffExitHouseWinter";
const attribute_TurnOnEnterHouseSummer = "turnOnEnterHouseSummer";
const attribute_TurnOnEnterHouseWinter = "turnOnEnterHouseWinter";

// Scheme Dimmer:
const attributeDimmer_alexaScheme_aktiv = "alexaScheme_aktiv";
const attributeDimmer_alexaScheme_name = "alexaScheme_name";
const attributeDimmer_alexaScheme_level = "alexaScheme_level";

// Scheme Dimmer:
const attributeDimmer_alexaScheme1_aktiv = "alexaScheme1_aktiv";
const attributeDimmer_alexaScheme1_name = "alexaScheme1_name";
const attributeDimmer_alexaScheme1_level = "alexaScheme1_level";

const attributeDimmer_alexaScheme2_aktiv = "alexaScheme2_aktiv";
const attributeDimmer_alexaScheme2_name = "alexaScheme2_name";
const attributeDimmer_alexaScheme2_level = "alexaScheme2_level";

const attributeDimmer_alexaScheme3_aktiv = "alexaScheme3_aktiv";
const attributeDimmer_alexaScheme3_name = "alexaScheme3_name";
const attributeDimmer_alexaScheme3_level = "alexaScheme3_level";

const attributeDimmer_alexaScheme4_aktiv = "alexaScheme4_aktiv";
const attributeDimmer_alexaScheme4_name = "alexaScheme4_name";
const attributeDimmer_alexaScheme4_level = "alexaScheme4_level";

// Scheme Dimmer:
const attributeDimmer_tasterScheme1_aktiv = "tasterScheme1_aktiv";
const attributeDimmer_tasterScheme1_name = "tasterScheme1_name";
const attributeDimmer_tasterScheme1_level = "tasterScheme1_level";

const attributeDimmer_tasterScheme2_aktiv = "tasterScheme2_aktiv";
const attributeDimmer_tasterScheme2_name = "tasterScheme2_name";
const attributeDimmer_tasterScheme2_level = "tasterScheme2_level";

const attributeDimmer_tasterScheme3_aktiv = "tasterScheme3_aktiv";
const attributeDimmer_tasterScheme3_name = "tasterScheme3_name";
const attributeDimmer_tasterScheme3_level = "tasterScheme3_level";

const attributeDimmer_tasterScheme4_aktiv = "tasterScheme4_aktiv";
const attributeDimmer_tasterScheme4_name = "tasterScheme4_name";
const attributeDimmer_tasterScheme4_level = "tasterScheme4_level";

function createHomematicDevice(adapter: any, rawId: number, baseState: string, etage: string, raum: string, device: string, category: string) {
    createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRawID, rawId, category);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeCategory, category, category);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeBaseState, baseState, category);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeEtage, etage, category);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRaum, raum, category);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeDevice, device, category);
}

// Praesenzmelder
export function createHomematicPraesenzmelder(adapter: any, rawId: number, baseState: string, etage: string, raum: string, device: string) {
    createHomematicDevice(adapter, rawId, baseState, etage, raum, device, deviceHomematicPraesenzmelder);
}

// Wetterstation
export function createHomematicWetterstation(adapter: any, rawId: number, baseState: string, etage: string, raum: string, device: string) {
    createHomematicDevice(adapter, rawId, baseState, etage, raum, device, deviceHomematicWetterstation);
}

// Door
export function createHomematicDoor(adapter: any, rawId: number, baseState: string, etage: string, raum: string, device: string) {
    createHomematicDevice(adapter, rawId, baseState, etage, raum, device, deviceHomematicDoor);
}

// Rollladen
export function createHomematicRollladen(adapter: any, rawId: number, baseState: string, etage: string, raum: string, device: string) {
    createHomematicDevice(adapter, rawId, baseState, etage, raum, device, deviceHomematicRollladen);
}

// Fussbodenheizung
export function createHomematicFussbodenheizung(adapter: any, rawId: number, baseState: string, etage: string, raum: string, device: string) {
    createHomematicDevice(adapter, rawId, baseState, etage, raum, device, deviceHomematicFussbodenheizung);
}

// Wandtaster
export function createHomematicWandtaster(adapter: any, rawId: number, baseState: string, etage: string, raum: string, device: string) {
    createHomematicDevice(adapter, rawId, baseState, etage, raum, device, deviceHomematicWandtaster);
}

// AccessPoint
export function createHomematicAccessPoint(adapter: any, rawId: number, baseState: string, etage: string, raum: string, device: string) {
    createHomematicDevice(adapter, rawId, baseState, etage, raum, device, deviceHomematicAccessPoint);
}

// Temperatursensor
export function createHomematicTemperatursensor(adapter: any, rawId: number, baseState: string, etage: string, raum: string, device: string) {
    createHomematicDevice(adapter, rawId, baseState, etage, raum, device, deviceHomematicTemperatursensor);
}

// Rauchmelder
export function createHomematicRauchmelder(adapter: any, rawId: number, baseState: string, etage: string, raum: string, device: string) {
    createHomematicDevice(adapter, rawId, baseState, etage, raum, device, deviceHomematicRauchmelder);
}

// FunkSchaltaktor
export function createHomematicFunkSchaltaktor(adapter: any, rawId: number, baseState: string, etage: string, raum: string, device: string) {
    createHomematicDevice(adapter, rawId, baseState, etage, raum, device, deviceHomematicFunkSchaltaktor);
}

// Window
export function createHomematicWindow(adapter: any, rawId: number, baseState: string, etage: string, raum: string, device: string) {
    createHomematicDevice(adapter, rawId, baseState, etage, raum, device, deviceHomematicWindow);
}

// Steckdose
export function createHomematicSteckdose(adapter: any, rawId: number, baseState: string, etage: string, raum: string, device: string) {
    createHomematicDevice(adapter, rawId, baseState, etage, raum, device, deviceHomematicSteckdose);
}

// Heizkoerper
export function createHomematicHeizkoerper(adapter: any, rawId: number, baseState: string, etage: string, raum: string, device: string) {
    createHomematicDevice(adapter, rawId, baseState, etage, raum, device, deviceHomematicHeizkoerper);
}

// Wandthermostat
export function createHomematicWandthermostat(adapter: any, rawId: number, baseState: string, etage: string, raum: string, device: string) {
    createHomematicDevice(adapter, rawId, baseState, etage, raum, device, deviceHomematicWandthermostat);
}

// Dimmer:
export function createHomeaticDimmer(adapter: any, rawId: number, baseState: string, etage: string, raum: string, device: string,
    alexaSmartNamesForOn: string[], alexaActionNamesForOn: string[], alexaLevelSchemeForOn: InstanceType<typeof DimmerAlexaScheme>, alexaSmartNamesForOff: string[], alexaActionNamesForOff: string[],
    alexaScheme1: InstanceType<typeof DimmerAlexaScheme>, alexaScheme2: InstanceType<typeof DimmerAlexaScheme>, alexaScheme3: InstanceType<typeof DimmerAlexaScheme>, alexaScheme4: InstanceType<typeof DimmerAlexaScheme>,
    tasterBooleanOnScheme1: InstanceType<typeof DimmerTasterScheme>, tasterBooleanOnScheme2: InstanceType<typeof DimmerTasterScheme>, tasterBooleanOnScheme3: InstanceType<typeof DimmerTasterScheme>, tasterBooleanOnScheme4: InstanceType<typeof DimmerTasterScheme>,
    tasterBooleanOff: string[], nachtbeleuchtung: boolean, turnOffExitHouseSummer: boolean, turnOffExitHouseWinter: boolean, turnOnEnterHouseSummer: boolean, turnOnEnterHouseWinter: boolean) {

    // Allgemein:
    createHomematicDevice(adapter, rawId, baseState, etage, raum, device, deviceHomematicDimmer);

    // alexaScheme1: InstanceType<typeof DimmerAlexaScheme>
    if (alexaScheme1 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_alexaScheme1_aktiv, true, deviceHomematicDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeDimmer_alexaScheme1_name, alexaScheme1.getAlexaName(), deviceHomematicDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeDimmer_alexaScheme1_level, alexaScheme1.getLevel(), deviceHomematicDimmer);
    } else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_alexaScheme1_aktiv, false, deviceHomematicDimmer);
    }

    // alexaScheme2: InstanceType<typeof DimmerAlexaScheme>
    if (alexaScheme2 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_alexaScheme2_aktiv, true, deviceHomematicDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeDimmer_alexaScheme2_name, alexaScheme1.getAlexaName(), deviceHomematicDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeDimmer_alexaScheme2_level, alexaScheme1.getLevel(), deviceHomematicDimmer);
    } else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_alexaScheme2_aktiv, false, deviceHomematicDimmer);
    }

    // alexaScheme3: InstanceType<typeof DimmerAlexaScheme>
    if (alexaScheme3 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_alexaScheme3_aktiv, true, deviceHomematicDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeDimmer_alexaScheme3_name, alexaScheme1.getAlexaName(), deviceHomematicDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeDimmer_alexaScheme3_level, alexaScheme1.getLevel(), deviceHomematicDimmer);
    } else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_alexaScheme3_aktiv, false, deviceHomematicDimmer);
    }

    // alexaScheme4: InstanceType<typeof DimmerAlexaScheme>
    if (alexaScheme4 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_alexaScheme4_aktiv, true, deviceHomematicDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeDimmer_alexaScheme4_name, alexaScheme1.getAlexaName(), deviceHomematicDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeDimmer_alexaScheme4_level, alexaScheme1.getLevel(), deviceHomematicDimmer);
    } else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_alexaScheme4_aktiv, false, deviceHomematicDimmer);
    }

    if (tasterBooleanOnScheme1 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_tasterScheme1_aktiv, true, deviceHomematicDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeDimmer_tasterScheme1_name, tasterBooleanOnScheme1.getTasterBooleanOnName(), deviceHomematicDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeDimmer_tasterScheme1_level, tasterBooleanOnScheme1.getLevel(), deviceHomematicDimmer);
    } else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_tasterScheme1_aktiv, false, deviceHomematicDimmer);
    }

    if (tasterBooleanOnScheme2 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_tasterScheme2_aktiv, true, deviceHomematicDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeDimmer_tasterScheme2_name, tasterBooleanOnScheme1.getTasterBooleanOnName(), deviceHomematicDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeDimmer_tasterScheme2_level, tasterBooleanOnScheme1.getLevel(), deviceHomematicDimmer);
    } else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_tasterScheme2_aktiv, false, deviceHomematicDimmer);
    }

    if (tasterBooleanOnScheme3 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_tasterScheme3_aktiv, true, deviceHomematicDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeDimmer_tasterScheme3_name, tasterBooleanOnScheme1.getTasterBooleanOnName(), deviceHomematicDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeDimmer_tasterScheme3_level, tasterBooleanOnScheme1.getLevel(), deviceHomematicDimmer);
    } else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_tasterScheme3_aktiv, false, deviceHomematicDimmer);
    }

    if (tasterBooleanOnScheme4 != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_tasterScheme4_aktiv, true, deviceHomematicDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeDimmer_tasterScheme4_name, tasterBooleanOnScheme1.getTasterBooleanOnName(), deviceHomematicDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeDimmer_tasterScheme4_level, tasterBooleanOnScheme1.getLevel(), deviceHomematicDimmer);
    } else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_tasterScheme4_aktiv, false, deviceHomematicDimmer);
    }

    // alexaLevelSchemeForOn: InstanceType<typeof DimmerAlexaScheme>
    if (alexaLevelSchemeForOn != null) {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_alexaScheme_aktiv, true, deviceHomematicDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeDimmer_alexaScheme_name, alexaLevelSchemeForOn.getAlexaName(), deviceHomematicDimmer);
        createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeDimmer_alexaScheme_level, alexaLevelSchemeForOn.getLevel(), deviceHomematicDimmer);
    } else {
        createDatenpunktSingle(adapter, rawId, attributeTypeBoolean, attributeDimmer_alexaScheme_aktiv, false, deviceHomematicDimmer);
    }

    // additionalStates4TurnOff: string[]
    let db_additionalStates4TurnOff = null;
    tasterBooleanOff.forEach(value => {
        if (db_additionalStates4TurnOff == null) {
            // @ts-ignore                        
            db_additionalStates4TurnOff = value;
        } else {
            // @ts-ignore                        
            db_additionalStates4TurnOff += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_TasterBooleanOff, db_additionalStates4TurnOff, deviceHomematicDimmer);

    // alexaSmartNamesForOn:string[]
    let db_alexaSmartNamesForOn = null;
    alexaSmartNamesForOn.forEach(value => {
        if (db_alexaSmartNamesForOn == null) {
            // @ts-ignore            
            db_alexaSmartNamesForOn = value;
        } else {
            // @ts-ignore            
            db_alexaSmartNamesForOn += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaSmartNamesForOn, db_alexaSmartNamesForOn, deviceHomematicDimmer);

    // alexaActionNamesForOn:string[]
    let db_alexaActionNamesForOn = null;
    alexaActionNamesForOn.forEach(value => {
        if (db_alexaActionNamesForOn == null) {
            // @ts-ignore            
            db_alexaActionNamesForOn = value;
        } else {
            // @ts-ignore                        
            db_alexaActionNamesForOn += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaActionNamesForOn, db_alexaActionNamesForOn, deviceHomematicDimmer);

    // alexaSmartNamesForOff:string[]
    let db_alexaSmartNamesForOff = null;
    alexaSmartNamesForOff.forEach(value => {
        if (db_alexaSmartNamesForOff == null) {
            // @ts-ignore            
            db_alexaSmartNamesForOff = value;
        } else {
            // @ts-ignore                        
            db_alexaSmartNamesForOff += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaSmartNamesForOff, db_alexaSmartNamesForOff, deviceHomematicDimmer);

    // alexaActionNamesForOff:string[]
    let db_alexaActionNamesForOff = null;
    alexaActionNamesForOff.forEach(value => {
        if (db_alexaActionNamesForOff == null) {
            // @ts-ignore                        
            db_alexaActionNamesForOff = value;
        } else {
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

// Wandschalter:
export function createHomeaticWandschalter(adapter: any, rawId: number, baseState: string, etage: string, raum: string, device: string,
    alexaSmartNamesForOn: string[], alexaActionNamesForOn: string[], alexaSmartNamesForOff: string[], alexaActionNamesForOff: string[],
    nachtbeleuchtung: boolean, turnOffExitHouseSummer: boolean, turnOffExitHouseWinter: boolean, turnOnEnterHouseSummer: boolean, turnOnEnterHouseWinter: boolean) {

    // Allgemein:
    createHomematicDevice(adapter, rawId, baseState, etage, raum, device, deviceHomematicWandschalter);

    // alexaSmartNamesForOn:string[]
    let db_alexaSmartNamesForOn = null;
    alexaSmartNamesForOn.forEach(value => {
        if (db_alexaSmartNamesForOn == null) {
            // @ts-ignore            
            db_alexaSmartNamesForOn = value;
        } else {
            // @ts-ignore            
            db_alexaSmartNamesForOn += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaSmartNamesForOn, db_alexaSmartNamesForOn, deviceHomematicWandschalter);

    // alexaActionNamesForOn:string[]
    let db_alexaActionNamesForOn = null;
    alexaActionNamesForOn.forEach(value => {
        if (db_alexaActionNamesForOn == null) {
            // @ts-ignore            
            db_alexaActionNamesForOn = value;
        } else {
            // @ts-ignore                        
            db_alexaActionNamesForOn += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaActionNamesForOn, db_alexaActionNamesForOn, deviceHomematicWandschalter);

    // alexaSmartNamesForOff:string[]
    let db_alexaSmartNamesForOff = null;
    alexaSmartNamesForOff.forEach(value => {
        if (db_alexaSmartNamesForOff == null) {
            // @ts-ignore            
            db_alexaSmartNamesForOff = value;
        } else {
            // @ts-ignore                        
            db_alexaSmartNamesForOff += "|" + value;
        }
    });
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attribute_AlexaSmartNamesForOff, db_alexaSmartNamesForOff, deviceHomematicWandschalter);

    // alexaActionNamesForOff:string[]
    let db_alexaActionNamesForOff = null;
    alexaActionNamesForOff.forEach(value => {
        if (db_alexaActionNamesForOff == null) {
            // @ts-ignore                        
            db_alexaActionNamesForOff = value;
        } else {
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

function createDatenpunktSingle(adapter: any, deviceRawId, attributeType, attributeName, attributeValue, category) {
    let stateDatenpunkt = "0_userdata.0.devices.homematic." + category + "." + deviceRawId + "." + attributeName;
    adapter.createState(stateDatenpunkt, attributeValue, {
        name: "H" + deviceRawId.toString().padStart(2, '0'),
        desc: "",
        type: attributeType,
        read: true,
        write: true
    });
}

var cacheRollladenArray = null;
export function loadHomematicRollladen(adapter: any) {
    if (cacheRollladenArray != null) {
        return cacheRollladenArray;
    }
    // @ts-ignore            
    cacheRollladenArray = [];
    adapter.$('state[id=0_userdata.0.devices.homematic.*.*.category]').each(datenpunktKey => {  // 0_userdata.0.devices.homematic.30.type
        let datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceHomematicRollladen) {
            // @ts-ignore                            
            cacheRollladenArray.push(new HomematicRollladen(adapter,
                adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
            ));
        }
    });
    cacheRollladenArray = sortArray(cacheRollladenArray);
    return cacheRollladenArray;
}

var cacheWandthermostateArray = null;
export function loadHomematicWandthermostate(adapter: any) {
    if (cacheWandthermostateArray != null) {
        return cacheWandthermostateArray;
    }
    // @ts-ignore            
    cacheWandthermostateArray = [];
    adapter.$('state[id=0_userdata.0.devices.homematic.*.*.category]').each(datenpunktKey => {  // 0_userdata.0.devices.homematic.30.type
        let datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceHomematicWandthermostat) {
            // @ts-ignore            
            cacheWandthermostateArray.push(new HomematicWandthermostat(adapter,
                adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
            ));
        }
    });
    cacheWandthermostateArray = sortArray(cacheWandthermostateArray);
    return cacheWandthermostateArray;
}

var cachePraesenzmelderArray = null;
export function loadHomematicPraesenzmelder(adapter: any) {
    if (cachePraesenzmelderArray != null) {
        return cachePraesenzmelderArray;
    }
    // @ts-ignore            
    cachePraesenzmelderArray = [];
    adapter.$('state[id=0_userdata.0.devices.homematic.*.*.category]').each(datenpunktKey => {  // 0_userdata.0.devices.homematic.30.type
        let datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceHomematicPraesenzmelder) {
            // @ts-ignore                            
            cachePraesenzmelderArray.push(new HomematicPraesenzmelder(adapter,
                adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
            ));
        }
    });
    cachePraesenzmelderArray = sortArray(cachePraesenzmelderArray);
    return cachePraesenzmelderArray;
}

var cacheWetterstationenArray = null;
export function loadHomematicWetterstationen(adapter: any) {
    if (cacheWetterstationenArray != null) {
        return cacheWetterstationenArray;
    }
    // @ts-ignore            
    cacheWetterstationenArray = [];
    adapter.$('state[id=0_userdata.0.devices.homematic.*.*.category]').each(datenpunktKey => {  // 0_userdata.0.devices.homematic.30.type
        let datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceHomematicWetterstation) {
            // @ts-ignore            
            cacheWetterstationenArray.push(new HomematicWetterstation(adapter,
                adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
            ));
        }
    });
    cacheWetterstationenArray = sortArray(cacheWetterstationenArray);
    return cacheWetterstationenArray;
}

var cacheDoorsArray = null;
export function loadHomematicDoors(adapter: any) {
    if (cacheDoorsArray != null) {
        return cacheDoorsArray;
    }
    // @ts-ignore            
    cacheDoorsArray = [];
    adapter.$('state[id=0_userdata.0.devices.homematic.*.*.category]').each(datenpunktKey => {  // 0_userdata.0.devices.homematic.30.type
        let datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceHomematicDoor) {
            // @ts-ignore            
            cacheDoorsArray.push(new HomematicDoor(adapter,
                adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
            ));
        }
    });
    cacheDoorsArray = sortArray(cacheDoorsArray);
    return cacheDoorsArray;
}


var cacheWandschalterArray = null;
export function loadHomematicWandschalter(adapter: any) {
    if (cacheWandschalterArray != null) {
        return cacheWandschalterArray;
    }
    // @ts-ignore            
    cacheWandschalterArray = [];
    adapter.$('state[id=0_userdata.0.devices.homematic.*.*.category]').each(datenpunktKey => {  // 0_userdata.0.devices.homematic.30.type
        let datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceHomematicWandschalter) {
            // @ts-ignore            
            cacheWandschalterArray.push(new HomematicWandschalter(adapter,
                adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val,     // [4] Device            (z.B. Stehlampe)            
                toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_AlexaSmartNamesForOn).val),  // 08 Alexa-Ein     
                toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_AlexaActionNamesForOn).val), // Alexa-Action-Ein, z.B. "Guten morgen" (Würde auch funktionieren, wenn dies bei [06] eingetragen ist)                                           
                toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_AlexaSmartNamesForOff).val),   // 09 Alexa-Aus
                toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_AlexaActionNamesForOff).val),   // [10] Alexa-Action Aus, z.B. "Gute Nacht". Wir müssen hier zu [09] unterscheiden, da wir über "Gute Nacht" und isActionTurnedOn=true informiert werden.        
                adapter.getState(datenpunktPraefix + "." + attribute_Nachtbeleuchtung).val,     // Gehört zur Nachtbeleuchtung ja/nein
                adapter.getState(datenpunktPraefix + "." + attribute_TurnOffExitHouseSummer).val, // turnOffExitHouseSummer (Ausschalten, wenn Haus verlassen - Sommer)
                adapter.getState(datenpunktPraefix + "." + attribute_TurnOffExitHouseWinter).val, // turnOffExitHouseWinter (Ausschalten, wenn Haus verlassen - Winter)
                adapter.getState(datenpunktPraefix + "." + attribute_TurnOnEnterHouseSummer).val, // turnOnEnterHouseSummer (Einschalten, wenn Haus betreten - Sommer)
                adapter.getState(datenpunktPraefix + "." + attribute_TurnOnEnterHouseWinter).val  // turnOnEnterHouseWinter (Einschalten, wenn Haus betreten - Winter)                
            ));
        }
    });
    cacheWandschalterArray = sortArray(cacheWandschalterArray);
    return cacheWandschalterArray;
}

var cacheFussbodenheizungenArray = null;
export function loadHomematicFussbodenheizungen(adapter: any) {
    if (cacheFussbodenheizungenArray != null) {
        return cacheFussbodenheizungenArray;
    }
    // @ts-ignore            
    cacheFussbodenheizungenArray = [];
    adapter.$('state[id=0_userdata.0.devices.homematic.*.*.category]').each(datenpunktKey => {  // 0_userdata.0.devices.homematic.30.type
        let datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceHomematicFussbodenheizung) {
            // @ts-ignore            
            cacheFussbodenheizungenArray.push(new HomematicFussbodenheizung(adapter,
                adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
            ));
        }
    });
    cacheFussbodenheizungenArray = sortArray(cacheFussbodenheizungenArray);
    return cacheFussbodenheizungenArray;
}

var cacheWandtasterArray = null;
export function loadHomematicWandtaster(adapter: any) {
    if (cacheWandtasterArray != null) {
        return cacheWandtasterArray;
    }
    // @ts-ignore            
    cacheWandtasterArray = [];
    adapter.$('state[id=0_userdata.0.devices.homematic.*.*.category]').each(datenpunktKey => {  // 0_userdata.0.devices.homematic.30.type
        let datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceHomematicWandtaster) {
            // @ts-ignore            
            cacheWandtasterArray.push(new HomematicWandtaster(adapter,
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

var cacheAccessPointsArray = null;
export function loadHomematicAccessPoints(adapter: any) {
    if (cacheAccessPointsArray != null) {
        return cacheAccessPointsArray;
    }
    // @ts-ignore            
    cacheAccessPointsArray = [];
    adapter.$('state[id=0_userdata.0.devices.homematic.*.*.category]').each(datenpunktKey => {  // 0_userdata.0.devices.homematic.30.type
        let datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceHomematicAccessPoint) {
            // @ts-ignore            
            cacheAccessPointsArray.push(new HomematicAccessPoint(adapter,
                adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
            ));
        }
    });
    cacheAccessPointsArray = sortArray(cacheAccessPointsArray);
    return cacheAccessPointsArray;
}

var cacheTemperatursensorenArray = null;
export function loadHomematicTemperatursensoren(adapter: any) {
    if (cacheTemperatursensorenArray != null) {
        return cacheTemperatursensorenArray;
    }
    // @ts-ignore            
    cacheTemperatursensorenArray = [];
    adapter.$('state[id=0_userdata.0.devices.homematic.*.*.category]').each(datenpunktKey => {  // 0_userdata.0.devices.homematic.30.type
        let datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceHomematicTemperatursensor) {
            // @ts-ignore            
            cacheTemperatursensorenArray.push(new HomematicTemperatursensor(adapter,
                adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
            ));
        }
    });
    cacheTemperatursensorenArray = sortArray(cacheTemperatursensorenArray);
    return cacheTemperatursensorenArray;
}

var cacheRauchmelderArray = null;
export function loadHomematicRauchmelder(adapter: any) {
    if (cacheRauchmelderArray != null) {
        return cacheRauchmelderArray;
    }
    // @ts-ignore            
    cacheRauchmelderArray = [];
    adapter.$('state[id=0_userdata.0.devices.homematic.*.*.category]').each(datenpunktKey => {  // 0_userdata.0.devices.homematic.30.type
        let datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceHomematicRauchmelder) {
            // @ts-ignore            
            cacheRauchmelderArray.push(new HomematicRauchmelder(adapter,
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

var cacheFunkschaltaktorenArray = null;
export function loadHomematicFunktschaltaktoren(adapter: any) {
    if (cacheFunkschaltaktorenArray != null) {
        return cacheFunkschaltaktorenArray;
    }
    // @ts-ignore            
    cacheFunkschaltaktorenArray = [];
    adapter.$('state[id=0_userdata.0.devices.homematic.*.*.category]').each(datenpunktKey => {  // 0_userdata.0.devices.homematic.30.type
        let datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceHomematicFunkSchaltaktor) {
            // @ts-ignore            
            cacheFunkschaltaktorenArray.push(new HomematicFunkschaltaktor(adapter,
                adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
            ));
        }
    });
    cacheFunkschaltaktorenArray = sortArray(cacheFunkschaltaktorenArray);
    return cacheFunkschaltaktorenArray;
}

var cacheWindowsArray = null;
export function loadHomematicWindows(adapter: any) {
    if (cacheWindowsArray != null) {
        return cacheWindowsArray;
    }
    // @ts-ignore            
    cacheWindowsArray = [];
    adapter.$('state[id=0_userdata.0.devices.homematic.*.*.category]').each(datenpunktKey => {  // 0_userdata.0.devices.homematic.30.type
        let datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceHomematicWindow) {
            // @ts-ignore            
            cacheWindowsArray.push(new HomematicWindow(adapter,
                adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
            ));
        }
    });
    cacheWindowsArray = sortArray(cacheWindowsArray);
    return cacheWindowsArray;
}

var cacheSteckdosenArray = null;
export function loadHomematicSteckdosen(adapter: any) {
    if (cacheSteckdosenArray != null) {
        return cacheSteckdosenArray;
    }
    // @ts-ignore            
    cacheSteckdosenArray = [];
    adapter.$('state[id=0_userdata.0.devices.homematic.*.*.category]').each(datenpunktKey => {  // 0_userdata.0.devices.homematic.30.type
        let datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceHomematicSteckdose) {
            // @ts-ignore            
            cacheSteckdosenArray.push(new HomematicSteckdose(adapter,
                adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
            ));
        }
    });
    cacheSteckdosenArray = sortArray(cacheSteckdosenArray);
    return cacheSteckdosenArray;
}

var cacheHeizkoerperArray = null;
export function loadHomematicHeizkoerper(adapter: any) {
    if (cacheHeizkoerperArray != null) {
        return cacheHeizkoerperArray;
    }
    // @ts-ignore            
    cacheHeizkoerperArray = [];
    adapter.$('state[id=0_userdata.0.devices.homematic.*.*.category]').each(datenpunktKey => {  // 0_userdata.0.devices.homematic.30.type
        let datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceHomematicHeizkoerper) {
            // @ts-ignore            
            cacheHeizkoerperArray.push(new HomematicHeizkoerper(adapter,
                adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
            ));
        }
    });
    cacheHeizkoerperArray = sortArray(cacheHeizkoerperArray);
    return cacheHeizkoerperArray;
}

var cacheDimmerArray = null;
export function loadHomematicDimmer(adapter: any) {
    if (cacheDimmerArray != null) {
        return cacheDimmerArray;
    }
    // @ts-ignore            
    cacheDimmerArray = [];
    adapter.$('state[id=0_userdata.0.devices.homematic.*.*.category]').each(datenpunktKey => {  // 0_userdata.0.devices.homematic.30.type
        let datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceHomematicDimmer) {

            // Einschalt-Scheme:
            let alexaOnScheme = null;
            if (adapter.getState(datenpunktPraefix + "." + attributeDimmer_alexaScheme_aktiv,).val == true) {
                // @ts-ignore                                                
                alexaOnScheme = new DimmerAlexaScheme(null,
                    adapter.getState(datenpunktPraefix + "." + attributeDimmer_alexaScheme_level).val
                );
            }

            // Weitere Schemes als Array:
            let schemeArray = [];

            // alexaScheme1: InstanceType<typeof DimmerAlexaScheme>
            if (adapter.getState(datenpunktPraefix + "." + attributeDimmer_alexaScheme1_aktiv).val == true) {
                // @ts-ignore                                                                    
                schemeArray.push(new DimmerAlexaScheme(
                    adapter.getState(datenpunktPraefix + "." + attributeDimmer_alexaScheme1_name).val,
                    adapter.getState(datenpunktPraefix + "." + attributeDimmer_alexaScheme1_level).val
                ));
            }
            // alexaScheme2: InstanceType<typeof DimmerAlexaScheme>
            if (adapter.getState(datenpunktPraefix + "." + attributeDimmer_alexaScheme2_aktiv).val == true) {
                // @ts-ignore                                                                    
                schemeArray.push(new DimmerAlexaScheme(
                    adapter.getState(datenpunktPraefix + "." + attributeDimmer_alexaScheme2_name).val,
                    adapter.getState(datenpunktPraefix + "." + attributeDimmer_alexaScheme2_level).val
                ));
            }
            // alexaScheme3: InstanceType<typeof DimmerAlexaScheme>
            if (adapter.getState(datenpunktPraefix + "." + attributeDimmer_alexaScheme3_aktiv).val == true) {
                // @ts-ignore                                                                    
                schemeArray.push(new DimmerAlexaScheme(
                    adapter.getState(datenpunktPraefix + "." + attributeDimmer_alexaScheme3_name).val,
                    adapter.getState(datenpunktPraefix + "." + attributeDimmer_alexaScheme3_level).val
                ));
            }
            // alexaScheme4: InstanceType<typeof DimmerAlexaScheme>
            if (adapter.getState(datenpunktPraefix + "." + attributeDimmer_alexaScheme4_aktiv).val == true) {
                // @ts-ignore                                                                    
                schemeArray.push(new DimmerAlexaScheme(
                    adapter.getState(datenpunktPraefix + "." + attributeDimmer_alexaScheme4_name).val,
                    adapter.getState(datenpunktPraefix + "." + attributeDimmer_alexaScheme4_level).val
                ));
            }

            // Weitere Schemes als Array:
            let tasterSchemeArray = [];

            // tasterScheme1: InstanceType<typeof DimmerTasterScheme>
            if (adapter.getState(datenpunktPraefix + "." + attributeDimmer_tasterScheme1_aktiv).val == true) {
                // @ts-ignore                                                                    
                tasterSchemeArray.push(new DimmerTasterScheme(
                    adapter.getState(datenpunktPraefix + "." + attributeDimmer_tasterScheme1_name).val,
                    adapter.getState(datenpunktPraefix + "." + attributeDimmer_tasterScheme1_level).val
                ));
            }
            // tasterScheme2: InstanceType<typeof DimmerTasterScheme>
            if (adapter.getState(datenpunktPraefix + "." + attributeDimmer_tasterScheme2_aktiv).val == true) {
                // @ts-ignore                                                                    
                tasterSchemeArray.push(new DimmerTasterScheme(
                    adapter.getState(datenpunktPraefix + "." + attributeDimmer_tasterScheme2_name).val,
                    adapter.getState(datenpunktPraefix + "." + attributeDimmer_tasterScheme2_level).val
                ));
            }
            // tasterScheme3: InstanceType<typeof DimmerTasterScheme>
            if (adapter.getState(datenpunktPraefix + "." + attributeDimmer_tasterScheme3_aktiv).val == true) {
                // @ts-ignore                                                                    
                tasterSchemeArray.push(new DimmerTasterScheme(
                    adapter.getState(datenpunktPraefix + "." + attributeDimmer_tasterScheme3_name).val,
                    adapter.getState(datenpunktPraefix + "." + attributeDimmer_tasterScheme3_level).val
                ));
            }
            // tasterScheme4: InstanceType<typeof DimmerTasterScheme>
            if (adapter.getState(datenpunktPraefix + "." + attributeDimmer_tasterScheme4_aktiv).val == true) {
                // @ts-ignore                                                                    
                tasterSchemeArray.push(new DimmerTasterScheme(
                    adapter.getState(datenpunktPraefix + "." + attributeDimmer_tasterScheme4_name).val,
                    adapter.getState(datenpunktPraefix + "." + attributeDimmer_tasterScheme4_level).val
                ));
            }

            // @ts-ignore            
            cacheDimmerArray.push(new HomematicDimmer(
                adapter,
                adapter.getState(datenpunktPraefix + "." + attributeRawID).val,                                 // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val,                             // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val,                                 // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val,                                  // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val,                                // [4] Device            (z.B. Stehlampe)            
                toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_AlexaSmartNamesForOn).val),  // 08 Alexa-Ein     
                toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_AlexaActionNamesForOn).val), // Alexa-Action-Ein, z.B. "Guten morgen" (Würde auch funktionieren, wenn dies bei [06] eingetragen ist)                                           
                alexaOnScheme,                                                                                  // [06 A.-Ein-Scheme]
                toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_AlexaSmartNamesForOff).val),   // 09 Alexa-Aus
                toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_AlexaActionNamesForOff).val),   // [10] Alexa-Action Aus, z.B. "Gute Nacht". Wir müssen hier zu [09] unterscheiden, da wir über "Gute Nacht" und isActionTurnedOn=true informiert werden.        
                schemeArray,                                                                                     // [08 Alexa-Schemes]   
                tasterSchemeArray,                                                                               // /* [09 TasterBoolOn ]
                toStringArray(adapter.getState(datenpunktPraefix + "." + attribute_TasterBooleanOff).val),           // 14 TasterBoolOff
                adapter.getState(datenpunktPraefix + "." + attribute_Nachtbeleuchtung).val,     // Gehört zur Nachtbeleuchtung ja/nein
                adapter.getState(datenpunktPraefix + "." + attribute_TurnOffExitHouseSummer).val, // turnOffExitHouseSummer (Ausschalten, wenn Haus verlassen - Sommer)
                adapter.getState(datenpunktPraefix + "." + attribute_TurnOffExitHouseWinter).val, // turnOffExitHouseWinter (Ausschalten, wenn Haus verlassen - Winter)
                adapter.getState(datenpunktPraefix + "." + attribute_TurnOnEnterHouseSummer).val, // turnOnEnterHouseSummer (Einschalten, wenn Haus betreten - Sommer)
                adapter.getState(datenpunktPraefix + "." + attribute_TurnOnEnterHouseWinter).val  // turnOnEnterHouseWinter (Einschalten, wenn Haus betreten - Winter)                
            ));
        }
    });
    cacheDimmerArray = sortArray(cacheDimmerArray);
    return cacheDimmerArray;
}

//var homematicAllArray = null;
export function loadHomematicDevicesAll(adapter: any) {
    /*if (homematicAllArray != null) {
        return homematicAllArray;
    }*/

    // @ts-ignore            
    let homematicAllArray = [];

    adapter.loadHomematicWandthermostate(adapter).forEach(homematic => {
        // @ts-ignore            
        homematicAllArray.push(homematic);
    });
    adapter.loadHomematicPraesenzmelder(adapter).forEach(homematic => {
        // @ts-ignore                    
        homematicAllArray.push(homematic);
    });
    adapter.loadHomematicWetterstationen(adapter).forEach(homematic => {
        // @ts-ignore                    
        homematicAllArray.push(homematic);
    });
    adapter.loadHomematicDoors(adapter).forEach(homematic => {
        // @ts-ignore                    
        homematicAllArray.push(homematic);
    });
    adapter.loadHomematicRollladen(adapter).forEach(homematic => {
        // @ts-ignore                    
        homematicAllArray.push(homematic);
    });
    adapter.loadHomematicWandschalter(adapter).forEach(homematic => {
        // @ts-ignore                    
        homematicAllArray.push(homematic);
    });
    adapter.loadHomematicFussbodenheizungen(adapter).forEach(homematic => {
        // @ts-ignore                    
        homematicAllArray.push(homematic);
    });
    adapter.loadHomematicWandtaster(adapter).forEach(homematic => {
        // @ts-ignore                    
        homematicAllArray.push(homematic);
    });
    adapter.loadHomematicAccessPoints(adapter).forEach(homematic => {
        // @ts-ignore                    
        homematicAllArray.push(homematic);
    });
    adapter.loadHomematicTemperatursensoren(adapter).forEach(homematic => {
        // @ts-ignore                    
        homematicAllArray.push(homematic);
    });
    adapter.loadHomematicRauchmelder(adapter).forEach(homematic => {
        // @ts-ignore                    
        homematicAllArray.push(homematic);
    });
    adapter.loadHomematicFunktschaltaktoren(adapter).forEach(homematic => {
        // @ts-ignore                    
        homematicAllArray.push(homematic);
    });
    adapter.loadHomematicWindows(adapter).forEach(homematic => {
        // @ts-ignore                    
        homematicAllArray.push(homematic);
    });
    adapter.loadHomematicSteckdosen(adapter).forEach(homematic => {
        // @ts-ignore                    
        homematicAllArray.push(homematic);
    });
    adapter.loadHomematicHeizkoerper(adapter).forEach(homematic => {
        // @ts-ignore                    
        homematicAllArray.push(homematic);
    });
    adapter.loadHomematicDimmer(adapter).forEach(homematic => {
        // @ts-ignore                    
        homematicAllArray.push(homematic);
    });
    homematicAllArray = sortArray(homematicAllArray);
    return homematicAllArray;
}

function toStringArray(databaseValue) { // z.B. "Werkbank|Arbeiten|Keller"
    let stringArray = [];
    if (databaseValue == null) {
        return stringArray;
    } else {
        return databaseValue.split('|');
    }
}

function clearHomematicCaches(adapter: any) {
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
    cacheRollladenArray = null; adapter.log(">>> Homematic cache cleared!! <<<");
}

function sortArray(inputArray) {
    inputArray.sort((a, b) => {
        let elementA = a;
        let elementB = b;

        let etageA = elementA.getEtage();
        let etageB = elementB.getEtage();
        let compareEtage = getEtageSortIndex(etageA).localeCompare(getEtageSortIndex(etageB));
        if (compareEtage != 0) {
            return compareEtage;
        }

        let typA = elementA.getCategory();
        let typB = elementB.getCategory();
        let compareTyp = typA.localeCompare(typB);
        if (compareTyp != 0) {
            return compareTyp;
        }


        let raumA = elementA.getRaum();
        let raumB = elementB.getRaum();
        let compareRaum = raumA.localeCompare(raumB);
        if (compareRaum != 0) {
            return compareRaum;
        }

        let deviceA = elementA.getDevice();
        let deviceB = elementB.getDevice();
        let compareDevice = deviceA.localeCompare(deviceB);
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



module.exports = { createHomematicHeizkoerper, createHomematicWindow, createHomematicFunkSchaltaktor, createHomematicRauchmelder, createHomematicTemperatursensor, createHomematicAccessPoint, createHomematicWandtaster, createHomematicPraesenzmelder, createHomematicWandthermostat, createHomematicWetterstation, createHomematicDoor, createHomematicRollladen, createHomematicFussbodenheizung, createHomeaticDimmer, createHomeaticWandschalter, loadHomematicWandthermostate, loadHomematicPraesenzmelder, loadHomematicWetterstationen, loadHomematicDoors, loadHomematicRollladen, loadHomematicWandschalter, loadHomematicFussbodenheizungen, loadHomematicWandtaster, loadHomematicAccessPoints, loadHomematicTemperatursensoren, loadHomematicRauchmelder, loadHomematicFunktschaltaktoren, loadHomematicWindows, loadHomematicSteckdosen, loadHomematicHeizkoerper, loadHomematicDimmer, loadHomematicDevicesAll, clearHomematicCaches };