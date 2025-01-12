const deviceShellyLampeWeiss: string = "Lampe Weiss";
const deviceShellyDimmer: string = "Dimmer";
const deviceShellyLampeRGB: string = "Lampe RGB"
const deviceShellySteckdose: string = "Steckdose"
const deviceShellyRollladen: string = "Rollladen"
const deviceShellySensor: string = "Sensor"

export abstract class AbstractShelly {
    protected baseState: string;
    protected etage: string;
    protected raum: string;
    protected device: string;
    private id: number;
    protected adapter:any;

    constructor(adapter:any, id: number, etage: string, raum: string, device: string, baseState: string) {
        this.adapter = adapter;
        this.id = id;
        this.etage = etage;
        this.raum = raum;
        this.device = device;        
        this.baseState = baseState;
    }

    public getDeviceId() : string {
        return "S" + this.id.toString().padStart(2, '0');
    }    

    public getDeviceIdAsRawNumber() : number {
        return this.id;
    }

    abstract getCategory(): string;

    public getEtage() : string {
        return this.etage;
    }

     public getRaum() : string {
        return this.raum;
    }

    public getDevice() : string {
        return this.device;
    }        

    public getBezeichnung() : string {
        return this.etage + " " + this.raum + " " + this.device;
    }

    public getIP() : string {
        return this.adapter.getState(this.baseState + ".hostname").val;
    }    

    public isNewFirmwareAvailable() : boolean {
        return this.adapter.getState(this.baseState + ".firmware").val;
    }

    public getBaseState() : string {
        return this.baseState;
    }

    public getReducedBaseState() : string {
        return this.baseState.replace("shelly.0.", "");        
    }

    // Shelly1, Shelly2.5,...
    public getType() : string {
        var typ = this.adapter.getState(this.baseState + ".id").val;
        if (typ == "shelly1") {
            return "1";
        } else if (typ == "shellyswitch25") {
            return "2.5";
        } else if (typ == "shellyswitch") {
            return "2.0";
        } else if (typ == "shellyplug-s") {
            return "Plug";
        } else if (typ == "shellyem3") {
            return "3EM";
        } else {
            return typ;
        }
    }

    public getSignal() : string {
        return this.adapter.getState(this.baseState + ".rssi").val;
    }       
    
    public getUptime() : string {
        return this.adapter.getState(this.baseState + ".uptime").val;
    }    

    public getFirmware() : string {
        var versionState = this.baseState + ".version";
        var version = this.adapter.getState(versionState).val;
        version= version.substr(0, version.indexOf('-')); 
        return version;
    }    

    public isOnline() : boolean {
        return this.adapter.getState(this.getBaseState() + ".online").val;    // shelly.0.SHPLG-S#B4D3AE#1.online        
    }

