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
exports.AlexaInputConverter = exports.ZigbeeDosenrelais = exports.ZigbeeWandtaster = exports.ZigbeeBewegungsmelder = exports.ZigbeeRauchmelder = exports.ZigbeeFenstersensor = exports.ZigbeeRepeater = exports.ZigbeeSchalter = exports.ZigbeeSteckdose = exports.ZigbeeLampeWeiss = exports.LampeWeissAlexaScheme = exports.LampeWeissTasterScheme = exports.ZigbeeLampeRGB = exports.WhiteColorScheme = exports.RGBColorScheme = exports.ColorScheme = exports.AbstractZigbee = void 0;
// https://stackoverflow.com/questions/8595509/how-do-you-share-constants-in-nodejs-modules
var deviceZigbeeSteckdose = "Steckdose";
var deviceZigbeeBewegungsmelder = "Bewegungsmelder";
var deviceZigbeeLampeRGB = "LampeRGB";
var deviceZigbeeLampeWeiss = "LampeWeiss";
var deviceZigbeeRauchmelder = "Rauchmelder";
var deviceZigbeeWandtaster = "Wandtaster";
var deviceZigbeeDosenrelais = "Dosenrelais";
var deviceZigbeeSchalter = "Schalter";
var deviceZigbeeRepeater = "Repeater";
var deviceZigbeeFenstersensor = "Fenstersensor";
var AbstractZigbee = /** @class */ (function () {
    function AbstractZigbee(adapter, id, baseState, etage, raum, device) {
        this.adapter = adapter;
        this.id = id;
        this.baseState = baseState;
        this.etage = etage;
        this.raum = raum;
        this.device = device;
    }
    AbstractZigbee.prototype.getDeviceId = function () {
        return "Z" + this.id.toString().padStart(3, '0');
    };
    AbstractZigbee.prototype.getOriginalDeviceName = function () {
        return this.adapter.getObject(this.baseState).common.name;
    };
    AbstractZigbee.prototype.getDeviceIdAsRawNumber = function () {
        return this.id;
    };
    AbstractZigbee.prototype.getEtage = function () {
        return this.etage;
    };
    AbstractZigbee.prototype.getRaum = function () {
        return this.raum;
    };
    AbstractZigbee.prototype.getDevice = function () {
        return this.device;
    };
    AbstractZigbee.prototype.getBaseState = function () {
        return this.baseState;
    };
    AbstractZigbee.prototype.getType = function () {
        var result = "";
        var m1 = this.adapter.getObject(this.baseState).native.manufacturername;
        var m2 = this.adapter.getObject(this.baseState).native.modelid;
        if (m1 != undefined && m2 != undefined) {
            result += m1;
        }
        if (m2 != null) {
            if (result != "") {
                result += " (" + m2 + ")";
            }
            else {
                result += m2;
            }
        }
        return result;
    };
    AbstractZigbee.prototype.isStatusTotal = function () {
        return this.isStatusReachable();
    };
    AbstractZigbee.prototype.isStatusReachable = function () {
        return this.adapter.getState(this.baseState + ".reachable").val; // hue.0.Steckdose_Backstube.reachable 
    };
    AbstractZigbee.prototype.createIOTAdapterSmartDevices = function (smartName) {
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
            "role": "level.color.hue",
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
            "role": "level.color.saturation",
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
    return AbstractZigbee;
}());
exports.AbstractZigbee = AbstractZigbee;
var ColorScheme = /** @class */ (function () {
    function ColorScheme(alexaName, level) {
        this.alexaName = alexaName;
        this.level = level;
    }
    ColorScheme.prototype.getAlexaName = function () {
        return this.alexaName;
    };
    ColorScheme.prototype.getLevel = function () {
        return this.level;
    };
    ColorScheme.prototype.setDevice = function (device) {
        this.device = device;
    };
    ColorScheme.prototype.getDevice = function () {
        return this.device;
    };
    return ColorScheme;
}());
exports.ColorScheme = ColorScheme;
var RGBColorScheme = /** @class */ (function (_super) {
    __extends(RGBColorScheme, _super);
    function RGBColorScheme(alexaName, level, hue, sat) {
        var _this = _super.call(this, alexaName, level) || this;
        _this.hue = hue;
        _this.sat = sat;
        return _this;
    }
    RGBColorScheme.prototype.getHue = function () {
        return this.hue;
    };
    RGBColorScheme.prototype.getSat = function () {
        return this.sat;
    };
    return RGBColorScheme;
}(ColorScheme));
exports.RGBColorScheme = RGBColorScheme;
var WhiteColorScheme = /** @class */ (function (_super) {
    __extends(WhiteColorScheme, _super);
    function WhiteColorScheme(alexaName, level, ct) {
        var _this = _super.call(this, alexaName, level) || this;
        _this.ct = ct;
        return _this;
    }
    WhiteColorScheme.prototype.getCt = function () {
        return this.ct;
    };
    return WhiteColorScheme;
}(ColorScheme));
exports.WhiteColorScheme = WhiteColorScheme;
var ZigbeeLampeRGB = /** @class */ (function (_super) {
    __extends(ZigbeeLampeRGB, _super);
    function ZigbeeLampeRGB(adapter, id, baseState, etage, raum, device, isGroup, groupMembers, alexaSmartNamesForOn, alexaActionNamesForOn, alexaColorSchemeForOn, alexaSmartNamesForOff, alexaActionNamesForOff, colorSchemes, tasterBooleanOn, tasterBooleanOff, nachtbeleuchtung, turnOffExitHouseSummer, turnOffExitHouseWinter, turnOnEnterHouseSummer, turnOnEnterHouseWinter) {
        var _this = _super.call(this, adapter, id, baseState, etage, raum, device) || this;
        _this.adapter = adapter;
        _this.isGroup_ = isGroup;
        _this.groupMembers = groupMembers;
        _this.alexaSmartNamesForOn = alexaSmartNamesForOn;
        _this.alexaSmartNamesForOff = alexaSmartNamesForOff;
        _this.alexaActionNamesForOn = alexaActionNamesForOn;
        _this.alexaActionNamesForOff = alexaActionNamesForOff;
        _this.nachtbeleuchtung = nachtbeleuchtung;
        _this.turnOffExitHouseSummer = turnOffExitHouseSummer;
        _this.turnOffExitHouseWinter = turnOffExitHouseWinter;
        _this.turnOnEnterHouseSummer = turnOnEnterHouseSummer;
        _this.turnOnEnterHouseWinter = turnOnEnterHouseWinter;
        _this.alexaColorSchemeForOn = alexaColorSchemeForOn;
        _this.colorSchemes = colorSchemes;
        _this.colorConverter = new ColorConverter();
        _this.tasterBooleanOn = tasterBooleanOn;
        _this.tasterBooleanOff = tasterBooleanOff;
        _this.tasterBooleanOn.forEach(function (booleanOnObj) {
            _this.createState(booleanOnObj);
        });
        _this.tasterBooleanOff.forEach(function (tasterBooleanOffObj) {
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
        _this.colorSchemes.forEach(function (scheme) {
            if (scheme.getAlexaName() != null) {
                _this.createIOTAdapterSmartDevices(scheme.getAlexaName());
            }
        });
        _this.initRGB();
        return _this;
    }
    ZigbeeLampeRGB.prototype.isNachtbeleuchtung = function () {
        return this.nachtbeleuchtung;
    };
    ZigbeeLampeRGB.prototype.isTurnOffExitHouseSummer = function () {
        return this.turnOffExitHouseSummer;
    };
    ZigbeeLampeRGB.prototype.isTurnOffExitHouseWinter = function () {
        return this.turnOffExitHouseWinter;
    };
    ZigbeeLampeRGB.prototype.isTurnOnEnterHouseSummer = function () {
        return this.turnOnEnterHouseSummer;
    };
    ZigbeeLampeRGB.prototype.isTurnOnEnterHouseWinter = function () {
        return this.turnOnEnterHouseWinter;
    };
    ZigbeeLampeRGB.prototype.initRGB = function () {
        var _this = this;
        this.colorSchemes.forEach(function (colorscheme) {
            colorscheme.setDevice(_this);
        });
        if (this.alexaColorSchemeForOn != null) {
            this.alexaColorSchemeForOn.setDevice(this);
        }
        this.createAlias(this.getBaseState() + ".on", "alias.0.rgb." + this.getDeviceId() + ".on");
        this.createAlias(this.getBaseState() + ".ct", "alias.0.rgb." + this.getDeviceId() + ".ct");
        this.createAlias(this.getBaseState() + ".level", "alias.0.rgb." + this.getDeviceId() + ".level");
        if (this.isGroup_ == false) {
            this.createAlias(this.getBaseState() + ".reachable", "alias.0.rgb." + this.getDeviceId() + ".reachable");
        }
        else {
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
    };
    ZigbeeLampeRGB.prototype.createAlias = function (originalDatenpunkt, aliasDatenpunkt) {
        this.adapter.setObject(aliasDatenpunkt, {
            type: 'state',
            common: {
                name: this.adapter.getObject(originalDatenpunkt).common.name,
                type: this.adapter.getObject(originalDatenpunkt).common.type,
                unit: this.adapter.getObject(originalDatenpunkt).common.unit,
                read: true,
                write: true,
                role: this.adapter.getObject(originalDatenpunkt).common.role,
                alias: {
                    id: originalDatenpunkt
                }
            },
            native: {}
        });
    };
    ZigbeeLampeRGB.prototype.getColorSchemes = function () {
        return this.colorSchemes;
    };
    ZigbeeLampeRGB.prototype.getColorSchemeForOn = function () {
        return this.alexaColorSchemeForOn;
    };
    ZigbeeLampeRGB.prototype.getTasterBooleanOn = function () {
        return this.tasterBooleanOn;
    };
    ZigbeeLampeRGB.prototype.getTasterBooleanOff = function () {
        return this.tasterBooleanOff;
    };
    ZigbeeLampeRGB.prototype.createState = function (key_in) {
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
    ZigbeeLampeRGB.prototype.changeColor = function (colorscheme) {
        var _this = this;
        if (colorscheme.getDevice().getBaseState().includes("deconz")) {
            this.adapter.setState(this.getBaseState() + ".level", colorscheme.getLevel());
            if (colorscheme instanceof RGBColorScheme) {
                var rgbColorscheme = colorscheme;
                this.adapter.setState(this.getBaseState() + ".xy", this.colorConverter.convertHSL2XY(rgbColorscheme.getHue(), rgbColorscheme.getSat()));
            }
            else {
                var whiteColorscheme = colorscheme;
                this.adapter.setState(this.getBaseState() + ".ct", whiteColorscheme.getCt());
            }
        }
        else {
            this.adapter.log(">>> hue changeColor: Set Level to: " + colorscheme.getLevel());
            setTimeout(function (obj) {
                _this.adapter.setState(_this.getBaseState() + ".level", colorscheme.getLevel());
                setTimeout(function (obj2) {
                    if (colorscheme instanceof RGBColorScheme) {
                        _this.adapter.log(">>> hue changeColor: Set Hue to: " + colorscheme.getHue());
                        _this.adapter.log(">>> hue changeColor: Set Sat to: " + colorscheme.getSat());
                        var rgbColorscheme = colorscheme;
                        //setState(this.getBaseState() + ".xy", this.colorConverter.convertHSL2XY(rgbColorscheme.getHue(), rgbColorscheme.getSat()));
                        _this.adapter.setState(_this.getBaseState() + ".hue", rgbColorscheme.getHue()); //, rgbColorscheme.getSat()));
                        _this.adapter.setState(_this.getBaseState() + ".sat", rgbColorscheme.getSat());
                    }
                    else {
                        var whiteColorscheme = colorscheme;
                        _this.adapter.setState(_this.getBaseState() + ".ct", whiteColorscheme.getCt());
                        //log(">>> deconz changeColor: Set ct to: " + whiteColorscheme.getCt());
                    }
                }, 300);
            }, 600);
        }
    };
    ZigbeeLampeRGB.prototype.turnOn = function () {
        if (this.alexaColorSchemeForOn == null) { // Schalte Licht nur ein, d.h. lass die Farbwerte so wie sie sind
            this.adapter.setState(this.getBaseState() + ".on", true);
        }
        else {
            this.changeColor(this.alexaColorSchemeForOn);
        }
    };
    ZigbeeLampeRGB.prototype.turnOff = function () {
        this.adapter.setState(this.getBaseState() + ".on", false);
    };
    ZigbeeLampeRGB.prototype.getAlexaNamesForOnAsString = function () {
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
    ZigbeeLampeRGB.prototype.getAlexaNamesForOffAsString = function () {
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
    ZigbeeLampeRGB.prototype.isSwitchedOn = function () {
        if (this.adapter.getState(this.baseState + ".on").val == false) { // hue.0.Steckdose_Backstube.on
            return false;
        }
        return true;
    };
    ZigbeeLampeRGB.prototype.getGroupMembers = function () {
        return this.groupMembers;
    };
    ZigbeeLampeRGB.prototype.getAlexaSmartNamesForOn = function () {
        return this.alexaSmartNamesForOn;
    };
    ZigbeeLampeRGB.prototype.getAlexaSmartNamesForOff = function () {
        return this.alexaSmartNamesForOff;
    };
    ZigbeeLampeRGB.prototype.getAlexaActionNamesForOn = function () {
        return this.alexaActionNamesForOn;
    };
    ZigbeeLampeRGB.prototype.getAlexaActionNamesForOff = function () {
        return this.alexaActionNamesForOff;
    };
    ZigbeeLampeRGB.prototype.isGroup = function () {
        return this.isGroup_;
    };
    ZigbeeLampeRGB.prototype.getDeviceId = function () {
        if (this.isGroup_) {
            return "ZG" + this.id.toString().padStart(3, '0');
        }
        else {
            return "Z" + this.id.toString().padStart(3, '0');
        }
    };
    ZigbeeLampeRGB.prototype.isStatusReachable = function () {
        if (this.isGroup_) {
            return true;
        }
        else {
            return this.adapter.getState(this.baseState + ".reachable").val; // hue.0.Steckdose_Backstube.reachable 
        }
    };
    ZigbeeLampeRGB.prototype.getLevel = function () {
        return this.adapter.getState(this.baseState + ".level").val;
    };
    ZigbeeLampeRGB.prototype.getCategory = function () {
        return deviceZigbeeLampeRGB;
    };
    return ZigbeeLampeRGB;
}(AbstractZigbee));
exports.ZigbeeLampeRGB = ZigbeeLampeRGB;
var LampeWeissTasterScheme = /** @class */ (function () {
    function LampeWeissTasterScheme(tasterBooleanOn, level, ct) {
        this.tasterBooleanOn = tasterBooleanOn;
        this.level = level;
        this.ct = ct;
    }
    LampeWeissTasterScheme.prototype.getTasterBooleanOnName = function () {
        return this.tasterBooleanOn;
    };
    LampeWeissTasterScheme.prototype.getLevel = function () {
        return this.level;
    };
    LampeWeissTasterScheme.prototype.getCt = function () {
        return this.ct;
    };
    return LampeWeissTasterScheme;
}());
exports.LampeWeissTasterScheme = LampeWeissTasterScheme;
var LampeWeissAlexaScheme = /** @class */ (function () {
    function LampeWeissAlexaScheme(alexaName, level, ct) {
        this.alexaName = alexaName;
        this.level = level;
        this.ct = ct;
    }
    LampeWeissAlexaScheme.prototype.getAlexaName = function () {
        return this.alexaName;
    };
    LampeWeissAlexaScheme.prototype.getLevel = function () {
        return this.level;
    };
    LampeWeissAlexaScheme.prototype.setDevice = function (device) {
        this.device = device;
    };
    LampeWeissAlexaScheme.prototype.getDevice = function () {
        return this.device;
    };
    LampeWeissAlexaScheme.prototype.getCt = function () {
        return this.ct;
    };
    return LampeWeissAlexaScheme;
}());
exports.LampeWeissAlexaScheme = LampeWeissAlexaScheme;
var ZigbeeLampeWeiss = /** @class */ (function (_super) {
    __extends(ZigbeeLampeWeiss, _super);
    function ZigbeeLampeWeiss(adapter, id, baseState, etage, raum, device, alexaSmartNamesForOn, alexaActionNamesForOn, alexaLevelSchemeForOn, alexaSmartNamesForOff, alexaActionNamesForOff, levelSchemes, isGroup_, tasterBooleanOn, tasterBooleanOff, nachtbeleuchtung, turnOffExitHouseSummer, turnOffExitHouseWinter, turnOnEnterHouseSummer, turnOnEnterHouseWinter) {
        var _this = _super.call(this, adapter, id, baseState, etage, raum, device) || this;
        _this.adapter = adapter;
        _this.alexaLevelSchemeForOn = alexaLevelSchemeForOn;
        _this.alexaSmartNamesForOn = alexaSmartNamesForOn;
        _this.alexaSmartNamesForOff = alexaSmartNamesForOff;
        _this.alexaActionNamesForOn = alexaActionNamesForOn;
        _this.alexaActionNamesForOff = alexaActionNamesForOff;
        _this.nachtbeleuchtung = nachtbeleuchtung;
        _this.turnOffExitHouseSummer = turnOffExitHouseSummer;
        _this.turnOffExitHouseWinter = turnOffExitHouseWinter;
        _this.turnOnEnterHouseSummer = turnOnEnterHouseSummer;
        _this.turnOnEnterHouseWinter = turnOnEnterHouseWinter;
        _this.isGroup_ = isGroup_;
        _this.tasterBooleanOn = tasterBooleanOn;
        _this.tasterBooleanOff = tasterBooleanOff;
        _this.levelSchemes = levelSchemes;
        // States anlegen:
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
    ZigbeeLampeWeiss.prototype.isNachtbeleuchtung = function () {
        return this.nachtbeleuchtung;
    };
    ZigbeeLampeWeiss.prototype.isTurnOffExitHouseSummer = function () {
        return this.turnOffExitHouseSummer;
    };
    ZigbeeLampeWeiss.prototype.isTurnOffExitHouseWinter = function () {
        return this.turnOffExitHouseWinter;
    };
    ZigbeeLampeWeiss.prototype.isTurnOnEnterHouseSummer = function () {
        return this.turnOnEnterHouseSummer;
    };
    ZigbeeLampeWeiss.prototype.isTurnOnEnterHouseWinter = function () {
        return this.turnOnEnterHouseWinter;
    };
    ZigbeeLampeWeiss.prototype.getAlexaSmartNamesForOn = function () {
        return this.alexaSmartNamesForOn;
    };
    ZigbeeLampeWeiss.prototype.getAlexaSmartNamesForOff = function () {
        return this.alexaSmartNamesForOff;
    };
    ZigbeeLampeWeiss.prototype.getAlexaActionNamesForOn = function () {
        return this.alexaActionNamesForOn;
    };
    ZigbeeLampeWeiss.prototype.getAlexaActionNamesForOff = function () {
        return this.alexaActionNamesForOff;
    };
    ZigbeeLampeWeiss.prototype.getAlexaSchemes = function () {
        return this.levelSchemes;
    };
    ZigbeeLampeWeiss.prototype.getAlexaSchemeForOn = function () {
        return this.alexaLevelSchemeForOn;
    };
    ZigbeeLampeWeiss.prototype.getAlexaNamesForOnAsString = function () {
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
    ZigbeeLampeWeiss.prototype.getAlexaNamesForOffAsString = function () {
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
    ZigbeeLampeWeiss.prototype.getTasterBooleanOn = function () {
        return this.tasterBooleanOn;
    };
    ZigbeeLampeWeiss.prototype.getTasterBooleanOff = function () {
        return this.tasterBooleanOff;
    };
    ZigbeeLampeWeiss.prototype.createState = function (key_in) {
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
    ZigbeeLampeWeiss.prototype.isSwitchedOn = function () {
        if (this.adapter.getState(this.baseState + ".on").val == false) { // hue.0.Steckdose_Backstube.on
            return false;
        }
        return true;
    };
    ZigbeeLampeWeiss.prototype.turnOn = function () {
        if (this.alexaLevelSchemeForOn == null) { // Schalte Licht nur ein
            if (this.adapter.getState(this.baseState + ".on").val != true) {
                this.adapter.setState(this.baseState + ".on", true);
            }
        }
        else {
            this.changeLevel(this.alexaLevelSchemeForOn);
        }
    };
    ZigbeeLampeWeiss.prototype.turnOff = function () {
        if (this.adapter.getState(this.baseState + ".on").val != false) {
            this.adapter.setState(this.baseState + ".on", false);
        }
    };
    ZigbeeLampeWeiss.prototype.changeLevel = function (levelScheme) {
        this.adapter.log("LampeWeiß --> ChangeLevel: Level:" + levelScheme.getLevel() + ", ct: " + levelScheme.getCt());
        this.adapter.setState(this.baseState + ".on", true);
        this.adapter.setState(this.baseState + ".level", levelScheme.getLevel());
        if (levelScheme.getCt() != -1) {
            this.adapter.setState(this.baseState + ".ct", levelScheme.getCt());
        }
    };
    ZigbeeLampeWeiss.prototype.isStatusReachable = function () {
        if (this.isGroup_) {
            return true;
        }
        else {
            return this.adapter.getState(this.baseState + ".reachable").val; // hue.0.Steckdose_Backstube.reachable 
        }
    };
    ZigbeeLampeWeiss.prototype.isGroup = function () {
        return this.isGroup_;
    };
    ZigbeeLampeWeiss.prototype.getDeviceId = function () {
        if (this.isGroup_) {
            return "ZG" + this.id.toString().padStart(3, '0');
        }
        else {
            return "Z" + this.id.toString().padStart(3, '0');
        }
    };
    ZigbeeLampeWeiss.prototype.getLevel = function () {
        return this.adapter.getState(this.baseState + ".level").val;
    };
    ZigbeeLampeWeiss.prototype.getCategory = function () {
        return deviceZigbeeLampeWeiss;
    };
    return ZigbeeLampeWeiss;
}(AbstractZigbee));
exports.ZigbeeLampeWeiss = ZigbeeLampeWeiss;
var ColorConverter = /** @class */ (function () {
    function ColorConverter() {
    }
    ColorConverter.prototype.convertXY2HSL = function (x, y) {
        var bri = 254;
        var xy = {
            x: x,
            y: y
        };
        var z = 1.0 - xy.x - xy.y;
        var Y = bri / 255;
        var X = (Y / xy.y) * xy.x;
        var Z = (Y / xy.y) * z;
        var r = X * 1.656492 - Y * 0.354851 - Z * 0.255038;
        var g = -X * 0.707196 + Y * 1.655397 + Z * 0.036152;
        var b = X * 0.051713 - Y * 0.121364 + Z * 1.011530;
        r = r <= 0.0031308 ? 12.92 * r : (1.0 + 0.055) * Math.pow(r, (1.0 / 2.4)) - 0.055;
        g = g <= 0.0031308 ? 12.92 * g : (1.0 + 0.055) * Math.pow(g, (1.0 / 2.4)) - 0.055;
        b = b <= 0.0031308 ? 12.92 * b : (1.0 + 0.055) * Math.pow(b, (1.0 / 2.4)) - 0.055;
        var r_new = (r * 255).toString();
        var g_new = (g * 255).toString();
        var b_new = (b * 255).toString();
        var red = parseInt(r_new) > 255 ? 255 : parseInt(r_new);
        var green = parseInt(g_new) > 255 ? 255 : parseInt(g_new);
        var blue = parseInt(b_new) > 255 ? 255 : parseInt(b_new);
        red = Math.abs(red);
        green = Math.abs(green);
        blue = Math.abs(blue);
        var min = Math.min(r, g, b), max = Math.max(r, g, b), delta = max - min, h, s, v = max;
        v = Math.floor(max / 255 * 100);
        if (max != 0)
            s = Math.floor(delta / max * 100);
        else {
            // black
            return [0, 0, 0];
        }
        if (r == max)
            h = (g - b) / delta; // between yellow & magenta
        else if (g == max)
            h = 2 + (b - r) / delta; // between cyan & yellow
        else
            h = 4 + (r - g) / delta; // between magenta & cyan
        h = Math.floor(h * 60); // degrees
        if (h < 0)
            h += 360;
        return [h, s, v];
    };
    ColorConverter.prototype.convertHSL2XY = function (h, s) {
        var l = 50;
        // Must be fractions of 1
        s /= 100;
        l /= 100;
        var c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs((h / 60) % 2 - 1)), m = l - c / 2, r = 0, g = 0, b = 0;
        if (0 <= h && h < 60) {
            r = c;
            g = x;
            b = 0;
        }
        else if (60 <= h && h < 120) {
            r = x;
            g = c;
            b = 0;
        }
        else if (120 <= h && h < 180) {
            r = 0;
            g = c;
            b = x;
        }
        else if (180 <= h && h < 240) {
            r = 0;
            g = x;
            b = c;
        }
        else if (240 <= h && h < 300) {
            r = x;
            g = 0;
            b = c;
        }
        else if (300 <= h && h < 360) {
            r = c;
            g = 0;
            b = x;
        }
        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);
        var red = r;
        var green = g;
        var blue = b;
        if (red > 0.04045)
            red = Math.pow((red + 0.055) / (1.0 + 0.055), 2.4);
        else
            red = red / 12.92;
        if (green > 0.04045)
            green = Math.pow((green + 0.055) / (1.0 + 0.055), 2.4);
        else
            green = green / 12.92;
        if (blue > 0.04045)
            blue = Math.pow((blue + 0.055) / (1.0 + 0.055), 2.4);
        else
            blue = blue / 12.92;
        var X = red * 0.664511 + green * 0.154324 + blue * 0.162028;
        var Y = red * 0.283881 + green * 0.668433 + blue * 0.047685;
        var Z = red * 0.000088 + green * 0.07231 + blue * 0.986039;
        var x2 = X / (X + Y + Z);
        var y2 = Y / (X + Y + Z);
        return new Array(x2, y2);
    };
    return ColorConverter;
}());
var ZigbeeSteckdose = /** @class */ (function (_super) {
    __extends(ZigbeeSteckdose, _super);
    function ZigbeeSteckdose(adapter, id, baseState, etage, raum, device, alexaSmartNamesForOn, alexaActionNamesForOn, alexaSmartNamesForOff, alexaActionNamesForOff, additionalStates4TurnOn, additionalStates4TurnOff) {
        var _this = _super.call(this, adapter, id, baseState, etage, raum, device) || this;
        _this.adapter = adapter;
        _this.alexaSmartNamesForOn = alexaSmartNamesForOn;
        _this.alexaSmartNamesForOff = alexaSmartNamesForOff;
        _this.alexaActionNamesForOn = alexaActionNamesForOn;
        _this.alexaActionNamesForOff = alexaActionNamesForOff;
        _this.additionalStates4TurnOn = additionalStates4TurnOn;
        _this.additionalStates4TurnOff = additionalStates4TurnOff;
        // Diese boolean States können auch das Licht einschalten. Wird benötigt z.B. bei einem RGB-Farbschema "hell" (realisiert über boolean-Datenpunkt). Dann soll auch die Shelly-Lampe eingeschalten werden
        _this.additionalStates4TurnOn.forEach(function (turnOnState) {
            _this.createState(turnOnState);
        });
        // Diese boolean States können auch das Licht ausschalten. Wird benötigt z.B. bei einem RGB-Farbschema "hell" (realisiert über boolean-Datenpunkt). Dann soll auch die Shelly-Lampe eingeschalten werden
        _this.additionalStates4TurnOff.forEach(function (turnOffState) {
            _this.createState(turnOffState);
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
    ZigbeeSteckdose.prototype.createState = function (key_in) {
        var jarvisDatenpunkt = key_in; //.replace(/\./g,'_'); // wegen Wohnzimmer T.V.
        this.adapter.createState(jarvisDatenpunkt, false, {
            name: jarvisDatenpunkt,
            desc: jarvisDatenpunkt,
            type: 'boolean',
            read: true,
            write: true
        });
    };
    ZigbeeSteckdose.prototype.getAdditionalStates4TurnOn = function () {
        return this.additionalStates4TurnOn;
    };
    ZigbeeSteckdose.prototype.getAdditionalStates4TurnOff = function () {
        return this.additionalStates4TurnOff;
    };
    ZigbeeSteckdose.prototype.getAlexaSmartNamesForOn = function () {
        return this.alexaSmartNamesForOn;
    };
    ZigbeeSteckdose.prototype.getAlexaSmartNamesForOff = function () {
        return this.alexaSmartNamesForOff;
    };
    ZigbeeSteckdose.prototype.getAlexaActionNamesForOn = function () {
        return this.alexaActionNamesForOn;
    };
    ZigbeeSteckdose.prototype.getAlexaActionNamesForOff = function () {
        return this.alexaActionNamesForOff;
    };
    ZigbeeSteckdose.prototype.getSwitchState = function () {
        return this.baseState + ".on";
    };
    ZigbeeSteckdose.prototype.isSwitchedOn = function () {
        if (this.adapter.getState(this.baseState + ".on").val == false) { // hue.0.Steckdose_Backstube.on
            return false;
        }
        return true;
    };
    ZigbeeSteckdose.prototype.getCategory = function () {
        return deviceZigbeeSteckdose;
    };
    ZigbeeSteckdose.prototype.getAlexaNamesForOnAsString = function () {
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
    ZigbeeSteckdose.prototype.getAlexaNamesForOffAsString = function () {
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
    return ZigbeeSteckdose;
}(AbstractZigbee));
exports.ZigbeeSteckdose = ZigbeeSteckdose;
var ZigbeeSchalter = /** @class */ (function (_super) {
    __extends(ZigbeeSchalter, _super);
    function ZigbeeSchalter(adapter, id, baseState, etage, raum, device) {
        var _this = _super.call(this, adapter, id, baseState, etage, raum, device) || this;
        _this.adapter = adapter;
        return _this;
    }
    ZigbeeSchalter.prototype.getCategory = function () {
        return deviceZigbeeSchalter;
    };
    return ZigbeeSchalter;
}(AbstractZigbee));
exports.ZigbeeSchalter = ZigbeeSchalter;
var ZigbeeRepeater = /** @class */ (function (_super) {
    __extends(ZigbeeRepeater, _super);
    function ZigbeeRepeater(adapter, id, baseState, etage, raum, device) {
        var _this = _super.call(this, adapter, id, baseState, etage, raum, device) || this;
        _this.adapter = adapter;
        return _this;
    }
    ZigbeeRepeater.prototype.getCategory = function () {
        return deviceZigbeeRepeater;
    };
    return ZigbeeRepeater;
}(AbstractZigbee));
exports.ZigbeeRepeater = ZigbeeRepeater;
var ZigbeeFenstersensor = /** @class */ (function (_super) {
    __extends(ZigbeeFenstersensor, _super);
    function ZigbeeFenstersensor(adapter, id, baseState, etage, raum, device) {
        var _this = _super.call(this, adapter, id, baseState, etage, raum, device) || this;
        _this.adapter = adapter;
        return _this;
    }
    ZigbeeFenstersensor.prototype.isOpen = function () {
        if (this.adapter.getState(this.baseState + ".open").val == false) { // deconz.0.Sensors.117.open
            return false;
        }
        return true;
    };
    ZigbeeFenstersensor.prototype.isStatusReachable = function () {
        var reachable = this.adapter.getState(this.baseState + ".reachable").val; // hue.0.Steckdose_Backstube.reachable 
        return reachable;
    };
    ZigbeeFenstersensor.prototype.getBattery = function () {
        return this.adapter.getState(this.baseState + ".battery").val; // // alias.0.Z021.battery
    };
    ZigbeeFenstersensor.prototype.getCategory = function () {
        return deviceZigbeeFenstersensor;
    };
    return ZigbeeFenstersensor;
}(AbstractZigbee));
exports.ZigbeeFenstersensor = ZigbeeFenstersensor;
var ZigbeeRauchmelder = /** @class */ (function (_super) {
    __extends(ZigbeeRauchmelder, _super);
    function ZigbeeRauchmelder(adapter, id, baseState, etage, raum, device) {
        var _this = _super.call(this, adapter, id, baseState, etage, raum, device) || this;
        _this.adapter = adapter;
        return _this;
    }
    ZigbeeRauchmelder.prototype.isFire = function () {
        if (this.adapter.getState(this.baseState + ".fire").val == false) { // hue.0.Steckdose_Backstube.on
            return false;
        }
        return true;
    };
    ZigbeeRauchmelder.prototype.isStatusReachable = function () {
        var reachable = this.adapter.getState(this.baseState + ".reachable").val; // hue.0.Steckdose_Backstube.reachable 
        return reachable;
    };
    ZigbeeRauchmelder.prototype.getBattery = function () {
        return this.adapter.getState(this.baseState + ".battery").val; // // alias.0.Z021.battery
    };
    ZigbeeRauchmelder.prototype.getCategory = function () {
        return deviceZigbeeRauchmelder;
    };
    return ZigbeeRauchmelder;
}(AbstractZigbee));
exports.ZigbeeRauchmelder = ZigbeeRauchmelder;
var ZigbeeBewegungsmelder = /** @class */ (function (_super) {
    __extends(ZigbeeBewegungsmelder, _super);
    function ZigbeeBewegungsmelder(adapter, id, baseState, etage, raum, device) {
        var _this = _super.call(this, adapter, id, baseState, etage, raum, device) || this;
        _this.adapter = adapter;
        return _this;
    }
    ZigbeeBewegungsmelder.prototype.getCategory = function () {
        return deviceZigbeeBewegungsmelder;
    };
    ZigbeeBewegungsmelder.prototype.getBattery = function () {
        return this.adapter.getState(this.baseState + ".battery").val; // // alias.0.Z021.battery
    };
    return ZigbeeBewegungsmelder;
}(AbstractZigbee));
exports.ZigbeeBewegungsmelder = ZigbeeBewegungsmelder;
var ZigbeeWandtaster = /** @class */ (function (_super) {
    __extends(ZigbeeWandtaster, _super);
    function ZigbeeWandtaster(adapter, id, baseState, etage, raum, device) {
        var _this = _super.call(this, adapter, id, baseState, etage, raum, device) || this;
        _this.adapter = adapter;
        return _this;
    }
    ZigbeeWandtaster.prototype.getCategory = function () {
        return deviceZigbeeWandtaster;
    };
    ZigbeeWandtaster.prototype.getBattery = function () {
        return this.adapter.getState(this.baseState + ".battery").val; // // alias.0.Z021.battery
    };
    return ZigbeeWandtaster;
}(AbstractZigbee));
exports.ZigbeeWandtaster = ZigbeeWandtaster;
var ZigbeeDosenrelais = /** @class */ (function (_super) {
    __extends(ZigbeeDosenrelais, _super);
    function ZigbeeDosenrelais(adapter, id, baseState, etage, raum, device, alexaSmartNames) {
        var _this = _super.call(this, adapter, id, baseState, etage, raum, device) || this;
        _this.adapter = adapter;
        _this.alexaSmartNames = alexaSmartNames;
        _this.alexaSmartNames.forEach(function (alexaSmartName) {
            _this.createIOTAdapterSmartDevices(alexaSmartName);
        });
        return _this;
    }
    ZigbeeDosenrelais.prototype.getSwitchState = function () {
        return this.baseState + ".on";
    };
    ZigbeeDosenrelais.prototype.isSwitchedOn = function () {
        if (this.adapter.getState(this.baseState + ".on").val == false) {
            return false;
        }
        return true;
    };
    ZigbeeDosenrelais.prototype.turnOn = function () {
        this.adapter.setState(this.baseState + ".on", true);
    };
    ZigbeeDosenrelais.prototype.turnOff = function () {
        this.adapter.setState(this.baseState + ".on", false);
    };
    ZigbeeDosenrelais.prototype.getCategory = function () {
        return deviceZigbeeDosenrelais;
    };
    ZigbeeDosenrelais.prototype.getAlexaSmartNames = function () {
        return this.alexaSmartNames;
    };
    return ZigbeeDosenrelais;
}(AbstractZigbee));
exports.ZigbeeDosenrelais = ZigbeeDosenrelais;
var AlexaInputConverter = /** @class */ (function () {
    function AlexaInputConverter(adapter, value, logContext) {
        this.actionTurnOn = false;
        this.actionTurnOff = false;
        this.actionChangeLevel = false;
        this.actionChangeColor = false;
        this.actionChangeCT = false;
        this.smartName = "?";
        this.levelNew = -1;
        this.hueNew = -1;
        this.ctNew = -1;
        this.adapter = adapter;
        this.value = value;
        if (this.value.toString().endsWith('.level')) {
            this.smartName = this.value.replace("0_userdata.0.alexa.", "").replace(".level", "");
            this.levelNew = this.adapter.getState(value).val;
            if (this.levelNew == 100) {
                this.actionTurnOn = true;
            }
            else if (this.levelNew == 0) {
                this.actionTurnOff = true;
            }
            else {
                this.actionChangeLevel = true;
            }
        }
        else if (value.endsWith('.hue')) {
            this.smartName = value.replace("0_userdata.0.alexa.", "").replace(".hue", "");
            this.hueNew = this.adapter.getState(this.value).val;
            this.actionChangeColor = true;
        }
        else if (value.endsWith('.ct')) {
            this.smartName = value.replace("0_userdata.0.alexa.", "").replace(".ct", "");
            this.ctNew = this.adapter.getState(value).val;
            this.actionChangeCT = true;
        }
        adapter.log("");
        adapter.log(">>> ALEXA (" + logContext + ") >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        adapter.log("    Value            : " + this.value);
        adapter.log("    smartName        : " + this.smartName);
        adapter.log("    actionTurnOn     : " + this.actionTurnOn);
        adapter.log("    actionTurnOff    : " + this.actionTurnOff);
        if (this.actionChangeLevel) {
            adapter.log("    actionChangeLevel: " + this.actionChangeLevel + " (" + this.levelNew + ")");
        }
        else {
            adapter.log("    actionChangeLevel: " + this.actionChangeLevel);
        }
        if (this.actionChangeColor) {
            adapter.log("    actionChangeColor: " + this.actionChangeColor + " (" + this.hueNew + ")");
        }
        else {
            adapter.log("    actionChangeColor: " + this.actionChangeColor);
        }
        if (this.actionChangeCT) {
            adapter.log("    actionChangeCT: " + this.actionChangeCT + " (" + this.ctNew + ")");
        }
        else {
            adapter.log("    actionChangeCT: " + this.actionChangeCT);
        }
        adapter.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
    }
    AlexaInputConverter.prototype.isActionTurnedOn = function () {
        return this.actionTurnOn;
    };
    AlexaInputConverter.prototype.isActionTurnedOff = function () {
        return this.actionTurnOff;
    };
    AlexaInputConverter.prototype.isActionChangedLevel = function () {
        return this.actionChangeLevel;
    };
    AlexaInputConverter.prototype.isActionChangedColor = function () {
        return this.actionChangeColor;
    };
    AlexaInputConverter.prototype.isActionChangedColorTemperature = function () {
        return this.actionChangeCT;
    };
    AlexaInputConverter.prototype.getSmartName = function () {
        return this.smartName;
    };
    AlexaInputConverter.prototype.getLevel = function () {
        return this.levelNew;
    };
    AlexaInputConverter.prototype.getHue = function () {
        return this.hueNew;
    };
    AlexaInputConverter.prototype.getColorTemperature = function () {
        return this.ctNew;
    };
    return AlexaInputConverter;
}());
exports.AlexaInputConverter = AlexaInputConverter;
module.exports = {
    AbstractZigbee: AbstractZigbee,
    ColorScheme: ColorScheme,
    RGBColorScheme: RGBColorScheme,
    WhiteColorScheme: WhiteColorScheme,
    ZigbeeLampeRGB: ZigbeeLampeRGB,
    LampeWeissTasterScheme: LampeWeissTasterScheme,
    LampeWeissAlexaScheme: LampeWeissAlexaScheme,
    ZigbeeLampeWeiss: ZigbeeLampeWeiss,
    ZigbeeSteckdose: ZigbeeSteckdose,
    ZigbeeSchalter: ZigbeeSchalter,
    ZigbeeRepeater: ZigbeeRepeater,
    ZigbeeFenstersensor: ZigbeeFenstersensor,
    ZigbeeRauchmelder: ZigbeeRauchmelder,
    ZigbeeBewegungsmelder: ZigbeeBewegungsmelder,
    ZigbeeWandtaster: ZigbeeWandtaster,
    ZigbeeDosenrelais: ZigbeeDosenrelais,
    AlexaInputConverter: AlexaInputConverter,
    deviceZigbeeSteckdose: deviceZigbeeSteckdose,
    deviceZigbeeBewegungsmelder: deviceZigbeeBewegungsmelder,
    deviceZigbeeLampeRGB: deviceZigbeeLampeRGB,
    deviceZigbeeLampeWeiss: deviceZigbeeLampeWeiss,
    deviceZigbeeRauchmelder: deviceZigbeeRauchmelder,
    deviceZigbeeWandtaster: deviceZigbeeWandtaster,
    deviceZigbeeDosenrelais: deviceZigbeeDosenrelais,
    deviceZigbeeSchalter: deviceZigbeeSchalter,
    deviceZigbeeRepeater: deviceZigbeeRepeater,
    deviceZigbeeFenstersensor: deviceZigbeeFenstersensor
};
