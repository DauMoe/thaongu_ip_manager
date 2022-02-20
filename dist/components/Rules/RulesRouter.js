"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var RulesServices_1 = require("./RulesServices");
var Common_1 = require("../Utils/Common");
var Rules_Router = express_1.default.Router();
Rules_Router.post("/list", Common_1.AuthenticationUser, RulesServices_1.GetListRules);
Rules_Router.post("/insert", Common_1.AuthenticationUser, RulesServices_1.AddNewRule);
Rules_Router.post("/update", Common_1.AuthenticationUser, RulesServices_1.UpdateRule);
Rules_Router.post("/delete", Common_1.AuthenticationUser, RulesServices_1.DeleteRule);
Rules_Router.post("/search", Common_1.AuthenticationUser, RulesServices_1.SearchByRuleName);
exports.default = Rules_Router;
