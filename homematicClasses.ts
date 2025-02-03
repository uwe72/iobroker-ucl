const deviceHomematicWandthermostat: string = "Wandthermostat";
const deviceHomematicPraesenzmelder: string = "Praesenzmelder";
const deviceHomematicWetterstation: string = "Wetterstation";
const deviceHomematicDoor: string = "Door";
const deviceHomematicRollladen: string = "Rollladen";
const deviceHomematicWandschalter: string = "Wandschalter";
const deviceHomematicFussbodenheizung: string = "Fussbodenheizung";
const deviceHomematicWandtaster: string = "Wandtaster";
const deviceHomematicAccessPoint: string = "AccessPoint";
const deviceHomematicTemperatursensor: string = "Temperatursensor";
const deviceHomematicRauchmelder: string = "Rauchmelder";
const deviceHomematicFunkSchaltaktor: string = "FunkSchaltaktor";
const deviceHomematicWindow: string = "Window";
const deviceHomematicSteckdose: string = "Steckdose";
const deviceHomematicHeizkoerper: string = "Heizkoerper";
const deviceHomematicDimmer: string = "Dimmer";

export abstract class AbstractHomematic {
    protected baseState: string;
    protected etage: string;
    protected raum: string;
    protected device: string;
    protected id: number;
    protected adapter: any;

    constructor(adapter: any, id: number, baseState: string, etage: string, raum: string, device: string) {
        this.adapter = adapter;
        this.id = id;
        this.etage = etage;
        this.raum = raum;
        this.device = device;
        this.baseState = baseState;
    }

    public getDeviceId(): string {
        return "H" + this.id.toString().padStart(2, '0');
    }

    public getDeviceIdAsRawNumber(): number {
        return this.id;
    }

    public getBaseState(): string {
        return this.baseState;
    }

    public getType(): string {
        return "";//getObject(this.baseState).native.TYPE;
    }

    public getEtage(): string {
        return this.etage;
    }

    public getRaum(): string {
        return this.raum;
    }

    public getDevice(): string {
        return this.device;
    }

    public isStatusTotal(): boolean {
        return this.isStatusReachable() && this.isStatusBattery() && this.isStatusDutyCycle();
    }

    public isStatusReachable(): boolean {  // .0.UNREACH
        return !this.adapter.getState(this.baseState + ".0.UNREACH").val;
    }

    public isStatusBattery(): boolean { 
        return true;
    }

    public isStatusDutyCycle(): boolean {
        if (this.getType().includes("HmIP")) {
            return !this.adapter.getState(this.baseState + ".0.DUTY_CYCLE").val; // hm-rpc.0.000A9BE993E2F7.0.DUTY_CYCLE
        }
        return true;
    }

    public getSignal(): string { // hm-rpc.0.0000DD89BE05F9.0.RSSI_DEVICE
        return this.adapter.getState(this.baseState + ".0.RSSI_DEVICE").val;
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

    abstract getCategory(): string;
}

export class HomematicWandtaster extends AbstractHomematic {
    constructor(adapter: any, id: number, baseState: string, etage: string, raum: string, device: string) {
        super(adapter, id, baseState, etage, raum, device); 
    }

    public getCategory(): string {
        return deviceHomematicWandtaster;
    }
}

export class HomematicWandthermostat extends AbstractHomematic {
    constructor(adapter: any, id: number, baseState: string, etage: string, raum: string, device: string) {
        super(adapter, id, baseState, etage, raum, device);
    }

    public getTemperatureIst(): number {
        return this.adapter.getState(this.baseState + ".1.ACTUAL_TEMPERATURE").val; // hm-rpc.0.000A9BE993E2F7.1.ACTUAL_TEMPERATURE
    }

    public getTemperatureSoll(): number {
        return this.adapter.getState(this.baseState + ".1.SET_POINT_TEMPERATURE").val; // hm-rpc.0.000A9BE993E2F7.1.SET_POINT_TEMPERATURE
    }

    public getHumanity(): string {
        return this.adapter.getState(this.baseState + ".1.HUMIDITY").val + " %"; // hm-rpc.0.000A9BE993E2F7.1.HUMIDITY
    }

    public getCategory(): string {
        return deviceHomematicWandthermostat;
    }

    public isStatusBattery(): boolean { 
        return !this.adapter.getState(this.baseState + ".0.LOW_BAT").val; // // hm-rpc.0.000A9BE993E2F7.0.LOW_BAT
    }

    public getProfile() : number {
        return this.adapter.getState(this.baseState + ".1.ACTIVE_PROFILE").val;
    }

