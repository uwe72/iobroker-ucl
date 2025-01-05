export class DateHelper  {

    public getCurrentWeekdayAsString() : string {
        var now = new Date();
        let weekday = now.getDay();
        return this.getWeekdayAsString(weekday);
    }

    public getWeekdayAsString(weekday: number) : string {
        let weekdayAsString;
        if (weekday == 1) {
            weekdayAsString = "Montag";
        } else if (weekday == 2) {
            weekdayAsString = "Dienstag";
        } else if (weekday == 3) {
            weekdayAsString = "Mittwoch";
        } else if (weekday == 4) {
            weekdayAsString = "Donnerstag";
        } else if (weekday == 5) {
            weekdayAsString = "Freitag";
        } else if (weekday == 6) {
            weekdayAsString = "Samstag_heute1";
        } else if (weekday == 7) {
            weekdayAsString = "Sonntag";
        } else if (weekday == 0) {
            weekdayAsString = "Sonntag";
        }
        return weekdayAsString;
    }     
}

module.exports = { DateHelper };