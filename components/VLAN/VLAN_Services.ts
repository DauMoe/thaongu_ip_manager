import {Request, Response} from "express";
import LogConfig from "../LogConfig";

export const AddElement = (req: Request, resp: Response): void => {
    try {

    } catch (e) {
        //@ts-ignore
        LogConfig.error(e.message);
    }
}