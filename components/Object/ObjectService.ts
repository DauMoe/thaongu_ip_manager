import {Request, Response} from "express";
import {C201Resp, SuccessResp} from "../Utils/API_RESPONSE";
import {getJSONArray, getNumber, getString} from "../Utils/Common";
import {AddObjectPropertyDAO, GetObjectDAO, GetObjectInfoDAO, UpdatePropertyValueDAO} from "./ObjectDAO";
import moment from "moment";

export const GetObject = async(req: Request, resp: Response) => {
    let reqData = req.body;
    try {
        let obj_type_id: Number = getNumber(reqData, "obj_type_id");
        //@ts-ignore
        let result: any[] = await GetObjectDAO(obj_type_id);
        let respResult = [];
        for (let i of result) {
            respResult.push({
                "obj_id": i.OBJ_ID              === null ? -1 : i.OBJ_ID,
                "obj_name": i.OBJ_NAME          === null ? "" : i.OBJ_NAME,
                "obj_desc": i.OBJ_DESC          === null ? "" : i.OBJ_DESC,
                "obj_type_id": i.OBJ_TYPE_ID    === null ? -1 : i.OBJ_TYPE_ID
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

export const GetObjectInfo = async(req: Request, resp: Response) => {
    let reqData = req.body;
    try {
        let obj_id: Number = getNumber(reqData, "obj_id");
        //@ts-ignore
        let result: any[] = await GetObjectInfoDAO(obj_id);
        let respResult = [];
        for (let i of result) {
            respResult.push({
                "obj_id": i.OBJ_ID              === null ? -1 : i.OBJ_ID,
                "obj_name": i.OBJ_NAME          === null ? "" : i.OBJ_NAME,
                "obj_desc": i.OBJ_DESC          === null ? "" : i.OBJ_DESC,
                "obj_type_id": i.OBJ_TYPE_ID    === null ? -1 : i.OBJ_TYPE_ID,
                "pro_id": i.PRO_ID              === null ? -1 : i.PRO_ID,
                "pro_name": i.PRO_NAME          === null ? "" : i.PRO_NAME,
                "pro_desc": i.PRO_DESC          === null ? "" : i.PRO_DESC,
                "pro_value": i.PRO_VALUE        === null ? "" : i.PRO_VALUE,
                "rule_id": i.RULE_ID            === null ? -1 : i.RULE_ID,
                "rule_regex": i.RULE_REGEX      === null ? "" : i.RULE_REGEX,
                "created_at": i.CREATED_AT      === null ? "" : moment(i.CREATED_AT).format("DD/MM/YYYY HH:mm:ss"),
                "updated_at": i.CREATED_AT      === null ? "" : moment(i.UPDATED_AT).format("DD/MM/YYYY HH:mm:ss"),
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

export const AddObjectProperty = async(req: Request, resp: Response) => {
    let reqData = req.body;
    try {
        let obj_id      : Number = getNumber(reqData, "obj_id");
        let pro_id      : Number = getNumber(reqData, "pro_id");
        let pro_value   : string = getString(reqData, "pro_value");
        //@ts-ignore
        let result: any[] = await AddObjectPropertyDAO(obj_id, pro_id, pro_value);
        if (result[0].A === 0) {
            C201Resp(resp, "Thuộc tính này đã nằm trong đối tượng!");
        } else {
            SuccessResp(resp, "Thành công");
        }
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

export const UpdatePropertyValue = async(req: Request, resp: Response) => {
    let reqData = req.body;
    try {
        let list_property: any[] = getJSONArray(reqData, "list_property");
        await UpdatePropertyValueDAO(list_property);
        SuccessResp(resp, "");
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