    protected createIOTAdapterSmartDevices(smartName) {

        // Level:
        // ----------------------------------------------------------------------------------
        var alexaLampeLevel = "0_userdata.0.alexa." + smartName + ".level";
        this.adapter.createState(alexaLampeLevel, 0, {
            name: alexaLampeLevel,
            desc: alexaLampeLevel,
            type: 'number',
            read: true,
            write: true
        });

        // @ts-ignore                    
        let objLevel = this.adapter.getObject(alexaLampeLevel) as unknown as iobJS.StateObject;
        objLevel.common = {
            "type": "number",
            "name": alexaLampeLevel,
            "read": true,
            "write": true,
            "role": "level.dimmer",
            "min": 0,
            "max": 100,
            "def": 0,
            "smartName": {
                "de": smartName,
                "smartType": "LIGHT"
            }
        };
        this.adapter.setObject(alexaLampeLevel, objLevel);

        // HUE:
        // ----------------------------------------------------------------------------------
        var alexaLampeHue = "0_userdata.0.alexa." + smartName + ".hue";
        this.adapter.createState(alexaLampeHue, 0, {
            name: alexaLampeHue,
            desc: alexaLampeHue,
            type: 'number',
            read: true,
            write: true
        });
        // @ts-ignore                    
        let objHue = this.adapter.getObject(alexaLampeHue) as unknown as iobJS.StateObject;
        objHue.common = {
            "name": alexaLampeHue,
            "desc": alexaLampeHue,
            "type": "number",
            "read": true,
            "write": true,
            "role": "level.color.hue", // <---- Das ist wichtig, ohne dieses Common-Zeugs würde hier "state" stehen und die ALexa-App würde dieses Gerär nicht als "Farbe-Lampe" akzeptieren/erkennen
            "smartName": {
                "de": smartName,
                "smartType": "LIGHT"
            }
        };
        this.adapter.setObject(alexaLampeHue, objHue);

        // SAT:
        // ----------------------------------------------------------------------------------
        var alexaLampeSat = "0_userdata.0.alexa." + smartName + ".sat";
        this.adapter.createState(alexaLampeSat, 0, {
            name: alexaLampeSat,
            desc: alexaLampeSat,
            type: 'number',
            read: true,
            write: true
        });
        // @ts-ignore                                
        let obSat = this.adapter.getObject(alexaLampeSat) as unknown as iobJS.StateObject;
        obSat.common = {
            "name": alexaLampeSat,
            "desc": alexaLampeSat,
            "type": "number",
            "read": true,
            "write": true,
            "role": "level.color.saturation", // <---- Das ist wichtig, ohne dieses Common-Zeugs würde hier "state" stehen und die ALexa-App würde dieses Gerär nicht als "Farbe-Lampe" akzeptieren/erkennen
            "smartName": {
                "de": smartName,
                "smartType": "LIGHT"
            }
        };
        this.adapter.setObject(alexaLampeSat, obSat);

        // CT:
        // ----------------------------------------------------------------------------------
        var alexaLampeCT = "0_userdata.0.alexa." + smartName + ".ct";
        this.adapter.createState(alexaLampeCT, 0, {
            name: alexaLampeCT,
            desc: alexaLampeCT,
            type: 'number',
            read: true,
            write: true
        });
        // @ts-ignore                    
        let objCT = this.adapter.getObject(alexaLampeCT) as unknown as iobJS.StateObject;
        objCT.common = {
            "type": "number",
            "name": alexaLampeCT,
            "read": true,
            "write": true,
            "role": "level.color.temperature",
            "smartName": {
                "de": smartName,
                "smartType": "LIGHT"
            }
        };
        this.adapter.setObject(alexaLampeCT, objCT);
    }
}

export class ShellyLampeWeiss extends AbstractShelly {
    protected alexaSmartNamesForOn:string[];
    protected alexaSmartNamesForOff: string[];
    protected alexaActionNamesForOn:string[];
    protected alexaActionNamesForOff: string[];

    private channel: number;
    private additionalStates4TurnOn:string[];
    private additionalStates4TurnOff:string[];
    private nachtbeleuchtung:boolean;
    private turnOffExitHouseSummer:boolean;
    private turnOffExitHouseWinter:boolean;
    private turnOnEnterHouseSummer:boolean;
    private turnOnEnterHouseWinter:boolean;

