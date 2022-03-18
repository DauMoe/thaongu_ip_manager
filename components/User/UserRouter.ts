import express from "express";
import { CheckAuthMiddleWare } from "../Utils/Authentication";
import { CreateUser, Login } from "./UserService";

const UserRouter = express.Router();

UserRouter.post("/create", CheckAuthMiddleWare, CreateUser);
UserRouter.post("/login", Login);

export default UserRouter;