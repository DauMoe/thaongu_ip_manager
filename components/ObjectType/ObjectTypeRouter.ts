import express from "express";
import { CheckAuthMiddleWare } from "../Utils/Authentication";
import {GetListObjectType, GetListPropertyByObjectType} from "./ObjectTypeService";

const ObjectTypeRouter = express.Router();

ObjectTypeRouter.post("/list", CheckAuthMiddleWare, GetListObjectType);
ObjectTypeRouter.post("/list_property_by_obj_type_id", CheckAuthMiddleWare, GetListPropertyByObjectType);

export default ObjectTypeRouter;