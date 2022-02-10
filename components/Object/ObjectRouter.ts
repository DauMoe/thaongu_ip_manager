import express from "express";
import {AuthenticationUser} from "../Utils/Common";
import {AddObjectProperty, GetObject, GetObjectInfo, UpdatePropertyValue} from "./ObjectService";

const ObjectRouter = express.Router();

ObjectRouter.post("/list", AuthenticationUser, GetObject);
ObjectRouter.post("/get_object_info", AuthenticationUser, GetObjectInfo);
ObjectRouter.post("/add_property_to_object", AuthenticationUser, AddObjectProperty);
ObjectRouter.post("/update_property", AuthenticationUser, UpdatePropertyValue);

export default ObjectRouter;