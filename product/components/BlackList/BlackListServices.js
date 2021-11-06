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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportAllBlackListData2Excel = exports.DeleteBlackListExcel = exports.UpdateBlackListExcel = exports.NewBlackListExcel = exports.SearchByBlacklistIP = exports.EditDocs = exports.RemoveDocs = exports.GetBlackList = exports.NewBlackList = void 0;
const mongodb_1 = require("mongodb");
const fs_1 = __importDefault(require("fs"));
const xlsx_1 = __importDefault(require("xlsx"));
const API_RESPONSE_1 = require("../Utils/API_RESPONSE");
const BlackListDAO_1 = require("./BlackListDAO");
const _TIMEOUT2DELETE = 1000 * 60; //1min
const NewBlackList = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let reqData = req.body;
    if (!reqData.hasOwnProperty("ip")) {
        (0, API_RESPONSE_1.MissingField)(resp, "ip");
        return;
    }
    try {
        //@ts-ignore
        let ip = reqData["ip"];
        //@ts-ignore
        let desc = reqData["desc"] || undefined;
        //@ts-ignore
        let create_time = Number.parseInt(reqData["create_time"]) || undefined;
        yield (0, BlackListDAO_1.CreateOneBlackList)(ip, desc, create_time);
        (0, API_RESPONSE_1.SuccessResp)(resp);
    }
    catch (e) {
        console.log("BlackListServices.ts - NewBlackList: " + e);
        (0, API_RESPONSE_1.C201Resp)(resp, ["\"Have an error in (BlackListServices.ts - NewBlackList)\""]);
    }
});
exports.NewBlackList = NewBlackList;
const GetBlackList = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let reqData = req.body;
    try {
        if (!reqData.hasOwnProperty("offset")) {
            (0, API_RESPONSE_1.MissingField)(resp, "offset");
            return;
        }
        if (!reqData.hasOwnProperty("limit")) {
            (0, API_RESPONSE_1.MissingField)(resp, "limit");
            return;
        }
        let offset, limit;
        offset = reqData["offset"];
        limit = reqData["limit"];
        let BlackListIPs = yield (0, BlackListDAO_1.GetAllBlackList)(offset, limit);
        let TotalDocs = yield (0, BlackListDAO_1.CountBlackListDocuments)();
        let resultData = {};
        let BlackListIPArr = [];
        for (let BlackListIP of BlackListIPs) {
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
    }
    catch (e) {
        console.log("BlackListServices.ts - GetBlackList: " + e);
        (0, API_RESPONSE_1.C201Resp)(resp, ["\"Have an error in (BlackListServices.ts - GetBlackList)\""]);
    }
});
exports.GetBlackList = GetBlackList;
const RemoveDocs = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let reqData = req.body;
    try {
        if (!reqData.hasOwnProperty("id")) {
            (0, API_RESPONSE_1.MissingField)(resp, "id");
            return;
        }
        let id = reqData["id"];
        yield (0, BlackListDAO_1.RemoveByID)(id);
        (0, API_RESPONSE_1.SuccessResp)(resp);
    }
    catch (e) {
        console.log("BlackListServices.ts - RemoveDocs: " + e);
        (0, API_RESPONSE_1.C201Resp)(resp, ["\"Have an error in (BlackListServices.ts - RemoveDocs)\""]);
    }
});
exports.RemoveDocs = RemoveDocs;
const EditDocs = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let reqData = req.body;
    try {
        if (!reqData.hasOwnProperty("id")) {
            (0, API_RESPONSE_1.MissingField)(resp, "id");
            return;
        }
        if (!reqData.hasOwnProperty("ip")) {
            (0, API_RESPONSE_1.MissingField)(resp, "ip");
            return;
        }
        let id, ip, desc, create_time;
        //@ts-ignore
        id = reqData["id"];
        //@ts-ignore
        ip = reqData["ip"];
        //@ts-ignore
        desc = reqData["desc"];
        //@ts-ignore
        create_time = reqData["create_time"];
        yield (0, BlackListDAO_1.EditBlackList)(id, {
            ip: ip,
            desc: desc,
            create_time: create_time
        });
        (0, API_RESPONSE_1.SuccessResp)(resp);
    }
    catch (e) {
        console.log("BlackListServices.ts - EditDocs: " + e);
        (0, API_RESPONSE_1.C201Resp)(resp, ["\"Have an error in (BlackListServices.ts - EditDocs)\""]);
    }
});
exports.EditDocs = EditDocs;
const SearchByBlacklistIP = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let reqData = req.body;
    try {
        if (!reqData.hasOwnProperty("ip")) {
            (0, API_RESPONSE_1.MissingField)(resp, "ip");
            return;
        }
        let ip = reqData["ip"];
        let BlackListIPs = yield (0, BlackListDAO_1.SearchBlackListIP)(undefined, ip);
        let BlackListIPArr = [];
        let resultData = {};
        for (let BlackListIP of BlackListIPs) {
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
    }
    catch (e) {
        console.log("BlackListServices.ts - SearchByBlacklistIP: " + e);
        (0, API_RESPONSE_1.C201Resp)(resp, ["\"Have an error in (BlackListServices.ts - SearchByBlacklistIP)\""]);
    }
});
exports.SearchByBlacklistIP = SearchByBlacklistIP;
const NewBlackListExcel = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let path = req.files.blacklist_file[0].path;
    try {
        let workBooks = xlsx_1.default.readFile(path);
        fs_1.default.unlinkSync(path); //Delete upload file after read
        const SampleKeyHeaders = ['ip', 'desc', 'create_time'];
        //@ts-ignore
        let KeyHeaders = xlsx_1.default.utils.sheet_to_json(workBooks.Sheets[workBooks.SheetNames[0]], { defval: '', header: 1 })[1];
        let CompareKeyHeader = JSON.parse(JSON.stringify(KeyHeaders));
        for (let i of KeyHeaders) {
            i = i.trim();
            if (SampleKeyHeaders.indexOf(i) === -1) {
                (0, API_RESPONSE_1.C201Resp)(resp, ["Key headers must be 'ip', 'desc', 'create_time'"]);
                return;
            }
            CompareKeyHeader.splice(CompareKeyHeader.indexOf(i), 1);
        }
        if (CompareKeyHeader.length > 0) {
            (0, API_RESPONSE_1.C201Resp)(resp, ["File missing key headers " + JSON.stringify(CompareKeyHeader)]);
            return;
        }
        let ExcelData = xlsx_1.default.utils.sheet_to_json(workBooks.Sheets[workBooks.SheetNames[0]], { range: 2, header: KeyHeaders });
        yield (0, BlackListDAO_1.CreateBlackListDocsByExcel)(ExcelData);
        (0, API_RESPONSE_1.SuccessResp)(resp);
    }
    catch (e) {
        console.log("BlackListServices.ts - NewBlackListExcel: " + e);
        (0, API_RESPONSE_1.C201Resp)(resp, ["\"Have an error in (BlackListServices.ts - NewBlackListExcel)\""]);
    }
});
exports.NewBlackListExcel = NewBlackListExcel;
const UpdateBlackListExcel = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let path = req.files.blacklist_file[0].path;
    try {
        let workBooks = xlsx_1.default.readFile(path);
        fs_1.default.unlinkSync(path); //Delete upload file after read
        const SampleKeyHeaders = ['id', 'ip', 'desc', 'create_time'];
        //@ts-ignore
        let KeyHeaders = xlsx_1.default.utils.sheet_to_json(workBooks.Sheets[workBooks.SheetNames[0]], { defval: '', header: 1 })[1];
        let CompareKeyHeader = JSON.parse(JSON.stringify(KeyHeaders));
        for (let i of KeyHeaders) {
            i = i.trim();
            if (SampleKeyHeaders.indexOf(i) === -1) {
                (0, API_RESPONSE_1.C201Resp)(resp, ["Key headers must be 'id', 'ip', 'desc', 'create_time'"]);
                return;
            }
            CompareKeyHeader.splice(CompareKeyHeader.indexOf(i), 1);
        }
        if (CompareKeyHeader.length > 0) {
            (0, API_RESPONSE_1.C201Resp)(resp, ["File missing key headers " + JSON.stringify(CompareKeyHeader)]);
            return;
        }
        let ExcelData = xlsx_1.default.utils.sheet_to_json(workBooks.Sheets[workBooks.SheetNames[0]], { range: 2, header: KeyHeaders });
        yield (0, BlackListDAO_1.UpdateBlackListDocsByExcel)(ExcelData);
        (0, API_RESPONSE_1.SuccessResp)(resp);
    }
    catch (e) {
        console.log("BlackListServices.ts - UpdateBlackListExcel: " + e);
        (0, API_RESPONSE_1.C201Resp)(resp, ["\"Have an error in (BlackListServices.ts - UpdateBlackListExcel)\""]);
    }
});
exports.UpdateBlackListExcel = UpdateBlackListExcel;
const DeleteBlackListExcel = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let path = req.files.blacklist_file[0].path;
    try {
        let workBooks = xlsx_1.default.readFile(path);
        fs_1.default.unlinkSync(path); //Delete upload file after read
        const SampleKeyHeaders = ['id'];
        //@ts-ignore
        let KeyHeaders = xlsx_1.default.utils.sheet_to_json(workBooks.Sheets[workBooks.SheetNames[0]], { defval: '', header: 1 })[1];
        let CompareKeyHeader = JSON.parse(JSON.stringify(KeyHeaders));
        for (let i of KeyHeaders) {
            i = i.trim();
            if (SampleKeyHeaders.indexOf(i) === -1) {
                (0, API_RESPONSE_1.C201Resp)(resp, ["Key headers must be 'id'"]);
                return;
            }
            CompareKeyHeader.splice(CompareKeyHeader.indexOf(i), 1);
        }
        if (CompareKeyHeader.length > 0) {
            (0, API_RESPONSE_1.C201Resp)(resp, ["File missing key headers " + JSON.stringify(CompareKeyHeader)]);
            return;
        }
        let ExcelData = xlsx_1.default.utils.sheet_to_json(workBooks.Sheets[workBooks.SheetNames[0]], { range: 2, header: KeyHeaders });
        yield (0, BlackListDAO_1.DeleteBlackListDocsByExcel)(ExcelData);
        (0, API_RESPONSE_1.SuccessResp)(resp);
    }
    catch (e) {
        console.log("BlackListServices.ts - UpdateBlackListExcel: " + e);
        (0, API_RESPONSE_1.C201Resp)(resp, ["\"Have an error in (BlackListServices.ts - UpdateBlackListExcel)\""]);
    }
});
exports.DeleteBlackListExcel = DeleteBlackListExcel;
const ExportAllBlackListData2Excel = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result = yield (0, BlackListDAO_1.GetAllBlackList)(0);
        const fileName = new Date().getTime() + "_TotalData.xlsx";
        let serverPathFile = "./public/report/" + fileName;
        let clientPathFile = "asset/report/" + fileName;
        let dataForExcel = [['ID', 'IP', 'Description', 'Create time', 'Created at', 'Updated at']];
        for (let i of result) {
            i.id = new mongodb_1.ObjectId(i._id);
            dataForExcel.push([i.id, i.ip, i.desc, i.create_time, i.createdAt, i.updatedAt]);
        }
        let workBooks = xlsx_1.default.utils.book_new();
        let workSheet = xlsx_1.default.utils.aoa_to_sheet(dataForExcel);
        xlsx_1.default.utils.book_append_sheet(workBooks, workSheet, "total data");
        yield xlsx_1.default.writeFile(workBooks, serverPathFile);
        (0, API_RESPONSE_1.SuccessResp)(resp, [{ url: clientPathFile }]);
        setTimeout(() => {
            fs_1.default.unlinkSync(serverPathFile);
        }, _TIMEOUT2DELETE);
    }
    catch (e) {
        console.log("BlackListServices.ts - ExportAllBlackListData2Excel: " + e);
        (0, API_RESPONSE_1.C201Resp)(resp, ["\"Have an error in (BlackListServices.ts - ExportAllBlackListData2Excel)\""]);
    }
});
exports.ExportAllBlackListData2Excel = ExportAllBlackListData2Excel;
