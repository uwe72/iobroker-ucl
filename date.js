"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateHelper = void 0;
var DateHelper = /** @class */ (function () {
    function DateHelper() {
    }
    DateHelper.prototype.getCurrentWeekdayAsString = function () {
        var now = new Date();
        var weekday = now.getDay();
        return this.getWeekdayAsString(weekday);
    };
    DateHelper.prototype.getWeekdayAsString = function (weekday) {
        var weekdayAsString;
        if (weekday == 1) {
            weekdayAsString = "Montag";
        }
        else if (weekday == 2) {
            weekdayAsString = "Dienstag";
        }
        else if (weekday == 3) {
            weekdayAsString = "Mittwoch";
        }
        else if (weekday == 4) {
            weekdayAsString = "Donnerstag";
        }
        else if (weekday == 5) {
            weekdayAsString = "Freitag";
        }
        else if (weekday == 6) {
            weekdayAsString = "Samstag_heute1";
        }
        else if (weekday == 7) {
            weekdayAsString = "Sonntag";
        }
        else if (weekday == 0) {
            weekdayAsString = "Sonntag";
        }
        return weekdayAsString;
    };
    return DateHelper;
}());
exports.DateHelper = DateHelper;
module.exports = { DateHelper: DateHelper };
