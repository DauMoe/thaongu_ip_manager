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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserDAO = exports.UpdateUserInfoDAO = exports.GetUserInfoDAO = exports.GetListUserDAO = exports.DeleteSessionDAO = exports.InsertSessionDAO = exports.LoginDAO = exports.CreateUserDAO = void 0;
var Common_1 = require("../Utils/Common");
var CreateUserDAO = function (email, username, fullname, password, gender, phone, dob, is_admin) {
    return new Promise(function (resolve, reject) {
        var SQL_QUERY = "INSERT INTO USER (EMAIL, USERNAME, FULLNAME, PASSWORD, DOB, GENDER, PHONE, IS_ADMIN) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        var sql = Common_1.connection.query(SQL_QUERY, [email, username, fullname, password, dob, gender, phone, is_admin], function (err, result, fields) {
            if (err) {
                reject(err);
                console.log("============== CreateUserDAO - UserDAO.ts - SQL =============");
                console.log(sql);
            }
            else {
                resolve(result);
            }
        }).sql;
    });
};
exports.CreateUserDAO = CreateUserDAO;
var LoginDAO = function (email, pass) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var SQL_QUERY = "SELECT UID, EMAIL, PASSWORD, IS_ADMIN, USERNAME, FULLNAME FROM USER WHERE EMAIL = ?";
                var sql = Common_1.connection.query(SQL_QUERY, [email, pass], function (err, result, fields) {
                    if (err) {
                        reject(err);
                        console.log("============== LoginDAO - UserDAO.ts - SQL =============");
                        console.log(sql);
                    }
                    else {
                        resolve(result);
                    }
                }).sql;
            })];
    });
}); };
exports.LoginDAO = LoginDAO;
var InsertSessionDAO = function (token, uid) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var SQL_QUERY = "INSERT INTO SESSION (SESSION_TOKEN, UID) VALUES (?, ?)";
                var sql = Common_1.connection.query(SQL_QUERY, [token, uid], function (err, result, fields) {
                    if (err) {
                        reject(err);
                        console.log("============== InsertSessionDAO - UserDAO.ts - SQL =============");
                        console.log(sql);
                    }
                    else {
                        resolve(result);
                    }
                }).sql;
            })];
    });
}); };
exports.InsertSessionDAO = InsertSessionDAO;
var DeleteSessionDAO = function (token) {
    return new Promise(function (resolve, reject) {
        var SQL_QUERY = "DELETE FROM SESSION WHERE SESSION_TOKEN = ?";
        var sql = Common_1.connection.query(SQL_QUERY, [token], function (err, result, fields) {
            if (err) {
                reject(err);
                console.log("============== DeleteSessionDAO - UserDAO.ts - SQL =============");
                console.log(sql);
            }
            else {
                resolve(result);
            }
        }).sql;
    });
};
exports.DeleteSessionDAO = DeleteSessionDAO;
var GetListUserDAO = function (is_admin, uid) {
    return new Promise(function (resolve, reject) {
        var SQL_QUERY, BindingValues;
        if (is_admin) {
            SQL_QUERY = "SELECT * FROM USER";
            BindingValues = [];
        }
        else {
            SQL_QUERY = "SELECT * FROM USER WHERE UID = ?";
            BindingValues = [uid];
        }
        var sql = Common_1.connection.query(SQL_QUERY, BindingValues, function (err, result, fields) {
            if (err) {
                reject(err);
                console.log("============== GetListUserDAO - UserDAO.ts - SQL =============");
                console.log(sql);
            }
            else {
                resolve(result);
            }
        }).sql;
    });
};
exports.GetListUserDAO = GetListUserDAO;
var GetUserInfoDAO = function (uid) {
    return new Promise(function (resolve, reject) {
        var SQL_QUERY = "SELECT * FROM USER WHERE UID = ?";
        var sql = Common_1.connection.query(SQL_QUERY, [uid], function (err, result, fields) {
            if (err) {
                reject(err);
                console.log("============== GetUserInfoDAO - UserDAO.ts - SQL =============");
                console.log(sql);
            }
            else {
                resolve(result);
            }
        }).sql;
    });
};
exports.GetUserInfoDAO = GetUserInfoDAO;
var UpdateUserInfoDAO = function (uid, username, fullname, dob, gender, phone, is_admin, request_by_admin) {
    return new Promise(function (resolve, reject) {
        var SQL_QUERY, BindingValues;
        if (request_by_admin) {
            SQL_QUERY = "UPDATE USER SET USERNAME = ?, FULLNAME = ?, DOB = ?, GENDER = ?, PHONE = ?, IS_ADMIN = ? WHERE UID = ?";
            BindingValues = [username, fullname, dob, gender, phone, is_admin, uid];
        }
        else {
            SQL_QUERY = "UPDATE USER SET USERNAME = ?, FULLNAME = ?, DOB = ?, GENDER = ?, PHONE = ? WHERE UID = ?";
            BindingValues = [username, fullname, dob, gender, phone, uid];
        }
        var sql = Common_1.connection.query(SQL_QUERY, BindingValues, function (err, result, fields) {
            if (err) {
                reject(err);
                console.log("============== UpdateUserInfoDAO - UserDAO.ts - SQL =============");
                console.log(sql);
            }
            else {
                resolve(result);
            }
        }).sql;
    });
};
exports.UpdateUserInfoDAO = UpdateUserInfoDAO;
var DeleteUserDAO = function (uid) {
    return new Promise(function (resolve, reject) {
        var SQL_QUERY = "DELETE FROM USER WHERE UID = ?";
        var sql = Common_1.connection.query(SQL_QUERY, [uid], function (err, result, fields) {
            if (err) {
                reject(err);
                console.log("============== DeleteUserDAO - UserDAO.ts - SQL =============");
                console.log(sql);
            }
            else {
                resolve(result);
            }
        }).sql;
    });
};
exports.DeleteUserDAO = DeleteUserDAO;
