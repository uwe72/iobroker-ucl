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
            weekdayAsString = "Samstag6_works!!!!!!!!!_2ab";
        } else if (weekday == 7) {
            weekdayAsString = "Sonntag7";
        } else if (weekday == 0) {
            weekdayAsString = "Sonntag8";
        }
        return weekdayAsString;
    }     
}

module.exports = {DateCalendarTest };

console.log("temp");