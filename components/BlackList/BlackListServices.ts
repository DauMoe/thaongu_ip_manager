import {Request, Response} from "express";
import { ObjectId } from "mongodb";
import fs from "fs";
import XLSX from "xlsx";
import {C201Resp, MissingField, SuccessResp, Con4Java, RespCustomCode} from "../Utils/API_RESPONSE";
import {
    CreateOneBlackList,
    GetAllBlackList,
    CountBlackListDocuments,
    RemoveByID,
    EditBlackList,
    CreateBlackListDocsByExcel,
    SearchBlackListIP,
    UpdateBlackListDocsByExcel,
    DeleteBlackListDocsByExcel
} from "./BlackListDAO";
import { _TIMEOUT2DELETE } from "../Definition";

export const NewBlackList = async (req: Request, resp: Response): Promise<void> => {
    let reqData = req.body;

    if (!reqData.hasOwnProperty("ip")) {
        MissingField(resp, "ip");
        return;
    }

    try {
        //@ts-ignore
        let ip: string = reqData["ip"] as string;
        //@ts-ignore
        let desc: string = reqData["desc"] as string || undefined;
        //@ts-ignore
        let create_time: number = Number.parseInt(reqData["create_time"] as number) || undefined;

        await CreateOneBlackList(ip, desc, create_time);
        SuccessResp(resp);
    } catch(e) {
        //@ts-ignore
        if (e.code === 11000) {
            C201Resp(resp, ["This ip has been declare"]);
            return;
        }
        console.log("BlackListServices.ts - NewBlackList: " + e);
        C201Resp(resp, ["\"Have an error in (BlackListServices.ts - NewBlackList)\""]);
    }
}

export const GetBlackList = async (req: Request, resp: Response): Promise<void> => {
    let reqData = req.body;

    try {
        if (!reqData.hasOwnProperty("offset")) {
            MissingField(resp, "offset");
            return;
        }
        if (!reqData.hasOwnProperty("limit")) {
            MissingField(resp, "limit");
            return;
        }

        let offset: number, limit: number;
        offset = reqData["offset"] as number;
        limit = reqData["limit"] as number;

        let BlackListIPs = await GetAllBlackList(offset, limit);
        let TotalDocs = await CountBlackListDocuments();
        let resultData = {};
        let BlackListIPArr: any[] = [];

        for (let BlackListIP of BlackListIPs) {
            BlackListIPArr.push({
                "id": Con4Java(new ObjectId(BlackListIP._id)),
                "ip": Con4Java(BlackListIP.ip),
                "desc": Con4Java(BlackListIP.desc),
                "create_time": BlackListIP.create_time,
                "createdAt": Con4Java(BlackListIP.createdAt),
                "updatedAt": Con4Java(BlackListIP.updatedAt),
            });
        }
        //@ts-ignore
        resultData["list"] = BlackListIPArr;
        //@ts-ignore
        resultData["total"] = TotalDocs;
        SuccessResp(resp, resultData);
    } catch(e) {
        console.log("BlackListServices.ts - GetBlackList: " + e);
        C201Resp(resp, ["\"Have an error in (BlackListServices.ts - GetBlackList)\""]);
    }
}

export const RemoveDocs = async (req: Request, resp: Response): Promise<void> => {
    let reqData = req.body;

    try {
        if (!reqData.hasOwnProperty("id")) {
            MissingField(resp, "id");
            return;
        }
        let id: string = reqData["id"] as string;
        await RemoveByID(id);
        SuccessResp(resp);
    } catch(e) {
        console.log("BlackListServices.ts - RemoveDocs: " + e);
        C201Resp(resp, ["\"Have an error in (BlackListServices.ts - RemoveDocs)\""]);
    }
}

