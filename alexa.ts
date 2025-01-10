export class AlexaInputConverter {
    private value: string;
    private actionTurnOn = false;
    private actionTurnOff = false;
    private actionChangeLevel = false;
    private actionChangeColor = false;
    private actionChangeCT = false;
    private smartName = "?";
    private levelNew = -1;
    private hueNew = -1;        
    private ctNew = -1;      
    private adapter:any;  
        
    constructor(adapter:any, value: string, logContext: string) {
        setTimeout(() => {        
            this.adapter = adapter;
            this.value = value;
            if (this.value.toString().endsWith('.level')) {
                this.smartName = this.value.replace("0_userdata.0.alexa.", "").replace(".level", "");
                this.levelNew = this.adapter.getState(value).val;
                if (this.levelNew == 100) {
                    this.actionTurnOn = true;
                } else if (this.levelNew == 0) {
                    this.actionTurnOff = true;
                } else {
                    this.actionChangeLevel = true;
                }
            } else if (value.endsWith('.hue')) {
                this.smartName = value.replace("0_userdata.0.alexa.", "").replace(".hue", "");
                this.hueNew = this.adapter.getState(this.value).val;
                this.actionChangeColor = true;
            } else if (value.endsWith('.ct')) {
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
            } else {
                adapter.log("    actionChangeLevel: " + this.actionChangeLevel);                    
            }
            if (this.actionChangeColor) {
                adapter.log("    actionChangeColor: " + this.actionChangeColor + " (" + this.hueNew + ")");                
            } else {
                adapter.log("    actionChangeColor: " + this.actionChangeColor);                
            }
            if (this.actionChangeCT) {
                adapter.log("    actionChangeCT: " + this.actionChangeCT + " (" + this.ctNew + ")");                
            } else {
                adapter.log("    actionChangeCT: " + this.actionChangeCT);                
            }
            adapter.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
        }, 75);        
    }

    public isActionTurnedOn() : boolean {
        return this.actionTurnOn;
    }
    public isActionTurnedOff() : boolean {
        return this.actionTurnOff;
    }
    public isActionChangedLevel() : boolean {
        return this.actionChangeLevel;
    }
    public isActionChangedColor() : boolean {
        return this.actionChangeColor;
    }
    public isActionChangedColorTemperature() : boolean {
        return this.actionChangeCT;
    }

    public getSmartName() : string {
        return this.smartName;
    }

    public getLevel() : number {
        return this.levelNew;
    }

    public getHue() : number {
        return this.hueNew;
    }

    public getColorTemperature() : number {
        return this.ctNew;
    }
}

module.exports = { 
    AlexaInputConverter
};
