export class DateCalendarTest  {

    public getCurrentWeekdayAsString() : string {
        var now = new Date();
        let weekday = now.getDay();
        return this.getWeekdayAsString(weekday);
    }

    public getWeekdayAsString(weekday: number) : string {
        let weekdayAsString;
        if (weekday == 1) {
            weekdayAsString = "Montag1";
        } else if (weekday == 2) {
            weekdayAsString = "Dienstag2";
        } else if (weekday == 3) {
            weekdayAsString = "Mittwoch3";
        } else if (weekday == 4) {
            weekdayAsString = "Donnerstag4";
        } else if (weekday == 5) {
            weekdayAsString = "Freitag5";
        } else if (weekday == 6) {
            weekdayAsString = "Samstag6";
        } else if (weekday == 7) {
            weekdayAsString = "Sonntag7";
        } else if (weekday == 0) {
            weekdayAsString = "Sonntag8";
        }
        return weekdayAsString;
    }     
}

module.exports = DateCalendarTest;
