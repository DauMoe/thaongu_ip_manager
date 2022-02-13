import express from "express";
import {AuthenticationUser} from "../Utils/Common";
import {DeleteProperty, GetProperty, GetPropertyInfo, UpdateProperty} from "./PropertyService";

const PropertyRouter = express.Router();

PropertyRouter.post("/list", AuthenticationUser, GetProperty);
PropertyRouter.post("/get_pro_info", AuthenticationUser, GetPropertyInfo);
PropertyRouter.post("/update", AuthenticationUser, UpdateProperty);
PropertyRouter.post("/delete", AuthenticationUser, DeleteProperty);

export default PropertyRouter;