export const EditDocs = async (req: Request, resp: Response): Promise<void> => {
    let reqData = req.body;

    try {
        if (!reqData.hasOwnProperty("id")) {
            MissingField(resp, "id");
            return;
        }
        if (!reqData.hasOwnProperty("ip")) {
            MissingField(resp, "ip");
            return;
        }

        let id: string, ip: string, desc: string, create_time: string;

        //@ts-ignore
        id = reqData["id"];
        //@ts-ignore
        ip = reqData["ip"];
        //@ts-ignore
        desc = reqData["desc"];
        //@ts-ignore
        create_time = reqData["create_time"];

        await EditBlackList(id, {
            ip: ip,
            desc: desc,
            create_time: create_time
        });
        SuccessResp(resp);
    } catch (e) {
        console.log("BlackListServices.ts - EditDocs: " + e);
        C201Resp(resp, ["\"Have an error in (BlackListServices.ts - EditDocs)\""]);
    }
}

export const SearchByBlacklistIP = async (req: Request, resp: Response): Promise<void> => {
    let reqData = req.body;

    try {
        if (!reqData.hasOwnProperty("ip")) {
            MissingField(resp, "ip");
            return;
        }

        let ip                      = reqData["ip"] as string;
        let BlackListIPs            = await SearchBlackListIP(undefined, ip);
        let BlackListIPArr: any[]   = [];
        let resultData              = {};

        for (let BlackListIP of BlackListIPs) {
            BlackListIPArr.push({
                "id": Con4Java(new ObjectId(BlackListIP._id)),
                "ip": Con4Java(BlackListIP.ip),
                "desc": Con4Java(BlackListIP.desc),
                "create_time": BlackListIP.create_time,
                "createdAt": Con4Java(BlackListIP.createdAt),
                "updatedAt": Con4Java(BlackListIP.updatedAt),
            });
        }
        //@ts-ignore
        resultData["list"] = BlackListIPArr;
        //@ts-ignore
        resultData["total"] = BlackListIPArr.length;
        SuccessResp(resp, resultData);
    } catch (e) {
        console.log("BlackListServices.ts - SearchByBlacklistIP: " + e);
        C201Resp(resp, ["\"Have an error in (BlackListServices.ts - SearchByBlacklistIP)\""]);
    }
}

export const NewBlackListExcel = async (req: Request, resp: Response): Promise<void> => {
    let path: string    = req.files.blacklist_file[0].path;
    try {
        let workBooks = XLSX.readFile(path);
        fs.unlinkSync(path); //Delete upload file after read
        const SampleKeyHeaders = ['ip', 'desc', 'create_time'];
        //@ts-ignore
        let KeyHeaders: string[] = XLSX.utils.sheet_to_json(workBooks.Sheets[workBooks.SheetNames[0]], {defval: '', header: 1})[1];
        let CompareKeyHeader = JSON.parse(JSON.stringify(KeyHeaders));
        for (let i of KeyHeaders) {
            i = i.trim();
            if (SampleKeyHeaders.indexOf(i) === -1) {
                C201Resp(resp, ["Key headers must be 'ip', 'desc', 'create_time'"]);
                return;
            }
            CompareKeyHeader.splice(CompareKeyHeader.indexOf(i), 1);
        }
        if (CompareKeyHeader.length > 0) {
            C201Resp(resp, ["File missing key headers " + JSON.stringify(CompareKeyHeader)]);
            return;
        }
        let ExcelData = XLSX.utils.sheet_to_json(workBooks.Sheets[workBooks.SheetNames[0]], {range: 2, header: KeyHeaders});
        try {
            for (let i of ExcelData) {
                // @ts-ignore
                i.create_time = new Date(i.create_time).getTime();
            }
            console.log(ExcelData);
            await CreateBlackListDocsByExcel(ExcelData);
        } catch (e) {
            console.log(e);
            let DuplicateIP = [['ID', 'IP', 'Validity', 'Create time', 'Created at', 'Updated at'], ['id', 'ip', 'desc', 'create_time', 'created_at', 'updated_at']];
            //@ts-ignore
            for (let i of e.writeErrors) {
                if (i.code === 11000) {
                    i.err.op.id = new ObjectId(i.err.op._id).toString();
                    DuplicateIP.push([i.err.op._id.toString(), i.err.op.ip, i.err.op.desc, i.err.op.create_time, i.err.op.createdAt, i.err.op.updatedAt]);
                }
            }
            const fileName = new Date().getTime() + "_DuplicateIPs.xlsx";
            let serverPathFile = "./public/report/" + fileName;
            let clientPathFile = "asset/report/" + fileName;
            let workBooks = XLSX.utils.book_new();
            let workSheet = XLSX.utils.aoa_to_sheet(DuplicateIP);
            XLSX.utils.book_append_sheet(workBooks, workSheet, "Duplicate IPs");
            await XLSX.writeFile(workBooks, serverPathFile);
            RespCustomCode(resp, 202, [{url: clientPathFile}]);
            console.log(serverPathFile);
            setTimeout(() => {
                fs.unlinkSync(serverPathFile);
            }, _TIMEOUT2DELETE);
            return;
        }
        SuccessResp(resp);
    } catch (e) {
        console.log("BlackListServices.ts - NewBlackListExcel: " + e);
        console.log(e);
        C201Resp(resp, ["\"Have an error in (BlackListServices.ts - NewBlackListExcel)\""]);
    }
}

