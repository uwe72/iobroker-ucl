/*    export interface IColumn {
        getOnTopColumnName() : string; // Zeile über dem Header
        getOnTopColumnColSpan() : number; // Zeile über dem Header; wieviele Spalten umfasst dieser Header
        getOnTopBackgroundColor() : string; // Zeile über dem Header; Hintergrundfarbe
        getOnTopCellAlignment() : string; // Zeile über dem Header; Ausrichtung
        getColumnName() : string;    
        getColumnHeaderBackgroundColor() : string; 
        getValueAt(rowObject: Object, rowIndex: number) : string;
        getCellBackgroundColor(row: Object, rowIndex: number) : string;
        getCellForegroundColor(row: Object, rowIndex: number) : string;    
        getCellAlignment(row: Object) : string;    
        getColumnnWidth() : number;    
        getColumnnFontSize() : number;    
    }*/
    
    export abstract class AbstractColumn  {
        private columnName: string;
    
        constructor(columnName: string) {
            this.columnName = columnName;
        }
    
        public getColumnName() : string {
            return this.columnName;
        }
    
        abstract getOnTopColumnName() : string; // Zeile über dem Header
        abstract getOnTopColumnColSpan() : number; // Zeile über dem Header; wieviele Spalten umfasst dieser Header
        abstract getOnTopBackgroundColor() : string; // Zeile über dem Header; Hintergrundfarbe
        abstract getOnTopCellAlignment() : string; // Zeile über dem Header; Ausrichtung
        abstract getColumnHeaderBackgroundColor() : string; 
        abstract getValueAt(rowObject: Object, rowIndex: number) : string;
        abstract getCellBackgroundColor(row: Object, rowIndex: number) : string;
        abstract getCellForegroundColor(row: Object, rowIndex: number) : string;    
        abstract getCellAlignment(row: Object) : string;    
        abstract getColumnnWidth() : number;    
         abstract getColumnnFontSize() : number;    
    }
    
    export class HtmlTable {
        private headerVisible: boolean;
        private doubleHeaderVisible: boolean;
        private columns: AbstractColumn[];
        private rows: Object[];
        private tableTitle: string;
    
        constructor() {
            this.columns = [];
        }
    
        public isHeaderVisible() : boolean {
            return this.headerVisible;
        }
    
        public getTableTitle() : string {
            return this.tableTitle;
        }
    
        public setTableTitle(tableTitle: string) {
            this.tableTitle = tableTitle;
        }
    
        public getColumns() : AbstractColumn[] {
            return this.columns;
        }
    
        public getRows() : Object[] {
            return this.rows;
        }
    
        public isDoubleHeaderVisible() : boolean {
            return this.doubleHeaderVisible;
        }
    
        public setHeaderVisible(headerVisible: boolean) {
            this.headerVisible = headerVisible;
        }
    
        public setDoubleHeaderVisible(doubleHeaderVisible: boolean) {
            this.doubleHeaderVisible = doubleHeaderVisible;
        }
    
        public setRows(rows: Object[]) {
            this.rows = rows;
        }
    
        public addColumn(column: AbstractColumn) {
            this.columns.push(column);
        }
    }
    
    
    export class HtmlCreator {
        private htmlState: string;
        private additionalHTMLaboveTable: string;    
        private additionalHTMLbelowTable: string;    
        private backgroundImageUrl: string;    
        private tables: HtmlTable[];
        private separatorRowAfterObjectThick: Object[];
        private separatorRowAfterObjectThin: Object[];    
    
        private adapter: any;    

        constructor(adapter: any) {
            this.adapter = adapter;        
            this.tables = [];
            this.separatorRowAfterObjectThick = [];
            this.separatorRowAfterObjectThin = [];
        }
    
        public addTable(table: HtmlTable) {
            this.tables.push(table);
        }    
    
        public setBackgroundImage(backgroundImageUrl: string) {
            this.backgroundImageUrl = backgroundImageUrl;
        }
    
        public setAdditionalHTMLaboveTable(additionalHTMLaboveTable: string) {
            this.additionalHTMLaboveTable = additionalHTMLaboveTable;
        }

        public setAdditionalHTMLbelowTable(additionalHTMLbelowTable: string) {
            this.additionalHTMLbelowTable = additionalHTMLbelowTable;
        }
    
        public addSeparatorAfterObjectThick(separator: Object) {
            this.separatorRowAfterObjectThick.push(separator);
        }
    
        public addSeparatorAfterObjectThin(separator: Object) {
            this.separatorRowAfterObjectThin.push(separator);
        }    
    
        public setHtmlState(htmlState: string) {
            this.htmlState = htmlState;
            this.adapter.createState(htmlState, "", {
                name: htmlState,
                desc: htmlState,
                type: 'string', 
                read: true,
                write: true
            });
        }
    
    
        public createHTML() {
            var html = "";
    
            html += "<html>                                             \n";
            html += "   <head>                                          \n";
            html += "       <style>                                     \n";
            html += "           table.style1 {                          \n";
            html += "               border: 1px solid #595959;          \n";
            html += "               border-collapse: collapse;          \n";
            html += "               vertical-align: middle;             \n";
    
            if (this.backgroundImageUrl != null) {
                //html +=                 "background: white url(\"" + this.backgroundImageUrl + "\") no-repeat; border-collapse: collapse; \n";
            }
    
            html += "           }                                       \n";
            html += "           table.style2 {                          \n";
            html += "               border: 0px solid #595959;          \n";
            html += "               border-collapse: collapse;          \n";
            html += "               vertical-align: middle;             \n";
            html += "           }                                       \n";
            html += "           th.style1 {                          \n";
            html += "               border: 1px solid #595959;          \n";
            html += "               border-collapse: collapse;          \n";
            html += "               vertical-align: middle;             \n";
            html += "           }                                       \n";
            html += "           th.style2 {                          \n";
            html += "               border: 0px solid #595959;          \n";
            html += "               border-collapse: collapse;          \n";
            html += "               vertical-align: middle;             \n";
            html += "           }                                       \n";
            html += "           td.style1 {                          \n";
            html += "               border: 1px solid #595959;          \n";
            html += "               border-collapse: collapse;          \n";
            html += "               vertical-align: middle;             \n";
            html += "           }                                       \n";
            html += "           td.style2 {                          \n";
            html += "               border: 0px solid #595959;          \n";
            html += "               border-collapse: collapse;          \n";
            html += "               vertical-align: middle;             \n";
            html += "           }                                       \n";
            html += "           td,th {                                 \n";
            html += "               padding-top: 4px;                   \n";
            html += "               padding-bottom: 4px;                \n";
            html += "               padding-left: 4px;                  \n";
            html += "               padding-right: 4px;                 \n";                        
            html += "           }                                       \n";
            html += "       </style>                                    \n";
            html += "   </head>                                         \n";
            html += "   <body>                                          \n";
        
    
            if (this.additionalHTMLaboveTable != null) {
                html += this.additionalHTMLaboveTable;// + "<p>";
            }
    
            if (this.backgroundImageUrl != null) {
                //html +=                 "background: white url(\"" + this.backgroundImageUrl + "\") no-repeat; border-collapse: collapse; \n";
                html += "       <table class=\"style1\" width=\"95%\" style=\"margin:5px\" background=\"" + this.backgroundImageUrl + "\">                         \n";        
            } else {
                html += "       <table class=\"style1\" width=\"95%\" style=\"margin:5px\">                         \n";        
            }
    
            //<table border=1 background="bg-red.png">
    
    
            // Max. Columns ermitteln:
            var maxCols = 0;
            this.tables.forEach(table => {    
                if (table.getColumns().length > maxCols) {
                    maxCols = table.getColumns().length;
                }
            });
    
    
    
            var tableIndex = 0;
            this.tables.forEach(table => {    
                if (tableIndex++ != 0) {
                    html += "       <tr class=\"style1\"><td class=\"style1\" colspan=\"" + maxCols + "\" style=\"padding: 6px;  background-color:#212121\"></td></tr>";    
                }
    
                if (table.isDoubleHeaderVisible() == true) {
                    html += "           <tr class=\"style1\">                                    \n";
                    var skipColumns : number = 0;
                    table.getColumns().forEach(column => {    
                        if (skipColumns == 0) {
                            var colSpan = column.getOnTopColumnColSpan();
                            if (colSpan == null) {
                                colSpan = 1;
                            }
    
                            // Alignment:
                            var userAlignemt = column.getOnTopCellAlignment();
                            var cellAlignment = " text-align:left";
                            if (userAlignemt != null) {
                                cellAlignment = " text-align:" + userAlignemt;
                            }
    
                            // Background-Color:
                            var userBackground = column.getOnTopBackgroundColor();
                            var cellBackground = "";
                            if (userBackground != null) {
                                cellBackground = " background-color:" + userBackground + ";";
                            }
    
                            //html += "           <th colspan=\"" + colSpan + "\" style=\"text-align:left " + cellBackground + "\"><font size=2px\">" + column.getOnTopColumnName() + "</th></font>	\n";
                            html += "           <th class=\"style1\" colspan=\"" + colSpan + "\" + style=\" " +   cellBackground  + cellAlignment + "\">" + column.getOnTopColumnName() + "</th>";    
    
    
                            skipColumns += colSpan -1;
                        } else {
                            skipColumns--;
                        }
                    });
                    html += "           </tr>                                   \n";
                }
    
    
                if (table.isHeaderVisible() == true) {
                    html += "           <tr class=\"style1\">                                    \n";
                    table.getColumns().forEach(column => {    
    
                        // Background-Color:
                        var userBackground = column.getColumnHeaderBackgroundColor();
                        if (userBackground != null) {
                            //html += "           <th><font size=2px\">" + column.getColumnName() + "</th></font>	\n";
                            var cellBackground = " background-color:" + userBackground + ";";
                            html += "           <th class=\"style1\" style=\" "  + cellBackground  + "\">" + "<font size=2px\">" +  column.getColumnName() + "</font></th>";    
                        } else {
                            html += "           <th class=\"style1\"><font size=2px\">" + column.getColumnName() + "</th></font>	\n";
                        }
                    });
    
                    html += "           </tr>                                   \n";
                }
    
                if (table.getTableTitle() != null) {
                    //html += "       <tr><td colspan=\"" + maxCols + "\" style=\"padding: 6px;  background-color:#212121\"></td></tr>";    
                    html += "       <tr class=\"style1\">\n";
                    html += "           <td class=\"style1\" colspan=\"" + maxCols+"\">" + table.getTableTitle() + "</td>                                   \n";
                    html += "           </tr>                                   \n";
                }
                
    
                var rowIndex: number = -1;
                table.getRows().forEach(row=> {
                    rowIndex++;    
                    html += "       <tr class=\"style1\">                                    \n";
                    table.getColumns().forEach(column => {    
                        var cellValue = column.getValueAt(row, rowIndex);
    
                            // Alignment:
                            var userAlignemt = column.getCellAlignment(row);
                            var cellAlignment = "text-align:left";
                            if (userAlignemt != null) {
                                cellAlignment = "text-align:" + userAlignemt + ";";
                            }
    
                            // Width:
                            var userWidth = column.getColumnnWidth();
                            var cellWidth = "";
                            if (userWidth != null && userWidth != -1) {
                                cellWidth = "width=\"" + userWidth + "px\"; ";
                            }
    
                            // Background-Color:
                            var userBackground = column.getCellBackgroundColor(row, rowIndex);
                            var cellBackground = "";
                            if (userBackground != null) {
                                cellBackground = "background-color:" + userBackground + ";";
                            }
    
                            // Foreground-Color:
                            var userForeground = column.getCellForegroundColor(row, rowIndex);
                            var cellForegorund = "";
                            if (userForeground != null) {
                                cellForegorund = "color:" + userForeground + ";";
                            }
    
                            // Font size:
                            if (column.getColumnnFontSize() == null) {
                                html += "           <td class=\"style1\"" + cellWidth + " style=\" " +  cellForegorund + cellBackground + cellAlignment + "        \">" + cellValue + "</td>";    
                            } else {
                                html += "           <td class=\"style1\"" + cellWidth + " style=\" " +  cellForegorund + cellBackground + cellAlignment + " \">" + "<font size=\"" + column.getColumnnFontSize() + "\"  >" +            cellValue + "</font></td>";    
                            }
    
                    });
                    html += "       </tr>                                    \n";                        
    
                    // Separator Thick:
                    var found = false;
                    for(var i = 0; i < this.separatorRowAfterObjectThick.length; i++) {
                        if (this.separatorRowAfterObjectThick[i] == row) {
                            found = true;
                            break;
                        }
                    }
                    if (found) {
                        html += "       <tr class=\"style1\">                                 \n";        
                        html += "       <td class=\"style1\" colspan=\"" + table.getColumns().length + "\" style=\"padding: 6px;  background-color:#212121\"></td>";    
                        html += "       </tr>                                 \n";        
                    }
    
                    // Separator Thin:
                    var found = false;
                    for(var i = 0; i < this.separatorRowAfterObjectThin.length; i++) {
                        if (this.separatorRowAfterObjectThin[i] == row) {
                            found = true;
                            break;
                        }
                    }
                    if (found) {
                        html += "       <tr class=\"style1\">                                 \n";        
                        html += "       <td class=\"style1\" colspan=\"" + table.getColumns().length + "\" style=\"padding: 2px;  background-color:#AAAAAA\"></td>";    
                        html += "       </tr>                                 \n";        
                    }
    
    
                });
            });
    
    
    
    
            html +=          "</table>\n";
    
            if (this.additionalHTMLbelowTable != null) {
                html += this.additionalHTMLbelowTable + "<p>";
            }
   
    
            html +=      "</body>\n";
            html +=  "</html>\n";
            this.adapter.setState(this.htmlState, html);
        }
    }
    
    // Icon Spalte die sich nie ändert
    export class StaticIconColumn extends AbstractColumn {
        private iconURL: string;
    
        constructor(iconURL: string) {
            super(iconURL);
            this.iconURL = iconURL;
        }

        public getOnTopBackgroundColor() : string { 
            // @ts-ignore            
            return null;
        }

        public getColumnHeaderBackgroundColor() : string {
            // @ts-ignore            
            return null; // normaler Header-Hintergrundfarbe / null --> ohne, sonst "#FFFFFF"
        }
        public getCellBackgroundColor(row: Object, rowIndex: number) : string {
            // @ts-ignore            
            return null;//"#484848";
        }
        public getOnTopCellAlignment() : string {
            // @ts-ignore            
            return null;//"center";
        }
        public getCellForegroundColor(row: Object, rowIndex: number) : string {
            // @ts-ignore            
            return null;// null (für Standard) oder z.B. "#485A64";
        }
        public getCellAlignment(row: Object) : string {
            return "center"; // null (für Standard=left) oder left, right, center
        }
        public getColumnnWidth() : number {
            return 40; // null oder z.B. 50 für "50 Pixel"
        }
        public getColumnnFontSize() : number {
            // @ts-ignore            
            return null; // null = Default
        }
        public getOnTopColumnName() : string {
            // @ts-ignore            
            return null;// null wenn Doppelt Header ausgeschalten
        }; 
        public getOnTopColumnColSpan() : number {
            return 1;
        }
        public getValueAt(rowObject: Object, rowIndex: number) : string {
            return  "<img src=\"" + this.iconURL + "\" width=28px>";
        }
    }
  
    
    
    export abstract class AbstractStandardTextColumn extends AbstractColumn {
        constructor() {
            super("");
        }    
       public getOnTopBackgroundColor() : string { 
            // @ts-ignore
            return null;
        }
        public getColumnHeaderBackgroundColor() : string {
            // @ts-ignore            
            return null; // normaler Header-Hintergrundfarbe / null --> ohne, sonst "#FFFFFF"
        }
        public getCellBackgroundColor(row: Object,rowIndex: number) : string {
            // @ts-ignore            
            return null;//"#484848";
        }
        public getOnTopCellAlignment() : string {
            // @ts-ignore            
            return null;//"center";
        }
        public getCellForegroundColor(row: Object,rowIndex: number) : string {
            // @ts-ignore            
            return null;// null (für Standard) oder z.B. "#485A64";
        }
        public getCellAlignment(row: Object) : string {
            // @ts-ignore            
            return null; // null (für Standard=left) oder left, right, center
        }
        public getColumnnWidth() : number {
            // @ts-ignore            
            return null; // null oder z.B. 50 für "50 Pixel"
        }
        public getColumnnFontSize() : number {
            // @ts-ignore            
            return null; // null = Default
        }
        public getOnTopColumnName() : string {
            // @ts-ignore            
            return null;// null wenn Doppelt Header ausgeschalten
        }; 
        public getOnTopColumnColSpan() : number {
            return 1;
        }
        abstract getValueAt(rowObject: Object, rowIndex: number) : string;
    }
    
    
    module.exports = {AbstractColumn, HtmlTable, HtmlCreator, StaticIconColumn, AbstractStandardTextColumn };
    
    
    
    
    
    
    
    
    