    public isAutoModus() : boolean {
        if (this.adapter.getState(this.baseState + ".1.SET_POINT_MODE").val != 0) {
            return false;
        } else {
            return true;
        }
    }

    public getOeffnungsgrad(): number { // Ventilöffnungsgrad
        return this.adapter.getState(this.baseState + ".1.LEVEL").val; // hm-rpc.0.000A1F29932CD5.1.LEVEL
    }
}

export class HomematicPraesenzmelder extends AbstractHomematic {
    constructor(adapter: any, id: number, baseState: string, etage: string, raum: string, device: string) {
        super(adapter, id, baseState, etage, raum, device);
    }

    public getCategory(): string {
        return deviceHomematicPraesenzmelder;
    }

    public getIllumination(): string {
        if (this.adapter.getState(this.baseState + ".1.CURRENT_ILLUMINATION").val != null) {
            return this.adapter.getState(this.baseState + ".1.CURRENT_ILLUMINATION").val + " lux"; // hm-rpc.0.000C1BE98E093D.1.CURRENT_ILLUMINATION
        }
        return "-";
    }

    public isStatusBattery(): boolean { 
        return !this.adapter.getState(this.baseState + ".0.LOW_BAT").val; // // hm-rpc.0.000A9BE993E2F7.0.LOW_BAT
    }
}

export class HomematicWetterstation extends AbstractHomematic {
    constructor(adapter: any, id: number, baseState: string, etage: string, raum: string, device: string) {
        super(adapter, id, baseState, etage, raum, device);
    }

    public getCategory(): string {
        return deviceHomematicWetterstation;
    }

    public isStatusBattery(): boolean { 
        return !this.adapter.getState(this.baseState + ".0.LOW_BAT").val; // // hm-rpc.0.000A9BE993E2F7.0.LOW_BAT
    }
}

export class HomematicWindow extends AbstractHomematic {
    constructor(adapter: any, id: number, baseState: string, etage: string, raum: string, device: string) {
        super(adapter, id, baseState, etage, raum, device);
    }

    public getCategory(): string {
        return deviceHomematicWindow;
    }

    public isStatusBattery(): boolean { 
        return !this.adapter.getState(this.baseState + ".0.LOW_BAT").val; // // hm-rpc.0.000A9BE993E2F7.0.LOW_BAT
    }

    public isOpen(): boolean {
        if (this.adapter.getState(this.baseState + ".1.STATE").val == 0) {
            return false;
        }
        return true;
    }
}

export class HomematicSteckdose extends AbstractHomematic {
    constructor(adapter: any, id: number, baseState: string, etage: string, raum: string, device: string) {
        super(adapter, id, baseState, etage, raum, device);
    }

    public getCategory(): string {
        return deviceHomematicSteckdose;
    }

    public isSwitchedOn(): boolean {
        if (this.adapter.getState(this.baseState + ".3.STATE").val == false) { // hm-rpc.1.00021D8999C78B.3.STATE    
            return false;
        }
        return true;
    }     
}

export class HomematicHeizkoerper extends AbstractHomematic {
    constructor(adapter: any, id: number, baseState: string, etage: string, raum: string, device: string) {
        super(adapter, id, baseState, etage, raum, device);
    }

    public getCategory(): string {
        return deviceHomematicHeizkoerper;
    }

    public getTemperatureIst() : number {
        return this.adapter.getState(this.baseState + ".1.ACTUAL_TEMPERATURE").val; // hm-rpc.0.000A9BE9A03005.1.ACTUAL_TEMPERATURE
    }

    public getTemperatureSoll() : number {
        return this.adapter.getState(this.baseState + ".1.SET_POINT_TEMPERATURE").val; // hm-rpc.0.000A9BE9A03005.1.SET_POINT_TEMPERATURE
    }

    public isStatusBattery(): boolean { 
        return !this.adapter.getState(this.baseState + ".0.LOW_BAT").val; // // hm-rpc.0.000A9BE993E2F7.0.LOW_BAT
    }

    public getProfile() : number {
        return this.adapter.getState(this.baseState + ".1.ACTIVE_PROFILE").val;
    }

    public isAutoModus() : boolean {
        if (this.adapter.getState(this.baseState + ".1.SET_POINT_MODE").val != 0) {
            return false;
        } else {
            return true;
        }
    }

