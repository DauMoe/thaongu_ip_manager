"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Authentication_1 = require("../Utils/Authentication");
var UserService_1 = require("./UserService");
var UserRouter = express_1.default.Router();
UserRouter.post("/create", Authentication_1.CheckAuthMiddleWare, UserService_1.CreateUser);
UserRouter.post("/list", Authentication_1.CheckAuthMiddleWare, UserService_1.GetListUser);
UserRouter.post("/login", UserService_1.Login);
UserRouter.post("/logout", UserService_1.Logout);
UserRouter.post("/get_user_info", Authentication_1.CheckAuthMiddleWare, UserService_1.GetUserInfo);
UserRouter.post("/update", Authentication_1.CheckAuthMiddleWare, UserService_1.UpdateUserInfo);
UserRouter.post("/delete", Authentication_1.CheckAuthMiddleWare, Authentication_1.CheckAdminRole, UserService_1.DeleteUser);
exports.default = UserRouter;
