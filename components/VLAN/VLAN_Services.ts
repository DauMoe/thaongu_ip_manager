import {Request, Response} from "express";
import LogConfig from "../LogConfig";
import {getJSONObject, getNumber, getString} from "../Utils/Common";
import {CountTotalDocs, GetDocsLimit, GetPropertiesByID, NewVLAN_IP, Single_AddProperties} from "./VLAN_DAO";
import {C201Resp, SuccessResp} from "../Utils/API_RESPONSE";
import {RequiredVLANProperties} from "../Definition";

export const AddProperties = async (req: Request, resp: Response): Promise<void> => {
    let reqData = req.body;
    try {
        let id: string = getString(reqData, "id");
        let properties: any = getJSONObject(reqData, "properties");

        await Single_AddProperties(id, properties);
        SuccessResp(resp);
    } catch (e) {
        console.log("(VLAN_Services.ts - AddProperties) Err:");
        //@ts-ignore
        C201Resp(resp, [e.message]);

        //@ts-ignore
        LogConfig.error(e.message);
    }
}

export const NewIP = async(req: Request, resp: Response): Promise<any> => {
    let reqData = req.body;
    try {
        let ip: string = getString(reqData, "ip");
        let properties: any = getJSONObject(reqData, "properties");
        let RequiredProperties = JSON.parse(JSON.stringify(RequiredVLANProperties));
        for (let i of Object.keys(properties)) {
            let index = -1;
            if ((index = RequiredProperties.indexOf(i.trim())) > -1) {
                RequiredProperties.splice(index, 1);
            }
        }
        if (RequiredProperties.length > 0) {
            C201Resp(resp, [`Properties must includes '${RequiredProperties.join(", ")}' field(s)`]);
            return;
        }
        let {_doc} = await NewVLAN_IP(ip, properties);
        delete _doc.__v;
        _doc.id = _doc._id;
        delete _doc._id;
        SuccessResp(resp, [_doc]);
    } catch (e) {
        console.log("(VLAN_Services.ts - NewIP) Err:");

        //@ts-ignore
        if (e.code === 11000) {
            C201Resp(resp, ["This ip has been declare"]);
            return;
        }
        //@ts-ignore
        C201Resp(resp, [e.message]);

        //@ts-ignore
        LogConfig.error(e.message);
    }
}

export const GetProByID = async (req:Request, resp: Response): Promise<any> => {
    let reqData = req.body;

    try {
        let id = getString(reqData, "id");
        let {_doc}  = await GetPropertiesByID(id);
        _doc._id = _doc.id;
        delete _doc._id;
        delete _doc.__v;
        SuccessResp(resp, [_doc]);
    } catch (e) {
        console.log("(VLAN_Services.ts - GetProByID) Err:");

        //@ts-ignore
        C201Resp(resp, [e.message]);

        //@ts-ignore
        LogConfig.error(e.message);
    }
}

export const GetListVLANIPs = async (req: Request, resp: Response): Promise<any> => {
    let reqData = req.body;

    try {
        let offset = getNumber(reqData, "offset");
        let limit = getNumber(reqData, "limit");
        let result = await GetDocsLimit(offset, limit);
        let totalPage = await CountTotalDocs();
        for (let i of result) {
            i = i._doc;
            i.id = i._id;
            delete i._id;
            delete i.__v;
        }
        SuccessResp(resp, {
            "list": result,
            "total": totalPage
        });
    } catch (e) {
        console.log("(VLAN_Services.ts - GetListVLANIPs) Err:");

        //@ts-ignore
        C201Resp(resp, [e.message]);

        //@ts-ignore
        LogConfig.error(e.message);
    }
}