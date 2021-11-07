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
exports.ExportNewBlackListToday = exports.ExportAllBlackListData2Excel = exports.DeleteBlackListExcel = exports.UpdateBlackListExcel = exports.NewBlackListExcel = exports.SearchByBlacklistIP = exports.EditDocs = exports.RemoveDocs = exports.GetBlackList = exports.NewBlackList = void 0;
var mongodb_1 = require("mongodb");
var fs_1 = __importDefault(require("fs"));
var xlsx_1 = __importDefault(require("xlsx"));
var API_RESPONSE_1 = require("../Utils/API_RESPONSE");
var BlackListDAO_1 = require("./BlackListDAO");
var _TIMEOUT2DELETE = 1000 * 60 * 10; //10 minutes
var NewBlackList = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var reqData, ip, desc, create_time, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reqData = req.body;
                if (!reqData.hasOwnProperty("ip")) {
                    (0, API_RESPONSE_1.MissingField)(resp, "ip");
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                ip = reqData["ip"];
                desc = reqData["desc"] || undefined;
                create_time = Number.parseInt(reqData["create_time"]) || undefined;
                return [4 /*yield*/, (0, BlackListDAO_1.CreateOneBlackList)(ip, desc, create_time)];
            case 2:
                _a.sent();
                (0, API_RESPONSE_1.SuccessResp)(resp);
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                //@ts-ignore
                if (e_1.code === 11000) {
                    (0, API_RESPONSE_1.C201Resp)(resp, ["This ip has been declare"]);
                    return [2 /*return*/];
                }
                console.log("BlackListServices.ts - NewBlackList: " + e_1);
                (0, API_RESPONSE_1.C201Resp)(resp, ["\"Have an error in (BlackListServices.ts - NewBlackList)\""]);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.NewBlackList = NewBlackList;
var GetBlackList = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var reqData, offset, limit, BlackListIPs, TotalDocs, resultData, BlackListIPArr, _i, BlackListIPs_1, BlackListIP, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reqData = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                if (!reqData.hasOwnProperty("offset")) {
                    (0, API_RESPONSE_1.MissingField)(resp, "offset");
                    return [2 /*return*/];
                }
                if (!reqData.hasOwnProperty("limit")) {
                    (0, API_RESPONSE_1.MissingField)(resp, "limit");
                    return [2 /*return*/];
                }
                offset = void 0, limit = void 0;
                offset = reqData["offset"];
                limit = reqData["limit"];
                return [4 /*yield*/, (0, BlackListDAO_1.GetAllBlackList)(offset, limit)];
            case 2:
                BlackListIPs = _a.sent();
                return [4 /*yield*/, (0, BlackListDAO_1.CountBlackListDocuments)()];
            case 3:
                TotalDocs = _a.sent();
                resultData = {};
                BlackListIPArr = [];
                for (_i = 0, BlackListIPs_1 = BlackListIPs; _i < BlackListIPs_1.length; _i++) {
                    BlackListIP = BlackListIPs_1[_i];
                    BlackListIPArr.push({
                        "id": (0, API_RESPONSE_1.Con4Java)(new mongodb_1.ObjectId(BlackListIP._id)),
                        "ip": (0, API_RESPONSE_1.Con4Java)(BlackListIP.ip),
                        "desc": (0, API_RESPONSE_1.Con4Java)(BlackListIP.desc),
                        "create_time": BlackListIP.create_time,
                        "createdAt": (0, API_RESPONSE_1.Con4Java)(BlackListIP.createdAt),
                        "updatedAt": (0, API_RESPONSE_1.Con4Java)(BlackListIP.updatedAt),
                    });
                }
                //@ts-ignore
                resultData["list"] = BlackListIPArr;
                //@ts-ignore
                resultData["total"] = TotalDocs;
                (0, API_RESPONSE_1.SuccessResp)(resp, resultData);
                return [3 /*break*/, 5];
            case 4:
                e_2 = _a.sent();
                console.log("BlackListServices.ts - GetBlackList: " + e_2);
                (0, API_RESPONSE_1.C201Resp)(resp, ["\"Have an error in (BlackListServices.ts - GetBlackList)\""]);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.GetBlackList = GetBlackList;
var RemoveDocs = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var reqData, id, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reqData = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                if (!reqData.hasOwnProperty("id")) {
                    (0, API_RESPONSE_1.MissingField)(resp, "id");
                    return [2 /*return*/];
                }
                id = reqData["id"];
                return [4 /*yield*/, (0, BlackListDAO_1.RemoveByID)(id)];
            case 2:
                _a.sent();
                (0, API_RESPONSE_1.SuccessResp)(resp);
                return [3 /*break*/, 4];
            case 3:
                e_3 = _a.sent();
                console.log("BlackListServices.ts - RemoveDocs: " + e_3);
                (0, API_RESPONSE_1.C201Resp)(resp, ["\"Have an error in (BlackListServices.ts - RemoveDocs)\""]);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.RemoveDocs = RemoveDocs;
var EditDocs = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var reqData, id, ip, desc, create_time, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reqData = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                if (!reqData.hasOwnProperty("id")) {
                    (0, API_RESPONSE_1.MissingField)(resp, "id");
                    return [2 /*return*/];
                }
                if (!reqData.hasOwnProperty("ip")) {
                    (0, API_RESPONSE_1.MissingField)(resp, "ip");
                    return [2 /*return*/];
                }
                id = void 0, ip = void 0, desc = void 0, create_time = void 0;
                //@ts-ignore
                id = reqData["id"];
                //@ts-ignore
                ip = reqData["ip"];
                //@ts-ignore
                desc = reqData["desc"];
                //@ts-ignore
                create_time = reqData["create_time"];
                return [4 /*yield*/, (0, BlackListDAO_1.EditBlackList)(id, {
                        ip: ip,
                        desc: desc,
                        create_time: create_time
                    })];
            case 2:
                _a.sent();
                (0, API_RESPONSE_1.SuccessResp)(resp);
                return [3 /*break*/, 4];
            case 3:
                e_4 = _a.sent();
                console.log("BlackListServices.ts - EditDocs: " + e_4);
                (0, API_RESPONSE_1.C201Resp)(resp, ["\"Have an error in (BlackListServices.ts - EditDocs)\""]);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.EditDocs = EditDocs;
var SearchByBlacklistIP = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var reqData, ip, BlackListIPs, BlackListIPArr, resultData, _i, BlackListIPs_2, BlackListIP, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reqData = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                if (!reqData.hasOwnProperty("ip")) {
                    (0, API_RESPONSE_1.MissingField)(resp, "ip");
                    return [2 /*return*/];
                }
                ip = reqData["ip"];
                return [4 /*yield*/, (0, BlackListDAO_1.SearchBlackListIP)(undefined, ip)];
            case 2:
                BlackListIPs = _a.sent();
                BlackListIPArr = [];
                resultData = {};
                for (_i = 0, BlackListIPs_2 = BlackListIPs; _i < BlackListIPs_2.length; _i++) {
                    BlackListIP = BlackListIPs_2[_i];
                    BlackListIPArr.push({
                        "id": (0, API_RESPONSE_1.Con4Java)(new mongodb_1.ObjectId(BlackListIP._id)),
                        "ip": (0, API_RESPONSE_1.Con4Java)(BlackListIP.ip),
                        "desc": (0, API_RESPONSE_1.Con4Java)(BlackListIP.desc),
                        "create_time": BlackListIP.create_time,
                        "createdAt": (0, API_RESPONSE_1.Con4Java)(BlackListIP.createdAt),
                        "updatedAt": (0, API_RESPONSE_1.Con4Java)(BlackListIP.updatedAt),
                    });
                }
                //@ts-ignore
                resultData["list"] = BlackListIPArr;
                //@ts-ignore
                resultData["total"] = BlackListIPArr.length;
                (0, API_RESPONSE_1.SuccessResp)(resp, resultData);
                return [3 /*break*/, 4];
            case 3:
                e_5 = _a.sent();
                console.log("BlackListServices.ts - SearchByBlacklistIP: " + e_5);
                (0, API_RESPONSE_1.C201Resp)(resp, ["\"Have an error in (BlackListServices.ts - SearchByBlacklistIP)\""]);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.SearchByBlacklistIP = SearchByBlacklistIP;
var NewBlackListExcel = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var path, workBooks, SampleKeyHeaders, KeyHeaders, CompareKeyHeader, _i, KeyHeaders_1, i, ExcelData, e_6, DuplicateIP, _a, _b, i, fileName, serverPathFile_1, clientPathFile, workBooks_1, workSheet, e_7;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                path = req.files.blacklist_file[0].path;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 7, , 8]);
                workBooks = xlsx_1.default.readFile(path);
                fs_1.default.unlinkSync(path); //Delete upload file after read
                SampleKeyHeaders = ['ip', 'desc', 'create_time'];
                KeyHeaders = xlsx_1.default.utils.sheet_to_json(workBooks.Sheets[workBooks.SheetNames[0]], { defval: '', header: 1 })[1];
                CompareKeyHeader = JSON.parse(JSON.stringify(KeyHeaders));
                for (_i = 0, KeyHeaders_1 = KeyHeaders; _i < KeyHeaders_1.length; _i++) {
                    i = KeyHeaders_1[_i];
                    i = i.trim();
                    if (SampleKeyHeaders.indexOf(i) === -1) {
                        (0, API_RESPONSE_1.C201Resp)(resp, ["Key headers must be 'ip', 'desc', 'create_time'"]);
                        return [2 /*return*/];
                    }
                    CompareKeyHeader.splice(CompareKeyHeader.indexOf(i), 1);
                }
                if (CompareKeyHeader.length > 0) {
                    (0, API_RESPONSE_1.C201Resp)(resp, ["File missing key headers " + JSON.stringify(CompareKeyHeader)]);
                    return [2 /*return*/];
                }
                ExcelData = xlsx_1.default.utils.sheet_to_json(workBooks.Sheets[workBooks.SheetNames[0]], { range: 2, header: KeyHeaders });
                _c.label = 2;
            case 2:
                _c.trys.push([2, 4, , 6]);
                return [4 /*yield*/, (0, BlackListDAO_1.CreateBlackListDocsByExcel)(ExcelData)];
            case 3:
                _c.sent();
                return [3 /*break*/, 6];
            case 4:
                e_6 = _c.sent();
                DuplicateIP = [['ID', 'IP', 'Validity', 'Create time', 'Created at', 'Updated at'], ['id', 'ip', 'desc', 'create_time', 'created_at', 'updated_at']];
                //@ts-ignore
                for (_a = 0, _b = e_6.writeErrors; _a < _b.length; _a++) {
                    i = _b[_a];
                    if (i.code === 11000) {
                        i.err.op.id = new mongodb_1.ObjectId(i.err.op._id).toString();
                        DuplicateIP.push([i.err.op._id.toString(), i.err.op.ip, i.err.op.desc, i.err.op.create_time, i.err.op.createdAt, i.err.op.updatedAt]);
                    }
                }
                fileName = new Date().getTime() + "_DuplicateIPs.xlsx";
                serverPathFile_1 = "./public/report/" + fileName;
                clientPathFile = "asset/report/" + fileName;
                workBooks_1 = xlsx_1.default.utils.book_new();
                workSheet = xlsx_1.default.utils.aoa_to_sheet(DuplicateIP);
                xlsx_1.default.utils.book_append_sheet(workBooks_1, workSheet, "Duplicate IPs");
                return [4 /*yield*/, xlsx_1.default.writeFile(workBooks_1, serverPathFile_1)];
            case 5:
                _c.sent();
                (0, API_RESPONSE_1.RespCustomCode)(resp, 202, [{ url: clientPathFile }]);
                setTimeout(function () {
                    fs_1.default.unlinkSync(serverPathFile_1);
                }, _TIMEOUT2DELETE);
                return [2 /*return*/];
            case 6:
                (0, API_RESPONSE_1.SuccessResp)(resp);
                return [3 /*break*/, 8];
            case 7:
                e_7 = _c.sent();
                console.log("BlackListServices.ts - NewBlackListExcel: " + e_7);
                (0, API_RESPONSE_1.C201Resp)(resp, ["\"Have an error in (BlackListServices.ts - NewBlackListExcel)\""]);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.NewBlackListExcel = NewBlackListExcel;
