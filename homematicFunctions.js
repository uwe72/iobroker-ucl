"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHomematicDevicesAll = exports.getHomematicDevices = exports.createDatenpunktDevice = void 0;
var _a = require('./homematicClasses.js'), HomematicWindow = _a.HomematicWindow, HomematicSteckdose = _a.HomematicSteckdose, HomematicHeizkoerper = _a.HomematicHeizkoerper, HomematicDimmer = _a.HomematicDimmer, HomematicWandthermostat = _a.HomematicWandthermostat, HomematicFussbodenheizung = _a.HomematicFussbodenheizung, HomematicWandschalter = _a.HomematicWandschalter, HomematicDoor = _a.HomematicDoor, HomematicWetterstation = _a.HomematicWetterstation, HomematicAccessPoint = _a.HomematicAccessPoint, HomematicRollladen = _a.HomematicRollladen, HomematicWandtaster = _a.HomematicWandtaster, HomematicTemperatursensor = _a.HomematicTemperatursensor, HomematicRauchmelder = _a.HomematicRauchmelder, HomematicPraesenzmelder = _a.HomematicPraesenzmelder, AbstractHomematic = _a.AbstractHomematic, HomematicFunkschaltaktor = _a.HomematicFunkschaltaktor, deviceHomematicWandthermostat = _a.deviceHomematicWandthermostat, deviceHomematicPraesenzmelder = _a.deviceHomematicPraesenzmelder, deviceHomematicWetterstation = _a.deviceHomematicWetterstation, deviceHomematicDoor = _a.deviceHomematicDoor, deviceHomematicRollladen = _a.deviceHomematicRollladen, deviceHomematicWandschalter = _a.deviceHomematicWandschalter, deviceHomematicFussbodenheizung = _a.deviceHomematicFussbodenheizung, deviceHomematicWandtaster = _a.deviceHomematicWandtaster, deviceHomematicAccessPoint = _a.deviceHomematicAccessPoint, deviceHomematicTemperatursensor = _a.deviceHomematicTemperatursensor, deviceHomematicRauchmelder = _a.deviceHomematicRauchmelder, deviceHomematicFunkSchaltaktor = _a.deviceHomematicFunkSchaltaktor, deviceHomematicWindow = _a.deviceHomematicWindow, deviceHomematicSteckdose = _a.deviceHomematicSteckdose, deviceHomematicHeizkoerper = _a.deviceHomematicHeizkoerper, deviceHomematicDimmer = _a.deviceHomematicDimmer;
var attributeRawID = "rawId";
var attributeBaseState = "baseState";
var attributeEtage = "etage";
var attributeRaum = "raum";
var attributeDevice = "device";
var attributeCategory = "type";
var attributeTypeNumber = "number";
var attributeTypeString = "string";
function createDatenpunktDevice(adapter, rawId, baseState, etage, raum, device, category) {
    createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRawID, rawId);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeCategory, category);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeBaseState, baseState);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeEtage, etage);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRaum, raum);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeDevice, device);
}
exports.createDatenpunktDevice = createDatenpunktDevice;
function createDatenpunktSingle(adapter, deviceRawId, attributeType, attributeName, attributeValue) {
    var stateDatenpunkt = "0_userdata.0.devices.homematic." + deviceRawId + "." + attributeName;
    adapter.createState(stateDatenpunkt, null, {
        name: stateDatenpunkt,
        desc: stateDatenpunkt,
        type: attributeType,
        read: true,
        write: true
    });
    adapter.setState(stateDatenpunkt, attributeValue);
}
function getHomematicDevices(adapter, filterCategory) {
    var _this = this;
    var homematicArray = [{}];
    adapter.$('state[id=0_userdata.0.devices.homematic.*.type]').each(function (datenpunktKey) {
        var datenpunktPraefix = datenpunktKey.replaceAll(".type", "");
        if (adapter.getState(datenpunktKey).val == filterCategory) {
            if (filterCategory == deviceHomematicWandthermostat) {
                homematicArray.push(new HomematicWandthermostat(_this, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
                ));
            }
            else if (filterCategory == deviceHomematicPraesenzmelder) {
                homematicArray.push(new HomematicPraesenzmelder(_this, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
                ));
            }
            else if (filterCategory == deviceHomematicWetterstation) {
                homematicArray.push(new HomematicWetterstation(_this, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
                ));
            }
            else if (filterCategory == deviceHomematicDoor) {
                homematicArray.push(new HomematicDoor(_this, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
                ));
            }
            else if (filterCategory == deviceHomematicRollladen) {
                homematicArray.push(new HomematicRollladen(_this, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
                ));
            }
            else if (filterCategory == deviceHomematicWandschalter) {
                homematicArray.push(new HomematicWandschalter(_this, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
                ));
            }
            else if (filterCategory == deviceHomematicFussbodenheizung) {
                homematicArray.push(new HomematicFussbodenheizung(_this, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
                ));
            }
            else if (filterCategory == deviceHomematicWandtaster) {
                homematicArray.push(new HomematicWandtaster(_this, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
                ));
            }
            else if (filterCategory == deviceHomematicAccessPoint) {
                homematicArray.push(new HomematicAccessPoint(_this, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
                ));
            }
            else if (filterCategory == deviceHomematicTemperatursensor) {
                homematicArray.push(new HomematicTemperatursensor(_this, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
                ));
            }
            else if (filterCategory == deviceHomematicRauchmelder) {
                homematicArray.push(new HomematicRauchmelder(_this, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
                ));
            }
            else if (filterCategory == deviceHomematicFunkSchaltaktor) {
                homematicArray.push(new HomematicFunkschaltaktor(_this, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
                ));
            }
            else if (filterCategory == deviceHomematicWindow) {
                homematicArray.push(new HomematicWindow(_this, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
                ));
            }
            else if (filterCategory == deviceHomematicSteckdose) {
                homematicArray.push(new HomematicSteckdose(_this, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
                ));
            }
            else if (filterCategory == deviceHomematicHeizkoerper) {
                homematicArray.push(new HomematicHeizkoerper(_this, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                adapter.getState(datenpunktPraefix + "." + attributeEtage).val, // [2] Etage/Bereich     (z.B. EG)
                adapter.getState(datenpunktPraefix + "." + attributeRaum).val, // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                adapter.getState(datenpunktPraefix + "." + attributeDevice).val // [4] Device            (z.B. Stehlampe)            
                ));
            }
            else if (filterCategory == deviceHomematicDimmer) {
                homematicArray.push(new HomematicDimmer(_this, adapter.getState(datenpunktPraefix + "." + attributeRawID).val, // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
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
    var homematicArray = [{}];
    adapter.getHomematicDevices(deviceHomematicWandthermostat).forEach(function (homematic) {
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(deviceHomematicPraesenzmelder).forEach(function (homematic) {
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(deviceHomematicWetterstation).forEach(function (homematic) {
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(deviceHomematicDoor).forEach(function (homematic) {
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(deviceHomematicRollladen).forEach(function (homematic) {
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(deviceHomematicWandschalter).forEach(function (homematic) {
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(deviceHomematicFussbodenheizung).forEach(function (homematic) {
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(deviceHomematicWandtaster).forEach(function (homematic) {
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(deviceHomematicAccessPoint).forEach(function (homematic) {
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(deviceHomematicTemperatursensor).forEach(function (homematic) {
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(deviceHomematicRauchmelder).forEach(function (homematic) {
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(deviceHomematicFunkSchaltaktor).forEach(function (homematic) {
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(deviceHomematicWindow).forEach(function (homematic) {
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(deviceHomematicSteckdose).forEach(function (homematic) {
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(deviceHomematicHeizkoerper).forEach(function (homematic) {
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(deviceHomematicDimmer).forEach(function (homematic) {
        homematicArray.push(homematic);
    });
    return homematicArray;
}
exports.getHomematicDevicesAll = getHomematicDevicesAll;
/*export function getHomematicDevicesUwe(adapter: any, filterCategory:string) {
    adapter.log("INSIDE: ");
    var homematicArray = [];
    adapter.$('state[id=0_userdata.0.devices.homematic.*.type]').each(datenpunktKey => {  // 0_userdata.0.devices.homematic.30.type
        adapter.log("Here i am: " + datenpunktKey);
    });
    return homematicArray;
}*/
module.exports = { createDatenpunktDevice: createDatenpunktDevice, getHomematicDevices: getHomematicDevices, getHomematicDevicesAll: getHomematicDevicesAll };
