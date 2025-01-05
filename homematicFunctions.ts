const { HomematicWindow, HomematicSteckdose, HomematicHeizkoerper, HomematicDimmer, HomematicWandthermostat, HomematicFussbodenheizung, HomematicWandschalter, HomematicDoor, HomematicWetterstation, HomematicAccessPoint, HomematicRollladen, HomematicWandtaster, HomematicTemperatursensor, HomematicRauchmelder, HomematicPraesenzmelder, AbstractHomematic, HomematicFunkschaltaktor, deviceHomematicWandthermostat, deviceHomematicPraesenzmelder, deviceHomematicWetterstation, deviceHomematicDoor, deviceHomematicRollladen, deviceHomematicWandschalter, deviceHomematicFussbodenheizung, deviceHomematicWandtaster, deviceHomematicAccessPoint, deviceHomematicTemperatursensor, deviceHomematicRauchmelder, deviceHomematicFunkSchaltaktor, deviceHomematicWindow, deviceHomematicSteckdose, deviceHomematicHeizkoerper, deviceHomematicDimmer} = require('./homematicClasses.js');

const attributeRawID = "rawId";
const attributeBaseState = "baseState";
const attributeEtage = "etage";
const attributeRaum = "raum";
const attributeDevice = "device";
const attributeCategory = "type";

const attributeTypeNumber = "number";
const attributeTypeString = "string";

