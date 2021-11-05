import {Request, Response} from "express";
import { ObjectId } from "mongodb";
import {C201Resp, MissingField, SuccessResp, Con4Java} from "../Utils/API_RESPONSE";
import {CreateOneBlackList, GetAllBlackList, CountBlackListDocuments, RemoveByID, EditBlackList} from "./BlackListDAO";

export const NewBlackList = async (req: Request, resp: Response): Promise<void> => {
    let reqData: JSON = req.body;

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

        CreateOneBlackList(ip, desc, create_time);
        SuccessResp(resp);
    } catch(e) {
        console.log(e);
        C201Resp(resp, ["\"Have an error in (BlackListservices.ts-NewBlackList)\""]);
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

        let offset: number = 0, limit: number = 0;
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
        console.log(e);
        C201Resp(resp, ["\"Have an error in (BlackListservices.ts-GetBlackList)\""]);
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
        console.log(e);
        C201Resp(resp, ["\"Have an error in (BlackListservices.ts-RemoveDocs)\""]);
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
        console.log(e);
        C201Resp(resp, ["\"Have an error in (BlackListservices.ts-EditDocs)\""]);
    }
}

export const x = async (req: Request, resp: Response): Promise<void> => {
    let reqData: JSON = req.body;
}