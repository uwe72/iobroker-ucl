const { HomematicWindow, HomematicSteckdose, HomematicHeizkoerper, HomematicDimmer, HomematicWandthermostat, HomematicFussbodenheizung, HomematicWandschalter, HomematicDoor, HomematicWetterstation, HomematicAccessPoint, HomematicRollladen, HomematicWandtaster, HomematicTemperatursensor, HomematicRauchmelder, HomematicPraesenzmelder, AbstractHomematic, HomematicFunkschaltaktor, deviceHomematicWandthermostat, deviceHomematicPraesenzmelder, deviceHomematicWetterstation, deviceHomematicDoor, deviceHomematicRollladen, deviceHomematicWandschalter, deviceHomematicFussbodenheizung, deviceHomematicWandtaster, deviceHomematicAccessPoint, deviceHomematicTemperatursensor, deviceHomematicRauchmelder, deviceHomematicFunkSchaltaktor, deviceHomematicWindow, deviceHomematicSteckdose, deviceHomematicHeizkoerper, deviceHomematicDimmer } = require('./homematicClasses.js');

const attributeRawID = "rawId";
const attributeBaseState = "baseState";
const attributeEtage = "etage";
const attributeRaum = "raum";
const attributeDevice = "device";
const attributeCategory = "category";

const attributeTypeNumber = "number";
const attributeTypeString = "string";

export function createHomematicDevice(adapter: any, rawId: number, baseState: string, etage: string, raum: string, device: string, category: string) {
    createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRawID, rawId, category);
     createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeCategory, category, category);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeBaseState, baseState, category);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeEtage, etage, category);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRaum, raum, category);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeDevice, device, category);
}

function createDatenpunktSingle(adapter: any, deviceRawId, attributeType, attributeName, attributeValue, category) {
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
export function loadHomematicRollladen(adapter: any) {
    if (cacheRollladenArray != null) {
        return cacheRollladenArray;
    }
    // @ts-ignore            
    cacheRollladenArray = [];
    adapter.$('state[id=0_userdata.0.devices.homematic.*.*.category]').each(datenpunktKey => {  // 0_userdata.0.devices.homematic.30.type
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
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
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
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
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
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
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
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
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
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
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceHomematicWandschalter) {
            // @ts-ignore            
            cacheWandschalterArray.push(new HomematicWandschalter(adapter,
                adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
            ));
        }
    });
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
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
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
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
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
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
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
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
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
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
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
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
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
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
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
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
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
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
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
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == deviceHomematicDimmer) {
            // @ts-ignore            
            cacheDimmerArray.push(new HomematicDimmer(adapter,
                adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
            ));
        }
    });
    return cacheDimmerArray;
}

var homematicAllArray = null;
export function loadHomematicDevicesAll(adapter: any) {
    if (homematicAllArray != null) {
        return homematicAllArray;
    }

    // @ts-ignore            
    homematicAllArray = [];

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
    return homematicAllArray;
}

module.exports = { createHomematicDevice, loadHomematicWandthermostate, loadHomematicPraesenzmelder, loadHomematicWetterstationen, loadHomematicDoors, loadHomematicRollladen, loadHomematicWandschalter, loadHomematicFussbodenheizungen, loadHomematicWandtaster, loadHomematicAccessPoints, loadHomematicTemperatursensoren, loadHomematicRauchmelder, loadHomematicFunktschaltaktoren, loadHomematicWindows, loadHomematicSteckdosen, loadHomematicHeizkoerper, loadHomematicDimmer, loadHomematicDevicesAll };