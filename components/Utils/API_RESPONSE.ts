import {Response} from "express";

export const RespCustomCode: Function = (resp: Response, code: number, data: any, isBreak: boolean = true): Response => {
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

export const SuccessResp: Function = (resp: Response, data: any, isBreak: boolean = true): Response => {
    return RespCustomCode(resp, 200, data, isBreak);
}

export const C201Resp: Function = (resp: Response, data: any, isBreak: boolean = true): Response => {
    return RespCustomCode(resp, 201, data, isBreak);
}