    constructor(adapter:any, id: number, etage: string, raum: string, device: string, baseState: string, channel: number, alexaSmartNamesForOn:string[], alexaActionNamesForOn:string[], alexaSmartNamesForOff: string[],
        alexaActionNamesForOff: string[], additionalStates4TurnOn:string[], additionalStates4TurnOff:string[], nachtbeleuchtung:boolean, turnOffExitHouseSummer:boolean, turnOffExitHouseWinter:boolean, turnOnEnterHouseSummer:boolean, turnOnEnterHouseWinter:boolean) {
        super(adapter, id, etage, raum, device, baseState); 
        this.turnOffExitHouseSummer = turnOffExitHouseSummer;
        this.turnOffExitHouseWinter = turnOffExitHouseWinter;
        this.turnOnEnterHouseSummer = turnOnEnterHouseSummer;
        this.turnOnEnterHouseWinter = turnOnEnterHouseWinter;

        adapter.log("here7777: " + additionalStates4TurnOff);

        this.nachtbeleuchtung = nachtbeleuchtung;
        this.channel = channel;
        this.alexaSmartNamesForOn = alexaSmartNamesForOn;
        this.alexaSmartNamesForOff = alexaSmartNamesForOff;
        this.alexaActionNamesForOn = alexaActionNamesForOn;
        this.alexaActionNamesForOff = alexaActionNamesForOff;

        this.additionalStates4TurnOn = additionalStates4TurnOn;
        this.additionalStates4TurnOff = additionalStates4TurnOff;

        this.additionalStates4TurnOn.forEach(booleanOnObj => {    
            this.createState(booleanOnObj);            
        });  
        this.additionalStates4TurnOff.forEach(tasterBooleanOffObj => {    
            this.createState(tasterBooleanOffObj);
        });       
        this.alexaSmartNamesForOn.forEach(alexaSmartName => {  
            this.createIOTAdapterSmartDevices(alexaSmartName);
        });      
        this.alexaSmartNamesForOff.forEach(alexaSmartName => {  
            this.createIOTAdapterSmartDevices(alexaSmartName);
        });      
        this.alexaActionNamesForOn.forEach(alexaSmartName => {  
            this.createIOTAdapterSmartDevices(alexaSmartName);
        });      
        this.alexaActionNamesForOff.forEach(alexaSmartName => {  
            this.createIOTAdapterSmartDevices(alexaSmartName);
        });              
    }

    private createState(key_in) {
        var jarvisDatenpunkt = key_in;//.replace(/\./g,'_'); // wegen Wohnzimmer T.V.
        //log(">>> CREATE STATE: " + jarvisDatenpunkt);
        this.adapter.createState(jarvisDatenpunkt, false, {
            name: jarvisDatenpunkt,
            desc: jarvisDatenpunkt,
            type: 'boolean', 
            read: true,
            write: true
        });     
    }        

    public isTurnOffExitHouseSummer() : boolean {
       return this.turnOffExitHouseSummer;
    }

    public isTurnOffExitHouseWinter() : boolean {
       return this.turnOffExitHouseWinter;
    }

    public isTurnOnEnterHouseSummer() : boolean {
       return this.turnOnEnterHouseSummer;
    }

    public isTurnOnEnterHouseWinter() : boolean {
       return this.turnOnEnterHouseWinter;
    }

    public isNachtbeleuchtung() : boolean {
       return this.nachtbeleuchtung;
    }

    public getAdditionalStates4TurnOn() : string[] {
       return this.additionalStates4TurnOn;
    }

    public getAdditionalStates4TurnOff() : string[] {
       return this.additionalStates4TurnOff;
    }

    public getSwitchState() : string {
        return this.baseState + ".Relay" + this.channel + ".Switch";
    }    

    public isDeviceOn() : boolean {
        return this.adapter.getState(this.getSwitchState()).val;
    }

    public getCategory() : string {
        return deviceShellyLampeWeiss;
    }

    public getAlexaNamesForOnAsString() : string {
        var result = "";

        this.alexaSmartNamesForOn.forEach(alexaOnName => {    
            if (result == "") {
                result += alexaOnName
            } else {
                result += ", " + alexaOnName;
            }
        });        
        this.alexaActionNamesForOn.forEach(alexaOnName => {    
            if (result == "") {
                result += alexaOnName
            } else {
                result += ", " + alexaOnName;
            }
        });        

        return result;
    }

