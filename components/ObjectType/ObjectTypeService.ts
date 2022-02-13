import {Request, Response} from "express";
import {GetObjectTypeDAO, GetListPropertyByObjectTypeDAO} from "./ObjectTypeDAO";
import {ObjectType} from "../Utils/Interfaces";
import {C201Resp, SuccessResp} from "../Utils/API_RESPONSE";
import moment from "moment";
import {getNumber} from "../Utils/Common";

export const GetListObjectType = async (req: Request, resp: Response) => {
    let reqData = req.body;
    try {
        // @ts-ignore
        let result: ObjectType[] = await GetObjectTypeDAO();
        let respResult = [];
        for (let i of result) {
            respResult.push({
                "obj_type_id": i.OBJ_TYPE_ID        === null ? -1 : i.OBJ_TYPE_ID,
                "obj_type_name": i.OBJ_TYPE_NAME    === null ? "" : i.OBJ_TYPE_NAME,
                "icon": i.ICON                      === null ? "" : i.ICON,
                "obj_type_desc": i.OBJ_TYPE_DESC    === null ? "" : i.OBJ_TYPE_DESC,
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

export const GetListPropertyByObjectType = async (req: Request, resp: Response) => {
    let reqData = req.body;
    try {
        let obj_type_id: Number = getNumber(reqData, "obj_type_id");
        // @ts-ignore
        let result: any[] = await GetListPropertyByObjectTypeDAO(obj_type_id);
        let respResult = [];
        for (let i of result) {
            respResult.push({
                "pro_id": i.PRO_ID                  === null ? -1 : i.PRO_ID,
                "pro_name": i.PRO_NAME              === null ? "" : i.PRO_NAME,
                "pro_desc": i.PRO_DESC              === null ? "" : i.PRO_DESC,
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