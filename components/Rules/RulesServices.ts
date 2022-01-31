import {Request, Response} from "express";
import {C201Resp, SuccessResp} from "../Utils/API_RESPONSE";
import LogConfig from "../LogConfig";
import {getString} from "../Utils/Common";
import {InsertRule} from "./RulesDAO";
import {Rule} from "../Utils/Interfaces";

const HandError = (resp: Response, e:any, msg: string) => {
    //@ts-ignore
    C201Resp(resp, e);

    //@ts-ignore
    // LogConfig.error(e.message);
}

export const AddNewRule = async (req: Request, resp: Response): Promise<void> => {
    let reqData = req.body;
    try {
        let name: string    = getString(reqData, "name").toUpperCase();
        let regex: string   = getString(reqData, "regex");
        let desc: string    = getString(reqData, "desc", false);
        let NewRuleInfo: Rule = {
            rule_name: name,
            rule_desc: desc,
            rule_regex: regex,
            created_at: "",
            updated_at: ""
        }
        let result = await InsertRule(NewRuleInfo);
        SuccessResp(resp, result);
    } catch (e) {
        //@ts-ignore
        console.log(e.sqlMessage);
        //@ts-ignore
        if (e.code === 11000) {
            C201Resp(resp, `'${getString(reqData, "name")}' has been declare`);
            return;
        }
        //@ts-ignore
        HandError(resp, e.sqlMessage, "(RulesServices.ts - AddNewRule) Err: ");
    }
}