    public getOeffnungsgrad(): number { // Ventilöffnungsgrad
        return this.adapter.getState(this.baseState + ".1.LEVEL").val; // hm-rpc.0.000A1F29932CD5.1.LEVEL
    }
}

export class DimmerAlexaScheme {
    protected alexaName: string;
    protected level: number;
    protected device: HomematicDimmer;

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

    public setDevice(device: HomematicDimmer) {
        this.device = device;
    }

    public getDevice() : HomematicDimmer {
        return this.device;
    }
}

export class DimmerTasterScheme {
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

export class HomematicDimmer extends AbstractHomematic {
    protected alexaLevelSchemeForOn: DimmerAlexaScheme;
    protected alexaSmartNamesForOn:string[];
    protected alexaSmartNamesForOff: string[];
    protected alexaActionNamesForOn:string[];
    protected alexaActionNamesForOff: string[];

    protected tasterBooleanOn: DimmerTasterScheme[];
    protected tasterBooleanOff: string[];
    protected levelSchemes: DimmerAlexaScheme[];

    private nachtbeleuchtung:boolean;
    private turnOffExitHouseSummer:boolean;
    private turnOffExitHouseWinter:boolean;
    private turnOnEnterHouseSummer:boolean;
    private turnOnEnterHouseWinter:boolean;

