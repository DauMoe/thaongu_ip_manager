import {Request, Response} from "express";
import moment from "moment";
import {C201Resp, SuccessResp} from "../Utils/API_RESPONSE";
import {GetPropertyDAO, GetPropertyInfoDAO, UpdatePropertyDAO, DeletePropertyDAO, GetListPropertyByObjIDDAO, AddProperty2ObjectDAO} from "./PropertyDAO";
import {getJSONArray, getNumber, getNumberArray, getString} from "../Utils/Common";

export const GetProperty = async(req: Request, resp: Response) => {
    let reqData = req.body;
    try {
        let obj_type_id: Number = getNumber(reqData, "obj_type_id", false);
        // @ts-ignore
        let result: any[] = await GetPropertyDAO(obj_type_id);
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
                "obj_type_name": i.OBJ_TYPE_NAME    === null ? "" : i.OBJ_TYPE_NAME,
                "is_required": i.IS_REQUIRED        === 1 ? true : false
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

export const GetListPropertyByObjID = async(req: Request, resp: Response) => {
    let reqData = req.body;
    try {
        let obj_id      : Number = getNumber(reqData, "obj_id");
        // @ts-ignore
        let result      : any[] = await GetListPropertyByObjIDDAO(obj_id);
        let temp1 = [], temp2 = [];
        //@ts-ignore
        for (let i of result.list_property) {
            temp1.push({
                "obj_type_id": i.OBJ_TYPE_ID    === null ? -1 : i.OBJ_TYPE_ID,
                "pro_id": i.PRO_ID              === null ? -1 : i.PRO_ID,
                "pro_name": i.PRO_NAME          === null ? "" : i.PRO_NAME,
                "pro_desc": i.PRO_DESC          === null ? "" : i.PRO_DESC,
                "is_required": i.IS_REQUIRED    === 1 ? true : false
            });
        }
        //@ts-ignore
        for (let i of result.list_property_assign) {
            temp2.push({
                "obj_type_id": i.OBJ_TYPE_ID    === null ? -1 : i.OBJ_TYPE_ID,
                "pro_id": i.PRO_ID              === null ? -1 : i.PRO_ID,
                "pro_name": i.PRO_NAME          === null ? "" : i.PRO_NAME,
                "pro_desc": i.PRO_DESC          === null ? "" : i.PRO_DESC,
                "pro_value": i.PRO_VALUE        === null ? "" : i.PRO_VALUE,
                "is_required": i.IS_REQUIRED    === 1 ? true : false
            });
        }
        SuccessResp(resp, {
            list_property: temp1,
            list_property_assign: temp2
        });
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

export const AddProperty2Object = async(req: Request, resp: Response) => {
    let reqData = req.body;
    try {
        let obj_id      : Number    = getNumber(reqData, "obj_id");
        let list_pro_id : Number[]  = getNumberArray(reqData, "list_pro_id");
        let obj_type_id : Number    = getNumber(reqData, "obj_type_id");
        await AddProperty2ObjectDAO(obj_id, obj_type_id, list_pro_id);
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