    public getAlexaNamesForOffAsString() : string {
        var result = "";

        this.alexaSmartNamesForOff.forEach(alexaOffName => {    
            if (result == "") {
                result += alexaOffName
            } else {
                result += ", " + alexaOffName;
            }
        });        
        this.alexaActionNamesForOff.forEach(alexaOffName => {    
            if (result == "") {
                result += alexaOffName
            } else {
                result += ", " + alexaOffName;
            }
        });        

        return result;
    }

    public getAlexaSmartNamesForOn() : string[] {
        return this.alexaSmartNamesForOn;
    }    

    public getAlexaSmartNamesForOff() : string[] {
        return this.alexaSmartNamesForOff;
    }    

    public getAlexaActionNamesForOn() : string[] {
        return this.alexaActionNamesForOn;
    }    

    public getAlexaActionNamesForOff() : string[] {
        return this.alexaActionNamesForOff;
    }    
}

export class ShellyDimmerAlexaScheme {
    protected alexaName: string;
    protected level: number;
    protected device: ShellyDimmer;

    constructor(alexaName: string, level: number) {
        this.alexaName = alexaName;
        this.level = level;
    }

    public getAlexaName() : string {
        return this.alexaName;
    }

    public getLevel() : number {
        return this.level;
    }

    public setDevice(device: ShellyDimmer) {
        this.device = device;
    }

    public getDevice() : ShellyDimmer {
        return this.device;
    }
}

class ShellyDimmerTasterScheme {
    protected tasterBooleanOn: string;
    protected level: number;

    constructor(tasterBooleanOn: string, level: number) {
        this.tasterBooleanOn = tasterBooleanOn;
        this.level = level;
    }

    public getTasterBooleanOnName() : string {
        return this.tasterBooleanOn;
    }

    public getLevel() : number {
        return this.level;
    }
}

export class ShellyDimmer extends AbstractShelly {
    protected alexaSmartNamesForOn:string[];
    protected alexaSmartNamesForOff: string[];
    protected alexaActionNamesForOn:string[];
    protected alexaActionNamesForOff: string[];
    protected alexaLevelSchemeForOn: ShellyDimmerAlexaScheme;
     protected tasterBooleanOn: ShellyDimmerTasterScheme[];
    protected levelSchemes: ShellyDimmerAlexaScheme[];
    protected tasterBooleanOff: string[];  

    private nachtbeleuchtung:boolean;
    private turnOffExitHouseSummer:boolean;
    private turnOffExitHouseWinter:boolean;
    private turnOnEnterHouseSummer:boolean;
    private turnOnEnterHouseWinter:boolean;

