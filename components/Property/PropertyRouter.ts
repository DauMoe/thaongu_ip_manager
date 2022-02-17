import express from "express";
import {AuthenticationUser} from "../Utils/Common";
import {
    DeleteProperty,
    GetProperty,
    GetPropertyInfo,
    GetListPropertyByObjID,
    UpdateProperty,
    AddProperty2Object
} from "./PropertyService";

const PropertyRouter = express.Router();

PropertyRouter.post("/list", AuthenticationUser, GetProperty);
PropertyRouter.post("/get_pro_info", AuthenticationUser, GetPropertyInfo);
PropertyRouter.post("/update", AuthenticationUser, UpdateProperty);
PropertyRouter.post("/delete", AuthenticationUser, DeleteProperty);
PropertyRouter.post("/get_list_pro_by_obj_id", AuthenticationUser, GetListPropertyByObjID);
PropertyRouter.post("/add_property_to_object", AuthenticationUser, AddProperty2Object);

export default PropertyRouter;