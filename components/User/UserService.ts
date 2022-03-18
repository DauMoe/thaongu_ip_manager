import {getBoolean, getString, SALT_ROUNDS } from "../Utils/Common";
import { CreateUserDAO, InsertSessionDAO, LoginDAO } from "./UserDAO";
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

        const token = jwt.sign({}, 'abc', { expiresIn: process.env.SESSION_EXPIRED });
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