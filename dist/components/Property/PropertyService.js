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
exports.InsertProperty = exports.AddProperty2Object = exports.GetListPropertyByObjID = exports.DeleteProperty = exports.UpdateProperty = exports.GetPropertyInfo = exports.GetProperty = void 0;
var moment_1 = __importDefault(require("moment"));
var API_RESPONSE_1 = require("../Utils/API_RESPONSE");
var PropertyDAO_1 = require("./PropertyDAO");
var Common_1 = require("../Utils/Common");
var GetProperty = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var reqData, obj_type_id, result, respResult, _i, result_1, i, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reqData = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                obj_type_id = (0, Common_1.getNumber)(reqData, "obj_type_id", false);
                return [4 /*yield*/, (0, PropertyDAO_1.GetPropertyDAO)(obj_type_id)];
            case 2:
                result = _a.sent();
                respResult = [];
                for (_i = 0, result_1 = result; _i < result_1.length; _i++) {
                    i = result_1[_i];
                    respResult.push({
                        "pro_id": i.PRO_ID === null ? -1 : i.PRO_ID,
                        "pro_name": i.PRO_NAME === null ? "" : i.PRO_NAME,
                        "pro_desc": i.PRO_DESC === null ? "" : i.PRO_DESC,
                        "rule_id": i.RULE_ID === null ? -1 : i.RULE_ID,
                        "rule_name": i.RULE_NAME === null ? "" : i.RULE_NAME,
                        "created_at": i.CREATED_AT === null ? "" : (0, moment_1.default)(i.CREATED_AT).format("DD/MM/YYYY HH:mm:ss"),
                        "updated_at": i.UPDATED_AT === null ? "" : (0, moment_1.default)(i.UPDATED_AT).format("DD/MM/YYYY HH:mm:ss")
                    });
                }
                (0, API_RESPONSE_1.SuccessResp)(resp, respResult);
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
exports.GetProperty = GetProperty;
var GetPropertyInfo = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var reqData, pro_id, result, respResult, _i, result_2, i, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reqData = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                pro_id = (0, Common_1.getNumber)(reqData, "pro_id");
                return [4 /*yield*/, (0, PropertyDAO_1.GetPropertyInfoDAO)(pro_id)];
            case 2:
                result = _a.sent();
                respResult = [];
                for (_i = 0, result_2 = result; _i < result_2.length; _i++) {
                    i = result_2[_i];
                    respResult.push({
                        "obj_type_id": i.OBJ_TYPE_ID === null ? -1 : i.OBJ_TYPE_ID,
                        "obj_type_name": i.OBJ_TYPE_NAME === null ? "" : i.OBJ_TYPE_NAME,
                        "is_required": i.IS_REQUIRED === 1 ? true : false
                    });
                }
                (0, API_RESPONSE_1.SuccessResp)(resp, respResult);
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
exports.GetPropertyInfo = GetPropertyInfo;
var UpdateProperty = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var reqData, pro_id, pro_name, pro_desc, rule_id, list_obj_type, result, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reqData = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                pro_id = (0, Common_1.getNumber)(reqData, "pro_id");
                pro_name = (0, Common_1.getString)(reqData, "pro_name");
                pro_desc = (0, Common_1.getString)(reqData, "pro_desc");
                rule_id = (0, Common_1.getNumber)(reqData, "rule_id");
                list_obj_type = (0, Common_1.getJSONArray)(reqData, "list_obj_type");
                return [4 /*yield*/, (0, PropertyDAO_1.UpdatePropertyDAO)(pro_id, pro_name, pro_desc, rule_id, list_obj_type)];
            case 2:
                result = _a.sent();
                (0, API_RESPONSE_1.SuccessResp)(resp, "Successful!");
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
exports.UpdateProperty = UpdateProperty;
var DeleteProperty = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var reqData, pro_id, result, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reqData = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                pro_id = (0, Common_1.getNumber)(reqData, "pro_id");
                return [4 /*yield*/, (0, PropertyDAO_1.DeletePropertyDAO)(pro_id)];
            case 2:
                result = _a.sent();
                (0, API_RESPONSE_1.SuccessResp)(resp, "Successful!");
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
exports.DeleteProperty = DeleteProperty;
var GetListPropertyByObjID = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var reqData, obj_id, result, temp1, temp2, _i, _a, i, _b, _c, i, e_5;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                reqData = req.body;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 3, , 4]);
                obj_id = (0, Common_1.getNumber)(reqData, "obj_id");
                return [4 /*yield*/, (0, PropertyDAO_1.GetListPropertyByObjIDDAO)(obj_id)];
            case 2:
                result = _d.sent();
                temp1 = [], temp2 = [];
                //@ts-ignore
                for (_i = 0, _a = result.list_property; _i < _a.length; _i++) {
                    i = _a[_i];
                    temp1.push({
                        "obj_type_id": i.OBJ_TYPE_ID === null ? -1 : i.OBJ_TYPE_ID,
                        "pro_id": i.PRO_ID === null ? -1 : i.PRO_ID,
                        "pro_name": i.PRO_NAME === null ? "" : i.PRO_NAME,
                        "pro_desc": i.PRO_DESC === null ? "" : i.PRO_DESC,
                        "is_required": i.IS_REQUIRED === 1 ? true : false
                    });
                }
                //@ts-ignore
                for (_b = 0, _c = result.list_property_assign; _b < _c.length; _b++) {
                    i = _c[_b];
                    temp2.push({
                        "obj_type_id": i.OBJ_TYPE_ID === null ? -1 : i.OBJ_TYPE_ID,
                        "pro_id": i.PRO_ID === null ? -1 : i.PRO_ID,
                        "pro_name": i.PRO_NAME === null ? "" : i.PRO_NAME,
                        "pro_desc": i.PRO_DESC === null ? "" : i.PRO_DESC,
                        "pro_value": i.PRO_VALUE === null ? "" : i.PRO_VALUE,
                        "is_required": i.IS_REQUIRED === 1 ? true : false
                    });
                }
                (0, API_RESPONSE_1.SuccessResp)(resp, {
                    list_property: temp1,
                    list_property_assign: temp2
                });
                return [3 /*break*/, 4];
            case 3:
                e_5 = _d.sent();
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
exports.GetListPropertyByObjID = GetListPropertyByObjID;
var AddProperty2Object = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var reqData, obj_id, list_pro_id, obj_type_id, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reqData = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                obj_id = (0, Common_1.getNumber)(reqData, "obj_id");
                list_pro_id = (0, Common_1.getNumberArray)(reqData, "list_pro_id");
                obj_type_id = (0, Common_1.getNumber)(reqData, "obj_type_id");
                return [4 /*yield*/, (0, PropertyDAO_1.AddProperty2ObjectDAO)(obj_id, obj_type_id, list_pro_id)];
            case 2:
                _a.sent();
                (0, API_RESPONSE_1.SuccessResp)(resp, "Successful!");
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
exports.AddProperty2Object = AddProperty2Object;
var InsertProperty = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var reqData, pro_name, pro_desc, rule_id, list_obj_type, msg_1, e_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reqData = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                pro_name = (0, Common_1.getString)(reqData, "pro_name").toUpperCase();
                pro_desc = (0, Common_1.getString)(reqData, "pro_desc");
                rule_id = (0, Common_1.getNumber)(reqData, "rule_id");
                list_obj_type = (0, Common_1.getJSONArray)(reqData, "list_obj_type");
                msg_1 = "";
                list_obj_type.map(function (item, index) {
                    if (!item.hasOwnProperty("obj_type_id") || !item.hasOwnProperty("is_required")) {
                        msg_1 += "item at index " + index + " missing 'obj_type_id' or 'is_requried' property, ";
                    }
                });
                if (msg_1 !== "") {
                    (0, API_RESPONSE_1.C201Resp)(resp, msg_1);
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, PropertyDAO_1.InsertPropertyDAO)(pro_name, pro_desc, rule_id, list_obj_type)];
            case 2:
                _a.sent();
                (0, API_RESPONSE_1.SuccessResp)(resp, "Successful!");
                return [3 /*break*/, 4];
            case 3:
                e_7 = _a.sent();
                //@ts-ignore
                if (e_7.hasOwnProperty("message")) {
                    //@ts-ignore
                    (0, API_RESPONSE_1.C201Resp)(resp, e_7.message);
                    return [2 /*return*/];
                }
                //@ts-ignore
                if (e_7.hasOwnProperty("sqlMessage")) {
                    //@ts-ignore
                    (0, API_RESPONSE_1.C201Resp)(resp, e_7.sqlMessage);
                    return [2 /*return*/];
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.InsertProperty = InsertProperty;
