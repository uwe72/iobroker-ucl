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

    abstract getCategory(): string;

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
}

export class HomematicSteckdose extends AbstractHomematic {
    constructor(adapter: any, id: number, baseState: string, etage: string, raum: string, device: string) {
        super(adapter, id, baseState, etage, raum, device);
    }

    public getCategory(): string {
        return deviceHomematicSteckdose;
    }
}

export class HomematicHeizkoerper extends AbstractHomematic {
    constructor(adapter: any, id: number, baseState: string, etage: string, raum: string, device: string) {
        super(adapter, id, baseState, etage, raum, device);
    }

    public getCategory(): string {
        return deviceHomematicHeizkoerper;
    }

    public isStatusBattery(): boolean { 
        return !this.adapter.getState(this.baseState + ".0.LOW_BAT").val; // // hm-rpc.0.000A9BE993E2F7.0.LOW_BAT
    }
}

export class HomematicDimmer extends AbstractHomematic {
    constructor(adapter: any, id: number, baseState: string, etage: string, raum: string, device: string) {
        super(adapter, id, baseState, etage, raum, device);
    }

    public getCategory(): string {
        return deviceHomematicDimmer;
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

export class HomematicWandtaster extends AbstractHomematic {
    constructor(adapter: any, id: number, baseState: string, etage: string, raum: string, device: string) {
        super(adapter, id, baseState, etage, raum, device);
    }

    public getCategory(): string {
        return deviceHomematicWandtaster;
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
    protected positionAuf: number;
    protected positionMitte: number;
    protected positionZu: number;

    constructor(adapter: any, id: number, baseState: string, etage: string, raum: string, device: string, positionAuf: number, positionMitte: number, positionZu: number) {
        super(adapter, id, baseState, etage, raum, device);
        this.positionAuf = positionAuf;
        this.positionMitte = positionMitte;
        this.positionZu = positionZu;
    }

    public getCategory(): string {
        return deviceHomematicRollladen;
    }

    public auf() {
        this.adapter.setState(this.getBaseState() + ".4.LEVEL", this.positionAuf);
    }

    public zu() {
        this.adapter.setState(this.getBaseState() + ".4.LEVEL", this.positionZu);
    }

    public mitte() {
        this.adapter.setState(this.getBaseState() + ".4.LEVEL", this.positionMitte);
    }
}

export class HomematicDoor extends AbstractHomematic {
    protected skipStatisticIsOpened: boolean;
    protected skipStatisticIsClosed: boolean;

    constructor(adapter: any, id: number, baseState: string, etage: string, raum: string, device: string, skipStatisticIsOpened: boolean, skipStatisticIsClosed: boolean) {
        super(adapter, id, baseState, etage, raum, device);
        this.skipStatisticIsOpened = skipStatisticIsOpened;
        this.skipStatisticIsClosed = skipStatisticIsClosed;
    }

    public isSkipStatisticIsOpened(): boolean {
        return this.skipStatisticIsOpened;
    }

    public isSkipStatisticIsClosed(): boolean {
        return this.skipStatisticIsClosed;
    }

    public getCategory(): string {
        return deviceHomematicDoor;
    }

    public isStatusBattery(): boolean { 
        return !this.adapter.getState(this.baseState + ".0.LOW_BAT").val; // // hm-rpc.0.000A9BE993E2F7.0.LOW_BAT
    }

    public isOpen(): boolean {
        if (this.adapter.getState(this.baseState + ".1.STATE").val) { // hm-rpc.0.0000DD89BE05F9.1.STATE
            return true;
        }
        return false;
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

export class HomematicWandschalter extends AbstractHomematic {
    constructor(adapter: any, id: number, baseState: string, etage: string, raum: string, device: string) {
        super(adapter, id, baseState, etage, raum, device);
    }

    public getCategory(): string {
        return deviceHomematicWandschalter;
    }

    public isStatusBattery(): boolean { 
        return !this.adapter.getState(this.baseState + ".0.LOW_BAT").val; // // hm-rpc.0.000A9BE993E2F7.0.LOW_BAT
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
}



module.exports = { 
    HomematicWindow, HomematicSteckdose, HomematicHeizkoerper, HomematicDimmer, HomematicWandthermostat, HomematicFussbodenheizung, HomematicWandschalter, HomematicDoor, HomematicWetterstation, HomematicAccessPoint, HomematicRollladen, HomematicWandtaster, HomematicTemperatursensor, HomematicRauchmelder, HomematicPraesenzmelder, AbstractHomematic, HomematicFunkschaltaktor,
    deviceHomematicWandthermostat, deviceHomematicPraesenzmelder, deviceHomematicWetterstation, deviceHomematicDoor, deviceHomematicRollladen, deviceHomematicWandschalter, deviceHomematicFussbodenheizung, deviceHomematicWandtaster, deviceHomematicAccessPoint, deviceHomematicTemperatursensor, deviceHomematicRauchmelder, deviceHomematicFunkSchaltaktor, deviceHomematicWindow, deviceHomematicSteckdose, deviceHomematicHeizkoerper, deviceHomematicDimmer
};
