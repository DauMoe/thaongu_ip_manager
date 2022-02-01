import express from "express";
import {AddNewRule, DeleteRule, GetListRules, UpdateRule} from "./RulesServices";
import {AuthenticationUser} from "../Utils/Common";

const Rules_Router = express.Router();

Rules_Router.post("/list", AuthenticationUser, GetListRules);
Rules_Router.post("/insert", AuthenticationUser, AddNewRule);
Rules_Router.post("/update", AuthenticationUser, UpdateRule);
Rules_Router.post("/delete", AuthenticationUser, DeleteRule);

export default Rules_Router;