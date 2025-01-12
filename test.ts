export class DateCalendarTest  {
    protected adapter: any;    

    constructor(adapter: any) {
        this.adapter = adapter;
    }    

    public getCurrentWeekdayAsString() : string {
        var mediolaText = "0_userdata.0.hue.mediola_status_text_hallo";
        this.adapter.log(">>> Create state: " + mediolaText);        
        this.adapter.createState(mediolaText, "Hello World!", {
            name: mediolaText,
            desc: mediolaText,
            type: 'string', 
            read: true,
            write: true
        });

        var now = new Date();
        var lastUpdate = now.getDate().toString().padStart(2,'0') + "."             + (now.getMonth()+1).toString().padStart(2,'0') + "." + now.getFullYear();
        lastUpdate = lastUpdate + ", " + now.getHours().toString().padStart(2,'0') + ":" + now.getMinutes().toString().padStart(2,'0') + ":" + now.getSeconds().toString().padStart(2,'0') + "";
        this.adapter.setState(mediolaText, lastUpdate);
        this.adapter.log("<<< State created!");

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
            weekdayAsString = "Samstag";
        } else if (weekday == 7) {
            weekdayAsString = "Sonntag";
        } else if (weekday == 0) {
            weekdayAsString = "Sonntag";
        }
        return weekdayAsString;
    }     
}

module.exports = { DateCalendarTest };