    constructor(adapter:any, id: number, etage: string, raum: string, device: string, baseState: string, 
            alexaSmartNamesForOn:string[], alexaActionNamesForOn:string[], alexaLevelSchemeForOn: ShellyDimmerAlexaScheme, 
            alexaSmartNamesForOff: string[], alexaActionNamesForOff: string[], levelSchemes: ShellyDimmerAlexaScheme[], 
            tasterBooleanOn: ShellyDimmerTasterScheme[], 
            tasterBooleanOff: string[],nachtbeleuchtung:boolean, turnOffExitHouseSummer:boolean, turnOffExitHouseWinter:boolean, 
            turnOnEnterHouseSummer:boolean, turnOnEnterHouseWinter:boolean) {
        super(adapter, id, etage, raum, device, baseState); 


        adapter.log("here:1 " + alexaLevelSchemeForOn);
        //adapter.log("here:2 " + alexaLevelSchemeForOn.getAlexaName());

        this.alexaSmartNamesForOn = alexaSmartNamesForOn;
        this.alexaSmartNamesForOff = alexaSmartNamesForOff;
         this.alexaActionNamesForOn = alexaActionNamesForOn;
        this.alexaActionNamesForOff = alexaActionNamesForOff;

         this.nachtbeleuchtung = nachtbeleuchtung;
        this.turnOffExitHouseSummer = turnOffExitHouseSummer;
        this.turnOffExitHouseWinter = turnOffExitHouseWinter;
        this.turnOnEnterHouseSummer = turnOnEnterHouseSummer;
        this.turnOnEnterHouseWinter = turnOnEnterHouseWinter;

        this.alexaLevelSchemeForOn = alexaLevelSchemeForOn;
        this.tasterBooleanOn = tasterBooleanOn;
        this.levelSchemes = levelSchemes;
        this.tasterBooleanOff = tasterBooleanOff;                
adapter.log("1111ff" + this.alexaLevelSchemeForOn);
        if (this.alexaLevelSchemeForOn != null) {
            adapter.log("1111a");
            if (this.alexaLevelSchemeForOn.getAlexaName() != null) {
                adapter.log("1111b");
                this.createState(this.alexaLevelSchemeForOn.getAlexaName());
            }
            this.alexaLevelSchemeForOn.setDevice(this);  
            adapter.log("1111c");          
        }             
        this.tasterBooleanOn.forEach(tasterScheme => {    
            if (tasterScheme.getTasterBooleanOnName() != null) {
                this.createState(tasterScheme.getTasterBooleanOnName());
            }
        });
        this.tasterBooleanOff.forEach(offName => {    
            this.createState(offName);
        });

        this.alexaSmartNamesForOn.forEach(alexaSmartName => {  
            this.createIOTAdapterSmartDevices(alexaSmartName);
        });      
        this.alexaSmartNamesForOff.forEach(alexaSmartName => {  
            this.createIOTAdapterSmartDevices(alexaSmartName);
        });            
        this.alexaActionNamesForOn.forEach(alexaSmartName => {  
            this.createIOTAdapterSmartDevices(alexaSmartName);
        });      
        this.alexaActionNamesForOff.forEach(alexaSmartName => {  
            this.createIOTAdapterSmartDevices(alexaSmartName);
        });              
    }

    public isNachtbeleuchtung() : boolean {
       return this.nachtbeleuchtung;
    }

    public isTurnOffExitHouseSummer() : boolean {
       return this.turnOffExitHouseSummer;
    }

    public isTurnOffExitHouseWinter() : boolean {
       return this.turnOffExitHouseWinter;
    }

    public isTurnOnEnterHouseSummer() : boolean {
       return this.turnOnEnterHouseSummer;
    }

    public isTurnOnEnterHouseWinter() : boolean {
       return this.turnOnEnterHouseWinter;
    }    

    private createState(key_in) {
        var jarvisDatenpunkt = key_in;//.replace(/\./g,'_'); // wegen Wohnzimmer T.V.
        //log(">>> CREATE STATE: " + jarvisDatenpunkt);
        this.adapter.createState(jarvisDatenpunkt, false, {
            name: jarvisDatenpunkt,
            desc: jarvisDatenpunkt,
             type: 'boolean', 
            read: true,
            write: true
        });     
    }        

    public getAlexaLevelSchemeForOn(): ShellyDimmerAlexaScheme {
        return this.alexaLevelSchemeForOn;
    }

    public getAlexaSchemes(): ShellyDimmerAlexaScheme[] {
        return this.levelSchemes;
    }

    public getTasterBooleanOn(): ShellyDimmerTasterScheme[] {
        return this.tasterBooleanOn;
    }

    public getTasterBooleanOff(): string[] {
        return this.tasterBooleanOff;
    }    

    public getSwitchState() : string {
        return this.baseState + ".lights.Switch";  // shelly.0.SHDM-2#98CDAC0BE168#1.lights.Switch
    }    

    public isDeviceOn() : boolean {
        return this.adapter.getState(this.getSwitchState()).val;
    }

    public getCategory() : string {
        return deviceShellyDimmer;
    }

