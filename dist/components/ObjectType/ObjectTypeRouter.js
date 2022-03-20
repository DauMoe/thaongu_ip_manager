"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Authentication_1 = require("../Utils/Authentication");
var ObjectTypeService_1 = require("./ObjectTypeService");
var ObjectTypeRouter = express_1.default.Router();
ObjectTypeRouter.post("/list", Authentication_1.CheckAuthMiddleWare, ObjectTypeService_1.GetListObjectType);
ObjectTypeRouter.post("/list_property_by_obj_type_id", Authentication_1.CheckAuthMiddleWare, ObjectTypeService_1.GetListPropertyByObjectType);
exports.default = ObjectTypeRouter;
