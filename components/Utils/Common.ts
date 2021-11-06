const _MONTH = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Sep"];

//Date format reg: https://www.codegrepper.com/code-examples/javascript/regex+date+format+yyyy-mm-dd
export const YYYY_MM_DD_Reg = new RegExp('^\\d{4}\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01])$');

export const ConvertTimeStamp2String = (timestamp: number | string | Date, getDate = true, getTime = true) => {
    let msg = "";
    if (!timestamp) return "";
    let _d = new Date(timestamp);

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
}