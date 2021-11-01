import {Request, Response} from "express";
import { ObjectId } from "mongodb";
import {C201Resp, MissingField, SuccessResp, Con4Java} from "../Utils/API_RESPONSE";
import {CreateOneBlackList, GetAllBlackList} from "./BlackListDAO";

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
        let id:string | undefined, ip: string | undefined, create_time_from: number | undefined, create_time_to: number | undefined;
        if (reqData && reqData.hasOwnProperty("id")) id = reqData["id"] as string;
        if (reqData && reqData.hasOwnProperty("ip")) ip = reqData["ip"] as string;
        if (reqData && reqData.hasOwnProperty("create_time_from")) create_time_from = reqData["create_time_from"] as number;
        if (reqData && reqData.hasOwnProperty("create_time_to")) create_time_to = reqData["create_time_to"] as number;

        if (create_time_from === undefined && create_time_to !== undefined) {
            MissingField(resp, "create_time_from");
        }
        if (create_time_from !== undefined && create_time_to === undefined) {
            MissingField(resp, "create_time_to");
        }
        let BlackListIPs = await GetAllBlackList(id, ip, create_time_from, create_time_to);
        let resultData: any[] = [];
        for (let BlackListIP of BlackListIPs) {
            resultData.push({
                "id": Con4Java(new ObjectId(BlackListIP._id)),
                "ip": Con4Java(BlackListIP.ip),
                "desc": Con4Java(BlackListIP.desc),
                "create_time": BlackListIP.create_time,
                "createdAt": Con4Java(BlackListIP.createdAt),
                "updatedAt": Con4Java(BlackListIP.updatedAt),
            });
        }
        SuccessResp(resp, resultData);
    } catch(e) {
        console.log(e);
        C201Resp(resp, ["\"Have an error in (BlackListservices.ts-GetBlackList)\""]);
    }
}

export const x = async (req: Request, resp: Response): Promise<void> => {
    let reqData: JSON = req.body;
}