// https://stackoverflow.com/questions/8595509/how-do-you-share-constants-in-nodejs-modules
const deviceZigbeeSteckdose: string = "Steckdose";
const deviceZigbeeBewegungsmelder: string = "Bewegungsmelder";
const deviceZigbeeLampeRGB: string = "LampeRGB";
const deviceZigbeeLampeWeiss: string = "LampeWeiss";
const deviceZigbeeRauchmelder: string = "Rauchmelder";
const deviceZigbeeWandtaster: string = "Wandtaster";
const deviceZigbeeDosenrelais: string = "Dosenrelais";
const deviceZigbeeSchalter: string = "Schalter";
const deviceZigbeeRepeater: string = "Repeater";
const deviceZigbeeFenstersensor: string = "Fenstersensor";

export abstract class AbstractZigbee {
    protected id: number;
    protected baseState: string;
    protected etage: string;
    protected device: string;
    protected raum: string;
    protected adapter: any;

    constructor(adapter: any, id: number, baseState: string, etage: string, raum: string, device: string) {
        this.adapter = adapter;
        this.id = id;
        this.baseState = baseState;
        this.etage = etage;
        this.raum = raum;
        this.device = device;
    }

    public getDeviceId(): string {
        return "Z" + this.id.toString().padStart(3, '0');
    }

    public getOriginalDeviceName(): string {
        return this.adapter.getObject(this.baseState).common.name;
    }

