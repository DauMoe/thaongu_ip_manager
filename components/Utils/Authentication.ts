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
        let SQL_QUERY   :string = "SELECT IS_ADMIN FROM SESSION a JOIN USER b ON a.UID = b.UID WHERE a.SESSION_TOKEN = ?";
        let result = await query(mysql.format(SQL_QUERY, [ssid]));
        // @ts-ignore
        if (result.length === 0) {
            RespCustomCode(resp, 700, "Token không hợp lệ!");
            return;
        }
        jwt.verify(ssid, "abc", function(err, decoded) {
            if (err) {
                DeleteSessionDAO(ssid);
                RespCustomCode(resp, 700, "Token không hợp lệ!");
                return;
            }
            // @ts-ignore
            reqData.request_user_is_admin = result[0].IS_ADMIN === 1 ? true : false;
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
        C201Resp(resp, "Chỉ ADMIN được thực hiện chức năng này");
    }
}