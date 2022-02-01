import express from "express";
import {AuthenticationUser} from "../Utils/Common";
import {GetListObjectType} from "./ObjectTypeService";

const ObjectTypeRouter = express.Router();

ObjectTypeRouter.post("/list", AuthenticationUser, GetListObjectType);

export default ObjectTypeRouter;