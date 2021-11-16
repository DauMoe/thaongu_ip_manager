import {Request, Response} from "express";
import {C201Resp, SuccessResp} from "../Utils/API_RESPONSE";
import LogConfig from "../LogConfig";
import {getString} from "../Utils/Common";
import {NewRule, GetRuleName, GetRuleInfo} from "./RulesDAO";


const HandError = (resp: Response, e:any, msg: string) => {
    console.log(msg);
    //@ts-ignore
    C201Resp(resp, [e.message]);

    //@ts-ignore
    LogConfig.error(e.message);
}

export const AddNewRule = async (req: Request, resp: Response): Promise<void> => {
    let reqData = req.body;
    try {
        let name: string    = getString(reqData, "name");
        let desc: string    = getString(reqData, "desc");
        let regex: string   = getString(reqData, "regex");

        let {_doc} = await NewRule(name, desc, regex);
        _doc.id = _doc._id;
        delete _doc._id;
        delete _doc.__v;
        SuccessResp(resp, [_doc]);
    } catch (e) {
        //@ts-ignore
        if (e.code === 11000) {
            C201Resp(resp, `'${getString(reqData, "name")}' has been declare`);
            return;
        }
        HandError(resp, e, "(RulesServices.ts - AddNewRule) Err: ");
    }
}

export const GetRulesName = async (req: Request, resp: Response): Promise<void> => {
    try {
        let result = await GetRuleName();
        for (let i of result) {
            i._doc.id = i._doc._id;
            delete i._doc._id;
        }
        SuccessResp(resp, result);
    } catch (e) {
        HandError(resp, e, "(RulesServices.ts - GetRuleName) Err: ");
    }
}

export const GetRulesInfo = async (req: Request, resp: Response): Promise<void> => {
    let reqData = req.body;

    try {
        let id = getString(reqData, "id");
        let {_doc} = await GetRuleInfo(id);
        _doc.id = _doc._id;
        delete _doc._id;
        delete _doc.__v;
        SuccessResp(resp, [_doc]);
    } catch (e) {
        HandError(resp, e, "(RulesServices.ts - GetRulesInfo) Err: ");
    }
}