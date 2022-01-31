import express from "express";
import {AddNewRule} from "./RulesServices";

const Rules_Router = express.Router();

Rules_Router.post("/insert", AddNewRule);

export default Rules_Router;