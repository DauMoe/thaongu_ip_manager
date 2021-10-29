import {Response} from "express";

export const RespCustomCode: Function = (resp: Response, code: number, data: any, isBreak: boolean = true): void => {
    resp.send({
        "code": code,
        "msg": data
    });
    if (isBreak) return;
}

export const MissingField: Function = (resp: Response, field: string): void => {
    resp.send({
        "code": 403,
        "msg": [`\"'${field}' is required!\"`]
    })
    return;
}

export const SuccessResp: Function = (resp: Response, data: any, isBreak: boolean = true): void => {
    RespCustomCode(resp, 200, data, isBreak);
}

export const C201Resp: Function = (resp: Response, data: any, isBreak: boolean = true): void => {
    RespCustomCode(resp, 201, data, isBreak);
}
