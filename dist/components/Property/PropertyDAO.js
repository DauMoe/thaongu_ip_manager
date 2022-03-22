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
exports.AddProperty2ObjectDAO = exports.GetListPropertyByObjIDDAO = exports.InsertPropertyDAO = exports.DeletePropertyDAO = exports.UpdatePropertyDAO = exports.GetPropertyInfoDAO = exports.GetPropertyDAO = void 0;
var Common_1 = require("../Utils/Common");
var GetPropertyDAO = function (obj_type_id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var SQL_QUERY, BindingValues = [];
                if (obj_type_id === -1) {
                    SQL_QUERY = "SELECT * FROM property";
                    BindingValues = [];
                }
                else {
                    SQL_QUERY = "SELECT b.* FROM obj_type_property a, property b WHERE a.PRO_ID = b.PRO_ID AND a.OBJ_TYPE_ID = ?";
                    BindingValues = [obj_type_id];
                }
                var sql = Common_1.connection.query(SQL_QUERY, BindingValues, function (err, result, fields) {
                    if (err) {
                        reject(err);
                        console.log("============== GetPropertyDAO - SQL =============");
                        console.log(sql);
                    }
                    else {
                        resolve(result);
                    }
                }).sql;
            })];
    });
}); };
exports.GetPropertyDAO = GetPropertyDAO;
var GetPropertyInfoDAO = function (pro_id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var SQL_QUERY = "SELECT a.IS_REQUIRED, b.* FROM obj_type_property a, object_type b WHERE a.PRO_ID = ? AND a.OBJ_TYPE_ID = b.OBJ_TYPE_ID";
                var sql = Common_1.connection.query(SQL_QUERY, [pro_id], function (err, result, fields) {
                    if (err) {
                        reject(err);
                        console.log("============== GetPropertyInfoDAO - SQL =============");
                        console.log(sql);
                    }
                    else {
                        resolve(result);
                    }
                }).sql;
            })];
    });
}); };
exports.GetPropertyInfoDAO = GetPropertyInfoDAO;
var UpdatePropertyDAO = function (pro_id, pro_name, pro_desc, rule_id, list_obj_type) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        //================= Delete when not have any value in obj_pro table ==================
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var ListObjTypeID = [];
                for (var _i = 0, list_obj_type_1 = list_obj_type; _i < list_obj_type_1.length; _i++) {
                    var i = list_obj_type_1[_i];
                    ListObjTypeID.push(i.obj_type_id);
                }
                var SQL_QUERY = "SELECT b.OBJ_NAME FROM obj_pro a, object b WHERE a.PRO_ID = ? AND a.OBJ_TYPE_ID NOT IN ? AND a.OBJ_ID = b.OBJ_ID\n";
                var sql = Common_1.connection.query(SQL_QUERY, [pro_id, [ListObjTypeID.length > 0 ? ListObjTypeID : [null]]], function (err1, result1) {
                    if (err1) {
                        console.log("============== UpdatePropertyDAO - SQL =============");
                        console.log(sql);
                        reject(err1);
                    }
                    else {
                        // if (result1.length > 0) {
                        if (false) {
                            var msg_1 = "";
                            result1.map(function (item, index) {
                                msg_1 += "'" + item.OBJ_NAME + "'";
                                if (index < result1.length - 1) {
                                    msg_1 += ", ";
                                }
                            });
                            reject(new Error("Can not remove object type because " + pro_name + " property existed in " + msg_1));
                        }
                        else {
                            var DELETE_NOT_EXIST = (ListObjTypeID.length > 0) ? "DELETE FROM obj_type_property WHERE PRO_ID = ? AND OBJ_TYPE_ID NOT IN ?" : "DELETE FROM obj_type_property WHERE PRO_ID = ?";
                            var SQL_QUERY_1 = "INSERT INTO obj_type_property (OBJ_TYPE_ID, PRO_ID, IS_REQUIRED) VALUES ? ON DUPLICATE KEY UPDATE OBJ_TYPE_ID = VALUES(OBJ_TYPE_ID), PRO_ID = VALUES(PRO_ID), IS_REQUIRED = VALUES(IS_REQUIRED)";
                            var UPDATE_PROPERTY = "UPDATE property SET PRO_NAME = ?, PRO_DESC = ?, RULE_ID = ? WHERE PRO_ID = ?";
                            var ListBindingValues = [];
                            for (var _i = 0, list_obj_type_2 = list_obj_type; _i < list_obj_type_2.length; _i++) {
                                var i = list_obj_type_2[_i];
                                ListBindingValues.push([i.obj_type_id, pro_id, +i.is_required]);
                            }
                            var p1 = Common_1.connection.query(DELETE_NOT_EXIST, [pro_id, [ListObjTypeID.length > 0 ? ListObjTypeID : undefined]]);
                            var p2 = Common_1.connection.query(SQL_QUERY_1, [ListBindingValues]);
                            var p3 = Common_1.connection.query(UPDATE_PROPERTY, [pro_name, pro_desc, rule_id, pro_id]);
                            Promise.all([p1, p2, p3])
                                .then(function (response) {
                                resolve(response);
                            })
                                .catch(function (e) {
                                console.log("============== UpdatePropertyDAO - SQL =============");
                                console.log(e);
                                reject(e);
                            });
                        }
                    }
                }).sql;
            })];
    });
}); };
exports.UpdatePropertyDAO = UpdatePropertyDAO;
var DeletePropertyDAO = function (pro_id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var DELETE_PROPERTY = "DELETE FROM property WHERE PRO_ID = ?";
                var DELETE_OBJ_TYPE_PRO = "DELETE FROM obj_type_property WHERE PRO_ID = ?";
                var p1 = Common_1.connection.query(DELETE_PROPERTY, [pro_id]);
                var p2 = Common_1.connection.query(DELETE_OBJ_TYPE_PRO, [pro_id]);
                Promise.all([p1, p2])
                    .then(function (response) {
                    resolve(response);
                })
                    .catch(function (e) {
                    console.log("============== DeletePropertyDAO - SQL =============");
                    reject(e);
                });
            })];
    });
}); };
exports.DeletePropertyDAO = DeletePropertyDAO;
var InsertPropertyDAO = function (pro_name, pro_desc, rule_id, list_obj_type) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var SQL_QUERY = "INSERT INTO property (PRO_NAME, PRO_DESC, RULE_ID) VALUES (?, ?, ?)";
                var sql = Common_1.connection.query(SQL_QUERY, [pro_name, pro_desc, rule_id], function (e, r) {
                    if (e) {
                        console.log("============== InsertPropertyDAO - SQL =============");
                        console.log(sql);
                        reject(new Error("This property's name existed!"));
                    }
                    else {
                        if (list_obj_type.length > 0) {
                            SQL_QUERY = "INSERT INTO obj_type_property (OBJ_TYPE_ID, PRO_ID, IS_REQUIRED) VALUES ?";
                            var BindingValues = [];
                            for (var _i = 0, list_obj_type_3 = list_obj_type; _i < list_obj_type_3.length; _i++) {
                                var i = list_obj_type_3[_i];
                                BindingValues.push([i.obj_type_id, r.insertId, +i.is_required]);
                            }
                            var sql_1 = Common_1.connection.query(SQL_QUERY, [BindingValues], function (e1, r1) {
                                if (e1) {
                                    console.log("============== InsertPropertyDAO - SQL =============");
                                    console.log(sql_1);
                                    reject(new Error("'" + pro_name + "' is created but CAN NOT assign object type. Please update object type later!"));
                                }
                                else {
                                    resolve(r1);
                                }
                            }).sql;
                        }
                        else {
                            resolve(r);
                        }
                    }
                }).sql;
            })];
    });
}); };
exports.InsertPropertyDAO = InsertPropertyDAO;
var GetListPropertyByObjIDDAO = function (obj_id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var SELECT_ALL = "SELECT a.*, b.* FROM obj_type_property a, property b WHERE a.OBJ_TYPE_ID = (SELECT OBJ_TYPE_ID FROM object WHERE OBJ_ID = ?) AND a.PRO_ID = b.PRO_ID";
                var sql1 = "SELECT a.*, b.PRO_NAME, c.IS_REQUIRED FROM obj_pro a LEFT JOIN property b ON a.PRO_ID = b.PRO_ID LEFT JOIN obj_type_property c ON a.OBJ_TYPE_ID = c.OBJ_TYPE_ID AND c.PRO_ID = a.PRO_ID WHERE a.OBJ_ID = ?";
                Common_1.connection.query(SELECT_ALL, [obj_id], function (err1, results1) {
                    if (err1) {
                        console.log("SQL" + SELECT_ALL);
                        reject(err1);
                    }
                    var sql = Common_1.connection.query(sql1, [obj_id], function (err2, results2) {
                        // console.log(sql);
                        if (err2) {
                            console.log("SQL" + sql1);
                            reject(err2);
                        }
                        resolve({
                            list_property: results1,
                            list_property_assign: results2
                        });
                    }).sql;
                });
            })];
    });
}); };
exports.GetListPropertyByObjIDDAO = GetListPropertyByObjIDDAO;
var AddProperty2ObjectDAO = function (obj_id, obj_type_id, list_pro) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var SQL_QUERY = "SELECT a.PRO_VALUE, b.PRO_NAME FROM obj_pro a, property b WHERE a.OBJ_ID = ? AND a.PRO_ID NOT IN ? AND a.PRO_ID = b.PRO_ID";
                var UpdatedProID = [];
                var InsertArr = [];
                for (var _i = 0, list_pro_1 = list_pro; _i < list_pro_1.length; _i++) {
                    var i = list_pro_1[_i];
                    UpdatedProID.push([i]);
                    InsertArr.push([i, obj_id, obj_type_id]);
                }
                var sql = Common_1.connection.query(SQL_QUERY, [obj_id, [UpdatedProID.length > 0 ? UpdatedProID : [null]]], function (err1, result1) {
                    return __awaiter(this, void 0, void 0, function () {
                        var ValueExisted, msg, _i, result1_1, i, INSERT_NEW_1, sql_2, sql_3;
                        return __generator(this, function (_a) {
                            if (err1) {
                                console.log("==================== AddProperty2ObjectDAO - SQL: =======================");
                                console.log(sql);
                                reject(err1);
                            }
                            else {
                                ValueExisted = false;
                                msg = "";
                                for (_i = 0, result1_1 = result1; _i < result1_1.length; _i++) {
                                    i = result1_1[_i];
                                    if (i.PRO_VALUE.trim() != "") {
                                        ValueExisted = true;
                                        msg += "'" + i.PRO_NAME + "', ";
                                    }
                                }
                                msg = msg.substring(0, msg.length - 2);
                                if (ValueExisted) {
                                    reject(new Error("Can not remove because " + msg + " (has) have non empty value!"));
                                }
                                else {
                                    SQL_QUERY = "DELETE FROM obj_pro WHERE PRO_ID NOT IN ? AND OBJ_ID = ?";
                                    INSERT_NEW_1 = "INSERT INTO obj_pro (PRO_ID, OBJ_ID, OBJ_TYPE_ID) VALUES ? ON DUPLICATE KEY UPDATE PRO_ID = VALUES(PRO_ID), OBJ_ID = VALUES(OBJ_ID)";
                                    if (list_pro.length > 0) {
                                        sql_2 = Common_1.connection.query(SQL_QUERY, [[list_pro.length > 0 ? list_pro : [null]], obj_id], function (e1, r1) {
                                            if (e1) {
                                                console.log("==================== AddProperty2ObjectDAO - SQL: =======================");
                                                console.log(sql_2);
                                                reject(e1);
                                            }
                                            else {
                                                var sql_4 = Common_1.connection.query(INSERT_NEW_1, [InsertArr.length > 0 ? InsertArr : [null]], function (e2, r2) {
                                                    if (e2) {
                                                        console.log("==================== AddProperty2ObjectDAO - SQL: =======================");
                                                        console.log(sql_4);
                                                        reject(new Error("Some property id not exist. Please check again!"));
                                                    }
                                                    else {
                                                        resolve("ok");
                                                    }
                                                }).sql;
                                            }
                                        }).sql;
                                    }
                                    else {
                                        sql_3 = Common_1.connection.query("DELETE FROM obj_pro WHERE OBJ_ID = ?", [obj_id], function (e1, r1) {
                                            if (e1) {
                                                console.log("==================== AddProperty2ObjectDAO - SQL: =======================");
                                                console.log(sql_3);
                                                reject(e1);
                                            }
                                            else {
                                                resolve(r1);
                                            }
                                        }).sql;
                                    }
                                }
                            }
                            return [2 /*return*/];
                        });
                    });
                }).sql;
            })];
    });
}); };
exports.AddProperty2ObjectDAO = AddProperty2ObjectDAO;
