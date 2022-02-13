import express from "express";
import {AuthenticationUser} from "../Utils/Common";
import {GetListObjectType, GetListPropertyByObjectType} from "./ObjectTypeService";

const ObjectTypeRouter = express.Router();

ObjectTypeRouter.post("/list", AuthenticationUser, GetListObjectType);
ObjectTypeRouter.post("/list_property_by_obj_type_id", AuthenticationUser, GetListPropertyByObjectType);

export default ObjectTypeRouter;