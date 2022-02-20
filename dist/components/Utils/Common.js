"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE_FILE_TIMEOUT = exports.GetCellNameByIndex = exports.ConvertTimeStamp2String = exports._EscapeReg = exports.query = exports.connection = exports.connectionPool = exports.AuthenticationUser = exports.getJSONObject = exports.getJSONArray = exports.getSubArray = exports.getNumberArray = exports.getStringArray = exports.getNumber = exports.getString = exports.YYYY_MM_DD_Reg = void 0;
var mysql_1 = __importDefault(require("mysql"));
var util_1 = __importDefault(require("util"));
var _MONTH = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Sep"];
/*Date format reg: https://www.codegrepper.com/code-examples/javascript/regex+date+format+yyyy-mm-dd*/
exports.YYYY_MM_DD_Reg = new RegExp('^\\d{4}\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01])$');
/*  Get and check function  */
var CheckInputType = function (data, field, isRequired) {
    if (isRequired === void 0) { isRequired = true; }
    if (typeof (data) !== "object")
        throw TypeError("First arg must be a JSON Object");
    if (isRequired) {
        if (!data.hasOwnProperty(field))
            throw Error("'" + field + "' is required!");
    }
};
var isArray = function (data) {
    if (typeof (data) !== "object")
        return false;
    var strData = JSON.stringify(data);
    return !(strData[0] !== "[" || strData[strData.length - 1] !== "]");
};
var isJSONObject = function (data) {
    if (typeof (data) !== "object")
        return false;
    var strData = JSON.stringify(data);
    if (strData[0] === "{" && strData[strData.length - 1] === "}") {
        return JSON.parse(strData) ? true : false;
    }
    else {
        return false;
    }
};
var getString = function (data, field, isRequired) {
    if (isRequired === void 0) { isRequired = true; }
    CheckInputType(data, field, isRequired);
    var msg = data["" + field];
    if (msg === undefined && !isRequired)
        return "";
    if (typeof (msg) === "object")
        throw TypeError("'" + field + "' must be a string but get an object");
    return msg;
};
exports.getString = getString;
var getNumber = function (data, field, isRequired) {
    if (isRequired === void 0) { isRequired = true; }
    CheckInputType(data, field, isRequired);
    var msg = data["" + field];
    if (msg === undefined && !isRequired)
        return -1;
    msg = Number.parseInt(data["" + field]);
    if (isNaN(msg))
        throw TypeError("'" + field + "' must be a number");
    return msg;
};
exports.getNumber = getNumber;
var getStringArray = function (data, field, isRequired) {
    if (isRequired === void 0) { isRequired = true; }
    CheckInputType(data, field, isRequired);
    var msg = data["" + field];
    if (Array.isArray(msg) === false)
        throw TypeError("'" + field + "' must be an array");
    // msg.forEach((item, index) => {
    //     if (Array.isArray(item) === true || isJSONObject(item)) throw TypeError(`Item at index ${index} not a string`);
    // });
    return msg;
};
exports.getStringArray = getStringArray;
var getNumberArray = function (data, field, isRequired) {
    if (isRequired === void 0) { isRequired = true; }
    CheckInputType(data, field, isRequired);
    var msg = data["" + field];
    if (Array.isArray(msg) === false)
        throw TypeError("'" + field + "' must be an array");
    msg.forEach(function (item, index) {
        if (isNaN(Number.parseFloat(item)))
            throw TypeError("Item at index " + index + " not a number");
    });
    return msg;
};
exports.getNumberArray = getNumberArray;
var getSubArray = function (data, field, isRequired) {
    if (isRequired === void 0) { isRequired = true; }
    CheckInputType(data, field, isRequired);
    var msg = data["" + field];
    if (Array.isArray(msg) === false)
        throw TypeError("'" + field + "' must be an array");
    msg.forEach(function (item, index) {
        if (Array.isArray(item) === false)
            throw TypeError("Item at index " + index + " not an Array");
    });
    return msg;
};
exports.getSubArray = getSubArray;
var getJSONArray = function (data, field, isRequired) {
    if (isRequired === void 0) { isRequired = true; }
    CheckInputType(data, field, isRequired);
    var msg = data["" + field];
    if (msg === undefined && !isRequired)
        return [];
    if (Array.isArray(msg) === false)
        throw TypeError("'" + field + "' must be an array");
    msg.forEach(function (item, index) {
        if (!isJSONObject(item))
            throw TypeError("Item at index " + index + " not a JSON");
    });
    return msg;
};
exports.getJSONArray = getJSONArray;
var getJSONObject = function (data, field, isRequired) {
    if (isRequired === void 0) { isRequired = true; }
    CheckInputType(data, field, isRequired);
    var msg = data["" + field];
    if (msg === undefined && !isRequired)
        return {};
    if (!isJSONObject(msg))
        throw TypeError("'" + field + "' must be an JSONObject");
    return msg;
};
exports.getJSONObject = getJSONObject;
var AuthenticationUser = function (req, resp, next) {
    next();
};
exports.AuthenticationUser = AuthenticationUser;
//https://stackoverflow.com/questions/41442820/undefined-connection-during-database-pooling-in-node-js
var pool = mysql_1.default.createPool({
    connectionLimit: Number.parseInt(process.env.MAX_POOL_LIMIT) || 10,
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "ip_manager"
});
exports.connectionPool = pool.getConnection.bind(pool);
exports.connection = mysql_1.default.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "ip_manager"
});
exports.query = util_1.default.promisify(exports.connection.query).bind(exports.connection);
/*===================================================================================================================================*/
var _EscapeReg = function (msg) {
    return msg.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
};
exports._EscapeReg = _EscapeReg;
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
var ListBaseExcelColsName = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var GetCellNameByIndex = function (cols_index, rows_index, get_list_cell_name) {
    if (get_list_cell_name === void 0) { get_list_cell_name = false; }
    var temp = Math.floor(cols_index / (ListBaseExcelColsName.length - 1));
    if (temp > 9) {
        throw Error("Sorry, I can't do that ~.~");
    }
    if (get_list_cell_name === true) {
        var temp_1 = [];
        var times = Math.floor(cols_index / (ListBaseExcelColsName.length - 1));
        var _loop_1 = function (i) {
            ListBaseExcelColsName.map(function (item, index) {
                if (index > 0) {
                    temp_1.push("" + ListBaseExcelColsName[i] + ListBaseExcelColsName[index] + rows_index);
                }
            });
        };
        for (var i = 0; i < times; i++) {
            _loop_1(i);
        }
        for (var i = 0; i < cols_index % (ListBaseExcelColsName.length - 1); i++) {
            temp_1.push("" + ListBaseExcelColsName[times] + ListBaseExcelColsName[i + 1] + rows_index);
        }
        return temp_1;
    }
    else {
        var msg = "";
        if (temp > 0) {
            msg += ListBaseExcelColsName[temp];
        }
        msg += ListBaseExcelColsName[cols_index % (ListBaseExcelColsName.length - 1)] + "" + rows_index;
        return [msg];
    }
};
exports.GetCellNameByIndex = GetCellNameByIndex;
exports.DELETE_FILE_TIMEOUT = 1000 * 30; //30s
