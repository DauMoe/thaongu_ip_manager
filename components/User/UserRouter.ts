import express from "express";
import {CheckAdminRole, CheckAuthMiddleWare } from "../Utils/Authentication";
import { CreateUser, DeleteUser, GetListUser, GetUserInfo, Login, Logout, UpdateUserInfo } from "./UserService";

const UserRouter = express.Router();

UserRouter.post("/create", CheckAuthMiddleWare, CreateUser);
UserRouter.post("/list", CheckAuthMiddleWare, GetListUser);
UserRouter.post("/login", Login);
UserRouter.post("/logout", Logout);
UserRouter.post("/get_user_info", CheckAuthMiddleWare, GetUserInfo);
UserRouter.post("/update", CheckAuthMiddleWare, UpdateUserInfo);
UserRouter.post("/delete", CheckAuthMiddleWare, CheckAdminRole, DeleteUser);

export default UserRouter;