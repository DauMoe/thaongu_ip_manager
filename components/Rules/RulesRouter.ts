import express from "express";
import {AddNewRule, DeleteRule, GetListRules, SearchByRuleName, UpdateRule} from "./RulesServices";
import {AuthenticationUser} from "../Utils/Common";

const Rules_Router = express.Router();

Rules_Router.post("/list", AuthenticationUser, GetListRules);
Rules_Router.post("/insert", AuthenticationUser, AddNewRule);
Rules_Router.post("/update", AuthenticationUser, UpdateRule);
Rules_Router.post("/delete", AuthenticationUser, DeleteRule);
Rules_Router.post("/search", AuthenticationUser, SearchByRuleName);

export default Rules_Router;