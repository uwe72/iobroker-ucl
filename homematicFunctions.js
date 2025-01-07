"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHomematicDevicesAll = exports.getHomematicDevices = exports.createHomematicDevice = void 0;
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
    /*if (adapter.getState(stateDatenpunkt).val != attributeValue) {
        adapter.setState(stateDatenpunkt, attributeValue);
    }*/
}
function getHomematicDevices(adapter, filterCategory) {
    var homematicArray = [];
    //var homematicArray : Array<InstanceType<typeof AbstractHomematic>> = [];
    adapter.$('state[id=0_userdata.0.devices.homematic.*.*.category]').each(function (datenpunktKey) {
        var datenpunktPraefix = datenpunktKey.replaceAll(".category", "");
        if (adapter.getState(datenpunktKey).val == filterCategory) {
            if (filterCategory == deviceHomematicWandthermostat) {
                // @ts-ignore            
                homematicArray.push(new HomematicWandthermostat(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
                ));
            }
            else if (filterCategory == deviceHomematicPraesenzmelder) {
                // @ts-ignore                            
                homematicArray.push(new HomematicPraesenzmelder(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
                ));
            }
            else if (filterCategory == deviceHomematicWetterstation) {
                // @ts-ignore            
                homematicArray.push(new HomematicWetterstation(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
                ));
            }
            else if (filterCategory == deviceHomematicDoor) {
                // @ts-ignore            
                homematicArray.push(new HomematicDoor(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
                ));
            }
            else if (filterCategory == deviceHomematicRollladen) {
                // @ts-ignore                            
                homematicArray.push(new HomematicRollladen(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
                ));
            }
            else if (filterCategory == deviceHomematicWandschalter) {
                // @ts-ignore            
                homematicArray.push(new HomematicWandschalter(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
                ));
            }
            else if (filterCategory == deviceHomematicFussbodenheizung) {
                // @ts-ignore            
                homematicArray.push(new HomematicFussbodenheizung(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
                ));
            }
            else if (filterCategory == deviceHomematicWandtaster) {
                // @ts-ignore            
                homematicArray.push(new HomematicWandtaster(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
                ));
            }
            else if (filterCategory == deviceHomematicAccessPoint) {
                // @ts-ignore            
                homematicArray.push(new HomematicAccessPoint(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
                ));
            }
            else if (filterCategory == deviceHomematicTemperatursensor) {
                // @ts-ignore            
                homematicArray.push(new HomematicTemperatursensor(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
                ));
            }
            else if (filterCategory == deviceHomematicRauchmelder) {
                // @ts-ignore            
                homematicArray.push(new HomematicRauchmelder(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
                ));
            }
            else if (filterCategory == deviceHomematicFunkSchaltaktor) {
                // @ts-ignore            
                homematicArray.push(new HomematicFunkschaltaktor(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
                ));
            }
            else if (filterCategory == deviceHomematicWindow) {
                // @ts-ignore            
                homematicArray.push(new HomematicWindow(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
                ));
            }
            else if (filterCategory == deviceHomematicSteckdose) {
                // @ts-ignore            
                homematicArray.push(new HomematicSteckdose(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
                ));
            }
            else if (filterCategory == deviceHomematicHeizkoerper) {
                // @ts-ignore            
                homematicArray.push(new HomematicHeizkoerper(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
                ));
            }
            else if (filterCategory == deviceHomematicDimmer) {
                // @ts-ignore            
                homematicArray.push(new HomematicDimmer(adapter, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
                ));
            }
        }
    });
    return homematicArray;
}
exports.getHomematicDevices = getHomematicDevices;
function getHomematicDevicesAll(adapter) {
    //var homematicArray : Array<InstanceType<typeof AbstractHomematic>> = [];
    var homematicArray = [];
    adapter.getHomematicDevices(adapter, deviceHomematicWandthermostat).forEach(function (homematic) {
        // @ts-ignore            
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(adapter, deviceHomematicPraesenzmelder).forEach(function (homematic) {
        // @ts-ignore                    
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(adapter, deviceHomematicWetterstation).forEach(function (homematic) {
        // @ts-ignore                    
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(adapter, deviceHomematicDoor).forEach(function (homematic) {
        // @ts-ignore                    
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(adapter, deviceHomematicRollladen).forEach(function (homematic) {
        // @ts-ignore                    
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(adapter, deviceHomematicWandschalter).forEach(function (homematic) {
        // @ts-ignore                    
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(adapter, deviceHomematicFussbodenheizung).forEach(function (homematic) {
        // @ts-ignore                    
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(adapter, deviceHomematicWandtaster).forEach(function (homematic) {
        // @ts-ignore                    
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(adapter, deviceHomematicAccessPoint).forEach(function (homematic) {
        // @ts-ignore                    
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(adapter, deviceHomematicTemperatursensor).forEach(function (homematic) {
        // @ts-ignore                    
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(adapter, deviceHomematicRauchmelder).forEach(function (homematic) {
        // @ts-ignore                    
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(adapter, deviceHomematicFunkSchaltaktor).forEach(function (homematic) {
        // @ts-ignore                    
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(adapter, deviceHomematicWindow).forEach(function (homematic) {
        // @ts-ignore                    
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(adapter, deviceHomematicSteckdose).forEach(function (homematic) {
        // @ts-ignore                    
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(adapter, deviceHomematicHeizkoerper).forEach(function (homematic) {
        // @ts-ignore                    
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(adapter, deviceHomematicDimmer).forEach(function (homematic) {
        // @ts-ignore                    
        homematicArray.push(homematic);
    });
    return homematicArray;
}
exports.getHomematicDevicesAll = getHomematicDevicesAll;
module.exports = { createHomematicDevice: createHomematicDevice, getHomematicDevices: getHomematicDevices, getHomematicDevicesAll: getHomematicDevicesAll };
