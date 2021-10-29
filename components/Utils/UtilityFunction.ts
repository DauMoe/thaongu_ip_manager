import {Connection} from "mysql";

const dotenv = require("dotenv");
const mysql = require("mysql");
dotenv.config({"path": __dirname + "/../../.env"});

const DB_INFO: JSON = {
    // @ts-ignore
    "host": process.env.HOST || 'localhost',
    "user": process.env.DB_USER || 'root',
    "password": process.env.DB_PASS || '',
    "database": process.env.DB_NAME || 'thao_ip_manager'
}

/*      Don't let anyone change DB_INFO value   */
Object.freeze(DB_INFO);

export const Con4Java: Function = (data: any): string => {
    return "\"" + data + "\"";
}

export const DB_CONNECTION: Connection = mysql.createConnection(DB_INFO);