var UpdateBlackListExcel = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var path, workBooks, SampleKeyHeaders, KeyHeaders, CompareKeyHeader, _i, KeyHeaders_2, i, ExcelData, e_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                path = req.files.blacklist_file[0].path;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                workBooks = xlsx_1.default.readFile(path);
                fs_1.default.unlinkSync(path); //Delete upload file after read
                SampleKeyHeaders = ['id', 'ip', 'desc', 'create_time'];
                KeyHeaders = xlsx_1.default.utils.sheet_to_json(workBooks.Sheets[workBooks.SheetNames[0]], { defval: '', header: 1 })[1];
                CompareKeyHeader = JSON.parse(JSON.stringify(KeyHeaders));
                for (_i = 0, KeyHeaders_2 = KeyHeaders; _i < KeyHeaders_2.length; _i++) {
                    i = KeyHeaders_2[_i];
                    i = i.trim();
                    if (SampleKeyHeaders.indexOf(i) === -1) {
                        (0, API_RESPONSE_1.C201Resp)(resp, ["Key headers must be 'id', 'ip', 'desc', 'create_time'"]);
                        return [2 /*return*/];
                    }
                    CompareKeyHeader.splice(CompareKeyHeader.indexOf(i), 1);
                }
                if (CompareKeyHeader.length > 0) {
                    (0, API_RESPONSE_1.C201Resp)(resp, ["File missing key headers " + JSON.stringify(CompareKeyHeader)]);
                    return [2 /*return*/];
                }
                ExcelData = xlsx_1.default.utils.sheet_to_json(workBooks.Sheets[workBooks.SheetNames[0]], { range: 2, header: KeyHeaders });
                return [4 /*yield*/, (0, BlackListDAO_1.UpdateBlackListDocsByExcel)(ExcelData)];
            case 2:
                _a.sent();
                (0, API_RESPONSE_1.SuccessResp)(resp);
                return [3 /*break*/, 4];
            case 3:
                e_8 = _a.sent();
                console.log("BlackListServices.ts - UpdateBlackListExcel: " + e_8);
                (0, API_RESPONSE_1.C201Resp)(resp, ["\"Have an error in (BlackListServices.ts - UpdateBlackListExcel)\""]);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.UpdateBlackListExcel = UpdateBlackListExcel;