export const UpdateBlackListExcel = async (req: Request, resp: Response): Promise<void> => {
    let path: string = req.files.blacklist_file[0].path;
    try {
        let workBooks = XLSX.readFile(path);
        fs.unlinkSync(path); //Delete upload file after read
        const SampleKeyHeaders = ['id', 'ip', 'desc', 'create_time'];
        //@ts-ignore
        let KeyHeaders: string[] = XLSX.utils.sheet_to_json(workBooks.Sheets[workBooks.SheetNames[0]], {defval: '', header: 1})[1];
        let CompareKeyHeader = JSON.parse(JSON.stringify(KeyHeaders));
        for (let i of KeyHeaders) {
            i = i.trim();
            if (SampleKeyHeaders.indexOf(i) === -1) {
                C201Resp(resp, ["Key headers must be 'id', 'ip', 'desc', 'create_time'"]);
                return;
            }
            CompareKeyHeader.splice(CompareKeyHeader.indexOf(i), 1);
        }
        if (CompareKeyHeader.length > 0) {
            C201Resp(resp, ["File missing key headers " + JSON.stringify(CompareKeyHeader)]);
            return;
        }
        let ExcelData = XLSX.utils.sheet_to_json(workBooks.Sheets[workBooks.SheetNames[0]], {range: 2, header: KeyHeaders});
        await UpdateBlackListDocsByExcel(ExcelData);
        SuccessResp(resp);
    } catch (e) {
        console.log("BlackListServices.ts - UpdateBlackListExcel: " + e);
        C201Resp(resp, ["\"Have an error in (BlackListServices.ts - UpdateBlackListExcel)\""]);
    }
}

export const DeleteBlackListExcel = async (req: Request, resp: Response): Promise<void> => {
    let path: string = req.files.blacklist_file[0].path;
    try {
        let workBooks = XLSX.readFile(path);
        fs.unlinkSync(path); //Delete upload file after read
        const SampleKeyHeaders = ['id'];
        //@ts-ignore
        let KeyHeaders: string[] = XLSX.utils.sheet_to_json(workBooks.Sheets[workBooks.SheetNames[0]], {defval: '', header: 1})[1];
        let CompareKeyHeader = JSON.parse(JSON.stringify(KeyHeaders));
        for (let i of KeyHeaders) {
            i = i.trim();
            if (SampleKeyHeaders.indexOf(i) === -1) {
                C201Resp(resp, ["Key headers must have 'id'"]);
                return;
            }
            CompareKeyHeader.splice(CompareKeyHeader.indexOf(i), 1);
        }
        if (CompareKeyHeader.length > 0) {
            C201Resp(resp, ["File missing key headers " + JSON.stringify(CompareKeyHeader)]);
            return;
        }
        let ExcelData = XLSX.utils.sheet_to_json(workBooks.Sheets[workBooks.SheetNames[0]], {range: 2, header: KeyHeaders});
        await DeleteBlackListDocsByExcel(ExcelData);
        SuccessResp(resp);
    } catch (e) {
        console.log("BlackListServices.ts - UpdateBlackListExcel: " + e);
        C201Resp(resp, ["\"Have an error in (BlackListServices.ts - UpdateBlackListExcel)\""]);
    }
}

