"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadHomematicDevicesAll = exports.loadHomematicDimmer = exports.loadHomematicHeizkoerper = exports.loadHomematicSteckdosen = exports.loadHomematicWindows = exports.loadHomematicFunktschaltaktoren = exports.loadHomematicRauchmelder = exports.loadHomematicTemperatursensoren = exports.loadHomematicAccessPoints = exports.loadHomematicWandtaster = exports.loadHomematicFussbodenheizungen = exports.loadHomematicWandschalter = exports.loadHomematicDoors = exports.loadHomematicWetterstationen = exports.loadHomematicPraesenzmelder = exports.loadHomematicWandthermostate = exports.loadHomematicRollladen = exports.createHomematicDevice = void 0;
var _a = require('./homematicClasses.js'), HomematicWindow = _a.HomematicWindow, HomematicSteckdose = _a.HomematicSteckdose, HomematicHeizkoerper = _a.HomematicHeizkoerper, HomematicDimmer = _a.HomematicDimmer, HomematicWandthermostat = _a.HomematicWandthermostat, HomematicFussbodenheizung = _a.HomematicFussbodenheizung, HomematicWandschalter = _a.HomematicWandschalter, HomematicDoor = _a.HomematicDoor, HomematicWetterstation = _a.HomematicWetterstation, HomematicAccessPoint = _a.HomematicAccessPoint, HomematicRollladen = _a.HomematicRollladen, HomematicWandtaster = _a.HomematicWandtaster, HomematicTemperatursensor = _a.HomematicTemperatursensor, HomematicRauchmelder = _a.HomematicRauchmelder, HomematicPraesenzmelder = _a.HomematicPraesenzmelder, AbstractHomematic = _a.AbstractHomematic, HomematicFunkschaltaktor = _a.HomematicFunkschaltaktor, deviceHomematicWandthermostat = _a.deviceHomematicWandthermostat, deviceHomematicPraesenzmelder = _a.deviceHomematicPraesenzmelder, deviceHomematicWetterstation = _a.deviceHomematicWetterstation, deviceHomematicDoor = _a.deviceHomematicDoor, deviceHomematicRollladen = _a.deviceHomematicRollladen, deviceHomematicWandschalter = _a.deviceHomematicWandschalter, deviceHomematicFussbodenheizung = _a.deviceHomematicFussbodenheizung, deviceHomematicWandtaster = _a.deviceHomematicWandtaster, deviceHomematicAccessPoint = _a.deviceHomematicAccessPoint, deviceHomematicTemperatursensor = _a.deviceHomematicTemperatursensor, deviceHomematicRauchmelder = _a.deviceHomematicRauchmelder, deviceHomematicFunkSchaltaktor = _a.deviceHomematicFunkSchaltaktor, deviceHomematicWindow = _a.deviceHomematicWindow, deviceHomematicSteckdose = _a.deviceHomematicSteckdose, deviceHomematicHeizkoerper = _a.deviceHomematicHeizkoerper, deviceHomematicDimmer = _a.deviceHomematicDimmer;
var attributeRawID = "rawId";
var attributeBaseState = "baseState";
var attributeEtage = "etage";
var attributeRaum = "raum";
var attributeDevice = "device";
var attributeCategory = "category";
var attributeTypeNumber = "number";
var attributeTypeString = "string";
function createHomematicDevice(adapter, rawId, baseState, etage, raum, device, category) {
    createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRawID, rawId, category);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeCategory, category, category);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeBaseState, baseState, category);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeEtage, etage, category);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRaum, raum, category);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeDevice, device, category);
}
exports.createHomematicDevice = createHomematicDevice;
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
            adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
            ));
        }
    });
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
            // @ts-ignore            
            cacheDimmerArray.push(new HomematicDimmer(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
            adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
            adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
            adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
            adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
            ));
        }
    });
    return cacheDimmerArray;
}
exports.loadHomematicDimmer = loadHomematicDimmer;
var homematicAllArray = null;
function loadHomematicDevicesAll(adapter) {
    if (homematicAllArray != null) {
        return homematicAllArray;
    }
    // @ts-ignore            
    homematicAllArray = [];
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
    return homematicAllArray;
}
exports.loadHomematicDevicesAll = loadHomematicDevicesAll;
module.exports = { createHomematicDevice: createHomematicDevice, loadHomematicWandthermostate: loadHomematicWandthermostate, loadHomematicPraesenzmelder: loadHomematicPraesenzmelder, loadHomematicWetterstationen: loadHomematicWetterstationen, loadHomematicDoors: loadHomematicDoors, loadHomematicRollladen: loadHomematicRollladen, loadHomematicWandschalter: loadHomematicWandschalter, loadHomematicFussbodenheizungen: loadHomematicFussbodenheizungen, loadHomematicWandtaster: loadHomematicWandtaster, loadHomematicAccessPoints: loadHomematicAccessPoints, loadHomematicTemperatursensoren: loadHomematicTemperatursensoren, loadHomematicRauchmelder: loadHomematicRauchmelder, loadHomematicFunktschaltaktoren: loadHomematicFunktschaltaktoren, loadHomematicWindows: loadHomematicWindows, loadHomematicSteckdosen: loadHomematicSteckdosen, loadHomematicHeizkoerper: loadHomematicHeizkoerper, loadHomematicDimmer: loadHomematicDimmer, loadHomematicDevicesAll: loadHomematicDevicesAll };
