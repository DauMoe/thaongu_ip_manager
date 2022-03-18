import express from "express";
import {CheckAdminRole, CheckAuthMiddleWare } from "../Utils/Authentication";
import {AddNewRule, DeleteRule, GetListRules, SearchByRuleName, UpdateRule} from "./RulesServices";

const Rules_Router = express.Router();

Rules_Router.post("/list", CheckAuthMiddleWare, GetListRules);
Rules_Router.post("/insert", CheckAuthMiddleWare, CheckAdminRole, AddNewRule);
Rules_Router.post("/update", CheckAuthMiddleWare, CheckAdminRole, UpdateRule);
Rules_Router.post("/delete", CheckAuthMiddleWare, CheckAdminRole, DeleteRule);
Rules_Router.post("/search", CheckAuthMiddleWare, SearchByRuleName);

export default Rules_Router;