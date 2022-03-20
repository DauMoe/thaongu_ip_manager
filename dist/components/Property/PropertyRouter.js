"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Authentication_1 = require("../Utils/Authentication");
var PropertyService_1 = require("./PropertyService");
var PropertyRouter = express_1.default.Router();
PropertyRouter.post("/list", Authentication_1.CheckAuthMiddleWare, PropertyService_1.GetProperty);
PropertyRouter.post("/get_pro_info", Authentication_1.CheckAuthMiddleWare, PropertyService_1.GetPropertyInfo);
PropertyRouter.post("/update", Authentication_1.CheckAuthMiddleWare, Authentication_1.CheckAdminRole, PropertyService_1.UpdateProperty);
PropertyRouter.post("/delete", Authentication_1.CheckAuthMiddleWare, Authentication_1.CheckAdminRole, PropertyService_1.DeleteProperty);
PropertyRouter.post("/get_list_pro_by_obj_id", Authentication_1.CheckAuthMiddleWare, PropertyService_1.GetListPropertyByObjID);
PropertyRouter.post("/add_property_to_object", Authentication_1.CheckAuthMiddleWare, Authentication_1.CheckAdminRole, PropertyService_1.AddProperty2Object);
PropertyRouter.post("/insert", Authentication_1.CheckAuthMiddleWare, Authentication_1.CheckAdminRole, PropertyService_1.InsertProperty);
exports.default = PropertyRouter;
