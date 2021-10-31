import { Schema, model, connect } from 'mongoose';
import dotenv from "dotenv";
import { BlackListModel } from '../Utils/Global_Models';

dotenv.config({
    path: __dirname + "/../../.env"
});

const MONGO_DB_BASEURL  : string = process.env.MONGO_URL as string          || "mongodb://localhost:27017/";
const MONGO_DB_NAME     : string = process.env.MONGO_DB_NAME as string      || "thao_ip_manager";

export const CreateOneBlackList: Function = async (ip: string, desc?: string, create_time?: number): Promise<void> => {
    await connect(MONGO_DB_BASEURL + MONGO_DB_NAME);
    await new BlackListModel({
        "ip": ip,
        "desc": desc,
        "create_time": create_time
    }).save();
}