var DeleteBlackListExcel = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var path, workBooks, SampleKeyHeaders, KeyHeaders, CompareKeyHeader, _i, KeyHeaders_3, i, ExcelData, e_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                path = req.files.blacklist_file[0].path;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                workBooks = xlsx_1.default.readFile(path);
                fs_1.default.unlinkSync(path); //Delete upload file after read
                SampleKeyHeaders = ['id'];
                KeyHeaders = xlsx_1.default.utils.sheet_to_json(workBooks.Sheets[workBooks.SheetNames[0]], { defval: '', header: 1 })[1];
                CompareKeyHeader = JSON.parse(JSON.stringify(KeyHeaders));
                for (_i = 0, KeyHeaders_3 = KeyHeaders; _i < KeyHeaders_3.length; _i++) {
                    i = KeyHeaders_3[_i];
                    i = i.trim();
                    if (SampleKeyHeaders.indexOf(i) === -1) {
                        (0, API_RESPONSE_1.C201Resp)(resp, ["Key headers must have 'id'"]);
                        return [2 /*return*/];
                    }
                    CompareKeyHeader.splice(CompareKeyHeader.indexOf(i), 1);
                }
                if (CompareKeyHeader.length > 0) {
                    (0, API_RESPONSE_1.C201Resp)(resp, ["File missing key headers " + JSON.stringify(CompareKeyHeader)]);
                    return [2 /*return*/];
                }
                ExcelData = xlsx_1.default.utils.sheet_to_json(workBooks.Sheets[workBooks.SheetNames[0]], { range: 2, header: KeyHeaders });
                return [4 /*yield*/, (0, BlackListDAO_1.DeleteBlackListDocsByExcel)(ExcelData)];
            case 2:
                _a.sent();
                (0, API_RESPONSE_1.SuccessResp)(resp);
                return [3 /*break*/, 4];
            case 3:
                e_9 = _a.sent();
                console.log("BlackListServices.ts - UpdateBlackListExcel: " + e_9);
                (0, API_RESPONSE_1.C201Resp)(resp, ["\"Have an error in (BlackListServices.ts - UpdateBlackListExcel)\""]);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.DeleteBlackListExcel = DeleteBlackListExcel;