    public getAlexaNamesForOnAsString() : string {
        var result = "";

        this.alexaSmartNamesForOn.forEach(alexaOnName => {    
            if (result == "") {
                result += alexaOnName
            } else {
                result += ", " + alexaOnName;
            }
        });        
        this.alexaActionNamesForOn.forEach(alexaOnName => {    
            if (result == "") {
                result += alexaOnName
            } else {
                result += ", " + alexaOnName;
            }
        });        

        return result;
    }

    public getAlexaNamesForOffAsString() : string {
        var result = "";

        this.alexaSmartNamesForOff.forEach(alexaOffName => {    
            if (result == "") {
                result += alexaOffName
            } else {
                result += ", " + alexaOffName;
            }
        });        
        this.alexaActionNamesForOff.forEach(alexaOffName => {    
            if (result == "") {
                result += alexaOffName
            } else {
                result += ", " + alexaOffName;
            }
        });        
        return result;
    }
    public getAlexaSmartNamesForOn() : string[] {
        return this.alexaSmartNamesForOn;
    }    

    public getAlexaSmartNamesForOff() : string[] {
        return this.alexaSmartNamesForOff;
    }    

    public getAlexaActionNamesForOn() : string[] {
        return this.alexaActionNamesForOn;
    }    

    public getAlexaActionNamesForOff() : string[] {
        return this.alexaActionNamesForOff;
    }    
}

export class ShellyRGBAlexaScheme {
    protected alexaName: string;
    protected level: number;
    protected device: ShellyLampeRGB;

    constructor(alexaName: string, level: number) {
        this.alexaName = alexaName;
        this.level = level;
    }

    public getAlexaName() : string {
        return this.alexaName;
    }

    public getLevel() : number {
        return this.level;
    }

    public setDevice(device: ShellyLampeRGB) {
        this.device = device;
    }

    public getDevice() : ShellyLampeRGB {
        return this.device;
    }
}

export class ShellyRGBTasterScheme {
    protected tasterBooleanOn: string;
    protected level: number;

    constructor(tasterBooleanOn: string, level: number) {
        this.tasterBooleanOn = tasterBooleanOn;
        this.level = level;
    }

    public getTasterBooleanOnName() : string {
        return this.tasterBooleanOn;
    }

    public getLevel() : number {
        return this.level;
    }
}

export class ShellyLampeRGB extends AbstractShelly {
    protected alexaSmartNamesForOn:string[];
    protected alexaSmartNamesForOff: string[];
    protected alexaActionNamesForOn:string[];
    protected alexaActionNamesForOff: string[];
    private channel: number;

    protected alexaLevelSchemeForOn: ShellyRGBAlexaScheme;
    protected tasterBooleanOn: ShellyRGBTasterScheme[];
    protected levelSchemes: ShellyRGBAlexaScheme[];
    protected tasterBooleanOff: string[];    

