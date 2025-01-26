"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomematicFussbodenheizung = exports.HomematicDoor = exports.HomematicRollladen = exports.HomematicAccessPoint = exports.HomematicWandschalter = exports.HomematicTemperatursensor = exports.HomematicRauchmelder = exports.HomematicFunkschaltaktor = exports.HomematicDimmer = exports.DimmerTasterScheme = exports.DimmerAlexaScheme = exports.HomematicHeizkoerper = exports.HomematicSteckdose = exports.HomematicWindow = exports.HomematicWetterstation = exports.HomematicPraesenzmelder = exports.HomematicWandthermostat = exports.HomematicWandtaster = exports.AbstractHomematic = void 0;
var deviceHomematicWandthermostat = "Wandthermostat";
var deviceHomematicPraesenzmelder = "Praesenzmelder";
var deviceHomematicWetterstation = "Wetterstation";
var deviceHomematicDoor = "Door";
var deviceHomematicRollladen = "Rollladen";
var deviceHomematicWandschalter = "Wandschalter";
var deviceHomematicFussbodenheizung = "Fussbodenheizung";
var deviceHomematicWandtaster = "Wandtaster";
var deviceHomematicAccessPoint = "AccessPoint";
var deviceHomematicTemperatursensor = "Temperatursensor";
var deviceHomematicRauchmelder = "Rauchmelder";
var deviceHomematicFunkSchaltaktor = "FunkSchaltaktor";
var deviceHomematicWindow = "Window";
var deviceHomematicSteckdose = "Steckdose";
var deviceHomematicHeizkoerper = "Heizkoerper";
var deviceHomematicDimmer = "Dimmer";
var AbstractHomematic = /** @class */ (function () {
    function AbstractHomematic(adapter, id, baseState, etage, raum, device) {
        this.adapter = adapter;
        this.id = id;
        this.etage = etage;
        this.raum = raum;
        this.device = device;
        this.baseState = baseState;
    }
    AbstractHomematic.prototype.getDeviceId = function () {
        return "H" + this.id.toString().padStart(2, '0');
    };
    AbstractHomematic.prototype.getDeviceIdAsRawNumber = function () {
        return this.id;
    };
    AbstractHomematic.prototype.getBaseState = function () {
        return this.baseState;
    };
    AbstractHomematic.prototype.getType = function () {
        return ""; //getObject(this.baseState).native.TYPE;
    };
    AbstractHomematic.prototype.getEtage = function () {
        return this.etage;
    };
    AbstractHomematic.prototype.getRaum = function () {
        return this.raum;
    };
    AbstractHomematic.prototype.getDevice = function () {
        return this.device;
    };
    AbstractHomematic.prototype.isStatusTotal = function () {
        return this.isStatusReachable() && this.isStatusBattery() && this.isStatusDutyCycle();
    };
    AbstractHomematic.prototype.isStatusReachable = function () {
        return !this.adapter.getState(this.baseState + ".0.UNREACH").val;
    };
    AbstractHomematic.prototype.isStatusBattery = function () {
        return true;
    };
    AbstractHomematic.prototype.isStatusDutyCycle = function () {
        if (this.getType().includes("HmIP")) {
            return !this.adapter.getState(this.baseState + ".0.DUTY_CYCLE").val; // hm-rpc.0.000A9BE993E2F7.0.DUTY_CYCLE
        }
        return true;
    };
    AbstractHomematic.prototype.getSignal = function () {
        return this.adapter.getState(this.baseState + ".0.RSSI_DEVICE").val;
    };
    AbstractHomematic.prototype.createIOTAdapterSmartDevices = function (smartName) {
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
        var objLevel = this.adapter.getObject(alexaLampeLevel);
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
        var objHue = this.adapter.getObject(alexaLampeHue);
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
        var obSat = this.adapter.getObject(alexaLampeSat);
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
        var objCT = this.adapter.getObject(alexaLampeCT);
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
    };
    return AbstractHomematic;
}());
exports.AbstractHomematic = AbstractHomematic;
var HomematicWandtaster = /** @class */ (function (_super) {
    __extends(HomematicWandtaster, _super);
    function HomematicWandtaster(adapter, id, baseState, etage, raum, device) {
        return _super.call(this, adapter, id, baseState, etage, raum, device) || this;
    }
    HomematicWandtaster.prototype.getCategory = function () {
        return deviceHomematicWandtaster;
    };
    return HomematicWandtaster;
}(AbstractHomematic));
exports.HomematicWandtaster = HomematicWandtaster;
var HomematicWandthermostat = /** @class */ (function (_super) {
    __extends(HomematicWandthermostat, _super);
    function HomematicWandthermostat(adapter, id, baseState, etage, raum, device) {
        return _super.call(this, adapter, id, baseState, etage, raum, device) || this;
    }
    HomematicWandthermostat.prototype.getTemperatureIst = function () {
        return this.adapter.getState(this.baseState + ".1.ACTUAL_TEMPERATURE").val; // hm-rpc.0.000A9BE993E2F7.1.ACTUAL_TEMPERATURE
    };
    HomematicWandthermostat.prototype.getTemperatureSoll = function () {
        return this.adapter.getState(this.baseState + ".1.SET_POINT_TEMPERATURE").val; // hm-rpc.0.000A9BE993E2F7.1.SET_POINT_TEMPERATURE
    };
    HomematicWandthermostat.prototype.getHumanity = function () {
        return this.adapter.getState(this.baseState + ".1.HUMIDITY").val + " %"; // hm-rpc.0.000A9BE993E2F7.1.HUMIDITY
    };
    HomematicWandthermostat.prototype.getCategory = function () {
        return deviceHomematicWandthermostat;
    };
    HomematicWandthermostat.prototype.isStatusBattery = function () {
        return !this.adapter.getState(this.baseState + ".0.LOW_BAT").val; // // hm-rpc.0.000A9BE993E2F7.0.LOW_BAT
    };
    return HomematicWandthermostat;
}(AbstractHomematic));
exports.HomematicWandthermostat = HomematicWandthermostat;
var HomematicPraesenzmelder = /** @class */ (function (_super) {
    __extends(HomematicPraesenzmelder, _super);
    function HomematicPraesenzmelder(adapter, id, baseState, etage, raum, device) {
        return _super.call(this, adapter, id, baseState, etage, raum, device) || this;
    }
    HomematicPraesenzmelder.prototype.getCategory = function () {
        return deviceHomematicPraesenzmelder;
    };
    HomematicPraesenzmelder.prototype.getIllumination = function () {
        if (this.adapter.getState(this.baseState + ".1.CURRENT_ILLUMINATION").val != null) {
            return this.adapter.getState(this.baseState + ".1.CURRENT_ILLUMINATION").val + " lux"; // hm-rpc.0.000C1BE98E093D.1.CURRENT_ILLUMINATION
        }
        return "-";
    };
    HomematicPraesenzmelder.prototype.isStatusBattery = function () {
        return !this.adapter.getState(this.baseState + ".0.LOW_BAT").val; // // hm-rpc.0.000A9BE993E2F7.0.LOW_BAT
    };
    return HomematicPraesenzmelder;
}(AbstractHomematic));
exports.HomematicPraesenzmelder = HomematicPraesenzmelder;
var HomematicWetterstation = /** @class */ (function (_super) {
    __extends(HomematicWetterstation, _super);
    function HomematicWetterstation(adapter, id, baseState, etage, raum, device) {
        return _super.call(this, adapter, id, baseState, etage, raum, device) || this;
    }
    HomematicWetterstation.prototype.getCategory = function () {
        return deviceHomematicWetterstation;
    };
    HomematicWetterstation.prototype.isStatusBattery = function () {
        return !this.adapter.getState(this.baseState + ".0.LOW_BAT").val; // // hm-rpc.0.000A9BE993E2F7.0.LOW_BAT
    };
    return HomematicWetterstation;
}(AbstractHomematic));
exports.HomematicWetterstation = HomematicWetterstation;
var HomematicWindow = /** @class */ (function (_super) {
    __extends(HomematicWindow, _super);
    function HomematicWindow(adapter, id, baseState, etage, raum, device) {
        return _super.call(this, adapter, id, baseState, etage, raum, device) || this;
    }
    HomematicWindow.prototype.getCategory = function () {
        return deviceHomematicWindow;
    };
    HomematicWindow.prototype.isStatusBattery = function () {
        return !this.adapter.getState(this.baseState + ".0.LOW_BAT").val; // // hm-rpc.0.000A9BE993E2F7.0.LOW_BAT
    };
    HomematicWindow.prototype.isOpen = function () {
        if (this.adapter.getState(this.baseState + ".1.STATE").val == 0) {
            return false;
        }
        return true;
    };
    return HomematicWindow;
}(AbstractHomematic));
exports.HomematicWindow = HomematicWindow;
var HomematicSteckdose = /** @class */ (function (_super) {
    __extends(HomematicSteckdose, _super);
    function HomematicSteckdose(adapter, id, baseState, etage, raum, device) {
        return _super.call(this, adapter, id, baseState, etage, raum, device) || this;
    }
    HomematicSteckdose.prototype.getCategory = function () {
        return deviceHomematicSteckdose;
    };
    HomematicSteckdose.prototype.isSwitchedOn = function () {
        if (this.adapter.getState(this.baseState + ".3.STATE").val == false) { // hm-rpc.1.00021D8999C78B.3.STATE    
            return false;
        }
        return true;
    };
    return HomematicSteckdose;
}(AbstractHomematic));
exports.HomematicSteckdose = HomematicSteckdose;
var HomematicHeizkoerper = /** @class */ (function (_super) {
    __extends(HomematicHeizkoerper, _super);
    function HomematicHeizkoerper(adapter, id, baseState, etage, raum, device) {
        return _super.call(this, adapter, id, baseState, etage, raum, device) || this;
    }
    HomematicHeizkoerper.prototype.getCategory = function () {
        return deviceHomematicHeizkoerper;
    };
    HomematicHeizkoerper.prototype.getTemperatureIst = function () {
        return this.adapter.getState(this.baseState + ".1.ACTUAL_TEMPERATURE").val; // hm-rpc.0.000A9BE9A03005.1.ACTUAL_TEMPERATURE
    };
    HomematicHeizkoerper.prototype.getTemperatureSoll = function () {
        return this.adapter.getState(this.baseState + ".1.SET_POINT_TEMPERATURE").val; // hm-rpc.0.000A9BE9A03005.1.SET_POINT_TEMPERATURE
    };
    HomematicHeizkoerper.prototype.isStatusBattery = function () {
        return !this.adapter.getState(this.baseState + ".0.LOW_BAT").val; // // hm-rpc.0.000A9BE993E2F7.0.LOW_BAT
    };
    return HomematicHeizkoerper;
}(AbstractHomematic));
exports.HomematicHeizkoerper = HomematicHeizkoerper;
var DimmerAlexaScheme = /** @class */ (function () {
    function DimmerAlexaScheme(alexaName, level) {
        this.alexaName = alexaName;
        this.level = level;
    }
    DimmerAlexaScheme.prototype.getAlexaName = function () {
        return this.alexaName;
    };
    DimmerAlexaScheme.prototype.getLevel = function () {
        return this.level;
    };
    DimmerAlexaScheme.prototype.setDevice = function (device) {
        this.device = device;
    };
    DimmerAlexaScheme.prototype.getDevice = function () {
        return this.device;
    };
    return DimmerAlexaScheme;
}());
exports.DimmerAlexaScheme = DimmerAlexaScheme;
var DimmerTasterScheme = /** @class */ (function () {
    function DimmerTasterScheme(tasterBooleanOn, level) {
        this.tasterBooleanOn = tasterBooleanOn;
        this.level = level;
    }
    DimmerTasterScheme.prototype.getTasterBooleanOnName = function () {
        return this.tasterBooleanOn;
    };
    DimmerTasterScheme.prototype.getLevel = function () {
        return this.level;
    };
    return DimmerTasterScheme;
}());
exports.DimmerTasterScheme = DimmerTasterScheme;
var HomematicDimmer = /** @class */ (function (_super) {
    __extends(HomematicDimmer, _super);
    function HomematicDimmer(adapter, id, baseState, etage, raum, device, alexaSmartNamesForOn, alexaActionNamesForOn, alexaLevelSchemeForOn, alexaSmartNamesForOff, alexaActionNamesForOff, levelSchemes, tasterBooleanOn, tasterBooleanOff, nachtbeleuchtung, turnOffExitHouseSummer, turnOffExitHouseWinter, turnOnEnterHouseSummer, turnOnEnterHouseWinter) {
        var _this = _super.call(this, adapter, id, baseState, etage, raum, device) || this;
        _this.alexaLevelSchemeForOn = alexaLevelSchemeForOn;
        _this.levelSchemes = levelSchemes;
        _this.tasterBooleanOn = tasterBooleanOn;
        _this.tasterBooleanOff = tasterBooleanOff;
        _this.alexaSmartNamesForOn = alexaSmartNamesForOn;
        _this.alexaSmartNamesForOff = alexaSmartNamesForOff;
        _this.alexaActionNamesForOn = alexaActionNamesForOn;
        _this.alexaActionNamesForOff = alexaActionNamesForOff;
        _this.nachtbeleuchtung = nachtbeleuchtung;
        _this.turnOffExitHouseSummer = turnOffExitHouseSummer;
        _this.turnOffExitHouseWinter = turnOffExitHouseWinter;
        _this.turnOnEnterHouseSummer = turnOnEnterHouseSummer;
        _this.turnOnEnterHouseWinter = turnOnEnterHouseWinter;
        _this.levelSchemes.forEach(function (colorscheme) {
            colorscheme.setDevice(_this);
            if (colorscheme.getAlexaName() != null) {
                _this.createState(colorscheme.getAlexaName());
            }
        });
        if (_this.alexaLevelSchemeForOn != null) {
            _this.alexaLevelSchemeForOn.setDevice(_this);
            if (alexaLevelSchemeForOn.getAlexaName() != null) {
                _this.createState(alexaLevelSchemeForOn.getAlexaName());
            }
        }
        _this.tasterBooleanOn.forEach(function (tasterScheme) {
            if (tasterScheme.getTasterBooleanOnName() != null) {
                _this.createState(tasterScheme.getTasterBooleanOnName());
            }
        });
        _this.tasterBooleanOff.forEach(function (offName) {
            _this.createState(offName);
        });
        _this.alexaSmartNamesForOn.forEach(function (alexaSmartName) {
            _this.createIOTAdapterSmartDevices(alexaSmartName);
        });
        _this.alexaSmartNamesForOff.forEach(function (alexaSmartName) {
            _this.createIOTAdapterSmartDevices(alexaSmartName);
        });
        _this.alexaActionNamesForOn.forEach(function (alexaSmartName) {
            _this.createIOTAdapterSmartDevices(alexaSmartName);
        });
        _this.alexaActionNamesForOff.forEach(function (alexaSmartName) {
            _this.createIOTAdapterSmartDevices(alexaSmartName);
        });
        _this.levelSchemes.forEach(function (scheme) {
            if (scheme.getAlexaName() != null) {
                _this.createIOTAdapterSmartDevices(scheme.getAlexaName());
            }
        });
        return _this;
    }
    HomematicDimmer.prototype.isNachtbeleuchtung = function () {
        return this.nachtbeleuchtung;
    };
    HomematicDimmer.prototype.isTurnOffExitHouseSummer = function () {
        return this.turnOffExitHouseSummer;
    };
    HomematicDimmer.prototype.isTurnOffExitHouseWinter = function () {
        return this.turnOffExitHouseWinter;
    };
    HomematicDimmer.prototype.isTurnOnEnterHouseSummer = function () {
        return this.turnOnEnterHouseSummer;
    };
    HomematicDimmer.prototype.isTurnOnEnterHouseWinter = function () {
        return this.turnOnEnterHouseWinter;
    };
    HomematicDimmer.prototype.createState = function (key_in) {
        var key = key_in; //.replace(/\./g,'_'); // wegen Wohnzimmer T.V.
        var jarvisDatenpunkt = key;
        this.adapter.createState(jarvisDatenpunkt, false, {
            name: key,
            desc: key,
            type: 'boolean',
            read: true,
            write: true
        });
    };
    HomematicDimmer.prototype.getTasterBooleanOn = function () {
        return this.tasterBooleanOn;
    };
    HomematicDimmer.prototype.getTasterBooleanOff = function () {
        return this.tasterBooleanOff;
    };
    HomematicDimmer.prototype.getAlexaSchemeForOn = function () {
        return this.alexaLevelSchemeForOn;
    };
    HomematicDimmer.prototype.getAlexaSmartNamesForOn = function () {
        return this.alexaSmartNamesForOn;
    };
    HomematicDimmer.prototype.getAlexaSmartNamesForOff = function () {
        return this.alexaSmartNamesForOff;
    };
    HomematicDimmer.prototype.getAlexaActionNamesForOn = function () {
        return this.alexaActionNamesForOn;
    };
    HomematicDimmer.prototype.getAlexaActionNamesForOff = function () {
        return this.alexaActionNamesForOff;
    };
    HomematicDimmer.prototype.getAlexaSchemes = function () {
        return this.levelSchemes;
    };
    HomematicDimmer.prototype.getAlexaNamesForOnAsString = function () {
        var result = "";
        this.alexaSmartNamesForOn.forEach(function (alexaOnName) {
            if (result == "") {
                result += alexaOnName;
            }
            else {
                result += ", " + alexaOnName;
            }
        });
        this.alexaActionNamesForOn.forEach(function (alexaOnName) {
            if (result == "") {
                result += alexaOnName;
            }
            else {
                result += ", " + alexaOnName;
            }
        });
        return result;
    };
    HomematicDimmer.prototype.getAlexaNamesForOffAsString = function () {
        var result = "";
        this.alexaSmartNamesForOff.forEach(function (alexaOffName) {
            if (result == "") {
                result += alexaOffName;
            }
            else {
                result += ", " + alexaOffName;
            }
        });
        this.alexaActionNamesForOff.forEach(function (alexaOffName) {
            if (result == "") {
                result += alexaOffName;
            }
            else {
                result += ", " + alexaOffName;
            }
        });
        return result;
    };
    HomematicDimmer.prototype.turnOnHM = function () {
        if (this.alexaLevelSchemeForOn == null) { // Schalte Licht nur ein
            if (this.adapter.getState(this.baseState + ".4.LEVEL").val != 100) {
                this.adapter.setState(this.baseState + ".4.LEVEL", 100);
            }
        }
        else {
            this.changeLevel(this.alexaLevelSchemeForOn);
        }
    };
    HomematicDimmer.prototype.getSwitchState = function () {
        return this.baseState + ".4.LEVEL";
    };
    HomematicDimmer.prototype.turnOffHM = function () {
        if (this.adapter.getState(this.baseState + ".4.LEVEL").val != 0) {
            this.adapter.setState(this.baseState + ".4.LEVEL", 0);
        }
    };
    HomematicDimmer.prototype.changeLevel = function (levelScheme) {
        if (this.adapter.getState(this.baseState + ".4.LEVEL").val != levelScheme.getLevel()) {
            this.adapter.setState(this.baseState + ".4.LEVEL", levelScheme.getLevel());
        }
    };
    HomematicDimmer.prototype.getCategory = function () {
        return deviceHomematicDimmer;
    };
    HomematicDimmer.prototype.getLevel = function () {
        return this.adapter.getState(this.baseState + ".4.LEVEL").val; // hm-rpc.1.0008DA49A7C659.3.LEVEL
    };
    return HomematicDimmer;
}(AbstractHomematic));
exports.HomematicDimmer = HomematicDimmer;
var HomematicFunkschaltaktor = /** @class */ (function (_super) {
    __extends(HomematicFunkschaltaktor, _super);
    function HomematicFunkschaltaktor(adapter, id, baseState, etage, raum, device) {
        return _super.call(this, adapter, id, baseState, etage, raum, device) || this;
    }
    HomematicFunkschaltaktor.prototype.getCategory = function () {
        return deviceHomematicFunkSchaltaktor;
    };
    return HomematicFunkschaltaktor;
}(AbstractHomematic));
exports.HomematicFunkschaltaktor = HomematicFunkschaltaktor;
var HomematicRauchmelder = /** @class */ (function (_super) {
    __extends(HomematicRauchmelder, _super);
    function HomematicRauchmelder(adapter, id, baseState, etage, raum, device) {
        return _super.call(this, adapter, id, baseState, etage, raum, device) || this;
    }
    HomematicRauchmelder.prototype.getCategory = function () {
        return deviceHomematicRauchmelder;
    };
    HomematicRauchmelder.prototype.isStatusBattery = function () {
        return !this.adapter.getState(this.baseState + ".0.LOW_BAT").val; // // hm-rpc.0.000A9BE993E2F7.0.LOW_BAT
    };
    return HomematicRauchmelder;
}(AbstractHomematic));
exports.HomematicRauchmelder = HomematicRauchmelder;
var HomematicTemperatursensor = /** @class */ (function (_super) {
    __extends(HomematicTemperatursensor, _super);
    function HomematicTemperatursensor(adapter, id, baseState, etage, raum, device) {
        return _super.call(this, adapter, id, baseState, etage, raum, device) || this;
    }
    HomematicTemperatursensor.prototype.getTemperatureIst = function () {
        return this.adapter.getState(this.baseState + ".1.ACTUAL_TEMPERATURE").val + " °C";
    };
    HomematicTemperatursensor.prototype.getHumanity = function () {
        return this.adapter.getState(this.baseState + ".1.HUMIDITY").val + " %"; // hm-rpc.0.00181BE98EF50E.1.HUMIDITY
    };
    HomematicTemperatursensor.prototype.getCategory = function () {
        return deviceHomematicTemperatursensor;
    };
    HomematicTemperatursensor.prototype.isStatusBattery = function () {
        return !this.adapter.getState(this.baseState + ".0.LOW_BAT").val; // // hm-rpc.0.000A9BE993E2F7.0.LOW_BAT
    };
    return HomematicTemperatursensor;
}(AbstractHomematic));
exports.HomematicTemperatursensor = HomematicTemperatursensor;
var HomematicWandschalter = /** @class */ (function (_super) {
    __extends(HomematicWandschalter, _super);
    function HomematicWandschalter(adapter, id, baseState, etage, raum, device, alexaSmartNamesForOn, alexaActionNamesForOn, alexaSmartNamesForOff, alexaActionNamesForOff, nachtbeleuchtung, turnOffExitHouseSummer, turnOffExitHouseWinter, turnOnEnterHouseSummer, turnOnEnterHouseWinter) {
        var _this = _super.call(this, adapter, id, baseState, etage, raum, device) || this;
        _this.nachtbeleuchtung = nachtbeleuchtung;
        _this.turnOffExitHouseSummer = turnOffExitHouseSummer;
        _this.turnOffExitHouseWinter = turnOffExitHouseWinter;
        _this.turnOnEnterHouseSummer = turnOnEnterHouseSummer;
        _this.turnOnEnterHouseWinter = turnOnEnterHouseWinter;
        _this.alexaSmartNamesForOn = alexaSmartNamesForOn;
        _this.alexaSmartNamesForOff = alexaSmartNamesForOff;
        _this.alexaActionNamesForOn = alexaActionNamesForOn;
        _this.alexaActionNamesForOff = alexaActionNamesForOff;
        _this.alexaSmartNamesForOn.forEach(function (alexaSmartName) {
            _this.createIOTAdapterSmartDevices(alexaSmartName);
        });
        _this.alexaSmartNamesForOff.forEach(function (alexaSmartName) {
            _this.createIOTAdapterSmartDevices(alexaSmartName);
        });
        _this.alexaActionNamesForOn.forEach(function (alexaSmartName) {
            _this.createIOTAdapterSmartDevices(alexaSmartName);
        });
        _this.alexaActionNamesForOff.forEach(function (alexaSmartName) {
            _this.createIOTAdapterSmartDevices(alexaSmartName);
        });
        return _this;
    }
    HomematicWandschalter.prototype.isNachtbeleuchtung = function () {
        return this.nachtbeleuchtung;
    };
    HomematicWandschalter.prototype.isTurnOffExitHouseSummer = function () {
        return this.turnOffExitHouseSummer;
    };
    HomematicWandschalter.prototype.isTurnOffExitHouseWinter = function () {
        return this.turnOffExitHouseWinter;
    };
    HomematicWandschalter.prototype.isTurnOnEnterHouseSummer = function () {
        return this.turnOnEnterHouseSummer;
    };
    HomematicWandschalter.prototype.isTurnOnEnterHouseWinter = function () {
        return this.turnOnEnterHouseWinter;
    };
    HomematicWandschalter.prototype.getAlexaSmartNamesForOn = function () {
        return this.alexaSmartNamesForOn;
    };
    HomematicWandschalter.prototype.getAlexaSmartNamesForOff = function () {
        return this.alexaSmartNamesForOff;
    };
    HomematicWandschalter.prototype.getAlexaActionNamesForOn = function () {
        return this.alexaActionNamesForOn;
    };
    HomematicWandschalter.prototype.getAlexaActionNamesForOff = function () {
        return this.alexaActionNamesForOff;
    };
    HomematicWandschalter.prototype.getCategory = function () {
        return deviceHomematicWandschalter;
    };
    HomematicWandschalter.prototype.isSwitchedOn = function () {
        if (this.getType() == "HM-LC-Sw1PBU-FM") {
            if (this.adapter.getState(this.baseState + ".1.STATE").val == false) { // hm-rpc.0.PEQ2220753.1.STATE
                return false;
            }
            return true;
        }
        else if (this.getType() == "HmIP-BSM") {
            if (this.adapter.getState(this.baseState + ".4.STATE").val == false) { // // hm-rpc.1.000855699C4F38.4.STATE
                return false;
            }
            return true;
        }
        else {
            // @ts-ignore                        
            return undefined;
        }
    };
    HomematicWandschalter.prototype.getSwitchState = function () {
        if (this.getType() == "HM-LC-Sw1PBU-FM") {
            return this.baseState + ".1.STATE";
        }
        else if (this.getType() == "HmIP-BSM") {
            return this.baseState + ".4.STATE";
        }
        else {
            // @ts-ignore                        
            return undefined;
        }
    };
    HomematicWandschalter.prototype.turnOn = function () {
        if (this.getType() == "HM-LC-Sw1PBU-FM") {
            this.adapter.setState(this.baseState + ".1.STATE", true); // hm-rpc.0.PEQ2220753.1.STATE
        }
        else if (this.getType() == "HmIP-BSM") {
            this.adapter.setState(this.baseState + ".4.STATE", true); // // hm-rpc.1.000855699C4F38.4.STATE
        }
    };
    HomematicWandschalter.prototype.turnOff = function () {
        if (this.getType() == "HM-LC-Sw1PBU-FM") {
            this.adapter.setState(this.baseState + ".1.STATE", false); // hm-rpc.0.PEQ2220753.1.STATE
        }
        else if (this.getType() == "HmIP-BSM") {
            this.adapter.setState(this.baseState + ".4.STATE", false); // // hm-rpc.1.000855699C4F38.4.STATE
        }
    };
    return HomematicWandschalter;
}(AbstractHomematic));
exports.HomematicWandschalter = HomematicWandschalter;
var HomematicAccessPoint = /** @class */ (function (_super) {
    __extends(HomematicAccessPoint, _super);
    function HomematicAccessPoint(adapter, id, baseState, etage, raum, device) {
        return _super.call(this, adapter, id, baseState, etage, raum, device) || this;
    }
    HomematicAccessPoint.prototype.getCategoryAsString = function () {
        return "Access Point";
    };
    HomematicAccessPoint.prototype.isStatusBattery = function () {
        return true;
    };
    HomematicAccessPoint.prototype.getSignal = function () {
        return "";
    };
    HomematicAccessPoint.prototype.getCategory = function () {
        return deviceHomematicAccessPoint;
    };
    return HomematicAccessPoint;
}(AbstractHomematic));
exports.HomematicAccessPoint = HomematicAccessPoint;
var HomematicRollladen = /** @class */ (function (_super) {
    __extends(HomematicRollladen, _super);
    function HomematicRollladen(adapter, id, baseState, etage, raum, device) {
        return _super.call(this, adapter, id, baseState, etage, raum, device) || this;
    }
    HomematicRollladen.prototype.getCategory = function () {
        return deviceHomematicRollladen;
    };
    return HomematicRollladen;
}(AbstractHomematic));
exports.HomematicRollladen = HomematicRollladen;
var HomematicDoor = /** @class */ (function (_super) {
    __extends(HomematicDoor, _super);
    function HomematicDoor(adapter, id, baseState, etage, raum, device) {
        return _super.call(this, adapter, id, baseState, etage, raum, device) || this;
    }
    HomematicDoor.prototype.getCategory = function () {
        return deviceHomematicDoor;
    };
    HomematicDoor.prototype.isStatusBattery = function () {
        return !this.adapter.getState(this.baseState + ".0.LOW_BAT").val; // // hm-rpc.0.000A9BE993E2F7.0.LOW_BAT
    };
    HomematicDoor.prototype.isOpen = function () {
        if (this.adapter.getState(this.baseState + ".1.STATE").val == 0) {
            return false;
        }
        return true;
    };
    return HomematicDoor;
}(AbstractHomematic));
exports.HomematicDoor = HomematicDoor;
var HomematicFussbodenheizung = /** @class */ (function (_super) {
    __extends(HomematicFussbodenheizung, _super);
    function HomematicFussbodenheizung(adapter, id, baseState, etage, raum, device) {
        return _super.call(this, adapter, id, baseState, etage, raum, device) || this;
    }
    HomematicFussbodenheizung.prototype.getCategory = function () {
        return deviceHomematicFussbodenheizung;
    };
    return HomematicFussbodenheizung;
}(AbstractHomematic));
exports.HomematicFussbodenheizung = HomematicFussbodenheizung;
module.exports = {
    HomematicWindow: HomematicWindow,
    HomematicSteckdose: HomematicSteckdose,
    HomematicHeizkoerper: HomematicHeizkoerper,
    HomematicDimmer: HomematicDimmer,
    HomematicWandthermostat: HomematicWandthermostat,
    HomematicFussbodenheizung: HomematicFussbodenheizung,
    HomematicWandschalter: HomematicWandschalter,
    HomematicDoor: HomematicDoor,
    HomematicWetterstation: HomematicWetterstation,
    HomematicAccessPoint: HomematicAccessPoint,
    HomematicRollladen: HomematicRollladen,
    HomematicWandtaster: HomematicWandtaster,
    HomematicTemperatursensor: HomematicTemperatursensor,
    HomematicRauchmelder: HomematicRauchmelder,
    HomematicPraesenzmelder: HomematicPraesenzmelder,
    AbstractHomematic: AbstractHomematic,
    HomematicFunkschaltaktor: HomematicFunkschaltaktor,
    DimmerAlexaScheme: DimmerAlexaScheme,
    DimmerTasterScheme: DimmerTasterScheme,
    deviceHomematicWandthermostat: deviceHomematicWandthermostat,
    deviceHomematicPraesenzmelder: deviceHomematicPraesenzmelder,
    deviceHomematicWetterstation: deviceHomematicWetterstation,
    deviceHomematicDoor: deviceHomematicDoor,
    deviceHomematicRollladen: deviceHomematicRollladen,
    deviceHomematicWandschalter: deviceHomematicWandschalter,
    deviceHomematicFussbodenheizung: deviceHomematicFussbodenheizung,
    deviceHomematicWandtaster: deviceHomematicWandtaster,
    deviceHomematicAccessPoint: deviceHomematicAccessPoint,
    deviceHomematicTemperatursensor: deviceHomematicTemperatursensor,
    deviceHomematicRauchmelder: deviceHomematicRauchmelder,
    deviceHomematicFunkSchaltaktor: deviceHomematicFunkSchaltaktor,
    deviceHomematicWindow: deviceHomematicWindow,
    deviceHomematicSteckdose: deviceHomematicSteckdose,
    deviceHomematicHeizkoerper: deviceHomematicHeizkoerper,
    deviceHomematicDimmer: deviceHomematicDimmer
};
