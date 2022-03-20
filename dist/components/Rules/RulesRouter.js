"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Authentication_1 = require("../Utils/Authentication");
var RulesServices_1 = require("./RulesServices");
var Rules_Router = express_1.default.Router();
Rules_Router.post("/list", Authentication_1.CheckAuthMiddleWare, RulesServices_1.GetListRules);
Rules_Router.post("/insert", Authentication_1.CheckAuthMiddleWare, Authentication_1.CheckAdminRole, RulesServices_1.AddNewRule);
Rules_Router.post("/update", Authentication_1.CheckAuthMiddleWare, Authentication_1.CheckAdminRole, RulesServices_1.UpdateRule);
Rules_Router.post("/delete", Authentication_1.CheckAuthMiddleWare, Authentication_1.CheckAdminRole, RulesServices_1.DeleteRule);
Rules_Router.post("/search", Authentication_1.CheckAuthMiddleWare, RulesServices_1.SearchByRuleName);
exports.default = Rules_Router;
