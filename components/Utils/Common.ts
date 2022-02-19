import mysql from "mysql";
import {NextFunction, Request, Response} from "express";
import util from "util";

const _MONTH = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Sep"];

/*Date format reg: https://www.codegrepper.com/code-examples/javascript/regex+date+format+yyyy-mm-dd*/
export const YYYY_MM_DD_Reg = new RegExp('^\\d{4}\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01])$');

/*  Get and check function  */
const CheckInputType = (data: any, field: string, isRequired: boolean = true): void => {
    if (typeof(data) !== "object") throw TypeError("First arg must be a JSON Object");
    if (isRequired) {
        if (!data.hasOwnProperty(field)) throw Error(`'${field}' is required!`);
    }
}

const isArray: Function = (data: any): boolean => {
    if (typeof (data) !== "object") return false;
    let strData = JSON.stringify(data);
    return !(strData[0] !== "[" || strData[strData.length - 1] !== "]");
}

const isJSONObject: Function = (data: any): boolean => {
    if (typeof (data) !== "object") return false;
    let strData: string = JSON.stringify(data);
    if (strData[0] === "{" && strData[strData.length - 1] === "}") {
        return JSON.parse(strData) ? true : false;
    } else {
        return false;
    }
}

export const getString = (data: any, field: string, isRequired: boolean = true): string => {
    CheckInputType(data, field, isRequired);
    let msg = data[`${field}`];
    if (msg === undefined && !isRequired) return "";
    if (typeof (msg) === "object") throw TypeError(`'${field}' must be a string but get an object`);
    return msg;
}

export const getNumber = (data: any, field: string, isRequired: boolean = true): number => {
    CheckInputType(data, field, isRequired);
    let msg: number = data[`${field}`];
    if (msg === undefined && !isRequired) return -1;
    msg = Number.parseInt(data[`${field}`]);
    if (isNaN(msg)) throw TypeError(`'${field}' must be a number`);
    return msg;
}

export const getStringArray = (data: any, field: string, isRequired: boolean = true): any[] => {
    CheckInputType(data, field, isRequired);
    let msg: any[] = data[`${field}`];
    if (Array.isArray(msg) === false) throw TypeError(`'${field}' must be an array`);
    // msg.forEach((item, index) => {
    //     if (Array.isArray(item) === true || isJSONObject(item)) throw TypeError(`Item at index ${index} not a string`);
    // });
    return msg;
}

export const getNumberArray = (data: any, field: string, isRequired: boolean = true): Number[] => {
    CheckInputType(data, field, isRequired);
    let msg: any[] = data[`${field}`];
    if (Array.isArray(msg) === false) throw TypeError(`'${field}' must be an array`);
    msg.forEach((item, index) => {
        if (isNaN(Number.parseFloat(item))) throw TypeError(`Item at index ${index} not a number`);
    });
    return msg;
}

export const getSubArray = (data: any, field: string, isRequired: boolean = true): any => {
    CheckInputType(data, field, isRequired);
    let msg: any[] = data[`${field}`];
    if (Array.isArray(msg) === false) throw TypeError(`'${field}' must be an array`);
    msg.forEach((item, index) => {
        if (Array.isArray(item) === false) throw TypeError(`Item at index ${index} not an Array`);
    });
    return msg;
}

export const getJSONArray = (data: any, field: string, isRequired: boolean = true): any[] => {
    CheckInputType(data, field, isRequired);
    let msg: any[] = data[`${field}`];
    if (msg === undefined && !isRequired) return [];
    if (Array.isArray(msg) === false) throw TypeError(`'${field}' must be an array`);
    msg.forEach((item, index) => {
        if (!isJSONObject(item)) throw TypeError(`Item at index ${index} not a JSON`);
    });
    return msg;
}

export const getJSONObject = (data: any, field: string, isRequired: boolean = true): any => {
    CheckInputType(data, field, isRequired);
    let msg: any = data[`${field}`];
    if (msg === undefined && !isRequired) return {};
    if (!isJSONObject(msg)) throw TypeError(`'${field}' must be an JSONObject`);
    return msg;
}

export const AuthenticationUser = (req: Request, resp: Response, next: NextFunction) => {
    next();
}

//https://stackoverflow.com/questions/41442820/undefined-connection-during-database-pooling-in-node-js
const pool = mysql.createPool({
    connectionLimit : Number.parseInt(process.env.MAX_POOL_LIMIT as string) || 10,
    host            : process.env.DB_HOST as string || "localhost",
    user            : process.env.DB_USER as string || "root",
    password        : process.env.DB_PASS as string || "",
    database        : process.env.DB_NAME as string || "ip_manager"
});

export const connectionPool = pool.getConnection.bind(pool);

export const connection = mysql.createConnection({
    host            : process.env.DB_HOST as string || "localhost",
    user            : process.env.DB_USER as string || "root",
    password        : process.env.DB_PASS as string || "",
    database        : process.env.DB_NAME as string || "ip_manager"
});

export const query = util.promisify(connection.query).bind(connection);

/*===================================================================================================================================*/
export const _EscapeReg: Function = (msg: string): string => {
    return msg.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
}

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

const ListBaseExcelColsName: string[] = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export const GetCellNameByIndex = (cols_index: number, rows_index: number, get_list_cell_name: Boolean = false): string[] => {
    let temp = Math.floor(cols_index/(ListBaseExcelColsName.length-1));
    if (temp > 9) {
        throw Error("Sorry, I can't do that ~.~");
    }

    if (get_list_cell_name === true) {
        let temp: string[] = [];
        let times: number =  Math.floor(cols_index/(ListBaseExcelColsName.length-1));
        for (let i=0; i<times; i++) {
            ListBaseExcelColsName.map(function(item, index) {
                if (index > 0) {
                    temp.push(`${ListBaseExcelColsName[i]}${ListBaseExcelColsName[index]}${rows_index}`);
                }
            });
        }
        for (let i=0; i<cols_index%(ListBaseExcelColsName.length-1); i++) {
            temp.push(`${ListBaseExcelColsName[times]}${ListBaseExcelColsName[i+1]}${rows_index}`);
        }
        return temp;
    } else {
        let msg = "";
        if (temp > 0) {
            msg += ListBaseExcelColsName[temp];
        }
        msg += ListBaseExcelColsName[cols_index%(ListBaseExcelColsName.length-1)] + "" + rows_index;
        return [msg];
    }
}

export const DELETE_FILE_TIMEOUT: number = 1000 * 30;//30s