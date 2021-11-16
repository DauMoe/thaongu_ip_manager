import express from "express";
import {CheckAuthMiddleWare} from "../authentication";
import {AddNewRule, GetRulesInfo, GetRulesName} from "./RulesServices";

const Rules_Router = express.Router();

export const ADD_NEW_RULE: string = "/add_new_rule";
export const GET_RULE_NAME: string = "/get_rule_name";
export const GET_RULE_INFO: string = "/get_rule_info";

Rules_Router.post(ADD_NEW_RULE, CheckAuthMiddleWare, AddNewRule);
Rules_Router.post(GET_RULE_NAME, CheckAuthMiddleWare, GetRulesName);
Rules_Router.post(GET_RULE_INFO, CheckAuthMiddleWare, GetRulesInfo);

export default Rules_Router;