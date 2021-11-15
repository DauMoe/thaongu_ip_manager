import express from "express";
import {CheckAuthMiddleWare} from "../authentication";
import { AddNewRule } from "./RulesServices";

const Rules_Router = express.Router();

export const ADD_NEW_RULE: string = "/add_new_rule";

Rules_Router.post(ADD_NEW_RULE, CheckAuthMiddleWare, AddNewRule);

export default Rules_Router;