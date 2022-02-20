"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Common_1 = require("../Utils/Common");
var PropertyService_1 = require("./PropertyService");
var PropertyRouter = express_1.default.Router();
PropertyRouter.post("/list", Common_1.AuthenticationUser, PropertyService_1.GetProperty);
PropertyRouter.post("/get_pro_info", Common_1.AuthenticationUser, PropertyService_1.GetPropertyInfo);
PropertyRouter.post("/update", Common_1.AuthenticationUser, PropertyService_1.UpdateProperty);
PropertyRouter.post("/delete", Common_1.AuthenticationUser, PropertyService_1.DeleteProperty);
PropertyRouter.post("/get_list_pro_by_obj_id", Common_1.AuthenticationUser, PropertyService_1.GetListPropertyByObjID);
PropertyRouter.post("/add_property_to_object", Common_1.AuthenticationUser, PropertyService_1.AddProperty2Object);
PropertyRouter.post("/insert", Common_1.AuthenticationUser, PropertyService_1.InsertProperty);
exports.default = PropertyRouter;
