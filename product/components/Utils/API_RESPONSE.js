"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Con4Java = exports.C201Resp = exports.SuccessResp = exports.MissingField = exports.RespCustomCode = void 0;
const RespCustomCode = (resp, code, data) => {
    resp.statusCode = 200;
    resp.json({
        "code": code,
        "msg": data
    });
};
exports.RespCustomCode = RespCustomCode;
const MissingField = (resp, field) => {
    resp.statusCode = 200;
    resp.json({
        "code": 403,
        "msg": [`\"'${field}' is required!\"`]
    });
};
exports.MissingField = MissingField;
const SuccessResp = (resp, data) => {
    if (data === undefined) {
        (0, exports.RespCustomCode)(resp, 200, ["Success"]);
    }
    else {
        (0, exports.RespCustomCode)(resp, 200, data);
    }
};
exports.SuccessResp = SuccessResp;
const C201Resp = (resp, data) => {
    (0, exports.RespCustomCode)(resp, 201, data);
};
exports.C201Resp = C201Resp;
const Con4Java = (msg) => {
    return msg;
};
exports.Con4Java = Con4Java;
