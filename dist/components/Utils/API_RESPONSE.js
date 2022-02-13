"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_RESP = exports.Con4Java = exports.C201Resp = exports.SuccessResp = exports.MissingField = exports.RespCustomCode = void 0;
var RespCustomCode = function (resp, code, data) {
    resp.statusCode = 200;
    resp.json({
        "code": code,
        "msg": data
    });
};
exports.RespCustomCode = RespCustomCode;
var MissingField = function (resp, field) {
    resp.statusCode = 200;
    resp.json({
        "code": 403,
        "msg": ["\"'" + field + "' is required!\""]
    });
};
exports.MissingField = MissingField;
var SuccessResp = function (resp, data) {
    if (data === undefined) {
        (0, exports.RespCustomCode)(resp, 200, "Thành công");
    }
    else {
        (0, exports.RespCustomCode)(resp, 200, data);
    }
};
exports.SuccessResp = SuccessResp;
var C201Resp = function (resp, data) {
    (0, exports.RespCustomCode)(resp, 201, data);
};
exports.C201Resp = C201Resp;
var Con4Java = function (msg) {
    return msg;
};
exports.Con4Java = Con4Java;
var DB_RESP = function (code, msg) {
    return {
        code: code,
        msg: msg
    };
};
exports.DB_RESP = DB_RESP;
