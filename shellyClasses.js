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
exports.ShellyLampeRGB = exports.ShellyRGBTasterScheme = exports.ShellyRGBAlexaScheme = exports.ShellyDimmer = exports.ShellyDimmerAlexaScheme = exports.ShellyLampeWeiss = exports.AbstractShelly = void 0;
var deviceShellyLampeWeiss = "Lampe Weiss";
var deviceShellyDimmer = "Dimmer";
var deviceShellyLampeRGB = "Lampe RGB";
var deviceShellySteckdose = "Steckdose";
var deviceShellyRollladen = "Rollladen";
var deviceShellySensor = "Sensor";
var AbstractShelly = /** @class */ (function () {
    function AbstractShelly(adapter, id, etage, raum, device, baseState) {
        this.adapter = adapter;
        this.id = id;
        this.etage = etage;
        this.raum = raum;
        this.device = device;
        this.baseState = baseState;
    }
    AbstractShelly.prototype.getDeviceId = function () {
        return "S" + this.id.toString().padStart(2, '0');
    };
    AbstractShelly.prototype.getDeviceIdAsRawNumber = function () {
        return this.id;
    };
    AbstractShelly.prototype.getEtage = function () {
        return this.etage;
    };
    AbstractShelly.prototype.getRaum = function () {
        return this.raum;
    };
    AbstractShelly.prototype.getDevice = function () {
        return this.device;
    };
    AbstractShelly.prototype.getBezeichnung = function () {
        return this.etage + " " + this.raum + " " + this.device;
    };
    AbstractShelly.prototype.getIP = function () {
        return this.adapter.getState(this.baseState + ".hostname").val;
    };
    AbstractShelly.prototype.isNewFirmwareAvailable = function () {
        return this.adapter.getState(this.baseState + ".firmware").val;
    };
    AbstractShelly.prototype.getBaseState = function () {
        return this.baseState;
    };
    AbstractShelly.prototype.getReducedBaseState = function () {
        return this.baseState.replace("shelly.0.", "");
    };
    // Shelly1, Shelly2.5,...
    AbstractShelly.prototype.getType = function () {
        var typ = this.adapter.getState(this.baseState + ".id").val;
        if (typ == "shelly1") {
            return "1";
        }
        else if (typ == "shellyswitch25") {
            return "2.5";
        }
        else if (typ == "shellyswitch") {
            return "2.0";
        }
        else if (typ == "shellyplug-s") {
            return "Plug";
        }
        else if (typ == "shellyem3") {
            return "3EM";
        }
        else {
            return typ;
        }
    };
    AbstractShelly.prototype.getSignal = function () {
        return this.adapter.getState(this.baseState + ".rssi").val;
    };
    AbstractShelly.prototype.getUptime = function () {
        return this.adapter.getState(this.baseState + ".uptime").val;
    };
    AbstractShelly.prototype.getFirmware = function () {
        var versionState = this.baseState + ".version";
        var version = this.adapter.getState(versionState).val;
        version = version.substr(0, version.indexOf('-'));
        return version;
    };
    AbstractShelly.prototype.isOnline = function () {
        return this.adapter.getState(this.getBaseState() + ".online").val; // shelly.0.SHPLG-S#B4D3AE#1.online        
    };
    AbstractShelly.prototype.createIOTAdapterSmartDevices = function (smartName) {
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
    return AbstractShelly;
}());
exports.AbstractShelly = AbstractShelly;
var ShellyLampeWeiss = /** @class */ (function (_super) {
    __extends(ShellyLampeWeiss, _super);
    function ShellyLampeWeiss(adapter, id, etage, raum, device, baseState, channel, alexaSmartNamesForOn, alexaActionNamesForOn, alexaSmartNamesForOff, alexaActionNamesForOff, additionalStates4TurnOn, additionalStates4TurnOff, nachtbeleuchtung, turnOffExitHouseSummer, turnOffExitHouseWinter, turnOnEnterHouseSummer, turnOnEnterHouseWinter) {
        var _this = _super.call(this, adapter, id, etage, raum, device, baseState) || this;
        _this.turnOffExitHouseSummer = turnOffExitHouseSummer;
        _this.turnOffExitHouseWinter = turnOffExitHouseWinter;
        _this.turnOnEnterHouseSummer = turnOnEnterHouseSummer;
        _this.turnOnEnterHouseWinter = turnOnEnterHouseWinter;
        _this.nachtbeleuchtung = nachtbeleuchtung;
        _this.channel = channel;
        _this.alexaSmartNamesForOn = alexaSmartNamesForOn;
        _this.alexaSmartNamesForOff = alexaSmartNamesForOff;
        _this.alexaActionNamesForOn = alexaActionNamesForOn;
        _this.alexaActionNamesForOff = alexaActionNamesForOff;
        _this.additionalStates4TurnOn = additionalStates4TurnOn;
        _this.additionalStates4TurnOff = additionalStates4TurnOff;
        _this.additionalStates4TurnOn.forEach(function (booleanOnObj) {
            _this.createState(booleanOnObj);
        });
        _this.additionalStates4TurnOff.forEach(function (tasterBooleanOffObj) {
            _this.createState(tasterBooleanOffObj);
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
        return _this;
    }
    ShellyLampeWeiss.prototype.createState = function (key_in) {
        var jarvisDatenpunkt = key_in; //.replace(/\./g,'_'); // wegen Wohnzimmer T.V.
        //log(">>> CREATE STATE: " + jarvisDatenpunkt);
        this.adapter.createState(jarvisDatenpunkt, false, {
            name: jarvisDatenpunkt,
            desc: jarvisDatenpunkt,
            type: 'boolean',
            read: true,
            write: true
        });
    };
    ShellyLampeWeiss.prototype.isTurnOffExitHouseSummer = function () {
        return this.turnOffExitHouseSummer;
    };
    ShellyLampeWeiss.prototype.isTurnOffExitHouseWinter = function () {
        return this.turnOffExitHouseWinter;
    };
    ShellyLampeWeiss.prototype.isTurnOnEnterHouseSummer = function () {
        return this.turnOnEnterHouseSummer;
    };
    ShellyLampeWeiss.prototype.isTurnOnEnterHouseWinter = function () {
        return this.turnOnEnterHouseWinter;
    };
    ShellyLampeWeiss.prototype.isNachtbeleuchtung = function () {
        return this.nachtbeleuchtung;
    };
    ShellyLampeWeiss.prototype.getAdditionalStates4TurnOn = function () {
        return this.additionalStates4TurnOn;
    };
    ShellyLampeWeiss.prototype.getAdditionalStates4TurnOff = function () {
        return this.additionalStates4TurnOff;
    };
    ShellyLampeWeiss.prototype.getSwitchState = function () {
        return this.baseState + ".Relay" + this.channel + ".Switch";
    };
    ShellyLampeWeiss.prototype.isDeviceOn = function () {
        return this.adapter.getState(this.getSwitchState()).val;
    };
    ShellyLampeWeiss.prototype.getCategory = function () {
        return deviceShellyLampeWeiss;
    };
    ShellyLampeWeiss.prototype.getAlexaNamesForOnAsString = function () {
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
    ShellyLampeWeiss.prototype.getAlexaNamesForOffAsString = function () {
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
    ShellyLampeWeiss.prototype.getAlexaSmartNamesForOn = function () {
        return this.alexaSmartNamesForOn;
    };
    ShellyLampeWeiss.prototype.getAlexaSmartNamesForOff = function () {
        return this.alexaSmartNamesForOff;
    };
    ShellyLampeWeiss.prototype.getAlexaActionNamesForOn = function () {
        return this.alexaActionNamesForOn;
    };
    ShellyLampeWeiss.prototype.getAlexaActionNamesForOff = function () {
        return this.alexaActionNamesForOff;
    };
    return ShellyLampeWeiss;
}(AbstractShelly));
exports.ShellyLampeWeiss = ShellyLampeWeiss;
var ShellyDimmerAlexaScheme = /** @class */ (function () {
    function ShellyDimmerAlexaScheme(alexaName, level) {
        this.alexaName = alexaName;
        this.level = level;
    }
    ShellyDimmerAlexaScheme.prototype.getAlexaName = function () {
        return this.alexaName;
    };
    ShellyDimmerAlexaScheme.prototype.getLevel = function () {
        return this.level;
    };
    ShellyDimmerAlexaScheme.prototype.setDevice = function (device) {
        this.device = device;
    };
    ShellyDimmerAlexaScheme.prototype.getDevice = function () {
        return this.device;
    };
    return ShellyDimmerAlexaScheme;
}());
exports.ShellyDimmerAlexaScheme = ShellyDimmerAlexaScheme;
var ShellyDimmerTasterScheme = /** @class */ (function () {
    function ShellyDimmerTasterScheme(tasterBooleanOn, level) {
        this.tasterBooleanOn = tasterBooleanOn;
        this.level = level;
    }
    ShellyDimmerTasterScheme.prototype.getTasterBooleanOnName = function () {
        return this.tasterBooleanOn;
    };
    ShellyDimmerTasterScheme.prototype.getLevel = function () {
        return this.level;
    };
    return ShellyDimmerTasterScheme;
}());
var ShellyDimmer = /** @class */ (function (_super) {
    __extends(ShellyDimmer, _super);
    function ShellyDimmer(adapter, id, etage, raum, device, baseState, alexaSmartNamesForOn, alexaActionNamesForOn, alexaLevelSchemeForOn, alexaSmartNamesForOff, alexaActionNamesForOff, levelSchemes, tasterBooleanOn, tasterBooleanOff, nachtbeleuchtung, turnOffExitHouseSummer, turnOffExitHouseWinter, turnOnEnterHouseSummer, turnOnEnterHouseWinter) {
        var _this = _super.call(this, adapter, id, etage, raum, device, baseState) || this;
        _this.alexaSmartNamesForOn = alexaSmartNamesForOn;
        _this.alexaSmartNamesForOff = alexaSmartNamesForOff;
        _this.alexaActionNamesForOn = alexaActionNamesForOn;
        _this.alexaActionNamesForOff = alexaActionNamesForOff;
        _this.nachtbeleuchtung = nachtbeleuchtung;
        _this.turnOffExitHouseSummer = turnOffExitHouseSummer;
        _this.turnOffExitHouseWinter = turnOffExitHouseWinter;
        _this.turnOnEnterHouseSummer = turnOnEnterHouseSummer;
        _this.turnOnEnterHouseWinter = turnOnEnterHouseWinter;
        _this.alexaLevelSchemeForOn = alexaLevelSchemeForOn;
        _this.tasterBooleanOn = tasterBooleanOn;
        _this.levelSchemes = levelSchemes;
        _this.tasterBooleanOff = tasterBooleanOff;
        if (_this.alexaLevelSchemeForOn != null) {
            if (_this.alexaLevelSchemeForOn.getAlexaName() != null) {
                _this.createState(_this.alexaLevelSchemeForOn.getAlexaName());
            }
            _this.alexaLevelSchemeForOn.setDevice(_this);
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
        return _this;
    }
    ShellyDimmer.prototype.isNachtbeleuchtung = function () {
        return this.nachtbeleuchtung;
    };
    ShellyDimmer.prototype.isTurnOffExitHouseSummer = function () {
        return this.turnOffExitHouseSummer;
    };
    ShellyDimmer.prototype.isTurnOffExitHouseWinter = function () {
        return this.turnOffExitHouseWinter;
    };
    ShellyDimmer.prototype.isTurnOnEnterHouseSummer = function () {
        return this.turnOnEnterHouseSummer;
    };
    ShellyDimmer.prototype.isTurnOnEnterHouseWinter = function () {
        return this.turnOnEnterHouseWinter;
    };
    ShellyDimmer.prototype.createState = function (key_in) {
        var jarvisDatenpunkt = key_in; //.replace(/\./g,'_'); // wegen Wohnzimmer T.V.
        //log(">>> CREATE STATE: " + jarvisDatenpunkt);
        this.adapter.createState(jarvisDatenpunkt, false, {
            name: jarvisDatenpunkt,
            desc: jarvisDatenpunkt,
            type: 'boolean',
            read: true,
            write: true
        });
    };
    ShellyDimmer.prototype.getAlexaLevelSchemeForOn = function () {
        return this.alexaLevelSchemeForOn;
    };
    ShellyDimmer.prototype.getAlexaSchemes = function () {
        return this.levelSchemes;
    };
    ShellyDimmer.prototype.getTasterBooleanOn = function () {
        return this.tasterBooleanOn;
    };
    ShellyDimmer.prototype.getTasterBooleanOff = function () {
        return this.tasterBooleanOff;
    };
    ShellyDimmer.prototype.getSwitchState = function () {
        return this.baseState + ".lights.Switch"; // shelly.0.SHDM-2#98CDAC0BE168#1.lights.Switch
    };
    ShellyDimmer.prototype.isDeviceOn = function () {
        return this.adapter.getState(this.getSwitchState()).val;
    };
    ShellyDimmer.prototype.getCategory = function () {
        return deviceShellyDimmer;
    };
    ShellyDimmer.prototype.getAlexaNamesForOnAsString = function () {
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
    ShellyDimmer.prototype.getAlexaNamesForOffAsString = function () {
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
    ShellyDimmer.prototype.getAlexaSmartNamesForOn = function () {
        return this.alexaSmartNamesForOn;
    };
    ShellyDimmer.prototype.getAlexaSmartNamesForOff = function () {
        return this.alexaSmartNamesForOff;
    };
    ShellyDimmer.prototype.getAlexaActionNamesForOn = function () {
        return this.alexaActionNamesForOn;
    };
    ShellyDimmer.prototype.getAlexaActionNamesForOff = function () {
        return this.alexaActionNamesForOff;
    };
    return ShellyDimmer;
}(AbstractShelly));
exports.ShellyDimmer = ShellyDimmer;
var ShellyRGBAlexaScheme = /** @class */ (function () {
    function ShellyRGBAlexaScheme(alexaName, level) {
        this.alexaName = alexaName;
        this.level = level;
    }
    ShellyRGBAlexaScheme.prototype.getAlexaName = function () {
        return this.alexaName;
    };
    ShellyRGBAlexaScheme.prototype.getLevel = function () {
        return this.level;
    };
    ShellyRGBAlexaScheme.prototype.setDevice = function (device) {
        this.device = device;
    };
    ShellyRGBAlexaScheme.prototype.getDevice = function () {
        return this.device;
    };
    return ShellyRGBAlexaScheme;
}());
exports.ShellyRGBAlexaScheme = ShellyRGBAlexaScheme;
var ShellyRGBTasterScheme = /** @class */ (function () {
    function ShellyRGBTasterScheme(tasterBooleanOn, level) {
        this.tasterBooleanOn = tasterBooleanOn;
        this.level = level;
    }
    ShellyRGBTasterScheme.prototype.getTasterBooleanOnName = function () {
        return this.tasterBooleanOn;
    };
    ShellyRGBTasterScheme.prototype.getLevel = function () {
        return this.level;
    };
    return ShellyRGBTasterScheme;
}());
exports.ShellyRGBTasterScheme = ShellyRGBTasterScheme;
var ShellyLampeRGB = /** @class */ (function (_super) {
    __extends(ShellyLampeRGB, _super);
    function ShellyLampeRGB(adapter, id, etage, raum, device, baseState, channel, alexaSmartNamesForOn, alexaActionNamesForOn, alexaLevelSchemeForOn, alexaSmartNamesForOff, alexaActionNamesForOff, levelSchemes, tasterBooleanOn, tasterBooleanOff) {
        var _this = _super.call(this, adapter, id, etage, raum, device, baseState) || this;
        _this.channel = channel;
        _this.alexaSmartNamesForOn = alexaSmartNamesForOn;
        _this.alexaSmartNamesForOff = alexaSmartNamesForOff;
        _this.alexaActionNamesForOn = alexaActionNamesForOn;
        _this.alexaActionNamesForOff = alexaActionNamesForOff;
        _this.alexaLevelSchemeForOn = alexaLevelSchemeForOn;
        _this.tasterBooleanOn = tasterBooleanOn;
        _this.levelSchemes = levelSchemes;
        _this.tasterBooleanOff = tasterBooleanOff;
        if (_this.alexaLevelSchemeForOn != null) {
            _this.alexaLevelSchemeForOn.setDevice(adapter);
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
        return _this;
    }
    ShellyLampeRGB.prototype.createState = function (key_in) {
        var jarvisDatenpunkt = key_in; //.replace(/\./g,'_'); // wegen Wohnzimmer T.V.
        //log(">>> CREATE STATE: " + jarvisDatenpunkt);
        this.adapter.createState(jarvisDatenpunkt, false, {
            name: jarvisDatenpunkt,
            desc: jarvisDatenpunkt,
            type: 'boolean',
            read: true,
            write: true
        });
    };
    ShellyLampeRGB.prototype.getAlexaLevelSchemeForOn = function () {
        return this.alexaLevelSchemeForOn;
    };
    ShellyLampeRGB.prototype.getAlexaSchemes = function () {
        return this.levelSchemes;
    };
    ShellyLampeRGB.prototype.getTasterBooleanOn = function () {
        return this.tasterBooleanOn;
    };
    ShellyLampeRGB.prototype.getTasterBooleanOff = function () {
        return this.tasterBooleanOff;
    };
    ShellyLampeRGB.prototype.getSwitchState = function () {
        return this.baseState + ".lights.Switch"; // shelly.0.SHRGBW2#D962D3#1.lights.Switch
    };
    ShellyLampeRGB.prototype.isDeviceOn = function () {
        return this.adapter.getState(this.getSwitchState()).val;
    };
    ShellyLampeRGB.prototype.getCategory = function () {
        return deviceShellyLampeRGB;
    };
    ShellyLampeRGB.prototype.getAlexaNamesForOnAsString = function () {
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
    ShellyLampeRGB.prototype.getAlexaNamesForOffAsString = function () {
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
    ShellyLampeRGB.prototype.getAlexaSmartNamesForOn = function () {
        return this.alexaSmartNamesForOn;
    };
    ShellyLampeRGB.prototype.getAlexaSmartNamesForOff = function () {
        return this.alexaSmartNamesForOff;
    };
    ShellyLampeRGB.prototype.getAlexaActionNamesForOn = function () {
        return this.alexaActionNamesForOn;
    };
    ShellyLampeRGB.prototype.getAlexaActionNamesForOff = function () {
        return this.alexaActionNamesForOff;
    };
    return ShellyLampeRGB;
}(AbstractShelly));
exports.ShellyLampeRGB = ShellyLampeRGB;
var ShellySteckdose = /** @class */ (function (_super) {
    __extends(ShellySteckdose, _super);
    function ShellySteckdose(adapter, id, etage, raum, device, baseState, channel, alexaNamesForOn, alexaActionNamesForOn, alexaNamesForOff, alexaActionNamesForOff, additionalStates4TurnOn, additionalStates4TurnOff, nachtbeleuchtung, turnOffExitHouseSummer, turnOffExitHouseWinter, turnOnEnterHouseSummer, turnOnEnterHouseWinter) {
        return _super.call(this, adapter, id, etage, raum, device, baseState, channel, alexaNamesForOn, alexaActionNamesForOn, alexaNamesForOff, alexaActionNamesForOff, additionalStates4TurnOn, additionalStates4TurnOff, nachtbeleuchtung, turnOffExitHouseSummer, turnOffExitHouseWinter, turnOnEnterHouseSummer, turnOnEnterHouseWinter) || this;
    }
    ShellySteckdose.prototype.getCategory = function () {
        return deviceShellySteckdose;
    };
    return ShellySteckdose;
}(ShellyLampeWeiss));
var ShellyRollladen = /** @class */ (function (_super) {
    __extends(ShellyRollladen, _super);
    function ShellyRollladen(adapter, id, etage, raum, device, baseState) {
        return _super.call(this, adapter, id, etage, raum, device, baseState) || this;
    }
    ShellyRollladen.prototype.getShutterPositionState = function () {
        if (this.baseState.includes('shellyplus2')) {
            return this.baseState + ".Cover0.Position"; // new: shelly.1.shellyplus2pm#4855199b3e38#1.Cover0.Position
        }
        else {
            return this.baseState + ".Shutter.Position"; // new: shelly.1.shellyplus2pm#4855199b3e38#1.Cover0.Position
        }
    };
    ShellyRollladen.prototype.getShutterOpenState = function () {
        if (this.baseState.includes('shellyplus2')) {
            return this.baseState + ".Cover0.Open"; // new: shelly.1.shellyplus2pm#4855199b3e38#1.Cover0.Position
        }
        else {
            return this.baseState + ".Shutter.Open"; // new: shelly.1.shellyplus2pm#4855199b3e38#1.Cover0.Position
        }
    };
    ShellyRollladen.prototype.getShutterCloseState = function () {
        if (this.baseState.includes('shellyplus2')) {
            return this.baseState + ".Cover0.Close"; // new: shelly.1.shellyplus2pm#4855199b3e38#1.Cover0.Position
        }
        else {
            return this.baseState + ".Shutter.Close"; // new: shelly.1.shellyplus2pm#4855199b3e38#1.Cover0.Position
        }
    };
    // Steckdose, Rollladen, Lampe
    ShellyRollladen.prototype.getCategory = function () {
        return deviceShellyRollladen;
    };
    return ShellyRollladen;
}(AbstractShelly));
var ShellySensor = /** @class */ (function (_super) {
    __extends(ShellySensor, _super);
    function ShellySensor(adapter, id, etage, raum, device, baseState) {
        return _super.call(this, adapter, id, etage, raum, device, baseState) || this;
    }
    ShellySensor.prototype.getTemperature = function () {
        return this.adapter.getState(this.baseState + ".Temperature0.Celsius").val; // shelly.1.shellyhtg3#34b7da8d0234#1.Temperature0.Celsius        
    };
    ShellySensor.prototype.getHumidity = function () {
        return this.adapter.getState(this.baseState + ".Humidity0.Relative").val; // shelly.1.shellyhtg3#34b7da8d0234#1.Humidity0.Relative
    };
    ShellySensor.prototype.isOnline = function () {
        return true;
    };
    ShellySensor.prototype.getCategory = function () {
        return deviceShellySensor;
    };
    return ShellySensor;
}(AbstractShelly));
module.exports = {
    AbstractShelly: AbstractShelly,
    ShellyLampeWeiss: ShellyLampeWeiss,
    ShellyDimmerAlexaScheme: ShellyDimmerAlexaScheme,
    ShellyDimmerTasterScheme: ShellyDimmerTasterScheme,
    ShellyDimmer: ShellyDimmer,
    ShellyRGBAlexaScheme: ShellyRGBAlexaScheme,
    ShellyRGBTasterScheme: ShellyRGBTasterScheme,
    ShellyLampeRGB: ShellyLampeRGB,
    ShellySteckdose: ShellySteckdose,
    ShellyRollladen: ShellyRollladen,
    ShellySensor: ShellySensor,
    deviceShellyLampeWeiss: deviceShellyLampeWeiss,
    deviceShellyDimmer: deviceShellyDimmer,
    deviceShellyLampeRGB: deviceShellyLampeRGB,
    deviceShellySteckdose: deviceShellySteckdose,
    deviceShellyRollladen: deviceShellyRollladen,
    deviceShellySensor: deviceShellySensor
};
