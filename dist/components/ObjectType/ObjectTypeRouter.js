"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Common_1 = require("../Utils/Common");
var ObjectTypeService_1 = require("./ObjectTypeService");
var ObjectTypeRouter = express_1.default.Router();
ObjectTypeRouter.post("/list", Common_1.AuthenticationUser, ObjectTypeService_1.GetListObjectType);
ObjectTypeRouter.post("/list_property_by_obj_type_id", Common_1.AuthenticationUser, ObjectTypeService_1.GetListPropertyByObjectType);
exports.default = ObjectTypeRouter;
