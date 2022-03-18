import express from "express";
import {CheckAdminRole, CheckAuthMiddleWare } from "../Utils/Authentication";
import {
    DeleteProperty,
    GetProperty,
    GetPropertyInfo,
    GetListPropertyByObjID,
    UpdateProperty,
    AddProperty2Object,
    InsertProperty
} from "./PropertyService";

const PropertyRouter = express.Router();

PropertyRouter.post("/list", CheckAuthMiddleWare, GetProperty);
PropertyRouter.post("/get_pro_info", CheckAuthMiddleWare, GetPropertyInfo);
PropertyRouter.post("/update", CheckAuthMiddleWare, CheckAdminRole, UpdateProperty);
PropertyRouter.post("/delete", CheckAuthMiddleWare, CheckAdminRole, DeleteProperty);
PropertyRouter.post("/get_list_pro_by_obj_id", CheckAuthMiddleWare, GetListPropertyByObjID);
PropertyRouter.post("/add_property_to_object", CheckAuthMiddleWare, CheckAdminRole, AddProperty2Object);
PropertyRouter.post("/insert", CheckAuthMiddleWare, CheckAdminRole, InsertProperty);

export default PropertyRouter;