const { HomematicWindow, HomematicSteckdose, HomematicHeizkoerper, HomematicDimmer, HomematicWandthermostat, HomematicFussbodenheizung, HomematicWandschalter, HomematicDoor, HomematicWetterstation, HomematicAccessPoint, HomematicRollladen, HomematicWandtaster, HomematicTemperatursensor, HomematicRauchmelder, HomematicPraesenzmelder, AbstractHomematic, HomematicFunkschaltaktor, deviceHomematicWandthermostat, deviceHomematicPraesenzmelder, deviceHomematicWetterstation, deviceHomematicDoor, deviceHomematicRollladen, deviceHomematicWandschalter, deviceHomematicFussbodenheizung, deviceHomematicWandtaster, deviceHomematicAccessPoint, deviceHomematicTemperatursensor, deviceHomematicRauchmelder, deviceHomematicFunkSchaltaktor, deviceHomematicWindow, deviceHomematicSteckdose, deviceHomematicHeizkoerper, deviceHomematicDimmer} = require('./homematicClasses.js');

const attributeRawID = "rawId";
const attributeBaseState = "baseState";
const attributeEtage = "etage";
const attributeRaum = "raum";
const attributeDevice = "device";
const attributeCategory = "type";

const attributeTypeNumber = "number";
const attributeTypeString = "string";

export function createDatenpunktDevice(adapter:any, rawId, baseState, etage, raum, device, category) {
    createDatenpunktSingle(adapter, rawId, attributeTypeNumber, attributeRawID, rawId);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeCategory, category);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeBaseState, baseState);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeEtage, etage);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeRaum, raum);
    createDatenpunktSingle(adapter, rawId, attributeTypeString, attributeDevice, device);
}

function createDatenpunktSingle(adapter:any, deviceRawId, attributeType, attributeName, attributeValue) {
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

export function getHomematicDevices(adapter:any, filterCategory:string) {
    var homematicArray = [{}];
    adapter.$('state[id=0_userdata.0.devices.homematic.*.type]').each(datenpunktKey => {  // 0_userdata.0.devices.homematic.30.type
        var datenpunktPraefix = datenpunktKey.replaceAll(".type", "");
        if (adapter.getState(datenpunktKey).val == filterCategory) {
            if (filterCategory == deviceHomematicWandthermostat) {
                homematicArray.push(new HomematicWandthermostat(this,
                    adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                    adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                    adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                    adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                    adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
                ));
            } else if (filterCategory == deviceHomematicPraesenzmelder) {
                homematicArray.push(new HomematicPraesenzmelder(this,
                    adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                    adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                    adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                    adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                    adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
                ));
            } else if (filterCategory == deviceHomematicWetterstation) {
                homematicArray.push(new HomematicWetterstation(this,
                    adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                    adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                    adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                    adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                    adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
                ));
            } else if (filterCategory == deviceHomematicDoor) {
                homematicArray.push(new HomematicDoor(this,
                    adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                    adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                    adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                    adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                    adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
                ));
            } else if (filterCategory == deviceHomematicRollladen) {
                homematicArray.push(new HomematicRollladen(this,
                    adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                    adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                    adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                    adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                    adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
                ));
            } else if (filterCategory == deviceHomematicWandschalter) {
                homematicArray.push(new HomematicWandschalter(this,
                    adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                    adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                    adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                    adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                    adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
                ));
            } else if (filterCategory == deviceHomematicFussbodenheizung) {
                homematicArray.push(new HomematicFussbodenheizung(this,
                    adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                    adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                    adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                    adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                    adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
                ));
            } else if (filterCategory == deviceHomematicWandtaster) {
                homematicArray.push(new HomematicWandtaster(this,
                    adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                    adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                    adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                    adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                    adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
                ));
            } else if (filterCategory == deviceHomematicAccessPoint) {
                homematicArray.push(new HomematicAccessPoint(this,
                    adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                    adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                    adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                    adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                    adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
                ));
            } else if (filterCategory == deviceHomematicTemperatursensor) {
                homematicArray.push(new HomematicTemperatursensor(this,
                    adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                    adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                    adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                    adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                    adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
                ));
            } else if (filterCategory == deviceHomematicRauchmelder) {
                homematicArray.push(new HomematicRauchmelder(this,
                    adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                    adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                    adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                    adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                    adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
                ));
            } else if (filterCategory == deviceHomematicFunkSchaltaktor) {
                homematicArray.push(new HomematicFunkschaltaktor(this,
                    adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                    adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                    adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                    adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                    adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
                ));
            } else if (filterCategory == deviceHomematicWindow) {
                homematicArray.push(new HomematicWindow(this,
                    adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                    adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                    adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                    adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                    adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
                ));
            } else if (filterCategory == deviceHomematicSteckdose) {
                homematicArray.push(new HomematicSteckdose(this,
                    adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                    adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                    adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                    adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                    adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
                ));
            } else if (filterCategory == deviceHomematicHeizkoerper) {
                homematicArray.push(new HomematicHeizkoerper(this,
                    adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                    adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                    adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                    adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                    adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
                ));
            } else if (filterCategory == deviceHomematicDimmer) {
                homematicArray.push(new HomematicDimmer(this,
                    adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                    adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                    adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                    adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                    adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
                ));
            }
        }                                    

    });
    return homematicArray;
}

export function getHomematicDevicesAll(adapter:any) {
    var homematicArray = [{}];

    adapter.getHomematicDevices(deviceHomematicWandthermostat).forEach(homematic => {
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(deviceHomematicPraesenzmelder).forEach(homematic => {
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(deviceHomematicWetterstation).forEach(homematic => {
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(deviceHomematicDoor).forEach(homematic => {
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(deviceHomematicRollladen).forEach(homematic => {
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(deviceHomematicWandschalter).forEach(homematic => {
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(deviceHomematicFussbodenheizung).forEach(homematic => {
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(deviceHomematicWandtaster).forEach(homematic => {
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(deviceHomematicAccessPoint).forEach(homematic => {
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(deviceHomematicTemperatursensor).forEach(homematic => {
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(deviceHomematicRauchmelder).forEach(homematic => {
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(deviceHomematicFunkSchaltaktor).forEach(homematic => {
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(deviceHomematicWindow).forEach(homematic => {
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(deviceHomematicSteckdose).forEach(homematic => {
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(deviceHomematicHeizkoerper).forEach(homematic => {
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(deviceHomematicDimmer).forEach(homematic => {
        homematicArray.push(homematic);
    });
    return homematicArray;
}

/*export function getHomematicDevicesUwe(adapter: any, filterCategory:string) {
    adapter.log("INSIDE: ");
    var homematicArray = [];    
    adapter.$('state[id=0_userdata.0.devices.homematic.*.type]').each(datenpunktKey => {  // 0_userdata.0.devices.homematic.30.type
        adapter.log("Here i am: " + datenpunktKey);
    });
    return homematicArray;
}*/

module.exports = { createDatenpunktDevice, getHomematicDevices, getHomematicDevicesAll };