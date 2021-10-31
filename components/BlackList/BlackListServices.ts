import {Request, Response} from "express";
import {C201Resp, MissingField, SuccessResp} from "../Utils/API_RESPONSE";
import {CreateOneBlackList} from "./BlackListDAO";

export const NewBlackList: Function = async (req: Request, resp: Response): Promise<void> => {
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
        SuccessResp(resp, ["Success"]);
    } catch(e) {
        C201Resp(resp, [e]);
    }
}