export const ExportAllBlackListData2Excel = async(req: Request, resp: Response): Promise<void> => {
    try {
        let result = await GetAllBlackList(0);
        const fileName = new Date().getTime() + "_TotalData.xlsx";
        let serverPathFile = "./public/report/" + fileName;
        let clientPathFile = "asset/report/" + fileName;
        let dataForExcel = [['ID', 'IP', 'Description', 'Create time', 'Created at', 'Updated at'], ['id', 'ip', 'desc', 'create_time', 'created_at', 'updated_at']];
        for (let i of result) {
            i.id = new ObjectId(i._id);
            dataForExcel.push(
                [i.id, i.ip, i.desc, i.create_time, i.createdAt, i.updatedAt]
            );
        }
        let workBooks = XLSX.utils.book_new();
        let workSheet = XLSX.utils.aoa_to_sheet(dataForExcel);
        XLSX.utils.book_append_sheet(workBooks, workSheet, "total data");
        await XLSX.writeFile(workBooks, serverPathFile);
        SuccessResp(resp, [{url: clientPathFile}]);
        setTimeout(() => {
            fs.unlinkSync(serverPathFile);
        }, _TIMEOUT2DELETE);
    } catch (e) {
        console.log("BlackListServices.ts - ExportAllBlackListData2Excel: " + e);
        C201Resp(resp, ["\"Have an error in (BlackListServices.ts - ExportAllBlackListData2Excel)\""]);
    }
}

export const ExportNewBlackListToday = async(req: Request, resp: Response): Promise<void> => {
    let reqData = req.body;
    let _from: number, _to: number;

    if (!reqData.hasOwnProperty("createdAt_from")) {
        MissingField(resp, "createdAt_from");
        return;
    }
    if (!reqData.hasOwnProperty("createdAt_to")) {
        MissingField(resp, "createdAt_to");
        return;
    }

    _from   = reqData.createdAt_from as number;
    _to     = reqData.createdAt_to as number;

    try {
        let result = await SearchBlackListIP(
            undefined,
            undefined,
            undefined,
            undefined,
            _from, _to,
            undefined,
            undefined
        );
        let ExcelData = [["ID", "IP", "Validity", "Create time", "Created at", "Updated at"], ["id", "ip", "desc", "create_time", "created_at", "updated_at"]];
        for (let i of result) {
            ExcelData.push(
                [i._id.toString(), i.ip, i.desc, i.create_time, i.createdAt, i.updatedAt]
            );
        }
        const fileName = new Date().getTime() + "_ListIP_ImportToday.xlsx";
        let serverPathFile = "./public/report/" + fileName;
        let clientPathFile = "asset/report/" + fileName;
        let workBooks = XLSX.utils.book_new();
        let workSheet = XLSX.utils.aoa_to_sheet(ExcelData);
        XLSX.utils.book_append_sheet(workBooks, workSheet, "List IPs");
        await XLSX.writeFile(workBooks, serverPathFile);
        SuccessResp(resp, [{url: clientPathFile}]);
        setTimeout(() => {
            fs.unlinkSync(serverPathFile);
        }, _TIMEOUT2DELETE);

    } catch (e) {
        console.log("BlackListServices.ts - ExportNewBlackListToday: " + e);
        C201Resp(resp, ["\"Have an error in (BlackListServices.ts - ExportNewBlackListToday)\""]);
    }
}