    constructor(adapter:any, id: number, etage: string, raum: string, device: string, baseState: string, channel: number, alexaSmartNamesForOn:string[], alexaActionNamesForOn:string[], alexaLevelSchemeForOn: ShellyRGBAlexaScheme, alexaSmartNamesForOff: string[],alexaActionNamesForOff: string[],  levelSchemes: ShellyRGBAlexaScheme[], tasterBooleanOn: ShellyRGBTasterScheme[], tasterBooleanOff: string[]) {
        super(adapter, id, etage, raum, device, baseState); 
        this.channel = channel;
        this.alexaSmartNamesForOn = alexaSmartNamesForOn;
        this.alexaSmartNamesForOff = alexaSmartNamesForOff;
        this.alexaActionNamesForOn = alexaActionNamesForOn;
        this.alexaActionNamesForOff = alexaActionNamesForOff;

        this.alexaLevelSchemeForOn = alexaLevelSchemeForOn;
        this.tasterBooleanOn = tasterBooleanOn;
        this.levelSchemes = levelSchemes;
        this.tasterBooleanOff = tasterBooleanOff;                

        if (this.alexaLevelSchemeForOn != null) {
            this.alexaLevelSchemeForOn.setDevice(adapter);
            if (alexaLevelSchemeForOn.getAlexaName() != null) {
                this.createState(alexaLevelSchemeForOn.getAlexaName());
            }
        }             
        this.tasterBooleanOn.forEach(tasterScheme => {    
            if (tasterScheme.getTasterBooleanOnName() != null) {
                this.createState(tasterScheme.getTasterBooleanOnName());
            }
        });
        this.tasterBooleanOff.forEach(offName => {    
            this.createState(offName);
        });

        this.alexaSmartNamesForOn.forEach(alexaSmartName => {  
            this.createIOTAdapterSmartDevices(alexaSmartName);
        });      
        this.alexaSmartNamesForOff.forEach(alexaSmartName => {  
            this.createIOTAdapterSmartDevices(alexaSmartName);
        });              
        this.alexaActionNamesForOn.forEach(alexaSmartName => {  
            this.createIOTAdapterSmartDevices(alexaSmartName);
        });      
        this.alexaActionNamesForOff.forEach(alexaSmartName => {  
            this.createIOTAdapterSmartDevices(alexaSmartName);
        });              
    }

    private createState(key_in) {
        var jarvisDatenpunkt = key_in;//.replace(/\./g,'_'); // wegen Wohnzimmer T.V.
        //log(">>> CREATE STATE: " + jarvisDatenpunkt);
        this.adapter.createState(jarvisDatenpunkt, false, {
            name: jarvisDatenpunkt,
            desc: jarvisDatenpunkt,
            type: 'boolean', 
            read: true,
            write: true
        });     
    }        

    public getAlexaLevelSchemeForOn(): ShellyRGBAlexaScheme {
        return this.alexaLevelSchemeForOn;
    }

    public getAlexaSchemes(): ShellyRGBAlexaScheme[] {
        return this.levelSchemes;
    }

    public getTasterBooleanOn(): ShellyRGBTasterScheme[] {
        return this.tasterBooleanOn;
    }

    public getTasterBooleanOff(): string[] {
        return this.tasterBooleanOff;
    }    

    public getSwitchState() : string {
        return this.baseState + ".lights.Switch"; // shelly.0.SHRGBW2#D962D3#1.lights.Switch
    }    

    public isDeviceOn() : boolean {
        return this.adapter.getState(this.getSwitchState()).val;
    }


    public getCategory() : string {
        return deviceShellyLampeRGB;
    }

    public getAlexaNamesForOnAsString() : string {
        var result = "";

        this.alexaSmartNamesForOn.forEach(alexaOnName => {    
            if (result == "") {
                result += alexaOnName
            } else {
                result += ", " + alexaOnName;
            }
        });        
        this.alexaActionNamesForOn.forEach(alexaOnName => {    
            if (result == "") {
                result += alexaOnName
            } else {
                result += ", " + alexaOnName;
            }
        });        

        return result;
    }

    public getAlexaNamesForOffAsString() : string {
        var result = "";

        this.alexaSmartNamesForOff.forEach(alexaOffName => {    
            if (result == "") {
                result += alexaOffName
            } else {
                result += ", " + alexaOffName;
            }
        });        

        this.alexaActionNamesForOff.forEach(alexaOffName => {    
            if (result == "") {
                result += alexaOffName
            } else {
                result += ", " + alexaOffName;
            }
        });        

        return result;
    }

    public getAlexaSmartNamesForOn() : string[] {
        return this.alexaSmartNamesForOn;
    }    

    public getAlexaSmartNamesForOff() : string[] {
        return this.alexaSmartNamesForOff;
    }    

    public getAlexaActionNamesForOn() : string[] {
        return this.alexaActionNamesForOn;
    }    

    public getAlexaActionNamesForOff() : string[] {
        return this.alexaActionNamesForOff;
    }    

}

