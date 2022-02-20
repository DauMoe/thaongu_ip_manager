import {Request, Response} from "express";
import {C201Resp, SuccessResp} from "../Utils/API_RESPONSE";
import LogConfig from "../LogConfig";
import {getNumber, getString} from "../Utils/Common";
import {DeleteRuleDAO, GetListRuleDAO, InsertRule, UpdateRuleDAO, SearchByRuleNameDAO} from "./RulesDAO";
import {Rule} from "../Utils/Interfaces";
import moment from "moment";

const HandError = (resp: Response, e:any, msg: string) => {
    //@ts-ignore
    C201Resp(resp, e);

    //@ts-ignore
    LogConfig.error(e.message);
}

export const GetListRules = async (req: Request, resp: Response): Promise<void> => {
    let reqData = req.body;
    try {
        // @ts-ignore
        let result: Rule[] = await GetListRuleDAO();
        let respResult = [];
        for (let i of result) {
            respResult.push({
                "rule_id": i.RULE_ID            === null ? -1 : i.RULE_ID,
                "rule_name": i.RULE_NAME        === null ? "" : i.RULE_NAME,
                "rule_desc": i.RULE_DESC        === null ? "" : i.RULE_DESC,
                "rule_regex": i.RULE_REGEX      === null ? "" : i.RULE_REGEX,
                "created_at": i.CREATED_AT      === null ? "" : moment(i.CREATED_AT).format("DD/MM/YYYY HH:mm:ss"),
                "updated_at": i.UPDATED_AT      === null ? "" : moment(i.UPDATED_AT).format("DD/MM/YYYY HH:mm:ss")
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

export const SearchByRuleName = async (req: Request, resp: Response): Promise<void> => {
    let reqData = req.body;
    try {
        let rule_name: string = getString(reqData, "rule_name").toUpperCase();
        // @ts-ignore
        let result: any[] = await SearchByRuleNameDAO(rule_name);
        let respResult = [];
        for (let i of result) {
            respResult.push({
                "rule_id": i.RULE_ID            === null ? -1 : i.RULE_ID,
                "rule_name": i.RULE_NAME        === null ? "" : i.RULE_NAME,
                "rule_desc": i.RULE_DESC        === null ? "" : i.RULE_DESC,
                "rule_regex": i.RULE_REGEX      === null ? "" : i.RULE_REGEX,
                "created_at": i.CREATED_AT      === null ? "" : moment(i.CREATED_AT).format("DD/MM/YYYY HH:mm:ss"),
                "updated_at": i.UPDATED_AT      === null ? "" : moment(i.UPDATED_AT).format("DD/MM/YYYY HH:mm:ss")
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

export const AddNewRule = async (req: Request, resp: Response): Promise<void> => {
    let reqData = req.body;
    try {
        let name: string    = getString(reqData, "rule_name").toUpperCase();
        let regex: string   = getString(reqData, "rule_regex", false);
        let desc: string    = getString(reqData, "rule_desc", false);
        let NewRuleInfo: Rule = {
            RULE_ID: -1,
            RULE_NAME: name,
            RULE_DESC: desc,
            RULE_REGEX: regex,
            CREATED_AT: "",
            UPDATED_AT: ""
        }
        let result = await InsertRule(NewRuleInfo);
        SuccessResp(resp, result);
    } catch (e) {
        //@ts-ignore
        if (e.code === 11000) {
            C201Resp(resp, `'${getString(reqData, "name")}' has been declare`);
            return;
        }
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

export const UpdateRule = async (req: Request, resp: Response) => {
    let reqData = req.body;
    try {
        let rule_id:    Number = getNumber(reqData, "rule_id");
        let rule_name:  string = getString(reqData, "rule_name").toUpperCase();
        let rule_desc:  string = getString(reqData, "rule_desc", false);
        let rule_regex: string = getString(reqData, "rule_regex");
        let NewRuleData: Rule  = {
            RULE_ID: rule_id,
            RULE_NAME: rule_name,
            RULE_DESC: rule_desc,
            RULE_REGEX: rule_regex,
            CREATED_AT: "",
            UPDATED_AT: ""
        }
        let result = await UpdateRuleDAO(NewRuleData);
        SuccessResp(resp, result);
    } catch (e) {
        console.log(e);
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

export const DeleteRule = async (req: Request, resp: Response) => {
    let reqData = req.body;
    try {
        let rule_id:    Number  = getNumber(reqData, "rule_id");
        let result              = await DeleteRuleDAO(rule_id);
        if (result !== true) {
            C201Resp(resp, result);
        } else {
            SuccessResp(resp, "Successfully!");
        }
    } catch (e) {
        console.log(e);
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