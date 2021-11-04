import {Request, Response} from "express";
import { ObjectId } from "mongodb";
import {C201Resp, MissingField, SuccessResp, Con4Java} from "../Utils/API_RESPONSE";
import {CreateOneBlackList, GetAllBlackList, CountBlackListDocuments} from "./BlackListDAO";

export const NewBlackList = async (req: Request, resp: Response): Promise<void> => {
    let reqData: JSON = req.body;

    if (!reqData.hasOwnProperty("ip")) MissingField(resp, "ip");

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
        let offset: number = 0, limit: number = 0;
        if (!reqData.hasOwnProperty("offset")) MissingField("offset");
        if (!reqData.hasOwnProperty("limit")) MissingField("limit");

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

export const x = async (req: Request, resp: Response): Promise<void> => {
    let reqData: JSON = req.body;
}