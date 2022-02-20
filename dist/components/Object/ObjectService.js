"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.SearchByObjectName = exports.ExportData = exports.InsertObjectExcel = exports.GetListObjectTypeExcelTemplate = exports.GetCreateExcelTemplate = exports.InsertObject = exports.DeleteObject = exports.UpdatePropertyValue = exports.AddObjectProperty = exports.GetObjectInfo = exports.GetObject = void 0;
var API_RESPONSE_1 = require("../Utils/API_RESPONSE");
var Common_1 = require("../Utils/Common");
var ObjectDAO_1 = require("./ObjectDAO");
var moment_1 = __importDefault(require("moment"));
var exceljs_1 = __importDefault(require("exceljs"));
var fs = __importStar(require("fs"));
var RulesDAO_1 = require("../Rules/RulesDAO");
var GetObject = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var reqData, obj_type_id, result, respResult, _i, result_1, i, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reqData = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                obj_type_id = (0, Common_1.getNumber)(reqData, "obj_type_id");
                return [4 /*yield*/, (0, ObjectDAO_1.GetObjectDAO)(obj_type_id)];
            case 2:
                result = _a.sent();
                respResult = [];
                for (_i = 0, result_1 = result; _i < result_1.length; _i++) {
                    i = result_1[_i];
                    respResult.push({
                        "obj_id": i.OBJ_ID === null ? -1 : i.OBJ_ID,
                        "obj_name": i.OBJ_NAME === null ? "" : i.OBJ_NAME,
                        "obj_desc": i.OBJ_DESC === null ? "" : i.OBJ_DESC,
                        "obj_type_id": i.OBJ_TYPE_ID === null ? -1 : i.OBJ_TYPE_ID
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
exports.GetObject = GetObject;
var GetObjectInfo = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var reqData, obj_id, result, respResult, _i, result_2, i, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reqData = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                obj_id = (0, Common_1.getNumber)(reqData, "obj_id");
                return [4 /*yield*/, (0, ObjectDAO_1.GetObjectInfoDAO)(obj_id)];
            case 2:
                result = _a.sent();
                respResult = [];
                for (_i = 0, result_2 = result; _i < result_2.length; _i++) {
                    i = result_2[_i];
                    respResult.push({
                        "obj_id": i.OBJ_ID === null ? -1 : i.OBJ_ID,
                        "obj_name": i.OBJ_NAME === null ? "" : i.OBJ_NAME,
                        "obj_desc": i.OBJ_DESC === null ? "" : i.OBJ_DESC,
                        "obj_type_id": i.OBJ_TYPE_ID === null ? -1 : i.OBJ_TYPE_ID,
                        "pro_id": i.PRO_ID === null ? -1 : i.PRO_ID,
                        "pro_name": i.PRO_NAME === null ? "" : i.PRO_NAME,
                        "rule_name": i.RULE_NAME === null ? "" : i.RULE_NAME,
                        "pro_desc": i.PRO_DESC === null ? "" : i.PRO_DESC,
                        "pro_value": i.PRO_VALUE === null ? "" : i.PRO_VALUE,
                        "rule_id": i.RULE_ID === null ? -1 : i.RULE_ID,
                        "rule_regex": i.RULE_REGEX === null ? "" : i.RULE_REGEX,
                        "created_at": i.CREATED_AT === null ? "" : (0, moment_1.default)(i.CREATED_AT).format("DD/MM/YYYY HH:mm:ss"),
                        "updated_at": i.CREATED_AT === null ? "" : (0, moment_1.default)(i.UPDATED_AT).format("DD/MM/YYYY HH:mm:ss"),
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
exports.GetObjectInfo = GetObjectInfo;
var AddObjectProperty = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var reqData, obj_id, pro_id, pro_value, result, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reqData = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                obj_id = (0, Common_1.getNumber)(reqData, "obj_id");
                pro_id = (0, Common_1.getNumber)(reqData, "pro_id");
                pro_value = (0, Common_1.getString)(reqData, "pro_value");
                return [4 /*yield*/, (0, ObjectDAO_1.AddObjectPropertyDAO)(obj_id, pro_id, pro_value)];
            case 2:
                result = _a.sent();
                if (result[0].A === 0) {
                    (0, API_RESPONSE_1.C201Resp)(resp, "Thuộc tính này đã nằm trong đối tượng!");
                }
                else {
                    (0, API_RESPONSE_1.SuccessResp)(resp, "Thành công");
                }
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
exports.AddObjectProperty = AddObjectProperty;
var UpdatePropertyValue = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var reqData, list_property, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reqData = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                list_property = (0, Common_1.getJSONArray)(reqData, "list_property");
                return [4 /*yield*/, (0, ObjectDAO_1.UpdatePropertyValueDAO)(list_property)];
            case 2:
                _a.sent();
                (0, API_RESPONSE_1.SuccessResp)(resp, "Update successfully!");
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
exports.UpdatePropertyValue = UpdatePropertyValue;
var DeleteObject = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var reqData, obj_id, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reqData = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                obj_id = (0, Common_1.getNumber)(reqData, "obj_id");
                return [4 /*yield*/, (0, ObjectDAO_1.DeleteObjectDAO)(obj_id)];
            case 2:
                _a.sent();
                (0, API_RESPONSE_1.SuccessResp)(resp, "Delete successfully!");
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
exports.DeleteObject = DeleteObject;
var InsertObject = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var reqData, obj_name, obj_desc, obj_type_id, list_pro, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reqData = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                obj_name = (0, Common_1.getString)(reqData, "obj_name").toUpperCase();
                obj_desc = (0, Common_1.getString)(reqData, "obj_desc", false);
                obj_type_id = (0, Common_1.getNumber)(reqData, "obj_type_id");
                list_pro = (0, Common_1.getNumberArray)(reqData, "list_pro_id");
                return [4 /*yield*/, (0, ObjectDAO_1.InsertObjectDAO)(obj_name, obj_desc, obj_type_id, list_pro)];
            case 2:
                _a.sent();
                (0, API_RESPONSE_1.SuccessResp)(resp, "Created!");
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
exports.InsertObject = InsertObject;
//exceljs: https://www.npmjs.com/package/exceljs#file-io
//ARGB Picker: https://cssgenerator.org/rgba-and-hex-color-generator.html
var GetCreateExcelTemplate = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var reqData, obj_type_id, result, list_rule, workbook, sheet_1, list_pro_name_1, list_pro_id, _i, result_3, i, list_cell, file_path_1, e_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reqData = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                obj_type_id = (0, Common_1.getNumber)(reqData, "obj_type_id");
                return [4 /*yield*/, (0, ObjectDAO_1.GetListPropertyByObjTypeIDDAO)(obj_type_id)];
            case 2:
                result = _a.sent();
                return [4 /*yield*/, (0, RulesDAO_1.GetListRuleDAO)()];
            case 3:
                list_rule = _a.sent();
                workbook = new exceljs_1.default.Workbook();
                workbook.creator = "IP Manager";
                sheet_1 = workbook.addWorksheet('IP Manager | Create object');
                list_pro_name_1 = ["Object name", "Object desc"];
                list_pro_id = [-1, -2];
                for (_i = 0, result_3 = result; _i < result_3.length; _i++) {
                    i = result_3[_i];
                    list_pro_name_1.push(i.PRO_NAME);
                    list_pro_id.push(i.PRO_ID);
                }
                sheet_1.addRow("");
                sheet_1.addRow(list_pro_name_1);
                sheet_1.addRow(list_pro_id);
                list_cell = (0, Common_1.GetCellNameByIndex)(list_pro_name_1.length, 2, true);
                list_cell.map(function (item, index) {
                    sheet_1.getCell("" + item).fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: {
                            argb: "98D3DA"
                        }
                    };
                    sheet_1.getCell("" + item).note = {
                        texts: [
                            { 'text': "Property name (DO NOT EDIT)" }
                        ],
                        margins: {
                            insetmode: 'custom',
                            inset: [0.25, 0.25, 0.35, 0.35]
                        },
                        protection: {
                            locked: "True",
                            lockText: "True"
                        },
                    };
                });
                list_cell = (0, Common_1.GetCellNameByIndex)(list_pro_name_1.length, 3, true);
                list_cell.map(function (item, index) {
                    sheet_1.getCell("" + item).fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: {
                            argb: "D8D9DE"
                        }
                    };
                    sheet_1.getCell("" + item).note = {
                        texts: [
                            { 'text': list_pro_name_1[index] + " ID (DO NOT EDIT)" }
                        ],
                        margins: {
                            insetmode: 'custom',
                            inset: [0.25, 0.25, 0.35, 0.35]
                        },
                        protection: {
                            locked: "True",
                            lockText: "True"
                        },
                    };
                });
                list_cell = (0, Common_1.GetCellNameByIndex)(list_pro_name_1.length, 1, true);
                sheet_1.mergeCells(list_cell[0] + ":" + list_cell[list_cell.length - 1]);
                sheet_1.getCell("" + list_cell[0]).value = "Create object by Excel";
                file_path_1 = Common_1.REPORT_PATH + "/" + new Date().getTime() + "_create_object.xlsx";
                return [4 /*yield*/, workbook.xlsx.writeFile(file_path_1)];
            case 4:
                _a.sent();
                (0, API_RESPONSE_1.SuccessResp)(resp, file_path_1);
                setTimeout(function () {
                    fs.unlink(file_path_1, function (e) {
                        if (e)
                            console.log(e);
                    });
                }, Common_1.DELETE_FILE_TIMEOUT);
                return [3 /*break*/, 6];
            case 5:
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
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.GetCreateExcelTemplate = GetCreateExcelTemplate;
var GetListObjectTypeExcelTemplate = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var reqData, obj_type_id;
    return __generator(this, function (_a) {
        reqData = req.body;
        try {
            obj_type_id = (0, Common_1.getNumber)(reqData, "obj_type_id");
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
        return [2 /*return*/];
    });
}); };
exports.GetListObjectTypeExcelTemplate = GetListObjectTypeExcelTemplate;
var InsertObjectExcel = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var OriginPath, obj_type_id_1, wb, e_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (!req.files.hasOwnProperty("excel_file")) {
                    (0, API_RESPONSE_1.C201Resp)(resp, "Missing 'excel_file' field!");
                    return [2 /*return*/];
                }
                if (!req.fields.hasOwnProperty("obj_type_id")) {
                    (0, API_RESPONSE_1.C201Resp)(resp, "Missing 'obj_type_id' field!");
                    return [2 /*return*/];
                }
                OriginPath = req.files.excel_file[0].path;
                obj_type_id_1 = req.fields.obj_type_id[0];
                wb = new exceljs_1.default.Workbook();
                return [4 /*yield*/, wb.xlsx.readFile(OriginPath)];
            case 1:
                _a.sent();
                fs.unlinkSync(OriginPath);
                wb.eachSheet(function (sheet, sheet_index) {
                    return __awaiter(this, void 0, void 0, function () {
                        var errMsg_1, ListPropertyID_1, ListPropertyValues_1, obj_name_index_1, obj_desc_index_1, e_9;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(sheet_index === 1)) return [3 /*break*/, 6];
                                    errMsg_1 = "";
                                    ListPropertyID_1 = [];
                                    ListPropertyValues_1 = [];
                                    obj_name_index_1 = -1;
                                    obj_desc_index_1 = -1;
                                    sheet.eachRow(function (row, row_index) {
                                        if (row_index === 3) {
                                            row.eachCell(function (cell, cell_index) {
                                                if (cell.value !== null && cell.value !== undefined && !isNaN(Number.parseInt(cell.value.toString()))) {
                                                    ListPropertyID_1.push(Number.parseInt(cell.value.toString()));
                                                }
                                                else {
                                                    errMsg_1 += "Cell at index " + cell_index + " must be a Number and CAN NOT null,\n ";
                                                }
                                            });
                                            obj_name_index_1 = ListPropertyID_1.indexOf(-1) + 1;
                                            obj_desc_index_1 = ListPropertyID_1.indexOf(-2) + 1;
                                        }
                                        if (row_index > 3) {
                                            var temp_1 = {
                                                "obj_name": "",
                                                "obj_desc": "",
                                                "properties": []
                                            };
                                            row.eachCell({ includeEmpty: true }, function (cell, cell_index) {
                                                if (cell.value !== null && cell.value !== undefined) {
                                                    if (cell_index === obj_name_index_1) {
                                                        temp_1.obj_name = cell.value.toString().localeCompare("#") !== 0 ? cell.value.toString().toUpperCase() : null;
                                                    }
                                                    else if (cell_index === obj_desc_index_1) {
                                                        temp_1.obj_desc = cell.value.toString().localeCompare("#") !== 0 ? cell.value.toString() : '';
                                                    }
                                                    else {
                                                        if (cell.value.toString().localeCompare("#") !== 0) {
                                                            var x = {
                                                                "pro_id": ListPropertyID_1[cell_index - 1],
                                                                "pro_value": cell.value.toString()
                                                            };
                                                            temp_1.properties.push(x);
                                                        }
                                                    }
                                                }
                                                else {
                                                    errMsg_1 += "Cell at index " + cell_index + " CAN NOT null or undefined, ";
                                                }
                                            });
                                            if (temp_1.obj_name !== null)
                                                ListPropertyValues_1.push(temp_1);
                                        }
                                    });
                                    if (errMsg_1.trim() !== "") {
                                        (0, API_RESPONSE_1.C201Resp)(resp, errMsg_1.substring(0, errMsg_1.length - 2));
                                        return [2 /*return*/];
                                    }
                                    if (!(ListPropertyValues_1.length > 0)) return [3 /*break*/, 5];
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, (0, ObjectDAO_1.InsertObjectExcelDAO)(ListPropertyValues_1, obj_type_id_1)];
                                case 2:
                                    _a.sent();
                                    (0, API_RESPONSE_1.SuccessResp)(resp, "Successfully!");
                                    return [3 /*break*/, 4];
                                case 3:
                                    e_9 = _a.sent();
                                    // @ts-ignore
                                    (0, API_RESPONSE_1.C201Resp)(resp, e_9.message);
                                    return [3 /*break*/, 4];
                                case 4: return [3 /*break*/, 6];
                                case 5:
                                    (0, API_RESPONSE_1.SuccessResp)(resp, "Successfully!");
                                    _a.label = 6;
                                case 6: return [2 /*return*/];
                            }
                        });
                    });
                });
                return [3 /*break*/, 3];
            case 2:
                e_8 = _a.sent();
                //@ts-ignore
                if (e_8.hasOwnProperty("message")) {
                    //@ts-ignore
                    (0, API_RESPONSE_1.C201Resp)(resp, e_8.message);
                    return [2 /*return*/];
                }
                //@ts-ignore
                if (e_8.hasOwnProperty("sqlMessage")) {
                    //@ts-ignore
                    (0, API_RESPONSE_1.C201Resp)(resp, e_8.sqlMessage);
                    return [2 /*return*/];
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.InsertObjectExcel = InsertObjectExcel;
var ExportData = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var reqData, obj_type_id, result, ListProID, ExcelData, ListObjID, ListHeader, ListProHeader, f, _i, ListProID_1, i, _a, result_4, i, currentIndex, _b, _c, j, _d, result_5, i, wb, sheet, _e, ExcelData_1, i, t, _f, _g, j, filePath_1, e_10;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                reqData = req.body;
                _h.label = 1;
            case 1:
                _h.trys.push([1, 5, , 6]);
                obj_type_id = (0, Common_1.getNumber)(reqData, "obj_type_id");
                return [4 /*yield*/, (0, ObjectDAO_1.ExportDataDAO)(obj_type_id)];
            case 2:
                result = _h.sent();
                return [4 /*yield*/, (0, ObjectDAO_1.GetListPropertyByObjTypeIDDAO)(obj_type_id)];
            case 3:
                ListProID = _h.sent();
                ExcelData = [];
                ListObjID = [];
                ListHeader = ["ID", "Name", "Description"];
                ListProHeader = [-3, -2, -1];
                f = [];
                for (_i = 0, ListProID_1 = ListProID; _i < ListProID_1.length; _i++) {
                    i = ListProID_1[_i];
                    f.push({
                        pro_id: i.PRO_ID,
                        pro_value: '#'
                    });
                    ListProHeader.push(i.PRO_ID);
                    ListHeader.push(i.PRO_NAME);
                }
                for (_a = 0, result_4 = result; _a < result_4.length; _a++) {
                    i = result_4[_a];
                    if (ListObjID.indexOf(i.OBJ_ID) === -1) {
                        ListObjID.push(i.OBJ_ID);
                        ExcelData.push({
                            obj_id: i.OBJ_ID,
                            obj_name: i.OBJ_NAME,
                            obj_desc: i.OBJ_DESC,
                            properties: JSON.parse(JSON.stringify(f))
                        });
                    }
                }
                for (currentIndex = 0; currentIndex < ExcelData.length; currentIndex++) {
                    for (_b = 0, _c = ExcelData[currentIndex].properties; _b < _c.length; _b++) {
                        j = _c[_b];
                        for (_d = 0, result_5 = result; _d < result_5.length; _d++) {
                            i = result_5[_d];
                            if (i.PRO_ID === j.pro_id && i.OBJ_ID == ExcelData[currentIndex].obj_id) {
                                j.pro_value = i.PRO_VALUE;
                            }
                        }
                    }
                }
                wb = new exceljs_1.default.Workbook();
                sheet = wb.addWorksheet("List object");
                sheet.addRow(ListHeader);
                sheet.addRow(ListProHeader);
                for (_e = 0, ExcelData_1 = ExcelData; _e < ExcelData_1.length; _e++) {
                    i = ExcelData_1[_e];
                    t = [i.obj_id, i.obj_name, i.obj_desc];
                    for (_f = 0, _g = i.properties; _f < _g.length; _f++) {
                        j = _g[_f];
                        t.push(j.pro_value);
                    }
                    sheet.addRow(t);
                }
                filePath_1 = Common_1.REPORT_PATH + "/" + new Date().getTime() + "_list_object.xlsx";
                return [4 /*yield*/, wb.xlsx.writeFile(filePath_1)];
            case 4:
                _h.sent();
                setTimeout(function () {
                    fs.unlinkSync(filePath_1);
                }, Common_1.DELETE_FILE_TIMEOUT);
                resp.json({
                    code: 202,
                    msg: filePath_1
                });
                return [3 /*break*/, 6];
            case 5:
                e_10 = _h.sent();
                //@ts-ignore
                if (e_10.hasOwnProperty("message")) {
                    //@ts-ignore
                    (0, API_RESPONSE_1.C201Resp)(resp, e_10.message);
                    return [2 /*return*/];
                }
                //@ts-ignore
                if (e_10.hasOwnProperty("sqlMessage")) {
                    //@ts-ignore
                    (0, API_RESPONSE_1.C201Resp)(resp, e_10.sqlMessage);
                    return [2 /*return*/];
                }
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.ExportData = ExportData;
var SearchByObjectName = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var reqData, obj_name, obj_type_id, result, respResult, _i, result_6, i, e_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reqData = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                obj_name = (0, Common_1.getString)(reqData, "obj_name").toUpperCase();
                obj_type_id = (0, Common_1.getNumber)(reqData, "obj_type_id");
                return [4 /*yield*/, (0, ObjectDAO_1.SearchByObjectNameDAO)(obj_name, obj_type_id)];
            case 2:
                result = _a.sent();
                respResult = [];
                for (_i = 0, result_6 = result; _i < result_6.length; _i++) {
                    i = result_6[_i];
                    respResult.push({
                        "obj_id": i.OBJ_ID === null ? -1 : i.OBJ_ID,
                        "obj_name": i.OBJ_NAME === null ? "" : i.OBJ_NAME,
                        "obj_desc": i.OBJ_DESC === null ? "" : i.OBJ_DESC,
                        "obj_type_id": i.OBJ_TYPE_ID === null ? -1 : i.OBJ_TYPE_ID
                    });
                }
                (0, API_RESPONSE_1.SuccessResp)(resp, respResult);
                return [3 /*break*/, 4];
            case 3:
                e_11 = _a.sent();
                //@ts-ignore
                if (e_11.hasOwnProperty("message")) {
                    //@ts-ignore
                    (0, API_RESPONSE_1.C201Resp)(resp, e_11.message);
                    return [2 /*return*/];
                }
                //@ts-ignore
                if (e_11.hasOwnProperty("sqlMessage")) {
                    //@ts-ignore
                    (0, API_RESPONSE_1.C201Resp)(resp, e_11.sqlMessage);
                    return [2 /*return*/];
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.SearchByObjectName = SearchByObjectName;
