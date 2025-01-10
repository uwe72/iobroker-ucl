"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlexaInputConverter = void 0;
var AlexaInputConverter = /** @class */ (function () {
    function AlexaInputConverter(adapter, value, logContext, callback) {
        var _this = this;
        this.actionTurnOn = false;
        this.actionTurnOff = false;
        this.actionChangeLevel = false;
        this.actionChangeColor = false;
        this.actionChangeCT = false;
        this.smartName = "?";
        this.levelNew = -1;
        this.hueNew = -1;
        this.ctNew = -1;
        setTimeout(function () {
            _this.adapter = adapter;
            _this.value = value;
            if (_this.value.toString().endsWith('.level')) {
                _this.smartName = _this.value.replace("0_userdata.0.alexa.", "").replace(".level", "");
                _this.levelNew = _this.adapter.getState(value).val;
                if (_this.levelNew == 100) {
                    _this.actionTurnOn = true;
                }
                else if (_this.levelNew == 0) {
                    _this.actionTurnOff = true;
                }
                else {
                    _this.actionChangeLevel = true;
                }
            }
            else if (value.endsWith('.hue')) {
                _this.smartName = value.replace("0_userdata.0.alexa.", "").replace(".hue", "");
                _this.hueNew = _this.adapter.getState(_this.value).val;
                _this.actionChangeColor = true;
            }
            else if (value.endsWith('.ct')) {
                _this.smartName = value.replace("0_userdata.0.alexa.", "").replace(".ct", "");
                _this.ctNew = _this.adapter.getState(value).val;
                _this.actionChangeCT = true;
            }
            adapter.log("");
            adapter.log(">>> ALEXA (" + logContext + ") >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            adapter.log("    Value            : " + _this.value);
            adapter.log("    smartName        : " + _this.smartName);
            adapter.log("    actionTurnOn     : " + _this.actionTurnOn);
            adapter.log("    actionTurnOff    : " + _this.actionTurnOff);
            if (_this.actionChangeLevel) {
                adapter.log("    actionChangeLevel: " + _this.actionChangeLevel + " (" + _this.levelNew + ")");
            }
            else {
                adapter.log("    actionChangeLevel: " + _this.actionChangeLevel);
            }
            if (_this.actionChangeColor) {
                adapter.log("    actionChangeColor: " + _this.actionChangeColor + " (" + _this.hueNew + ")");
            }
            else {
                adapter.log("    actionChangeColor: " + _this.actionChangeColor);
            }
            if (_this.actionChangeCT) {
                adapter.log("    actionChangeCT: " + _this.actionChangeCT + " (" + _this.ctNew + ")");
            }
            else {
                adapter.log("    actionChangeCT: " + _this.actionChangeCT);
            }
            adapter.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
            adapter.log("return now");
            callback(_this);
        }, 75);
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
    AlexaInputConverter: AlexaInputConverter
};
