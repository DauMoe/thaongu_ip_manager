"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckAdminRole = exports.CheckAuthMiddleWareMultiparty = exports.CheckAuthMiddleWare = void 0;
var Common_1 = require("./Common");
var mysql_1 = __importDefault(require("mysql"));
var API_RESPONSE_1 = require("./API_RESPONSE");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var UserDAO_1 = require("../User/UserDAO");
var CheckAuthMiddleWare = function (req, resp, next) { return __awaiter(void 0, void 0, void 0, function () {
    var reqData, ssid_1, SQL_QUERY, result_1, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reqData = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                ssid_1 = (0, Common_1.getString)(reqData, "ssid");
                SQL_QUERY = "SELECT b.IS_ADMIN, b.UID FROM SESSION a JOIN USER b ON a.UID = b.UID WHERE a.SESSION_TOKEN = ?";
                return [4 /*yield*/, (0, Common_1.query)(mysql_1.default.format(SQL_QUERY, [ssid_1]))];
            case 2:
                result_1 = _a.sent();
                // @ts-ignore
                if (result_1.length === 0) {
                    (0, API_RESPONSE_1.RespCustomCode)(resp, 700, "Invalid token!");
                    return [2 /*return*/];
                }
                jsonwebtoken_1.default.verify(ssid_1, "abc", function (err, decoded) {
                    if (err) {
                        (0, UserDAO_1.DeleteSessionDAO)(ssid_1);
                        (0, API_RESPONSE_1.RespCustomCode)(resp, 700, "Invalid token!");
                        return;
                    }
                    // @ts-ignore
                    reqData.request_user_is_admin = result_1[0].IS_ADMIN === 1 ? true : false;
                    // @ts-ignore
                    reqData.request_uid = result_1[0].UID;
                    next();
                });
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                //@ts-ignore
                if (e_1.hasOwnProperty("message")) {
                    //@ts-ignore
                    (0, API_RESPONSE_1.C201Resp)(resp, e_1.message);
                    return [2 /*return*/];
                }
                //@ts-ignore
                if (e_1.hasOwnProperty("sqlMessage")) {
                    //@ts-ignore
                    (0, API_RESPONSE_1.C201Resp)(resp, e_1.sqlMessage);
                    return [2 /*return*/];
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.CheckAuthMiddleWare = CheckAuthMiddleWare;
var CheckAuthMiddleWareMultiparty = function (req, resp, next) { return __awaiter(void 0, void 0, void 0, function () {
    var reqData, ssid_2, SQL_QUERY, result_2, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reqData = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                if (!req.fields.hasOwnProperty("ssid")) {
                    (0, API_RESPONSE_1.C201Resp)(resp, "'ssid' is required!");
                    return [2 /*return*/];
                }
                ssid_2 = req.fields.ssid[0];
                SQL_QUERY = "SELECT b.IS_ADMIN, b.UID FROM SESSION a JOIN USER b ON a.UID = b.UID WHERE a.SESSION_TOKEN = ?";
                return [4 /*yield*/, (0, Common_1.query)(mysql_1.default.format(SQL_QUERY, [ssid_2]))];
            case 2:
                result_2 = _a.sent();
                // @ts-ignore
                if (result_2.length === 0) {
                    (0, API_RESPONSE_1.RespCustomCode)(resp, 700, "Invalid token!");
                    return [2 /*return*/];
                }
                jsonwebtoken_1.default.verify(ssid_2, "abc", function (err, decoded) {
                    if (err) {
                        (0, UserDAO_1.DeleteSessionDAO)(ssid_2);
                        (0, API_RESPONSE_1.RespCustomCode)(resp, 700, "Invalid token!");
                        return;
                    }
                    // @ts-ignore
                    reqData.request_user_is_admin = result_2[0].IS_ADMIN === 1 ? true : false;
                    // @ts-ignore
                    reqData.request_uid = result_2[0].UID;
                    next();
                });
                return [3 /*break*/, 4];
            case 3:
                e_2 = _a.sent();
                //@ts-ignore
                if (e_2.hasOwnProperty("message")) {
                    //@ts-ignore
                    (0, API_RESPONSE_1.C201Resp)(resp, e_2.message);
                    return [2 /*return*/];
                }
                //@ts-ignore
                if (e_2.hasOwnProperty("sqlMessage")) {
                    //@ts-ignore
                    (0, API_RESPONSE_1.C201Resp)(resp, e_2.sqlMessage);
                    return [2 /*return*/];
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.CheckAuthMiddleWareMultiparty = CheckAuthMiddleWareMultiparty;
var CheckAdminRole = function (req, resp, next) { return __awaiter(void 0, void 0, void 0, function () {
    var reqData;
    return __generator(this, function (_a) {
        reqData = req.body;
        if (reqData.request_user_is_admin) {
            next();
        }
        else {
            (0, API_RESPONSE_1.C201Resp)(resp, "Only ADMIN can use this function!");
        }
        return [2 /*return*/];
    });
}); };
exports.CheckAdminRole = CheckAdminRole;