class ShellySteckdose extends ShellyLampeWeiss {

    constructor(adapter:any, id: number, etage: string, raum: string, device: string, baseState: string, channel: number, alexaNamesForOn:string[], alexaActionNamesForOn:string[], alexaNamesForOff: string[],alexaActionNamesForOff: string[], additionalStates4TurnOn:string[], additionalStates4TurnOff:string[], nachtbeleuchtung:boolean, turnOffExitHouseSummer:boolean, turnOffExitHouseWinter:boolean, turnOnEnterHouseSummer:boolean, turnOnEnterHouseWinter:boolean) {
        super(adapter, id, etage, raum, device, baseState, channel, alexaNamesForOn,alexaActionNamesForOn, alexaNamesForOff,alexaActionNamesForOff, additionalStates4TurnOn, additionalStates4TurnOff, nachtbeleuchtung, turnOffExitHouseSummer, turnOffExitHouseWinter, turnOnEnterHouseSummer, turnOnEnterHouseWinter); 
    }

    public getCategory() : string {
        return deviceShellySteckdose;
    }
}

class ShellyRollladen extends AbstractShelly {

    constructor(adapter:any, id: number, etage: string, raum: string, device: string, baseState: string) {
        super(adapter, id, etage, raum, device, baseState); 
    }

    public getShutterPositionState() : string {
        if (this.baseState.includes('shellyplus2')) {
            return this.baseState + ".Cover0.Position";   // new: shelly.1.shellyplus2pm#4855199b3e38#1.Cover0.Position
        } else {
            return this.baseState + ".Shutter.Position";   // new: shelly.1.shellyplus2pm#4855199b3e38#1.Cover0.Position
        }
    }    

    public getShutterOpenState() : string {
        if (this.baseState.includes('shellyplus2')) {
            return this.baseState + ".Cover0.Open";   // new: shelly.1.shellyplus2pm#4855199b3e38#1.Cover0.Position
        } else {
            return this.baseState + ".Shutter.Open";   // new: shelly.1.shellyplus2pm#4855199b3e38#1.Cover0.Position
        }
    }    

    public getShutterCloseState() : string {
        if (this.baseState.includes('shellyplus2')) {
            return this.baseState + ".Cover0.Close";   // new: shelly.1.shellyplus2pm#4855199b3e38#1.Cover0.Position
        } else {
            return this.baseState + ".Shutter.Close";   // new: shelly.1.shellyplus2pm#4855199b3e38#1.Cover0.Position
        }
    }    

    // Steckdose, Rollladen, Lampe
    public getCategory() : string {
        return deviceShellyRollladen;
    }
}

class ShellySensor extends AbstractShelly {

    constructor(adapter: any, id: number, etage: string, raum: string, device: string, baseState: string) {
        super(adapter, id, etage, raum, device, baseState); 
    }

    public getTemperature() : number {
        return this.adapter.getState(this.baseState + ".Temperature0.Celsius").val;   // shelly.1.shellyhtg3#34b7da8d0234#1.Temperature0.Celsius        
    }    

    public getHumidity() : number {
        return this.adapter.getState(this.baseState + ".Humidity0.Relative").val;   // shelly.1.shellyhtg3#34b7da8d0234#1.Humidity0.Relative
    }    

    public isOnline() : boolean {
        return true;
    }
    
    public getCategory() : string {
        return deviceShellySensor;
    }
}

module.exports = { 
    AbstractShelly, ShellyLampeWeiss, ShellyDimmerAlexaScheme, ShellyDimmerTasterScheme, ShellyDimmer, ShellyRGBAlexaScheme, ShellyRGBTasterScheme, ShellyLampeRGB, ShellySteckdose, ShellyRollladen,ShellySensor,
    deviceShellyLampeWeiss, deviceShellyDimmer, deviceShellyLampeRGB, deviceShellySteckdose, deviceShellyRollladen, deviceShellySensor
};


