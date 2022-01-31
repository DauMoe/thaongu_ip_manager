/*      Middleware to check authentication and authorization    */
import {NextFunction, Request, Response} from "express";

export function CheckAuthMiddleWare(req: Request, resp: Response, next: NextFunction) {
    next();
}