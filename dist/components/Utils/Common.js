"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertTimeStamp2String = exports.YYYY_MM_DD_Reg = void 0;
var _MONTH = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Sep"];
//Date format reg: https://www.codegrepper.com/code-examples/javascript/regex+date+format+yyyy-mm-dd
exports.YYYY_MM_DD_Reg = new RegExp('^\\d{4}\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01])$');
var ConvertTimeStamp2String = function (timestamp, getDate, getTime) {
    if (getDate === void 0) { getDate = true; }
    if (getTime === void 0) { getTime = true; }
    var msg = "";
    if (!timestamp)
        return "";
    var _d = new Date(timestamp);
    if (getDate) {
        msg += _d.getFullYear();
        msg += "-";
        msg += _MONTH[_d.getMonth()];
        msg += "-";
        msg += (_d.getDate() < 10) ? "0" + _d.getDate() : _d.getDate();
    }
    if (getTime) {
        msg += " ";
        msg += (_d.getHours() < 10) ? "0" + _d.getHours() : _d.getHours();
        msg += ":";
        msg += (_d.getMinutes() < 10) ? "0" + _d.getMinutes() : _d.getMinutes();
        msg += ":";
        msg += (_d.getSeconds() < 10) ? "0" + _d.getSeconds() : _d.getSeconds();
    }
    return msg;
};
exports.ConvertTimeStamp2String = ConvertTimeStamp2String;
