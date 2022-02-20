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
exports.ExportDataDAO = exports.InsertObjectExcelDAO = exports.GetListPropertyByObjTypeIDDAO = exports.InsertObjectDAO = exports.DeleteObjectDAO = exports.UpdatePropertyValueDAO = exports.AddObjectPropertyDAO = exports.GetObjectInfoDAO = exports.GetObjectDAO = void 0;
var Common_1 = require("../Utils/Common");
var mysql_1 = __importDefault(require("mysql"));
//Update multiple rows in mysql: https://stackoverflow.com/questions/3432/multiple-updates-in-mysql
//Insert multiple rows in mysql: https://stackoverflow.com/questions/8899802/how-do-i-do-a-bulk-insert-in-mysql-using-node-js
var GetObjectDAO = function (obj_type_id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var SQL_QUERY = "SELECT * FROM object WHERE OBJ_TYPE_ID = ?";
                var sql = Common_1.connection.query(SQL_QUERY, [obj_type_id], function (err, result, fields) {
                    if (err) {
                        reject(err);
                        console.log("============== GetObjectDAO - SQL =============");
                        console.log(sql);
                    }
                    else {
                        resolve(result);
                    }
                }).sql;
            })];
    });
}); };
exports.GetObjectDAO = GetObjectDAO;
var GetObjectInfoDAO = function (obj_id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var SQL_QUERY = "SELECT a.*, b.*, c.PRO_VALUE, c.CREATED_AT, c.UPDATED_AT, d.RULE_REGEX FROM object a, property b, obj_pro c, rule d WHERE a.OBJ_ID = ? AND b.PRO_ID = c.PRO_ID AND a.OBJ_ID = c.OBJ_ID AND b.RULE_ID = d.RULE_ID";
                var sql = Common_1.connection.query(SQL_QUERY, [obj_id], function (err, result, fields) {
                    if (err) {
                        reject(err);
                        console.log("============== GetObjectInfoDAO - SQL =============");
                        console.log(sql);
                    }
                    else {
                        resolve(result);
                    }
                }).sql;
            })];
    });
}); };
exports.GetObjectInfoDAO = GetObjectInfoDAO;
var AddObjectPropertyDAO = function (obj_id, pro_id, pro_value) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var SQL_QUERY = "SELECT insert_property_obj(?, ?, ?) AS A";
                var sql = Common_1.connection.query(SQL_QUERY, [obj_id, pro_id, pro_value], function (err, result, fields) {
                    if (err) {
                        reject(err);
                        console.log("============== AddObjectPropertyDAO - SQL =============");
                        console.log(sql);
                    }
                    else {
                        resolve(result);
                    }
                }).sql;
            })];
    });
}); };
exports.AddObjectPropertyDAO = AddObjectPropertyDAO;
var UpdatePropertyValueDAO = function (list_property) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var SQL_QUERY = "INSERT INTO obj_pro (OBJ_ID, PRO_ID, PRO_VALUE) VALUES ? ON DUPLICATE KEY UPDATE PRO_VALUE = VALUES(PRO_VALUE)";
                var BindingValues = [];
                for (var _i = 0, list_property_1 = list_property; _i < list_property_1.length; _i++) {
                    var i = list_property_1[_i];
                    BindingValues.push([i.obj_id, i.pro_id, i.pro_value]);
                }
                var sql = Common_1.connection.query(SQL_QUERY, [BindingValues], function (err, result, fields) {
                    if (err) {
                        reject(err);
                        console.log("============== AddObjectPropertyDAO - SQL =============");
                        console.log(sql);
                    }
                    else {
                        resolve(result);
                    }
                }).sql;
            })];
    });
}); };
exports.UpdatePropertyValueDAO = UpdatePropertyValueDAO;
var DeleteObjectDAO = function (obj_id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var SQL_QUERY = "DELETE FROM object WHERE OBJ_ID = ?";
                var sql = Common_1.connection.query(SQL_QUERY, [obj_id], function (err, result, fields) {
                    if (err) {
                        reject(err);
                        console.log("============== DeleteObjectDAO - SQL =============");
                        console.log(sql);
                    }
                    else {
                        resolve(result);
                    }
                }).sql;
            })];
    });
}); };
exports.DeleteObjectDAO = DeleteObjectDAO;
var InsertObjectDAO = function (obj_name, obj_desc, obj_type_id, list_pro_id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var SQL_QUERY = "INSERT INTO object (OBJ_NAME, OBJ_DESC, OBJ_TYPE_ID) VALUES (?, ?, ?)";
                var sql = Common_1.connection.query(SQL_QUERY, [obj_name, obj_desc, obj_type_id], function (err, result, fields) {
                    if (err) {
                        reject(new Error(obj_name + " already existed!"));
                        console.log("============== InsertObjectDAO - SQL =============");
                        console.log(sql);
                    }
                    else {
                        /** Get required property of this object type **/
                        Common_1.connection.query("SELECT PRO_ID FROM obj_type_property WHERE OBJ_TYPE_ID = ? AND IS_REQUIRED = 1", [obj_type_id], function (e4, r4) {
                            if (e4) {
                                console.log("Get required property err");
                                console.log(e4);
                            }
                            for (var _i = 0, r4_1 = r4; _i < r4_1.length; _i++) {
                                var i = r4_1[_i];
                                if (list_pro_id.indexOf(i.PRO_ID) === -1) {
                                    list_pro_id.push(i.PRO_ID);
                                }
                            }
                            if (list_pro_id.length > 0) {
                                /** If you don't have any property to assign this object, insert query IS NOT EXECUTE**/
                                var ListBindingValues = [];
                                for (var _a = 0, list_pro_id_1 = list_pro_id; _a < list_pro_id_1.length; _a++) {
                                    var i = list_pro_id_1[_a];
                                    ListBindingValues.push([result.insertId, obj_type_id, i]);
                                }
                                SQL_QUERY = "INSERT INTO obj_pro (OBJ_ID, OBJ_TYPE_ID, PRO_ID) VALUES ?";
                                var sql_1 = Common_1.connection.query(SQL_QUERY, [ListBindingValues], function (e1, r1) {
                                    if (e1) {
                                        console.log("============== InsertObjectDAO - SQL =============");
                                        console.log(sql_1);
                                        reject(new Error(obj_name + " is created but CAN NOT create property because pro_id(s) in 'list_pro_id' is(are) not exist in this object type!"));
                                    }
                                    else {
                                        resolve(r1);
                                    }
                                }).sql;
                            }
                            else {
                                resolve(result);
                            }
                        });
                    }
                }).sql;
            })];
    });
}); };
exports.InsertObjectDAO = InsertObjectDAO;
var GetListPropertyByObjTypeIDDAO = function (obj_type_id) {
    return new Promise(function (resolve, reject) {
        var SQL_QUERY = "SELECT a.OBJ_TYPE_ID, b.* FROM obj_type_property a JOIN property b ON a.PRO_ID = b.PRO_ID AND a.OBJ_TYPE_ID = ?";
        var sql = Common_1.connection.query(SQL_QUERY, [obj_type_id], function (e, r) {
            if (e) {
                console.log("============== GetListPropertyByObjTypeIDDAO - SQL ==============");
                console.log(e);
                console.log(sql);
                reject(e);
            }
            else {
                resolve(r);
            }
        }).sql;
    });
};
exports.GetListPropertyByObjTypeIDDAO = GetListPropertyByObjTypeIDDAO;
var InsertObjectExcelDAO = function (ListPropertyValues, obj_type_id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var INSERT_OBJECT = "INSERT INTO object(OBJ_NAME, OBJ_DESC, OBJ_TYPE_ID) VALUES (?, ?, ?)";
                var INSERT_PRO_VALUE = "INSERT INTO obj_pro (OBJ_ID, OBJ_TYPE_ID, PRO_ID, PRO_VALUE) VALUES ?";
                var GET_REQUIRED_PRO = "SELECT PRO_ID FROM obj_type_property WHERE OBJ_TYPE_ID = ? AND IS_REQUIRED = 1";
                var sql = Common_1.connection.query(GET_REQUIRED_PRO, [obj_type_id], function (e1, r1) {
                    return __awaiter(this, void 0, void 0, function () {
                        var ListProIDRequired_1, BindingPropertyValues_1, _loop_1, _i, ListPropertyValues_1, i;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!e1) return [3 /*break*/, 1];
                                    console.log("============== InsertObjectExcelDAO - SQL ==============");
                                    console.log(sql);
                                    reject(e1);
                                    return [3 /*break*/, 5];
                                case 1:
                                    ListProIDRequired_1 = [];
                                    BindingPropertyValues_1 = [];
                                    _loop_1 = function (i) {
                                        var _b, r1_1, x, insertId_1, _c, ListProIDRequired_2, j, e_1;
                                        return __generator(this, function (_d) {
                                            switch (_d.label) {
                                                case 0:
                                                    _d.trys.push([0, 3, , 4]);
                                                    for (_b = 0, r1_1 = r1; _b < r1_1.length; _b++) {
                                                        x = r1_1[_b];
                                                        ListProIDRequired_1.push(x.PRO_ID);
                                                    }
                                                    return [4 /*yield*/, (0, Common_1.query)(mysql_1.default.format(INSERT_OBJECT, [i.obj_name, i.obj_desc, obj_type_id]))];
                                                case 1:
                                                    insertId_1 = (_d.sent()).insertId;
                                                    i.properties.map(function (item) {
                                                        var index = ListProIDRequired_1.indexOf(item.pro_id);
                                                        if (index > -1) {
                                                            ListProIDRequired_1.splice(index, 1);
                                                        }
                                                        BindingPropertyValues_1.push([insertId_1, obj_type_id, item.pro_id, item.pro_value]);
                                                    });
                                                    for (_c = 0, ListProIDRequired_2 = ListProIDRequired_1; _c < ListProIDRequired_2.length; _c++) {
                                                        j = ListProIDRequired_2[_c];
                                                        BindingPropertyValues_1.push([insertId_1, obj_type_id, j, ""]);
                                                    }
                                                    return [4 /*yield*/, (0, Common_1.query)(mysql_1.default.format(INSERT_PRO_VALUE, [BindingPropertyValues_1]))];
                                                case 2:
                                                    _d.sent();
                                                    resolve("Successfully");
                                                    return [3 /*break*/, 4];
                                                case 3:
                                                    e_1 = _d.sent();
                                                    reject(e_1);
                                                    return [3 /*break*/, 4];
                                                case 4: return [2 /*return*/];
                                            }
                                        });
                                    };
                                    _i = 0, ListPropertyValues_1 = ListPropertyValues;
                                    _a.label = 2;
                                case 2:
                                    if (!(_i < ListPropertyValues_1.length)) return [3 /*break*/, 5];
                                    i = ListPropertyValues_1[_i];
                                    return [5 /*yield**/, _loop_1(i)];
                                case 3:
                                    _a.sent();
                                    _a.label = 4;
                                case 4:
                                    _i++;
                                    return [3 /*break*/, 2];
                                case 5: return [2 /*return*/];
                            }
                        });
                    });
                }).sql;
            })];
    });
}); };
exports.InsertObjectExcelDAO = InsertObjectExcelDAO;
var ExportDataDAO = function (obj_type_id) {
    return new Promise(function (resolve, reject) {
        var SQL_QUERY = "SELECT b.*, a.PRO_VALUE, a.PRO_ID FROM object b LEFT JOIN obj_pro a ON a.OBJ_ID = b.OBJ_ID AND b.OBJ_TYPE_ID = a.OBJ_TYPE_ID WHERE b.OBJ_TYPE_ID = ? ORDER BY b.OBJ_ID";
        var sql = Common_1.connection.query(SQL_QUERY, [obj_type_id], function (e, r) {
            if (e) {
                console.log("============== ExportDataDAO - SQL ==============");
                console.log(sql);
                reject(e);
            }
            else {
                resolve(r);
            }
        }).sql;
    });
};
exports.ExportDataDAO = ExportDataDAO;
