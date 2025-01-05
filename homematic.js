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
exports.HomematicWandschalter = exports.HomematicFussbodenheizung = exports.HomematicDoor = exports.HomematicRollladen = exports.HomematicAccessPoint = exports.HomematicWandtaster = exports.HomematicTemperatursensor = exports.HomematicRauchmelder = exports.HomematicFunkschaltaktor = exports.HomematicDimmer = exports.HomematicHeizkoerper = exports.HomematicSteckdose = exports.HomematicWindow = exports.HomematicWetterstation = exports.HomematicPraesenzmelder = exports.HomematicWandthermostat = exports.AbstractHomematic = void 0;
var deviceWandthermostat = "Wandthermostat";
var devicePraesenzmelder = "Praesenzmelder";
var deviceWetterstation = "Wetterstation";
var deviceDoor = "Door";
var deviceRollladen = "Rollladen";
var deviceWandschalter = "Wandschalter";
var deviceFussbodenheizung = "Fussbodenheizung";
var deviceWandtaster = "Wandtaster";
var deviceAccessPoint = "AccessPoint";
var deviceTemperatursensor = "Temperatursensor";
var deviceRauchmelder = "Rauchmelder";
var deviceFunkSchaltaktor = "FunkSchaltaktor";
var deviceWindow = "Window";
var deviceSteckdose = "Steckdose";
var deviceHeizkoerper = "Heizkoerper";
var deviceDimmer = "Dimmer";
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
    return AbstractHomematic;
}());
exports.AbstractHomematic = AbstractHomematic;
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
        return deviceWandthermostat;
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
        return devicePraesenzmelder;
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
        return deviceWetterstation;
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
        return deviceWindow;
    };
    HomematicWindow.prototype.isStatusBattery = function () {
        return !this.adapter.getState(this.baseState + ".0.LOW_BAT").val; // // hm-rpc.0.000A9BE993E2F7.0.LOW_BAT
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
        return deviceSteckdose;
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
        return deviceHeizkoerper;
    };
    HomematicHeizkoerper.prototype.isStatusBattery = function () {
        return !this.adapter.getState(this.baseState + ".0.LOW_BAT").val; // // hm-rpc.0.000A9BE993E2F7.0.LOW_BAT
    };
    return HomematicHeizkoerper;
}(AbstractHomematic));
exports.HomematicHeizkoerper = HomematicHeizkoerper;
var HomematicDimmer = /** @class */ (function (_super) {
    __extends(HomematicDimmer, _super);
    function HomematicDimmer(adapter, id, baseState, etage, raum, device) {
        return _super.call(this, adapter, id, baseState, etage, raum, device) || this;
    }
    HomematicDimmer.prototype.getCategory = function () {
        return deviceDimmer;
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
        return deviceFunkSchaltaktor;
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
        return deviceRauchmelder;
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
        return deviceTemperatursensor;
    };
    HomematicTemperatursensor.prototype.isStatusBattery = function () {
        return !this.adapter.getState(this.baseState + ".0.LOW_BAT").val; // // hm-rpc.0.000A9BE993E2F7.0.LOW_BAT
    };
    return HomematicTemperatursensor;
}(AbstractHomematic));
exports.HomematicTemperatursensor = HomematicTemperatursensor;
var HomematicWandtaster = /** @class */ (function (_super) {
    __extends(HomematicWandtaster, _super);
    function HomematicWandtaster(adapter, id, baseState, etage, raum, device) {
        return _super.call(this, adapter, id, baseState, etage, raum, device) || this;
    }
    HomematicWandtaster.prototype.getCategory = function () {
        return deviceWandtaster;
    };
    return HomematicWandtaster;
}(AbstractHomematic));
exports.HomematicWandtaster = HomematicWandtaster;
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
        return deviceAccessPoint;
    };
    return HomematicAccessPoint;
}(AbstractHomematic));
exports.HomematicAccessPoint = HomematicAccessPoint;
var HomematicRollladen = /** @class */ (function (_super) {
    __extends(HomematicRollladen, _super);
    function HomematicRollladen(adapter, id, baseState, etage, raum, device, positionAuf, positionMitte, positionZu) {
        var _this = _super.call(this, adapter, id, baseState, etage, raum, device) || this;
        _this.positionAuf = positionAuf;
        _this.positionMitte = positionMitte;
        _this.positionZu = positionZu;
        return _this;
    }
    HomematicRollladen.prototype.getCategory = function () {
        return deviceRollladen;
    };
    HomematicRollladen.prototype.auf = function () {
        this.adapter.setState(this.getBaseState() + ".4.LEVEL", this.positionAuf);
    };
    HomematicRollladen.prototype.zu = function () {
        this.adapter.setState(this.getBaseState() + ".4.LEVEL", this.positionZu);
    };
    HomematicRollladen.prototype.mitte = function () {
        this.adapter.setState(this.getBaseState() + ".4.LEVEL", this.positionMitte);
    };
    return HomematicRollladen;
}(AbstractHomematic));
exports.HomematicRollladen = HomematicRollladen;
var HomematicDoor = /** @class */ (function (_super) {
    __extends(HomematicDoor, _super);
    function HomematicDoor(adapter, id, baseState, etage, raum, device, skipStatisticIsOpened, skipStatisticIsClosed) {
        var _this = _super.call(this, adapter, id, baseState, etage, raum, device) || this;
        _this.skipStatisticIsOpened = skipStatisticIsOpened;
        _this.skipStatisticIsClosed = skipStatisticIsClosed;
        return _this;
    }
    HomematicDoor.prototype.isSkipStatisticIsOpened = function () {
        return this.skipStatisticIsOpened;
    };
    HomematicDoor.prototype.isSkipStatisticIsClosed = function () {
        return this.skipStatisticIsClosed;
    };
    HomematicDoor.prototype.getCategory = function () {
        return deviceDoor;
    };
    HomematicDoor.prototype.isStatusBattery = function () {
        return !this.adapter.getState(this.baseState + ".0.LOW_BAT").val; // // hm-rpc.0.000A9BE993E2F7.0.LOW_BAT
    };
    HomematicDoor.prototype.isOpen = function () {
        if (this.adapter.getState(this.baseState + ".1.STATE").val) { // hm-rpc.0.0000DD89BE05F9.1.STATE
            return true;
        }
        return false;
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
        return deviceFussbodenheizung;
    };
    return HomematicFussbodenheizung;
}(AbstractHomematic));
exports.HomematicFussbodenheizung = HomematicFussbodenheizung;
var HomematicWandschalter = /** @class */ (function (_super) {
    __extends(HomematicWandschalter, _super);
    function HomematicWandschalter(adapter, id, baseState, etage, raum, device) {
        return _super.call(this, adapter, id, baseState, etage, raum, device) || this;
    }
    HomematicWandschalter.prototype.getCategory = function () {
        return deviceWandschalter;
    };
    HomematicWandschalter.prototype.isStatusBattery = function () {
        return !this.adapter.getState(this.baseState + ".0.LOW_BAT").val; // // hm-rpc.0.000A9BE993E2F7.0.LOW_BAT
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
    return HomematicWandschalter;
}(AbstractHomematic));
exports.HomematicWandschalter = HomematicWandschalter;
module.exports = { HomematicWindow: HomematicWindow, HomematicSteckdose: HomematicSteckdose, HomematicHeizkoerper: HomematicHeizkoerper, HomematicDimmer: HomematicDimmer, HomematicWandthermostat: HomematicWandthermostat, HomematicFussbodenheizung: HomematicFussbodenheizung, HomematicWandschalter: HomematicWandschalter, HomematicDoor: HomematicDoor, HomematicWetterstation: HomematicWetterstation, HomematicAccessPoint: HomematicAccessPoint, HomematicRollladen: HomematicRollladen, HomematicWandtaster: HomematicWandtaster, HomematicTemperatursensor: HomematicTemperatursensor, HomematicRauchmelder: HomematicRauchmelder, HomematicPraesenzmelder: HomematicPraesenzmelder, AbstractHomematic: AbstractHomematic, HomematicFunkschaltaktor: HomematicFunkschaltaktor };