var ExportAllBlackListData2Excel = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var result, fileName, serverPathFile_2, clientPathFile, dataForExcel, _i, result_1, i, workBooks, workSheet, e_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, BlackListDAO_1.GetAllBlackList)(0)];
            case 1:
                result = _a.sent();
                fileName = new Date().getTime() + "_TotalData.xlsx";
                serverPathFile_2 = "./public/report/" + fileName;
                clientPathFile = "asset/report/" + fileName;
                dataForExcel = [['ID', 'IP', 'Description', 'Create time', 'Created at', 'Updated at'], ['id', 'ip', 'desc', 'create_time', 'created_at', 'updated_at']];
                for (_i = 0, result_1 = result; _i < result_1.length; _i++) {
                    i = result_1[_i];
                    i.id = new mongodb_1.ObjectId(i._id);
                    dataForExcel.push([i.id, i.ip, i.desc, i.create_time, i.createdAt, i.updatedAt]);
                }
                workBooks = xlsx_1.default.utils.book_new();
                workSheet = xlsx_1.default.utils.aoa_to_sheet(dataForExcel);
                xlsx_1.default.utils.book_append_sheet(workBooks, workSheet, "total data");
                return [4 /*yield*/, xlsx_1.default.writeFile(workBooks, serverPathFile_2)];
            case 2:
                _a.sent();
                (0, API_RESPONSE_1.SuccessResp)(resp, [{ url: clientPathFile }]);
                setTimeout(function () {
                    fs_1.default.unlinkSync(serverPathFile_2);
                }, _TIMEOUT2DELETE);
                return [3 /*break*/, 4];
            case 3:
                e_10 = _a.sent();
                console.log("BlackListServices.ts - ExportAllBlackListData2Excel: " + e_10);
                (0, API_RESPONSE_1.C201Resp)(resp, ["\"Have an error in (BlackListServices.ts - ExportAllBlackListData2Excel)\""]);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.ExportAllBlackListData2Excel = ExportAllBlackListData2Excel;
