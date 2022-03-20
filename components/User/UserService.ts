import {getBoolean, getNumber, getString, SALT_ROUNDS } from "../Utils/Common";
import { CreateUserDAO, DeleteSessionDAO,
    DeleteUserDAO, GetListUserDAO, GetUserInfoDAO, InsertSessionDAO, LoginDAO, UpdateUserInfoDAO } from "./UserDAO";
import {C201Resp, SuccessResp } from './../Utils/API_RESPONSE';
import { Request, Response } from 'express';
import bcrypt from "bcrypt";
import moment from "moment";
import jwt from "jsonwebtoken";

export const CreateUser = async (req: Request, resp: Response): Promise<void> => {
    let reqData = req.body;
    if(reqData.request_user_is_admin) {
        try {
            let email       : string  = getString(reqData, "email");
            let username    : string  = getString(reqData, "username");
            let fullname    : string  = getString(reqData, "fullname", false);
            let gender      : string  = getString(reqData, "gender", false);
            let password    : string  = getString(reqData, "password");
            let phone       : string  = getString(reqData, "phone", false);
            let dob         : string  = getString(reqData, "dob", false);
            let is_admin    : Boolean = getBoolean(reqData, "is_admin", false);

            if (dob !== "" && !moment(dob, "DD/MM/YYYY").isValid()) {
                C201Resp(resp, "'dob' phải theo định dạng DD/MM/YYYY");
                return;
            }

            bcrypt.hash(password, SALT_ROUNDS, async function(err, hash) {
                if (err) {
                    C201Resp(resp, err);
                    return;
                }
                await CreateUserDAO(email, username, fullname, hash, gender, phone, moment(dob).format("DD/MM/YYYY"), +is_admin);
                SuccessResp(resp, "Thành công");
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
    } else {
        C201Resp(resp, "Chỉ ADMIN mới thực hiện được chức năng này");
    }
}

export const Login = async (req: Request, resp: Response): Promise<void> => {
    let reqData = req.body;
    try {
        let email   : string = getString(reqData, "email");
        let pass    : string = getString(reqData, "pass");
        let result = await LoginDAO(email, pass);
        // @ts-ignore
        if (result.length === 0) {
            C201Resp(resp, "Tài khoản không tồn tại!");
            return;
        }
        // @ts-ignore
        const MatchPassword: Boolean = await bcrypt.compare(pass, result[0].PASSWORD);
        if (!MatchPassword) {
            C201Resp(resp, "Sai mật khẩu!");
            return;
        }
        const token = jwt.sign({
            // @ts-ignore
            is_admin: result[0].IS_ADMIN === 1,
            // @ts-ignore
            fullname: result[0].FULLNAME
        }, 'abc', { expiresIn: process.env.SESSION_EXPIRED });
        // @ts-ignore
        await InsertSessionDAO(token, result[0].UID);
        SuccessResp(resp, {token});
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

export const Logout = async(req: Request, resp: Response) => {
    let reqData = req.body;
    try {
        let ssid: string = getString(reqData, "ssid");
        await DeleteSessionDAO(ssid);
        SuccessResp(resp, "Logout successful");
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

export const GetListUser = async(req: Request, resp: Response) => {
    let reqData = req.body;
    try {
        let result = await GetListUserDAO(reqData.request_user_is_admin, reqData.request_uid);
        let respResult = [];
        // @ts-ignore
        for (let i of result) {
            respResult.push({
                "uid": i.UID,
                "email": i.EMAIL,
                "username": i.USERNAME,
                "fullname": i.FULLNAME,
                "dob": moment(i.DOB).format("YYYY-MM-DD"),
                "gender": i.GENDER,
                "phone": i.PHONE,
                "is_admin": i.IS_ADMIN === 1 ? true : false
            });
        }
        SuccessResp(resp, respResult);
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

export const GetUserInfo = async(req: Request, resp: Response) => {
    let reqData = req.body;
    try {
        let uid: Number = getNumber(reqData, "uid");
        if (!reqData.request_user_is_admin && reqData.request_uid !== uid) {
            C201Resp(resp, "You don't have permission to get this user info!");
            return;
        }
        let result = await GetUserInfoDAO(uid);
        let respResult = [];
        // @ts-ignore
        for (let i of result) {
            respResult.push({
                "uid": i.UID,
                "email": i.EMAIL,
                "username": i.USERNAME,
                "fullname": i.FULLNAME,
                "dob": moment(i.DOB).format("YYYY-MM-DD"),
                "gender": i.GENDER,
                "phone": i.PHONE,
                "is_admin": i.IS_ADMIN === 1 ? true : false
            });
        }
        SuccessResp(resp, respResult);
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

export const UpdateUserInfo = async(req: Request, resp: Response) => {
    let reqData = req.body;
    try {
        let uid: Number = getNumber(reqData, "uid");
        if (!reqData.request_user_is_admin && reqData.request_uid !== uid) {
            C201Resp(resp, "You don't have permission to get this user info!");
            return;
        }
        let username: string  = getString(reqData, "username");
        let fullname: string  = getString(reqData, "fullname");
        let dob     : string  = getString(reqData, "dob");
        let gender  : Number  = getNumber(reqData, "gender");
        let phone   : string  = getString(reqData, "phone");
        let is_admin: Boolean = getBoolean(reqData, "is_admin");

        if (!moment(dob, "YYYY-MM-DD").isValid()) {
            C201Resp(resp, "'dob' must be 'YYYY-MM-DD' format!");
            return;
        }
        
        await UpdateUserInfoDAO(uid, username, fullname, moment(dob).format("YYYY-MM-DD"), gender, phone, +is_admin, reqData.request_user_is_admin);
        SuccessResp(resp);
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

export const DeleteUser = async(req: Request, resp: Response) => {
    let reqData = req.body;
    try {
        let uid: Number = getNumber(reqData, "uid");
        if (uid === reqData.request_uid) {
            C201Resp(resp, "You can't delete YOURSELF!");
            return;
        }
        await DeleteUserDAO(uid);
        SuccessResp(resp);
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