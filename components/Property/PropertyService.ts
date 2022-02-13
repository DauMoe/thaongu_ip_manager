import {Request, Response} from "express";
import moment from "moment";
import {C201Resp, SuccessResp} from "../Utils/API_RESPONSE";
import {GetPropertyDAO, GetPropertyInfoDAO, UpdatePropertyDAO, DeletePropertyDAO} from "./PropertyDAO";
import {getJSONArray, getNumber, getString} from "../Utils/Common";

export const GetProperty = async(req: Request, resp: Response) => {
    let reqData = req.body;
    try {
        // @ts-ignore
        let result: any[] = await GetPropertyDAO();
        let respResult = [];
        for (let i of result) {
            respResult.push({
                "pro_id": i.PRO_ID                  === null ? -1 : i.PRO_ID,
                "pro_name": i.PRO_NAME              === null ? "" : i.PRO_NAME,
                "pro_desc": i.PRO_DESC              === null ? "" : i.PRO_DESC,
                "rule_id": i.RULE_ID                === null ? -1 : i.RULE_ID,
                "rule_name": i.RULE_NAME            === null ? "" : i.RULE_NAME,
                "created_at": i.CREATED_AT          === null ? "" : moment(i.CREATED_AT).format("DD/MM/YYYY HH:mm:ss"),
                "updated_at": i.UPDATED_AT          === null ? "" : moment(i.UPDATED_AT).format("DD/MM/YYYY HH:mm:ss")
            });
        }
        SuccessResp(resp, respResult);
    } catch (e) {
        //@ts-ignore
        if (e.hasOwnProperty("message")) {
            //@ts-ignore
            C201Resp(resp, e.message);
            return;
        }
        //@ts-ignore
        if (e.hasOwnProperty("sqlMessage")) {
            //@ts-ignore
            C201Resp(resp, e.sqlMessage);
            return;
        }
    }
}

export const GetPropertyInfo = async(req: Request, resp: Response) => {
    let reqData = req.body;
    try {
        let pro_id: Number = getNumber(reqData, "pro_id");
        // @ts-ignore
        let result: any[] = await GetPropertyInfoDAO(pro_id);
        let respResult = [];
        for (let i of result) {
            respResult.push({
                "obj_type_id": i.OBJ_TYPE_ID        === null ? -1 : i.OBJ_TYPE_ID,
                "obj_type_name": i.OBJ_TYPE_NAME    === null ? "" : i.OBJ_TYPE_NAME
            });
        }
        SuccessResp(resp, respResult);
    } catch (e) {
        //@ts-ignore
        if (e.hasOwnProperty("message")) {
            //@ts-ignore
            C201Resp(resp, e.message);
            return;
        }
        //@ts-ignore
        if (e.hasOwnProperty("sqlMessage")) {
            //@ts-ignore
            C201Resp(resp, e.sqlMessage);
            return;
        }
    }
}

export const UpdateProperty = async(req: Request, resp: Response) => {
    let reqData = req.body;
    try {
        let pro_id      : Number = getNumber(reqData, "pro_id");
        let pro_name    : string = getString(reqData, "pro_name");
        let pro_desc    : string = getString(reqData, "pro_desc");
        let rule_id     : Number = getNumber(reqData, "rule_id");
        let list_obj_type: any[] = getJSONArray(reqData, "list_obj_type");
        // @ts-ignore
        let result: any[] = await UpdatePropertyDAO(pro_id, pro_name, pro_desc, rule_id, list_obj_type);
        SuccessResp(resp, "Successful!");
    } catch (e) {
        //@ts-ignore
        if (e.hasOwnProperty("message")) {
            //@ts-ignore
            C201Resp(resp, e.message);
            return;
        }
        //@ts-ignore
        if (e.hasOwnProperty("sqlMessage")) {
            //@ts-ignore
            C201Resp(resp, e.sqlMessage);
            return;
        }
    }
}

export const DeleteProperty = async(req: Request, resp: Response) => {
    let reqData = req.body;
    try {
        let pro_id      : Number = getNumber(reqData, "pro_id");
        // @ts-ignore
        let result: any[] = await DeletePropertyDAO(pro_id);
        SuccessResp(resp, "Successful!");
    } catch (e) {
        //@ts-ignore
        if (e.hasOwnProperty("message")) {
            //@ts-ignore
            C201Resp(resp, e.message);
            return;
        }
        //@ts-ignore
        if (e.hasOwnProperty("sqlMessage")) {
            //@ts-ignore
            C201Resp(resp, e.sqlMessage);
            return;
        }
    }
}