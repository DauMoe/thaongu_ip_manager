/*      Middleware to check authentication and authorization    */
import {NextFunction, Request, Response} from "express";
import {connection, getString, query } from "./Common";
import mysql from "mysql";
import { C201Resp, RespCustomCode } from "./API_RESPONSE";
import jwt from "jsonwebtoken";
import { DeleteSessionDAO } from "../User/UserDAO";

export const CheckAuthMiddleWare = async (req: Request, resp: Response, next: NextFunction) => {
    let reqData = req.body;
    try {
        let ssid        :string = getString(reqData, "ssid");
        let SQL_QUERY   :string = "SELECT b.IS_ADMIN, b.UID FROM SESSION a JOIN USER b ON a.UID = b.UID WHERE a.SESSION_TOKEN = ?";
        let result = await query(mysql.format(SQL_QUERY, [ssid]));
        // @ts-ignore
        if (result.length === 0) {
            RespCustomCode(resp, 700, "Invalid token!");
            return;
        }
        jwt.verify(ssid, "abc", function(err, decoded) {
            if (err) {
                DeleteSessionDAO(ssid);
                RespCustomCode(resp, 700, "Invalid token!");
                return;
            }
            // @ts-ignore
            reqData.request_user_is_admin   = result[0].IS_ADMIN === 1 ? true : false;
            // @ts-ignore
            reqData.request_uid             = result[0].UID;
            next();
        });
    } catch (e) {
        //@ts-ignore
        if (e.hasOwnProperty("message")) {
            //@ts-ignore
            C201Resp(resp, e.message);
            return;
        }
        //@ts-ignore
        if (e.hasOwnProperty("sqlMessage")) {
            //@ts-ignore
            C201Resp(resp, e.sqlMessage);
            return;
        }
    }
}

export const CheckAuthMiddleWareMultiparty = async (req: Request, resp: Response, next: NextFunction) => {
    let reqData = req.body;
    try {
        if (!req.fields.hasOwnProperty("ssid")) {
            C201Resp(resp, "'ssid' is required!");
            return;
        }
        let ssid        :string = req.fields.ssid[0];
        let SQL_QUERY   :string = "SELECT b.IS_ADMIN, b.UID FROM SESSION a JOIN USER b ON a.UID = b.UID WHERE a.SESSION_TOKEN = ?";
        let result = await query(mysql.format(SQL_QUERY, [ssid]));
        // @ts-ignore
        if (result.length === 0) {
            RespCustomCode(resp, 700, "Invalid token!");
            return;
        }
        jwt.verify(ssid, "abc", function(err, decoded) {
            if (err) {
                DeleteSessionDAO(ssid);
                RespCustomCode(resp, 700, "Invalid token!");
                return;
            }
            // @ts-ignore
            reqData.request_user_is_admin   = result[0].IS_ADMIN === 1 ? true : false;
            // @ts-ignore
            reqData.request_uid             = result[0].UID;
            next();
        });
    } catch (e) {
        //@ts-ignore
        if (e.hasOwnProperty("message")) {
            //@ts-ignore
            C201Resp(resp, e.message);
            return;
        }
        //@ts-ignore
        if (e.hasOwnProperty("sqlMessage")) {
            //@ts-ignore
            C201Resp(resp, e.sqlMessage);
            return;
        }
    }
}

export const CheckAdminRole = async (req: Request, resp: Response, next: NextFunction) => {
    let reqData = req.body;
    if (reqData.request_user_is_admin) {
        next();
    } else {
        C201Resp(resp, "Only ADMIN can use this function!");
    }
}