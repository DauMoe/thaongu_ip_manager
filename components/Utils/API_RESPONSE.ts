import {Response} from "express";

export const RespCustomCode: Function = (resp: Response, code: number, data: any): Response => {
    resp.statusCode = 200;
    resp.send({
        "code": code,
        "msg": data
    });
    return resp;
}

export const MissingField: Function = (resp: Response, field: string): Response => {
    resp.statusCode = 200;
    resp.send({
        "code": 403,
        "msg": [`\"'${field}' is required!\"`]
    })
    return resp;
}

export const SuccessResp: Function = (resp: Response, data?: any, isBreak?: boolean): Response => {
    if (data === undefined) {
        return RespCustomCode(resp, 200, ["Success"]);
    }
    return RespCustomCode(resp, 200, data);
}

export const C201Resp: Function = (resp: Response, data: any): Response => {
    return RespCustomCode(resp, 201, data);
}

export const Con4Java: Function = (msg: string): string => {
    return "\"" + msg + "\"";
}
