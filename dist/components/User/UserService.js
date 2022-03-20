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
exports.DeleteUser = exports.UpdateUserInfo = exports.GetUserInfo = exports.GetListUser = exports.Logout = exports.Login = exports.CreateUser = void 0;
var Common_1 = require("../Utils/Common");
var UserDAO_1 = require("./UserDAO");
var API_RESPONSE_1 = require("./../Utils/API_RESPONSE");
var bcrypt_1 = __importDefault(require("bcrypt"));
var moment_1 = __importDefault(require("moment"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var CreateUser = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var reqData, email_1, username_1, fullname_1, gender_1, password, phone_1, dob_1, is_admin_1;
    return __generator(this, function (_a) {
        reqData = req.body;
        if (reqData.request_user_is_admin) {
            try {
                email_1 = (0, Common_1.getString)(reqData, "email");
                username_1 = (0, Common_1.getString)(reqData, "username");
                fullname_1 = (0, Common_1.getString)(reqData, "fullname", false);
                gender_1 = (0, Common_1.getString)(reqData, "gender", false);
                password = (0, Common_1.getString)(reqData, "password");
                phone_1 = (0, Common_1.getString)(reqData, "phone", false);
                dob_1 = (0, Common_1.getString)(reqData, "dob", false);
                is_admin_1 = (0, Common_1.getBoolean)(reqData, "is_admin", false);
                if (dob_1 !== "" && !(0, moment_1.default)(dob_1, "DD/MM/YYYY").isValid()) {
                    (0, API_RESPONSE_1.C201Resp)(resp, "'dob' phải theo định dạng DD/MM/YYYY");
                    return [2 /*return*/];
                }
                bcrypt_1.default.hash(password, Common_1.SALT_ROUNDS, function (err, hash) {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (err) {
                                        (0, API_RESPONSE_1.C201Resp)(resp, err);
                                        return [2 /*return*/];
                                    }
                                    return [4 /*yield*/, (0, UserDAO_1.CreateUserDAO)(email_1, username_1, fullname_1, hash, gender_1, phone_1, (0, moment_1.default)(dob_1).format("DD/MM/YYYY"), +is_admin_1)];
                                case 1:
                                    _a.sent();
                                    (0, API_RESPONSE_1.SuccessResp)(resp, "Thành công");
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
            }
            catch (e) {
                //@ts-ignore
                if (e.hasOwnProperty("message")) {
                    //@ts-ignore
                    (0, API_RESPONSE_1.C201Resp)(resp, e.message);
                    return [2 /*return*/];
                }
                //@ts-ignore
                if (e.hasOwnProperty("sqlMessage")) {
                    //@ts-ignore
                    (0, API_RESPONSE_1.C201Resp)(resp, e.sqlMessage);
                    return [2 /*return*/];
                }
            }
        }
        else {
            (0, API_RESPONSE_1.C201Resp)(resp, "Chỉ ADMIN mới thực hiện được chức năng này");
        }
        return [2 /*return*/];
    });
}); };
exports.CreateUser = CreateUser;
var Login = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var reqData, email, pass, result, MatchPassword, token, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reqData = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                email = (0, Common_1.getString)(reqData, "email");
                pass = (0, Common_1.getString)(reqData, "pass");
                return [4 /*yield*/, (0, UserDAO_1.LoginDAO)(email, pass)];
            case 2:
                result = _a.sent();
                // @ts-ignore
                if (result.length === 0) {
                    (0, API_RESPONSE_1.C201Resp)(resp, "Tài khoản không tồn tại!");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcrypt_1.default.compare(pass, result[0].PASSWORD)];
            case 3:
                MatchPassword = _a.sent();
                if (!MatchPassword) {
                    (0, API_RESPONSE_1.C201Resp)(resp, "Sai mật khẩu!");
                    return [2 /*return*/];
                }
                token = jsonwebtoken_1.default.sign({
                    // @ts-ignore
                    is_admin: result[0].IS_ADMIN === 1,
                    // @ts-ignore
                    fullname: result[0].FULLNAME
                }, 'abc', { expiresIn: process.env.SESSION_EXPIRED });
                // @ts-ignore
                return [4 /*yield*/, (0, UserDAO_1.InsertSessionDAO)(token, result[0].UID)];
            case 4:
                // @ts-ignore
                _a.sent();
                (0, API_RESPONSE_1.SuccessResp)(resp, { token: token });
                return [3 /*break*/, 6];
            case 5:
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
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.Login = Login;
var Logout = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var reqData, ssid, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reqData = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                ssid = (0, Common_1.getString)(reqData, "ssid");
                return [4 /*yield*/, (0, UserDAO_1.DeleteSessionDAO)(ssid)];
            case 2:
                _a.sent();
                (0, API_RESPONSE_1.SuccessResp)(resp, "Logout successful");
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
exports.Logout = Logout;
var GetListUser = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var reqData, result, respResult, _i, result_1, i, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reqData = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, UserDAO_1.GetListUserDAO)(reqData.request_user_is_admin, reqData.request_uid)];
            case 2:
                result = _a.sent();
                respResult = [];
                // @ts-ignore
                for (_i = 0, result_1 = result; _i < result_1.length; _i++) {
                    i = result_1[_i];
                    respResult.push({
                        "uid": i.UID,
                        "email": i.EMAIL,
                        "username": i.USERNAME,
                        "fullname": i.FULLNAME,
                        "dob": (0, moment_1.default)(i.DOB).format("YYYY-MM-DD"),
                        "gender": i.GENDER,
                        "phone": i.PHONE,
                        "is_admin": i.IS_ADMIN === 1 ? true : false
                    });
                }
                (0, API_RESPONSE_1.SuccessResp)(resp, respResult);
                return [3 /*break*/, 4];
            case 3:
                e_3 = _a.sent();
                //@ts-ignore
                if (e_3.hasOwnProperty("message")) {
                    //@ts-ignore
                    (0, API_RESPONSE_1.C201Resp)(resp, e_3.message);
                    return [2 /*return*/];
                }
                //@ts-ignore
                if (e_3.hasOwnProperty("sqlMessage")) {
                    //@ts-ignore
                    (0, API_RESPONSE_1.C201Resp)(resp, e_3.sqlMessage);
                    return [2 /*return*/];
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.GetListUser = GetListUser;
var GetUserInfo = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var reqData, uid, result, respResult, _i, result_2, i, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reqData = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                uid = (0, Common_1.getNumber)(reqData, "uid");
                if (!reqData.request_user_is_admin && reqData.request_uid !== uid) {
                    (0, API_RESPONSE_1.C201Resp)(resp, "You don't have permission to get this user info!");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, UserDAO_1.GetUserInfoDAO)(uid)];
            case 2:
                result = _a.sent();
                respResult = [];
                // @ts-ignore
                for (_i = 0, result_2 = result; _i < result_2.length; _i++) {
                    i = result_2[_i];
                    respResult.push({
                        "uid": i.UID,
                        "email": i.EMAIL,
                        "username": i.USERNAME,
                        "fullname": i.FULLNAME,
                        "dob": (0, moment_1.default)(i.DOB).format("YYYY-MM-DD"),
                        "gender": i.GENDER,
                        "phone": i.PHONE,
                        "is_admin": i.IS_ADMIN === 1 ? true : false
                    });
                }
                (0, API_RESPONSE_1.SuccessResp)(resp, respResult);
                return [3 /*break*/, 4];
            case 3:
                e_4 = _a.sent();
                //@ts-ignore
                if (e_4.hasOwnProperty("message")) {
                    //@ts-ignore
                    (0, API_RESPONSE_1.C201Resp)(resp, e_4.message);
                    return [2 /*return*/];
                }
                //@ts-ignore
                if (e_4.hasOwnProperty("sqlMessage")) {
                    //@ts-ignore
                    (0, API_RESPONSE_1.C201Resp)(resp, e_4.sqlMessage);
                    return [2 /*return*/];
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.GetUserInfo = GetUserInfo;
var UpdateUserInfo = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var reqData, uid, username, fullname, dob, gender, phone, is_admin, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reqData = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                uid = (0, Common_1.getNumber)(reqData, "uid");
                if (!reqData.request_user_is_admin && reqData.request_uid !== uid) {
                    (0, API_RESPONSE_1.C201Resp)(resp, "You don't have permission to get this user info!");
                    return [2 /*return*/];
                }
                username = (0, Common_1.getString)(reqData, "username");
                fullname = (0, Common_1.getString)(reqData, "fullname");
                dob = (0, Common_1.getString)(reqData, "dob");
                gender = (0, Common_1.getNumber)(reqData, "gender");
                phone = (0, Common_1.getString)(reqData, "phone");
                is_admin = (0, Common_1.getBoolean)(reqData, "is_admin");
                if (!(0, moment_1.default)(dob, "YYYY-MM-DD").isValid()) {
                    (0, API_RESPONSE_1.C201Resp)(resp, "'dob' must be 'YYYY-MM-DD' format!");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, UserDAO_1.UpdateUserInfoDAO)(uid, username, fullname, (0, moment_1.default)(dob).format("YYYY-MM-DD"), gender, phone, +is_admin, reqData.request_user_is_admin)];
            case 2:
                _a.sent();
                (0, API_RESPONSE_1.SuccessResp)(resp);
                return [3 /*break*/, 4];
            case 3:
                e_5 = _a.sent();
                //@ts-ignore
                if (e_5.hasOwnProperty("message")) {
                    //@ts-ignore
                    (0, API_RESPONSE_1.C201Resp)(resp, e_5.message);
                    return [2 /*return*/];
                }
                //@ts-ignore
                if (e_5.hasOwnProperty("sqlMessage")) {
                    //@ts-ignore
                    (0, API_RESPONSE_1.C201Resp)(resp, e_5.sqlMessage);
                    return [2 /*return*/];
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.UpdateUserInfo = UpdateUserInfo;
var DeleteUser = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var reqData, uid, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reqData = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                uid = (0, Common_1.getNumber)(reqData, "uid");
                if (uid === reqData.request_uid) {
                    (0, API_RESPONSE_1.C201Resp)(resp, "You can't delete YOURSELF!");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, UserDAO_1.DeleteUserDAO)(uid)];
            case 2:
                _a.sent();
                (0, API_RESPONSE_1.SuccessResp)(resp);
                return [3 /*break*/, 4];
            case 3:
                e_6 = _a.sent();
                //@ts-ignore
                if (e_6.hasOwnProperty("message")) {
                    //@ts-ignore
                    (0, API_RESPONSE_1.C201Resp)(resp, e_6.message);
                    return [2 /*return*/];
                }
                //@ts-ignore
                if (e_6.hasOwnProperty("sqlMessage")) {
                    //@ts-ignore
                    (0, API_RESPONSE_1.C201Resp)(resp, e_6.sqlMessage);
                    return [2 /*return*/];
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.DeleteUser = DeleteUser;