export function createHomematicDevice(adapter:any, rawId, baseState, etage, raum, device, category) {
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
    var homematicArray = [];
    //var homematicArray : Array<InstanceType<typeof AbstractHomematic>> = [];
    
    adapter.$('state[id=0_userdata.0.devices.homematic.*.type]').each(datenpunktKey => {  // 0_userdata.0.devices.homematic.30.type
        var datenpunktPraefix = datenpunktKey.replaceAll(".type", "");
        if (adapter.getState(datenpunktKey).val == filterCategory) {
            if (filterCategory == deviceHomematicWandthermostat) {
                // @ts-ignore            
                homematicArray.push(new HomematicWandthermostat(adapter,
                    adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                    adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                    adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                    adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                    adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
                ));
            } else if (filterCategory == deviceHomematicPraesenzmelder) {
                // @ts-ignore                            
                homematicArray.push(new HomematicPraesenzmelder(adapter,
                    adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                    adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                    adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                    adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                    adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
                ));
            } else if (filterCategory == deviceHomematicWetterstation) {
                // @ts-ignore            
                homematicArray.push(new HomematicWetterstation(adapter,
                    adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                    adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                    adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                    adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                    adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
                ));
            } else if (filterCategory == deviceHomematicDoor) {
                // @ts-ignore            
                homematicArray.push(new HomematicDoor(adapter,
                    adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                    adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                    adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                    adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                    adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
                ));
            } else if (filterCategory == deviceHomematicRollladen) {
                // @ts-ignore                            
                homematicArray.push(new HomematicRollladen(adapter,
                    adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                    adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                    adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                    adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                    adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
                ));
            } else if (filterCategory == deviceHomematicWandschalter) {
                // @ts-ignore            
                homematicArray.push(new HomematicWandschalter(adapter,
                    adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                    adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                    adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                    adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                    adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
                ));
            } else if (filterCategory == deviceHomematicFussbodenheizung) {
                // @ts-ignore            
                homematicArray.push(new HomematicFussbodenheizung(adapter,
                    adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                    adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                    adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                    adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                    adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
                ));
            } else if (filterCategory == deviceHomematicWandtaster) {
                // @ts-ignore            
                homematicArray.push(new HomematicWandtaster(adapter,
                    adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                    adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                    adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                    adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                    adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
                ));
            } else if (filterCategory == deviceHomematicAccessPoint) {
                // @ts-ignore            
                homematicArray.push(new HomematicAccessPoint(adapter,
                    adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                    adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                    adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                    adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                    adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
                ));
            } else if (filterCategory == deviceHomematicTemperatursensor) {
                // @ts-ignore            
                homematicArray.push(new HomematicTemperatursensor(adapter,
                    adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                    adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                    adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                    adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                    adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
                ));
            } else if (filterCategory == deviceHomematicRauchmelder) {
                // @ts-ignore            
                homematicArray.push(new HomematicRauchmelder(adapter,
                    adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                    adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                    adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                    adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                    adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
                ));
            } else if (filterCategory == deviceHomematicFunkSchaltaktor) {
                // @ts-ignore            
                homematicArray.push(new HomematicFunkschaltaktor(adapter,
                    adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                    adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                    adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                    adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                    adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
                ));
            } else if (filterCategory == deviceHomematicWindow) {
                // @ts-ignore            
                homematicArray.push(new HomematicWindow(adapter,
                    adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                    adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                    adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                    adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                    adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
                ));
            } else if (filterCategory == deviceHomematicSteckdose) {
                // @ts-ignore            
                homematicArray.push(new HomematicSteckdose(adapter,
                    adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                    adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                    adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                    adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                    adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
                ));
            } else if (filterCategory == deviceHomematicHeizkoerper) {
                // @ts-ignore            
                homematicArray.push(new HomematicHeizkoerper(adapter,
                    adapter.getState(datenpunktPraefix + "." + attributeRawID).val,     // [0] Device-ID         (z.B. 1 --> In der Anzeige wird daraus "H01")
                    adapter.getState(datenpunktPraefix + "." + attributeBaseState).val, // [1] Datenpunkt Device (z.B. hm-rpc.1.001B9D898F9CBC)
                    adapter.getState(datenpunktPraefix + "." + attributeEtage).val,     // [2] Etage/Bereich     (z.B. EG)
                    adapter.getState(datenpunktPraefix + "." + attributeRaum).val,      // [3] Raum/Unterbereich (z.B. Wohnzimmer)
                    adapter.getState(datenpunktPraefix + "." + attributeDevice).val     // [4] Device            (z.B. Stehlampe)            
                ));
            } else if (filterCategory == deviceHomematicDimmer) {
                // @ts-ignore            
                homematicArray.push(new HomematicDimmer(adapter,
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
    //var homematicArray : Array<InstanceType<typeof AbstractHomematic>> = [];
    var homematicArray = [];

    
    adapter.getHomematicDevices(adapter, deviceHomematicWandthermostat).forEach(homematic => {
        // @ts-ignore            
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(adapter, deviceHomematicPraesenzmelder).forEach(homematic => {
        // @ts-ignore                    
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(adapter, deviceHomematicWetterstation).forEach(homematic => {
        // @ts-ignore                    
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(adapter, deviceHomematicDoor).forEach(homematic => {
        // @ts-ignore                    
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(adapter, deviceHomematicRollladen).forEach(homematic => {
        // @ts-ignore                    
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(adapter, deviceHomematicWandschalter).forEach(homematic => {
        // @ts-ignore                    
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(adapter, deviceHomematicFussbodenheizung).forEach(homematic => {
        // @ts-ignore                    
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(adapter, deviceHomematicWandtaster).forEach(homematic => {
        // @ts-ignore                    
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(adapter, deviceHomematicAccessPoint).forEach(homematic => {
        // @ts-ignore                    
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(adapter, deviceHomematicTemperatursensor).forEach(homematic => {
        // @ts-ignore                    
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(adapter, deviceHomematicRauchmelder).forEach(homematic => {
        // @ts-ignore                    
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(adapter, deviceHomematicFunkSchaltaktor).forEach(homematic => {
        // @ts-ignore                    
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(adapter, deviceHomematicWindow).forEach(homematic => {
        // @ts-ignore                    
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(adapter, deviceHomematicSteckdose).forEach(homematic => {
        // @ts-ignore                    
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(adapter, deviceHomematicHeizkoerper).forEach(homematic => {
        // @ts-ignore                    
        homematicArray.push(homematic);
    });
    adapter.getHomematicDevices(adapter, deviceHomematicDimmer).forEach(homematic => {
        // @ts-ignore                    
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

module.exports = { createHomematicDevice, getHomematicDevices, getHomematicDevicesAll };