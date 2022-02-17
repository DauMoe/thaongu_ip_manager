import express from "express";
import {AuthenticationUser} from "../Utils/Common";
import {
    AddObjectProperty,
    DeleteObject,
    GetObject,
    GetObjectInfo,
    InsertObject,
    UpdatePropertyValue
} from "./ObjectService";

const ObjectRouter = express.Router();

ObjectRouter.post("/list", AuthenticationUser, GetObject);
ObjectRouter.post("/get_object_info", AuthenticationUser, GetObjectInfo);
ObjectRouter.post("/add_property_to_object", AuthenticationUser, AddObjectProperty);
ObjectRouter.post("/update_property", AuthenticationUser, UpdatePropertyValue);
ObjectRouter.post("/delete", AuthenticationUser, DeleteObject);
ObjectRouter.post("/insert", AuthenticationUser, InsertObject);

export default ObjectRouter;