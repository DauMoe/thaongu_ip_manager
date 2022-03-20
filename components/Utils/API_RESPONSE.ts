import {Response} from "express";

export const RespCustomCode: Function = (resp: Response, code: number, data: any): void => {
    resp.statusCode = 200;
    resp.json({
        "code": code,
        "msg": data
    });
}

export const MissingField: Function = (resp: Response, field: string): void => {
    resp.statusCode = 200;
    resp.json({
        "code": 403,
        "msg": [`\"'${field}' is required!\"`]
    });
}

export const SuccessResp: Function = (resp: Response, data?: any): void => {
    if (data === undefined) {
        RespCustomCode(resp, 200, "Successful!");
    } else {
        RespCustomCode(resp, 200, data);
    }
}

export const C201Resp: Function = (resp: Response, data: any): void => {
    RespCustomCode(resp, 201, data);
}

export const Con4Java: Function = (msg: string): string => {
    return msg;
}

export const DB_RESP: Function = (code: Number, msg: any): any => {
    return {
        code: code,
        msg: msg
    }
}