var ExportNewBlackListToday = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var reqData, _from, _to, result, ExcelData, _i, result_2, i, fileName, serverPathFile_3, clientPathFile, workBooks, workSheet, e_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reqData = req.body;
                if (!reqData.hasOwnProperty("createdAt_from")) {
                    (0, API_RESPONSE_1.MissingField)(resp, "createdAt_from");
                    return [2 /*return*/];
                }
                if (!reqData.hasOwnProperty("createdAt_to")) {
                    (0, API_RESPONSE_1.MissingField)(resp, "createdAt_to");
                    return [2 /*return*/];
                }
                _from = reqData.createdAt_from;
                _to = reqData.createdAt_to;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, (0, BlackListDAO_1.SearchBlackListIP)(undefined, undefined, undefined, undefined, _from, _to, undefined, undefined)];
            case 2:
                result = _a.sent();
                ExcelData = [["ID", "IP", "Validity", "Create time", "Created at", "Updated at"], ["id", "ip", "desc", "create_time", "created_at", "updated_at"]];
                for (_i = 0, result_2 = result; _i < result_2.length; _i++) {
                    i = result_2[_i];
                    ExcelData.push([i._id.toString(), i.ip, i.desc, i.create_time, i.createdAt, i.updatedAt]);
                }
                fileName = new Date().getTime() + "_ListIP_ImportToday.xlsx";
                serverPathFile_3 = "./public/report/" + fileName;
                clientPathFile = "asset/report/" + fileName;
                workBooks = xlsx_1.default.utils.book_new();
                workSheet = xlsx_1.default.utils.aoa_to_sheet(ExcelData);
                xlsx_1.default.utils.book_append_sheet(workBooks, workSheet, "List IPs");
                return [4 /*yield*/, xlsx_1.default.writeFile(workBooks, serverPathFile_3)];
            case 3:
                _a.sent();
                (0, API_RESPONSE_1.SuccessResp)(resp, [{ url: clientPathFile }]);
                setTimeout(function () {
                    fs_1.default.unlinkSync(serverPathFile_3);
                }, _TIMEOUT2DELETE);
                return [3 /*break*/, 5];
            case 4:
                e_11 = _a.sent();
                console.log("BlackListServices.ts - ExportNewBlackListToday: " + e_11);
                (0, API_RESPONSE_1.C201Resp)(resp, ["\"Have an error in (BlackListServices.ts - ExportNewBlackListToday)\""]);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.ExportNewBlackListToday = ExportNewBlackListToday;