    constructor(adapter:any, id: number, baseState: string, etage: string, raum: string, device: string, alexaSmartNamesForOn:string[], alexaActionNamesForOn:string[], alexaLevelSchemeForOn: DimmerAlexaScheme, alexaSmartNamesForOff: string[],
            alexaActionNamesForOff: string[], levelSchemes: DimmerAlexaScheme[], tasterBooleanOn: DimmerTasterScheme[], tasterBooleanOff: string[], nachtbeleuchtung:boolean, turnOffExitHouseSummer:boolean, turnOffExitHouseWinter:boolean, 
            turnOnEnterHouseSummer:boolean, turnOnEnterHouseWinter:boolean) {
        super(adapter, id, baseState, etage, raum, device); 
        this.alexaLevelSchemeForOn = alexaLevelSchemeForOn;
        this.levelSchemes = levelSchemes;
        this.tasterBooleanOn = tasterBooleanOn;
        this.tasterBooleanOff = tasterBooleanOff;       
        this.alexaSmartNamesForOn = alexaSmartNamesForOn;
        this.alexaSmartNamesForOff = alexaSmartNamesForOff;
        this.alexaActionNamesForOn = alexaActionNamesForOn;
        this.alexaActionNamesForOff = alexaActionNamesForOff;
        this.nachtbeleuchtung = nachtbeleuchtung;
        this.turnOffExitHouseSummer = turnOffExitHouseSummer;
        this.turnOffExitHouseWinter = turnOffExitHouseWinter;
        this.turnOnEnterHouseSummer = turnOnEnterHouseSummer;
        this.turnOnEnterHouseWinter = turnOnEnterHouseWinter;

        this.levelSchemes.forEach(colorscheme => {    
            colorscheme.setDevice(this);
            if (colorscheme.getAlexaName() != null) {
                this.createState(colorscheme.getAlexaName());
            }
        });
        if (this.alexaLevelSchemeForOn != null) {
            this.alexaLevelSchemeForOn.setDevice(this);
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

        this.levelSchemes.forEach(scheme => {    
            if (scheme.getAlexaName() != null) {
                this.createIOTAdapterSmartDevices(scheme.getAlexaName());
            }
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
        var key = key_in;//.replace(/\./g,'_'); // wegen Wohnzimmer T.V.
        var jarvisDatenpunkt = key;
        this.adapter.createState(jarvisDatenpunkt, false, {
            name: key,
            desc: key,
            type: 'boolean', 
            read: true,
            write: true
        });     
    }

    public getTasterBooleanOn(): DimmerTasterScheme[] {
        return this.tasterBooleanOn;
    }

    public getTasterBooleanOff(): string[] {
        return this.tasterBooleanOff;
    }

    public getAlexaSchemeForOn(): DimmerAlexaScheme {
        return this.alexaLevelSchemeForOn;
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

    public getAlexaSchemes(): DimmerAlexaScheme[] {
        return this.levelSchemes;
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

    public turnOnHM() {
        if (this.alexaLevelSchemeForOn == null) { // Schalte Licht nur ein
            if (this.adapter.getState(this.baseState + ".4.LEVEL").val != 100) {
                this.adapter.setState(this.baseState + ".4.LEVEL", 100);
            }
        } else {
            this.changeLevel(this.alexaLevelSchemeForOn);
        }
    }

    public getSwitchState(): string {
        return this.baseState + ".4.LEVEL";
    }

    public turnOffHM() {
        if (this.adapter.getState(this.baseState + ".4.LEVEL").val != 0) {
            this.adapter.setState(this.baseState + ".4.LEVEL", 0);
        }
    }         

    public changeLevel(levelScheme: DimmerAlexaScheme) {
        if (this.adapter.getState(this.baseState + ".4.LEVEL").val != levelScheme.getLevel()) {
            this.adapter.setState(this.baseState + ".4.LEVEL", levelScheme.getLevel());
        }
    }    

    public getCategory(): string {
        return deviceHomematicDimmer;
    }
    public getLevel(): number {
        return this.adapter.getState(this.baseState + ".4.LEVEL").val // hm-rpc.1.0008DA49A7C659.3.LEVEL
    } 
}


export class HomematicFunkschaltaktor extends AbstractHomematic {
    constructor(adapter: any, id: number, baseState: string, etage: string, raum: string, device: string) {
        super(adapter, id, baseState, etage, raum, device);
    }

    public getCategory(): string {
        return deviceHomematicFunkSchaltaktor;
    }
}

export class HomematicRauchmelder extends AbstractHomematic {
    constructor(adapter: any, id: number, baseState: string, etage: string, raum: string, device: string) {
        super(adapter, id, baseState, etage, raum, device);
    }

    public getCategory(): string {
        return deviceHomematicRauchmelder;
    }

    public isStatusBattery(): boolean { 
        return !this.adapter.getState(this.baseState + ".0.LOW_BAT").val; // // hm-rpc.0.000A9BE993E2F7.0.LOW_BAT
    }
}


export class HomematicTemperatursensor extends AbstractHomematic {
    constructor(adapter: any, id: number, baseState: string, etage: string, raum: string, device: string) {
        super(adapter, id, baseState, etage, raum, device);
    }

    public getTemperatureIst(): string { // hm-rpc.0.00181BE98EF50E.1.ACTUAL_TEMPERATURE
        return this.adapter.getState(this.baseState + ".1.ACTUAL_TEMPERATURE").val + " °C";
    }

    public getHumanity(): string {
        return this.adapter.getState(this.baseState + ".1.HUMIDITY").val + " %"; // hm-rpc.0.00181BE98EF50E.1.HUMIDITY
    }

    public getCategory(): string {
        return deviceHomematicTemperatursensor;
    }

    public isStatusBattery(): boolean { 
        return !this.adapter.getState(this.baseState + ".0.LOW_BAT").val; // // hm-rpc.0.000A9BE993E2F7.0.LOW_BAT
    }
}

export class HomematicWandschalter extends AbstractHomematic {
    protected alexaSmartNamesForOn:string[];
    protected alexaSmartNamesForOff: string[];
    protected alexaActionNamesForOn:string[];
    protected alexaActionNamesForOff: string[];
    private nachtbeleuchtung:boolean;    
    private turnOffExitHouseSummer:boolean;
    private turnOffExitHouseWinter:boolean;
    private turnOnEnterHouseSummer:boolean;
    private turnOnEnterHouseWinter:boolean;

    constructor(adapter:any, id: number, baseState: string, etage: string, raum: string, device: string, alexaSmartNamesForOn:string[], alexaActionNamesForOn:string[], alexaSmartNamesForOff: string[],alexaActionNamesForOff: string[], nachtbeleuchtung:boolean, turnOffExitHouseSummer:boolean, turnOffExitHouseWinter:boolean, turnOnEnterHouseSummer:boolean, turnOnEnterHouseWinter:boolean) {
        super(adapter, id, baseState, etage, raum, device);
        this.nachtbeleuchtung = nachtbeleuchtung;        
        this.turnOffExitHouseSummer = turnOffExitHouseSummer;
        this.turnOffExitHouseWinter = turnOffExitHouseWinter;
        this.turnOnEnterHouseSummer = turnOnEnterHouseSummer;
        this.turnOnEnterHouseWinter = turnOnEnterHouseWinter;

        this.alexaSmartNamesForOn = alexaSmartNamesForOn;
        this.alexaSmartNamesForOff = alexaSmartNamesForOff;
        this.alexaActionNamesForOn = alexaActionNamesForOn;
        this.alexaActionNamesForOff = alexaActionNamesForOff;

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

    public getCategory(): string {
        return deviceHomematicWandschalter;
    }

    public isSwitchedOn(): boolean {
        if (this.getType() == "HM-LC-Sw1PBU-FM") {
            if (this.adapter.getState(this.baseState + ".1.STATE").val == false) { // hm-rpc.0.PEQ2220753.1.STATE
                return false;
            }
            return true;
        } else if (this.getType() == "HmIP-BSM") { 
            if (this.adapter.getState(this.baseState + ".4.STATE").val == false) { // // hm-rpc.1.000855699C4F38.4.STATE
                return false;
            }
            return true;
        } else {
            // @ts-ignore                        
            return undefined;
        }
    } 

    public getSwitchState(): string {
        if (this.getType() == "HM-LC-Sw1PBU-FM") {
            return this.baseState + ".1.STATE";
        } else if (this.getType() == "HmIP-BSM") { 
            return this.baseState + ".4.STATE";
        } else {
            // @ts-ignore                        
            return undefined;
        }
    }

    public turnOn() {
        if (this.getType() == "HM-LC-Sw1PBU-FM") {
            this.adapter.setState(this.baseState + ".1.STATE", true); // hm-rpc.0.PEQ2220753.1.STATE
        } else if (this.getType() == "HmIP-BSM") { 
            this.adapter.setState(this.baseState + ".4.STATE", true); // // hm-rpc.1.000855699C4F38.4.STATE
        }
    }

    public turnOff() {
        if (this.getType() == "HM-LC-Sw1PBU-FM") {
            this.adapter.setState(this.baseState + ".1.STATE", false); // hm-rpc.0.PEQ2220753.1.STATE
        } else if (this.getType() == "HmIP-BSM") { 
            this.adapter.setState(this.baseState + ".4.STATE", false); // // hm-rpc.1.000855699C4F38.4.STATE
        }
    }
}

export class HomematicAccessPoint extends AbstractHomematic {
    constructor(adapter: any, id: number, baseState: string, etage: string, raum: string, device: string) {
        super(adapter, id, baseState, etage, raum, device);
    }

    public getCategoryAsString(): string {
        return "Access Point";
    }

    public isStatusBattery(): boolean {
        return true;
    }

    public getSignal(): string {
        return "";
    }

    public getCategory(): string {
        return deviceHomematicAccessPoint;
    }

}

export class HomematicRollladen extends AbstractHomematic {

    constructor(adapter: any, id: number, baseState: string, etage: string, raum: string, device: string) {
        super(adapter, id, baseState, etage, raum, device);
    }

    public getCategory(): string {
        return deviceHomematicRollladen;
    }
}

export class HomematicDoor extends AbstractHomematic {

    constructor(adapter: any, id: number, baseState: string, etage: string, raum: string, device: string) {
        super(adapter, id, baseState, etage, raum, device);
    }

    public getCategory(): string {
        return deviceHomematicDoor;
    }

    public isStatusBattery(): boolean { 
        return !this.adapter.getState(this.baseState + ".0.LOW_BAT").val; // // hm-rpc.0.000A9BE993E2F7.0.LOW_BAT
    }

    public isOpen(): boolean {
        if (this.adapter.getState(this.baseState + ".1.STATE").val == 0) {
            return false;
        }
        return true;
    }    
}

export class HomematicFussbodenheizung extends AbstractHomematic {
    constructor(adapter: any, id: number, baseState: string, etage: string, raum: string, device: string) {
        super(adapter, id, baseState, etage, raum, device);
    }

    public getCategory(): string {
        return deviceHomematicFussbodenheizung;
    }

}


module.exports = { 
    HomematicWindow, HomematicSteckdose, HomematicHeizkoerper, HomematicDimmer, HomematicWandthermostat, HomematicFussbodenheizung, HomematicWandschalter, HomematicDoor, HomematicWetterstation, HomematicAccessPoint, HomematicRollladen, HomematicWandtaster, HomematicTemperatursensor, HomematicRauchmelder, HomematicPraesenzmelder, AbstractHomematic, HomematicFunkschaltaktor, DimmerAlexaScheme, DimmerTasterScheme,
    deviceHomematicWandthermostat, deviceHomematicPraesenzmelder, deviceHomematicWetterstation, deviceHomematicDoor, deviceHomematicRollladen, deviceHomematicWandschalter, deviceHomematicFussbodenheizung, deviceHomematicWandtaster, deviceHomematicAccessPoint, deviceHomematicTemperatursensor, deviceHomematicRauchmelder, deviceHomematicFunkSchaltaktor, deviceHomematicWindow, deviceHomematicSteckdose, deviceHomematicHeizkoerper, deviceHomematicDimmer
};
