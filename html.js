"use strict";
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
exports.AbstractStandardTextColumn = exports.StaticIconColumn = exports.HtmlCreator = exports.HtmlTable = exports.AbstractColumn = void 0;
var AbstractColumn = /** @class */ (function () {
    function AbstractColumn(columnName) {
        this.columnName = columnName;
    }
    AbstractColumn.prototype.getColumnName = function () {
        return this.columnName;
    };
    return AbstractColumn;
}());
exports.AbstractColumn = AbstractColumn;
var HtmlTable = /** @class */ (function () {
    function HtmlTable() {
        this.columns = [];
    }
    HtmlTable.prototype.isHeaderVisible = function () {
        return this.headerVisible;
    };
    HtmlTable.prototype.getTableTitle = function () {
        return this.tableTitle;
    };
    HtmlTable.prototype.setTableTitle = function (tableTitle) {
        this.tableTitle = tableTitle;
    };
    HtmlTable.prototype.getColumns = function () {
        return this.columns;
    };
    HtmlTable.prototype.getRows = function () {
        return this.rows;
    };
    HtmlTable.prototype.isDoubleHeaderVisible = function () {
        return this.doubleHeaderVisible;
    };
    HtmlTable.prototype.setHeaderVisible = function (headerVisible) {
        this.headerVisible = headerVisible;
    };
    HtmlTable.prototype.setDoubleHeaderVisible = function (doubleHeaderVisible) {
        this.doubleHeaderVisible = doubleHeaderVisible;
    };
    HtmlTable.prototype.setRows = function (rows) {
        this.rows = rows;
    };
    HtmlTable.prototype.addColumn = function (column) {
        this.columns.push(column);
    };
    return HtmlTable;
}());
exports.HtmlTable = HtmlTable;
var HtmlCreator = /** @class */ (function () {
    function HtmlCreator(adapter) {
        this.adapter = adapter;
        this.tables = [];
        this.separatorRowAfterObjectThick = [];
        this.separatorRowAfterObjectThin = [];
    }
    HtmlCreator.prototype.addTable = function (table) {
        this.tables.push(table);
    };
    HtmlCreator.prototype.setBackgroundImage = function (backgroundImageUrl) {
        this.backgroundImageUrl = backgroundImageUrl;
    };
    HtmlCreator.prototype.setAdditionalHTMLaboveTable = function (additionalHTMLaboveTable) {
        this.additionalHTMLaboveTable = additionalHTMLaboveTable;
    };
    HtmlCreator.prototype.addSeparatorAfterObjectThick = function (separator) {
        this.separatorRowAfterObjectThick.push(separator);
    };
    HtmlCreator.prototype.addSeparatorAfterObjectThin = function (separator) {
        this.separatorRowAfterObjectThin.push(separator);
    };
    HtmlCreator.prototype.setHtmlState = function (htmlState) {
        this.htmlState = htmlState;
        this.adapter.createState(htmlState, "", {
            name: htmlState,
            desc: htmlState,
            type: 'string',
            read: true,
            write: true
        });
    };
    HtmlCreator.prototype.createHTML = function () {
        var _this = this;
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
            html += this.additionalHTMLaboveTable; // + "<p>";
        }
        if (this.backgroundImageUrl != null) {
            //html +=                 "background: white url(\"" + this.backgroundImageUrl + "\") no-repeat; border-collapse: collapse; \n";
            html += "       <table class=\"style1\" width=\"95%\" style=\"margin:5px\" background=\"" + this.backgroundImageUrl + "\">                         \n";
        }
        else {
            html += "       <table class=\"style1\" width=\"95%\" style=\"margin:5px\">                         \n";
        }
        //<table border=1 background="bg-red.png">
        // Max. Columns ermitteln:
        var maxCols = 0;
        this.tables.forEach(function (table) {
            if (table.getColumns().length > maxCols) {
                maxCols = table.getColumns().length;
            }
        });
        var tableIndex = 0;
        this.tables.forEach(function (table) {
            if (tableIndex++ != 0) {
                html += "       <tr class=\"style1\"><td class=\"style1\" colspan=\"" + maxCols + "\" style=\"padding: 6px;  background-color:#212121\"></td></tr>";
            }
            if (table.isDoubleHeaderVisible() == true) {
                html += "           <tr class=\"style1\">                                    \n";
                var skipColumns = 0;
                table.getColumns().forEach(function (column) {
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
                        html += "           <th class=\"style1\" colspan=\"" + colSpan + "\" + style=\" " + cellBackground + cellAlignment + "\">" + column.getOnTopColumnName() + "</th>";
                        skipColumns += colSpan - 1;
                    }
                    else {
                        skipColumns--;
                    }
                });
                html += "           </tr>                                   \n";
            }
            if (table.isHeaderVisible() == true) {
                html += "           <tr class=\"style1\">                                    \n";
                table.getColumns().forEach(function (column) {
                    // Background-Color:
                    var userBackground = column.getColumnHeaderBackgroundColor();
                    if (userBackground != null) {
                        //html += "           <th><font size=2px\">" + column.getColumnName() + "</th></font>	\n";
                        var cellBackground = " background-color:" + userBackground + ";";
                        html += "           <th class=\"style1\" style=\" " + cellBackground + "\">" + "<font size=2px\">" + column.getColumnName() + "</font></th>";
                    }
                    else {
                        html += "           <th class=\"style1\"><font size=2px\">" + column.getColumnName() + "</th></font>	\n";
                    }
                });
                html += "           </tr>                                   \n";
            }
            if (table.getTableTitle() != null) {
                //html += "       <tr><td colspan=\"" + maxCols + "\" style=\"padding: 6px;  background-color:#212121\"></td></tr>";    
                html += "       <tr class=\"style1\">\n";
                html += "           <td class=\"style1\" colspan=\"" + maxCols + "\">" + table.getTableTitle() + "</td>                                   \n";
                html += "           </tr>                                   \n";
            }
            var rowIndex = -1;
            table.getRows().forEach(function (row) {
                rowIndex++;
                html += "       <tr class=\"style1\">                                    \n";
                table.getColumns().forEach(function (column) {
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
                        html += "           <td class=\"style1\"" + cellWidth + " style=\" " + cellForegorund + cellBackground + cellAlignment + "        \">" + cellValue + "</td>";
                    }
                    else {
                        html += "           <td class=\"style1\"" + cellWidth + " style=\" " + cellForegorund + cellBackground + cellAlignment + " \">" + "<font size=\"" + column.getColumnnFontSize() + "\"  >" + cellValue + "</font></td>";
                    }
                });
                html += "       </tr>                                    \n";
                // Separator Thick:
                var found = false;
                for (var i = 0; i < _this.separatorRowAfterObjectThick.length; i++) {
                    if (_this.separatorRowAfterObjectThick[i] == row) {
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
                for (var i = 0; i < _this.separatorRowAfterObjectThin.length; i++) {
                    if (_this.separatorRowAfterObjectThin[i] == row) {
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
        html += "</table>\n";
        html += "</body>\n";
        html += "</html>\n";
        this.adapter.setState(this.htmlState, html);
    };
    return HtmlCreator;
}());
exports.HtmlCreator = HtmlCreator;
// Icon Spalte die sich nie ändert
var StaticIconColumn = /** @class */ (function (_super) {
    __extends(StaticIconColumn, _super);
    function StaticIconColumn(iconURL) {
        var _this = _super.call(this, iconURL) || this;
        _this.iconURL = iconURL;
        return _this;
    }
    StaticIconColumn.prototype.getOnTopBackgroundColor = function () {
        // @ts-ignore            
        return null;
    };
    StaticIconColumn.prototype.getColumnHeaderBackgroundColor = function () {
        // @ts-ignore            
        return null; // normaler Header-Hintergrundfarbe / null --> ohne, sonst "#FFFFFF"
    };
    StaticIconColumn.prototype.getCellBackgroundColor = function (row, rowIndex) {
        // @ts-ignore            
        return null; //"#484848";
    };
    StaticIconColumn.prototype.getOnTopCellAlignment = function () {
        // @ts-ignore            
        return null; //"center";
    };
    StaticIconColumn.prototype.getCellForegroundColor = function (row, rowIndex) {
        // @ts-ignore            
        return null; // null (für Standard) oder z.B. "#485A64";
    };
    StaticIconColumn.prototype.getCellAlignment = function (row) {
        return "center"; // null (für Standard=left) oder left, right, center
    };
    StaticIconColumn.prototype.getColumnnWidth = function () {
        return 40; // null oder z.B. 50 für "50 Pixel"
    };
    StaticIconColumn.prototype.getColumnnFontSize = function () {
        // @ts-ignore            
        return null; // null = Default
    };
    StaticIconColumn.prototype.getOnTopColumnName = function () {
        // @ts-ignore            
        return null; // null wenn Doppelt Header ausgeschalten
    };
    ;
    StaticIconColumn.prototype.getOnTopColumnColSpan = function () {
        return 1;
    };
    StaticIconColumn.prototype.getValueAt = function (rowObject, rowIndex) {
        return "<img src=\"" + this.iconURL + "\" width=28px>";
    };
    return StaticIconColumn;
}(AbstractColumn));
exports.StaticIconColumn = StaticIconColumn;
var AbstractStandardTextColumn = /** @class */ (function (_super) {
    __extends(AbstractStandardTextColumn, _super);
    function AbstractStandardTextColumn() {
        return _super.call(this, "") || this;
    }
    AbstractStandardTextColumn.prototype.getOnTopBackgroundColor = function () {
        // @ts-ignore
        return null;
    };
    AbstractStandardTextColumn.prototype.getColumnHeaderBackgroundColor = function () {
        // @ts-ignore            
        return null; // normaler Header-Hintergrundfarbe / null --> ohne, sonst "#FFFFFF"
    };
    AbstractStandardTextColumn.prototype.getCellBackgroundColor = function (row, rowIndex) {
        // @ts-ignore            
        return null; //"#484848";
    };
    AbstractStandardTextColumn.prototype.getOnTopCellAlignment = function () {
        // @ts-ignore            
        return null; //"center";
    };
    AbstractStandardTextColumn.prototype.getCellForegroundColor = function (row, rowIndex) {
        // @ts-ignore            
        return null; // null (für Standard) oder z.B. "#485A64";
    };
    AbstractStandardTextColumn.prototype.getCellAlignment = function (row) {
        // @ts-ignore            
        return null; // null (für Standard=left) oder left, right, center
    };
    AbstractStandardTextColumn.prototype.getColumnnWidth = function () {
        // @ts-ignore            
        return null; // null oder z.B. 50 für "50 Pixel"
    };
    AbstractStandardTextColumn.prototype.getColumnnFontSize = function () {
        // @ts-ignore            
        return null; // null = Default
    };
    AbstractStandardTextColumn.prototype.getOnTopColumnName = function () {
        // @ts-ignore            
        return null; // null wenn Doppelt Header ausgeschalten
    };
    ;
    AbstractStandardTextColumn.prototype.getOnTopColumnColSpan = function () {
        return 1;
    };
    return AbstractStandardTextColumn;
}(AbstractColumn));
exports.AbstractStandardTextColumn = AbstractStandardTextColumn;
module.exports = { AbstractColumn: AbstractColumn, HtmlTable: HtmlTable, HtmlCreator: HtmlCreator, StaticIconColumn: StaticIconColumn, AbstractStandardTextColumn: AbstractStandardTextColumn };