    public getDeviceIdAsRawNumber(): number {
        return this.id;
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

    public getBaseState(): string {
        return this.baseState;
    }

    public getType(): string {
        var result = "";
        var m1 = this.adapter.getObject(this.baseState).native.manufacturername;
        var m2 = this.adapter.getObject(this.baseState).native.modelid;
        if (m1 != undefined && m2 != undefined) {
            result += m1;
        }
        if (m2 != null) {
            if (result != "") {
                result += " (" + m2 + ")";
            } else {
                result += m2;
            }
        }
        return result;
    }

    public isStatusTotal(): boolean {
        return this.isStatusReachable();
    }

    public isStatusReachable(): boolean {
        return this.adapter.getState(this.baseState + ".reachable").val; // hue.0.Steckdose_Backstube.reachable 
    }

    abstract getCategory(): string;

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

export class ColorScheme {
    protected alexaName: string;
    protected level: number;
    protected device: ZigbeeLampeRGB;

    constructor(alexaName: string, level: number) {
        this.alexaName = alexaName;
        this.level = level;
    }

    public getAlexaName(): string {
        return this.alexaName;
    }

    public getLevel(): number {
        return this.level;
    }

    public setDevice(device: ZigbeeLampeRGB) {
        this.device = device;
    }

    public getDevice(): ZigbeeLampeRGB {
        return this.device;
    }
}

export class RGBColorScheme extends ColorScheme {
    protected hue: number;
    protected sat: number;

    constructor(alexaName: string, level: number, hue: number, sat: number) {
        super(alexaName, level);
        this.hue = hue;
        this.sat = sat;
    }

    public getHue(): number {
        return this.hue;
    }

    public getSat(): number {
        return this.sat;
    }
}

export class WhiteColorScheme extends ColorScheme {
    protected ct: number;

    constructor(alexaName: string, level: number, ct: number) {
        super(alexaName, level);
        this.ct = ct;
    }

    public getCt(): number {
        return this.ct;
    }
}

export class ZigbeeLampeRGB extends AbstractZigbee {
    protected isGroup_: boolean;
    protected groupMembers: string[];
    protected alexaSmartNamesForOn: string[];
    protected alexaSmartNamesForOff: string[];
    protected alexaActionNamesForOn: string[];
    protected alexaActionNamesForOff: string[];
    protected tasterBooleanOn: string[];
    protected tasterBooleanOff: string[];
    protected colorSchemes: ColorScheme[];
    protected alexaColorSchemeForOn: ColorScheme;
    protected colorConverter: ColorConverter;
    private nachtbeleuchtung: boolean;
    private turnOffExitHouseSummer: boolean;
    private turnOffExitHouseWinter: boolean;
    private turnOnEnterHouseSummer: boolean;
    private turnOnEnterHouseWinter: boolean;

    constructor(adapter: any, id: number, baseState: string, etage: string, raum: string, device: string, isGroup: boolean, groupMembers: string[], alexaSmartNamesForOn: string[], alexaActionNamesForOn: string[], alexaColorSchemeForOn: ColorScheme, alexaSmartNamesForOff: string[], alexaActionNamesForOff: string[], colorSchemes: ColorScheme[], tasterBooleanOn: string[], tasterBooleanOff: string[], nachtbeleuchtung: boolean, turnOffExitHouseSummer: boolean, turnOffExitHouseWinter: boolean, turnOnEnterHouseSummer: boolean, turnOnEnterHouseWinter: boolean) {
        super(adapter, id, baseState, etage, raum, device);
        this.adapter = adapter;
        this.isGroup_ = isGroup;
        this.groupMembers = groupMembers;
        this.alexaSmartNamesForOn = alexaSmartNamesForOn;
        this.alexaSmartNamesForOff = alexaSmartNamesForOff;
        this.alexaActionNamesForOn = alexaActionNamesForOn;
        this.alexaActionNamesForOff = alexaActionNamesForOff;
        this.nachtbeleuchtung = nachtbeleuchtung;
        this.turnOffExitHouseSummer = turnOffExitHouseSummer;
        this.turnOffExitHouseWinter = turnOffExitHouseWinter;
        this.turnOnEnterHouseSummer = turnOnEnterHouseSummer;
        this.turnOnEnterHouseWinter = turnOnEnterHouseWinter;

        this.alexaColorSchemeForOn = alexaColorSchemeForOn;
        this.colorSchemes = colorSchemes;
        this.colorConverter = new ColorConverter();
        this.tasterBooleanOn = tasterBooleanOn;
        this.tasterBooleanOff = tasterBooleanOff;

        this.tasterBooleanOn.forEach(booleanOnObj => {
            this.createState(booleanOnObj);
        });
        this.tasterBooleanOff.forEach(tasterBooleanOffObj => {
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

        this.colorSchemes.forEach(scheme => {
            if (scheme.getAlexaName() != null) {
                this.createIOTAdapterSmartDevices(scheme.getAlexaName());
            }
        });

        this.initRGB();

    }

    public isNachtbeleuchtung(): boolean {
        return this.nachtbeleuchtung;
    }

    public isTurnOffExitHouseSummer(): boolean {
        return this.turnOffExitHouseSummer;
    }

    public isTurnOffExitHouseWinter(): boolean {
        return this.turnOffExitHouseWinter;
    }

    public isTurnOnEnterHouseSummer(): boolean {
        return this.turnOnEnterHouseSummer;
    }

    public isTurnOnEnterHouseWinter(): boolean {
        return this.turnOnEnterHouseWinter;
    }

    private initRGB(): void {
        this.colorSchemes.forEach(colorscheme => {
            colorscheme.setDevice(this);
        });
        if (this.alexaColorSchemeForOn != null) {
            this.alexaColorSchemeForOn.setDevice(this);
        }
        this.createAlias(this.getBaseState() + ".on", "alias.0.rgb." + this.getDeviceId() + ".on");
        this.createAlias(this.getBaseState() + ".ct", "alias.0.rgb." + this.getDeviceId() + ".ct");
        this.createAlias(this.getBaseState() + ".level", "alias.0.rgb." + this.getDeviceId() + ".level");
        if (this.isGroup_ == false) {
            this.createAlias(this.getBaseState() + ".reachable", "alias.0.rgb." + this.getDeviceId() + ".reachable");
        } else {
            var groupReachable = "0_userdata.0.rgb." + this.getDeviceId() + ".reachable";
            this.adapter.createState(groupReachable, true, {
                name: groupReachable,
                desc: groupReachable,
                type: 'boolean',
                read: true,
                write: true
            });
            this.createAlias("0_userdata.0.rgb." + this.getDeviceId() + ".reachable", "alias.0.rgb." + this.getDeviceId() + ".reachable");
        }
    }

    private createAlias(originalDatenpunkt, aliasDatenpunkt) {
        this.adapter.setObject(aliasDatenpunkt, {
            type: 'state',
            common: {
                name: this.adapter.getObject(originalDatenpunkt).common.name,    //'Heizung Ist Temperatur',
                type: this.adapter.getObject(originalDatenpunkt).common.type,    // 'number',
                unit: this.adapter.getObject(originalDatenpunkt).common.unit,    //'°C',
                read: true,
                write: true,
                role: this.adapter.getObject(originalDatenpunkt).common.role,    //'value.temperature',
                alias: {
                    id: originalDatenpunkt
                }
            },
            native: {}
        });
    }

    public getColorSchemes(): ColorScheme[] {
        return this.colorSchemes;
    }

    public getColorSchemeForOn(): ColorScheme {
        return this.alexaColorSchemeForOn;
    }

    public getTasterBooleanOn(): string[] {
        return this.tasterBooleanOn;
    }

    public getTasterBooleanOff(): string[] {
        return this.tasterBooleanOff;
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

    public changeColor(colorscheme: ColorScheme) {
        if (colorscheme.getDevice().getBaseState().includes("deconz")) {
            this.adapter.setState(this.getBaseState() + ".level", colorscheme.getLevel());
            if (colorscheme instanceof RGBColorScheme) {
                const rgbColorscheme = colorscheme as RGBColorScheme;
                this.adapter.setState(this.getBaseState() + ".xy", this.colorConverter.convertHSL2XY(rgbColorscheme.getHue(), rgbColorscheme.getSat()));
            } else {
                const whiteColorscheme = colorscheme as WhiteColorScheme;
                this.adapter.setState(this.getBaseState() + ".ct", whiteColorscheme.getCt());
            }
        } else {
            this.adapter.log(">>> hue changeColor: Set Level to: " + colorscheme.getLevel());

            setTimeout(obj => {
                this.adapter.setState(this.getBaseState() + ".level", colorscheme.getLevel());

                setTimeout(obj2 => {
                    if (colorscheme instanceof RGBColorScheme) {
                        this.adapter.log(">>> hue changeColor: Set Hue to: " + colorscheme.getHue());
                        this.adapter.log(">>> hue changeColor: Set Sat to: " + colorscheme.getSat());

                        const rgbColorscheme = colorscheme as RGBColorScheme;
                        //setState(this.getBaseState() + ".xy", this.colorConverter.convertHSL2XY(rgbColorscheme.getHue(), rgbColorscheme.getSat()));
                        this.adapter.setState(this.getBaseState() + ".hue", rgbColorscheme.getHue());//, rgbColorscheme.getSat()));
                        this.adapter.setState(this.getBaseState() + ".sat", rgbColorscheme.getSat());
                    } else {
                        const whiteColorscheme = colorscheme as WhiteColorScheme;
                        this.adapter.setState(this.getBaseState() + ".ct", whiteColorscheme.getCt());
                        //log(">>> deconz changeColor: Set ct to: " + whiteColorscheme.getCt());
                    }

                }, 300);

            }, 600);
        }
    }

    public turnOn() {
        if (this.alexaColorSchemeForOn == null) { // Schalte Licht nur ein, d.h. lass die Farbwerte so wie sie sind
            this.adapter.setState(this.getBaseState() + ".on", true);
        } else {
            this.changeColor(this.alexaColorSchemeForOn);
        }
    }

    public turnOff() {
        this.adapter.setState(this.getBaseState() + ".on", false);
    }

    public getAlexaNamesForOnAsString(): string {
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

    public getAlexaNamesForOffAsString(): string {
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

    public isSwitchedOn(): boolean {
        if (this.adapter.getState(this.baseState + ".on").val == false) { // hue.0.Steckdose_Backstube.on
            return false;
        }
        return true;
    }

    public getGroupMembers(): string[] {
        return this.groupMembers;
    }

    public getAlexaSmartNamesForOn(): string[] {
        return this.alexaSmartNamesForOn;
    }

    public getAlexaSmartNamesForOff(): string[] {
        return this.alexaSmartNamesForOff;
    }

    public getAlexaActionNamesForOn(): string[] {
        return this.alexaActionNamesForOn;
    }

    public getAlexaActionNamesForOff(): string[] {
        return this.alexaActionNamesForOff;
    }

    public isGroup(): boolean {
        return this.isGroup_;
    }

    public getDeviceId(): string {
        if (this.isGroup_) {
            return "ZG" + this.id.toString().padStart(3, '0');
        } else {
            return "Z" + this.id.toString().padStart(3, '0');
        }
    }

    public isStatusReachable(): boolean {
        if (this.isGroup_) {
            return true;
        } else {
            return this.adapter.getState(this.baseState + ".reachable").val; // hue.0.Steckdose_Backstube.reachable 
        }
    }

    public getLevel(): number { // Helligkeit
        return this.adapter.getState(this.baseState + ".level").val;
    }

    public getCategory(): string {
        return deviceZigbeeLampeRGB;
    }
}

export class LampeWeissTasterScheme {
    protected tasterBooleanOn: string;
    protected level: number;
    protected ct: number;

    constructor(tasterBooleanOn: string, level: number, ct: number) {
        this.tasterBooleanOn = tasterBooleanOn;
        this.level = level;
        this.ct = ct;
    }

    public getTasterBooleanOnName(): string {
        return this.tasterBooleanOn;
    }

    public getLevel(): number {
        return this.level;
    }

    public getCt(): number {
        return this.ct;
    }
}

export class LampeWeissAlexaScheme {
    protected alexaName: string;
    protected level: number;
    protected ct: number;
    protected device: ZigbeeLampeWeiss;

    constructor(alexaName: string, level: number, ct: number) {
        this.alexaName = alexaName;
        this.level = level;
        this.ct = ct;
    }

    public getAlexaName(): string {
        return this.alexaName;
    }

    public getLevel(): number {
        return this.level;
    }

    public setDevice(device: ZigbeeLampeWeiss) {
        this.device = device;
    }

    public getDevice(): ZigbeeLampeWeiss {
        return this.device;
    }

    public getCt(): number {
        return this.ct;
    }
}

export class ZigbeeLampeWeiss extends AbstractZigbee {
    protected alexaLevelSchemeForOn: LampeWeissAlexaScheme;
    protected alexaSmartNamesForOn: string[];
    protected alexaSmartNamesForOff: string[];
    protected alexaActionNamesForOn: string[];
    protected alexaActionNamesForOff: string[];
    protected isGroup_: boolean;
    protected tasterBooleanOn: LampeWeissTasterScheme[];
    protected tasterBooleanOff: string[];
    protected levelSchemes: LampeWeissAlexaScheme[];
    private nachtbeleuchtung: boolean;
    private turnOffExitHouseSummer: boolean;
    private turnOffExitHouseWinter: boolean;
    private turnOnEnterHouseSummer: boolean;
    private turnOnEnterHouseWinter: boolean;

    constructor(adapter:any, id: number, baseState: string, etage: string, raum: string, device: string, alexaSmartNamesForOn: string[], alexaActionNamesForOn: string[], alexaLevelSchemeForOn: LampeWeissAlexaScheme, alexaSmartNamesForOff: string[], alexaActionNamesForOff: string[], levelSchemes: LampeWeissAlexaScheme[], isGroup_: boolean, tasterBooleanOn: LampeWeissTasterScheme[], tasterBooleanOff: string[], nachtbeleuchtung: boolean, turnOffExitHouseSummer: boolean, turnOffExitHouseWinter: boolean, turnOnEnterHouseSummer: boolean, turnOnEnterHouseWinter: boolean) {
        super(adapter, id, baseState, etage, raum, device);
        this.adapter = adapter;
        this.alexaLevelSchemeForOn = alexaLevelSchemeForOn;
        this.alexaSmartNamesForOn = alexaSmartNamesForOn;
        this.alexaSmartNamesForOff = alexaSmartNamesForOff;
        this.alexaActionNamesForOn = alexaActionNamesForOn;
        this.alexaActionNamesForOff = alexaActionNamesForOff;
        this.nachtbeleuchtung = nachtbeleuchtung;
        this.turnOffExitHouseSummer = turnOffExitHouseSummer;
        this.turnOffExitHouseWinter = turnOffExitHouseWinter;
        this.turnOnEnterHouseSummer = turnOnEnterHouseSummer;
        this.turnOnEnterHouseWinter = turnOnEnterHouseWinter;
        this.isGroup_ = isGroup_;
        this.tasterBooleanOn = tasterBooleanOn;
        this.tasterBooleanOff = tasterBooleanOff;
        this.levelSchemes = levelSchemes;

        // States anlegen:
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

    public isNachtbeleuchtung(): boolean {
        return this.nachtbeleuchtung;
    }

    public isTurnOffExitHouseSummer(): boolean {
        return this.turnOffExitHouseSummer;
    }

    public isTurnOffExitHouseWinter(): boolean {
        return this.turnOffExitHouseWinter;
    }

    public isTurnOnEnterHouseSummer(): boolean {
        return this.turnOnEnterHouseSummer;
    }

    public isTurnOnEnterHouseWinter(): boolean {
        return this.turnOnEnterHouseWinter;
    }

    public getAlexaSmartNamesForOn(): string[] {
        return this.alexaSmartNamesForOn;
    }

    public getAlexaSmartNamesForOff(): string[] {
        return this.alexaSmartNamesForOff;
    }

    public getAlexaActionNamesForOn(): string[] {
        return this.alexaActionNamesForOn;
    }

    public getAlexaActionNamesForOff(): string[] {
        return this.alexaActionNamesForOff;
    }

    public getAlexaSchemes(): LampeWeissAlexaScheme[] {
        return this.levelSchemes;
    }

    public getAlexaSchemeForOn(): LampeWeissAlexaScheme {
        return this.alexaLevelSchemeForOn;
    }

    public getAlexaNamesForOnAsString(): string {
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

    public getAlexaNamesForOffAsString(): string {
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

    public getTasterBooleanOn(): LampeWeissTasterScheme[] {
        return this.tasterBooleanOn;
    }

    public getTasterBooleanOff(): string[] {
        return this.tasterBooleanOff;
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

    public isSwitchedOn(): boolean {
        if (this.adapter.getState(this.baseState + ".on").val == false) { // hue.0.Steckdose_Backstube.on
            return false;
        }
        return true;
    }

    public turnOn() {
        if (this.alexaLevelSchemeForOn == null) { // Schalte Licht nur ein
            if (this.adapter.getState(this.baseState + ".on").val != true) {
                this.adapter.setState(this.baseState + ".on", true);
            }
        } else {
            this.changeLevel(this.alexaLevelSchemeForOn);
        }
    }

    public turnOff() {
        if (this.adapter.getState(this.baseState + ".on").val != false) {
            this.adapter.setState(this.baseState + ".on", false);
        }
    }

    public changeLevel(levelScheme: LampeWeissAlexaScheme) {
        this.adapter.log("LampeWeiß --> ChangeLevel: Level:" + levelScheme.getLevel() + ", ct: " + levelScheme.getCt());
        this.adapter.setState(this.baseState + ".on", true);
        this.adapter.setState(this.baseState + ".level", levelScheme.getLevel());
        if (levelScheme.getCt() != -1) {
            this.adapter.setState(this.baseState + ".ct", levelScheme.getCt());
        }
    }

    public isStatusReachable(): boolean {
        if (this.isGroup_) {
            return true;
        } else {
            return this.adapter.getState(this.baseState + ".reachable").val; // hue.0.Steckdose_Backstube.reachable 
        }
    }

    public isGroup(): boolean {
        return this.isGroup_;
    }

    public getDeviceId(): string {
        if (this.isGroup_) {
            return "ZG" + this.id.toString().padStart(3, '0');
        } else {
            return "Z" + this.id.toString().padStart(3, '0');
        }
    }

    public getLevel(): number { // Helligkeit
        return this.adapter.getState(this.baseState + ".level").val;
    }

    public getCategory(): string {
        return deviceZigbeeLampeWeiss;
    }
}

export class ColorConverter {
    public convertXY2HSL(x, y) {
        var bri = 254;
        let xy = {
            x: x,
            y: y
        };

        let z = 1.0 - xy.x - xy.y;
        let Y = bri / 255;
        let X = (Y / xy.y) * xy.x;
        let Z = (Y / xy.y) * z;
        var r = X * 1.656492 - Y * 0.354851 - Z * 0.255038;
        var g = -X * 0.707196 + Y * 1.655397 + Z * 0.036152;
        var b = X * 0.051713 - Y * 0.121364 + Z * 1.011530;

        r = r <= 0.0031308 ? 12.92 * r : (1.0 + 0.055) * Math.pow(r, (1.0 / 2.4)) - 0.055;
        g = g <= 0.0031308 ? 12.92 * g : (1.0 + 0.055) * Math.pow(g, (1.0 / 2.4)) - 0.055;
        b = b <= 0.0031308 ? 12.92 * b : (1.0 + 0.055) * Math.pow(b, (1.0 / 2.4)) - 0.055;

        var r_new = (r * 255).toString();
        var g_new = (g * 255).toString();
        var b_new = (b * 255).toString();

        let red = parseInt(r_new) > 255 ? 255 : parseInt(r_new);
        let green = parseInt(g_new) > 255 ? 255 : parseInt(g_new);
        let blue = parseInt(b_new) > 255 ? 255 : parseInt(b_new);

        red = Math.abs(red);
        green = Math.abs(green);
        blue = Math.abs(blue);
        var
            min = Math.min(r, g, b),
            max = Math.max(r, g, b),
            delta = max - min,
            h, s, v = max;

        v = Math.floor(max / 255 * 100);
        if (max != 0)
            s = Math.floor(delta / max * 100);
        else {
            // black
            return [0, 0, 0];
        }

        if (r == max)
            h = (g - b) / delta;         // between yellow & magenta
        else if (g == max)
            h = 2 + (b - r) / delta;     // between cyan & yellow
        else
            h = 4 + (r - g) / delta;     // between magenta & cyan

        h = Math.floor(h * 60);            // degrees
        if (h < 0) h += 360;

        return [h, s, v];
    }

    public convertHSL2XY(h, s) {
        var l = 50;
        // Must be fractions of 1
        s /= 100;
        l /= 100;

        let c = (1 - Math.abs(2 * l - 1)) * s,
            x = c * (1 - Math.abs((h / 60) % 2 - 1)),
            m = l - c / 2,
            r = 0,
            g = 0,
            b = 0;

        if (0 <= h && h < 60) {
            r = c; g = x; b = 0;
        } else if (60 <= h && h < 120) {
            r = x; g = c; b = 0;
        } else if (120 <= h && h < 180) {
            r = 0; g = c; b = x;
        } else if (180 <= h && h < 240) {
            r = 0; g = x; b = c;
        } else if (240 <= h && h < 300) {
            r = x; g = 0; b = c;
        } else if (300 <= h && h < 360) {
            r = c; g = 0; b = x;
        }
        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);

        let red = r;
        let green = g;
        let blue = b;

        if (red > 0.04045) red = Math.pow((red + 0.055) / (1.0 + 0.055), 2.4)
        else red = red / 12.92;

        if (green > 0.04045) green = Math.pow((green + 0.055) / (1.0 + 0.055), 2.4)
        else green = green / 12.92;

        if (blue > 0.04045) blue = Math.pow((blue + 0.055) / (1.0 + 0.055), 2.4)
        else blue = blue / 12.92;

        const X = red * 0.664511 + green * 0.154324 + blue * 0.162028;
        const Y = red * 0.283881 + green * 0.668433 + blue * 0.047685;
        const Z = red * 0.000088 + green * 0.07231 + blue * 0.986039;

        const x2 = X / (X + Y + Z);
        const y2 = Y / (X + Y + Z);

        return new Array(x2, y2);
    }
}

export class ZigbeeSteckdose extends AbstractZigbee {
    protected alexaSmartNamesForOn:string[];
    protected alexaSmartNamesForOff: string[];
    protected alexaActionNamesForOn:string[];
    protected alexaActionNamesForOff: string[];

    private additionalStates4TurnOn:string[];
    private additionalStates4TurnOff:string[];

    constructor(adapter:any, id: number, baseState: string, etage: string, raum: string, device: string, alexaSmartNamesForOn:string[],alexaActionNamesForOn:string[], alexaSmartNamesForOff: string[],alexaActionNamesForOff: string[], additionalStates4TurnOn:string[], additionalStates4TurnOff:string[]) {
        super(adapter, id, baseState, etage, raum, device); 
        this.adapter = adapter;

        this.alexaSmartNamesForOn = alexaSmartNamesForOn;
        this.alexaSmartNamesForOff = alexaSmartNamesForOff;
        this.alexaActionNamesForOn = alexaActionNamesForOn;
        this.alexaActionNamesForOff = alexaActionNamesForOff;

        this.additionalStates4TurnOn = additionalStates4TurnOn;
        this.additionalStates4TurnOff = additionalStates4TurnOff;

        // Diese boolean States können auch das Licht einschalten. Wird benötigt z.B. bei einem RGB-Farbschema "hell" (realisiert über boolean-Datenpunkt). Dann soll auch die Shelly-Lampe eingeschalten werden
        this.additionalStates4TurnOn.forEach(turnOnState => {    
            this.createState(turnOnState);
        });    
        // Diese boolean States können auch das Licht ausschalten. Wird benötigt z.B. bei einem RGB-Farbschema "hell" (realisiert über boolean-Datenpunkt). Dann soll auch die Shelly-Lampe eingeschalten werden
        this.additionalStates4TurnOff.forEach(turnOffState => {    
            this.createState(turnOffState);            
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
        this.adapter.createState(jarvisDatenpunkt, false, {
            name: jarvisDatenpunkt,
            desc: jarvisDatenpunkt,
            type: 'boolean', 
            read: true,
            write: true
        });     
    }    

    public getAdditionalStates4TurnOn() : string[] {
        return this.additionalStates4TurnOn;
    }    

    public getAdditionalStates4TurnOff() : string[] {
        return this.additionalStates4TurnOff;
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

    public getSwitchState() : string {
        return this.baseState + ".on";
    }       

    public isSwitchedOn(): boolean {
        if (this.adapter.getState(this.baseState + ".on").val == false) { // hue.0.Steckdose_Backstube.on
            return false;
        }
        return true;
    }         

    public getCategory(): string {
        return deviceZigbeeSteckdose;
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
}

export class ZigbeeSchalter extends AbstractZigbee {
    constructor(adapter:any, id: number, baseState: string, etage: string, raum: string, device: string) {
        super(adapter, id, baseState, etage,raum, device); 
        this.adapter = adapter;
    }

    public getCategory(): string {
        return deviceZigbeeSchalter;
    }
}

export class ZigbeeRepeater extends AbstractZigbee {
    constructor(adapter:any, id: number, baseState: string, etage: string, raum: string, device: string) {
        super(adapter, id, baseState, etage,raum, device); 
        this.adapter = adapter;        
    }

    public getCategory(): string {
        return deviceZigbeeRepeater;
    }
}

export class ZigbeeFenstersensor extends AbstractZigbee {
    constructor(adapter:any, id: number, baseState: string, etage: string, raum: string, device: string) {
        super(adapter, id, baseState, etage,raum, device); 
        this.adapter = adapter;        
    }

    public isOpen(): boolean {
        if (this.adapter.getState(this.baseState + ".open").val == false) { // deconz.0.Sensors.117.open
            return false;
        }
        return true;
    }         

    public isStatusReachable() : boolean {
        var reachable = this.adapter.getState(this.baseState + ".reachable").val; // hue.0.Steckdose_Backstube.reachable 
        return reachable;
    }       
    
    public getBattery(): number {
        return this.adapter.getState(this.baseState + ".battery").val;// // alias.0.Z021.battery
    }

    public getCategory(): string {
        return deviceZigbeeFenstersensor;
    }
}

export class ZigbeeRauchmelder extends AbstractZigbee {
    constructor(adapter:any, id: number, baseState: string, etage: string, raum: string, device: string) {
        super(adapter, id, baseState, etage,raum, device); 
        this.adapter = adapter;        
    }

    public isFire(): boolean {
        if (this.adapter.getState(this.baseState + ".fire").val == false) { // hue.0.Steckdose_Backstube.on
            return false;
        }
        return true;
    }         

    public isStatusReachable() : boolean {
        var reachable = this.adapter.getState(this.baseState + ".reachable").val; // hue.0.Steckdose_Backstube.reachable 
        return reachable;
    }       
    
    public getBattery(): number {
        return this.adapter.getState(this.baseState + ".battery").val;// // alias.0.Z021.battery
    }

    public getCategory(): string {
        return deviceZigbeeRauchmelder;
    }

}

export class ZigbeeBewegungsmelder extends AbstractZigbee {

    constructor(adapter:any, id: number, baseState: string, etage: string, raum: string, device: string) {
        super(adapter, id, baseState, etage,raum, device); 
        this.adapter = adapter;        
    }

    public getCategory(): string {
        return deviceZigbeeBewegungsmelder;
    }

    public getBattery(): number {
        return this.adapter.getState(this.baseState + ".battery").val;// // alias.0.Z021.battery
    }
}

export class ZigbeeWandtaster extends AbstractZigbee {

    constructor(adapter:any, id: number, baseState: string, etage: string, raum: string, device: string) {
        super(adapter, id, baseState, etage,raum, device); 
        this.adapter = adapter;
    }

    public getCategory(): string {
        return deviceZigbeeWandtaster;
    }

    public getBattery(): number {
        return this.adapter.getState(this.baseState + ".battery").val;// // alias.0.Z021.battery
    }
}

export class ZigbeeDosenrelais extends AbstractZigbee {
    protected alexaSmartNames:string[];

    constructor(adapter:any, id: number, baseState: string, etage: string, raum: string, device: string, alexaSmartNames:string[]) {
        super(adapter, id, baseState, etage,raum, device); 
        this.adapter = adapter;
        this.alexaSmartNames = alexaSmartNames;
        this.alexaSmartNames.forEach(alexaSmartName => {  
            this.createIOTAdapterSmartDevices(alexaSmartName);
        });      
    }

    public getSwitchState() : string {
        return this.baseState + ".on";
    }       

    public isSwitchedOn(): boolean {
        if (this.adapter.getState(this.baseState + ".on").val == false) {
            return false;
        }
        return true;
    }       

    public turnOn() {
        this.adapter.setState(this.baseState + ".on", true);
    }      

    public turnOff() {
        this.adapter.setState(this.baseState + ".on", false);
    }      

    public getCategory(): string {
        return deviceZigbeeDosenrelais;
    }

    public getAlexaSmartNames() : string[] {
        return this.alexaSmartNames;
    }    
}


module.exports = { 
    AbstractZigbee, ColorConverter, ColorScheme, RGBColorScheme, WhiteColorScheme, ZigbeeLampeRGB, LampeWeissTasterScheme, LampeWeissAlexaScheme, ZigbeeLampeWeiss, ZigbeeSteckdose, ZigbeeSchalter, ZigbeeRepeater, ZigbeeFenstersensor, ZigbeeRauchmelder, ZigbeeBewegungsmelder, ZigbeeWandtaster, ZigbeeDosenrelais,
    deviceZigbeeSteckdose, deviceZigbeeBewegungsmelder, deviceZigbeeLampeRGB, deviceZigbeeLampeWeiss, deviceZigbeeRauchmelder, deviceZigbeeWandtaster, deviceZigbeeDosenrelais, deviceZigbeeSchalter, deviceZigbeeRepeater, deviceZigbeeFenstersensor    
};



