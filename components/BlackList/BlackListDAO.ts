import { Schema, model, connect, Model, Query, Document } from 'mongoose';
import dotenv from "dotenv";
import { BlackListSchema } from '../Utils/Global_Schema';
import { BlackList } from '../Utils/Global_Interface';
import {ObjectId} from "mongodb";

dotenv.config({
    path: __dirname + "/../../.env"
});

let _EscapeReg: Function = (msg: string): string => {
    return msg.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
}

const MONGO_DB_BASEURL  : string = process.env.MONGO_URL as string          || "mongodb://localhost:27017/";
const MONGO_DB_NAME     : string = process.env.MONGO_DB_NAME as string      || "thao_ip_manager";
const _BL_MODEL         : string = process.env.BLACKLIST_MODEL as string    || 'blacklist';

/*===== INSERT ====*/
export const CreateOneBlackList: Function = async (ip: string, desc?: string, create_time?: number) => {
    await connect(MONGO_DB_BASEURL + MONGO_DB_NAME);
    const BlackListModel = model<BlackList>(_BL_MODEL, BlackListSchema);
    return new BlackListModel({
        "ip": ip,
        "desc": desc,
        "create_time": create_time
    }).save();
}

/*===== SELECT ====*/
export const GetAllBlackList:Function = async (offset: number, limit: number) => {
    await connect(MONGO_DB_BASEURL + MONGO_DB_NAME);
    const BlackListModel = model<BlackList>(_BL_MODEL, BlackListSchema);
    return BlackListModel
        .find({})
        .limit(limit)
        .skip(offset)
        .sort('createAt')
        .exec();
}

export const CountBlackListDocuments: Function = async () => {
    await connect(MONGO_DB_BASEURL + MONGO_DB_NAME);
    const BlackListModel = model<BlackList>(_BL_MODEL, BlackListSchema);
    return BlackListModel.count({});
}

export const RemoveByID: Function = async (id: string) => {
    await connect(MONGO_DB_BASEURL + MONGO_DB_NAME);
    const BlackListModel = model<BlackList>(_BL_MODEL, BlackListSchema);
    return BlackListModel.findByIdAndRemove(new ObjectId(id));
}

export const EditBlackList: Function = async (id: string, data: any) => {
    await connect(MONGO_DB_BASEURL + MONGO_DB_NAME);
    const BlackListModel = model<BlackList>(_BL_MODEL, BlackListSchema);
    return BlackListModel.updateOne({
        _id: new ObjectId(id),
    }, {
        ...data
    });
}

export const CreateManyBlackList = async(data: any) => {
    await connect(MONGO_DB_BASEURL + MONGO_DB_NAME);
    const BlackListModel = model<BlackList>(_BL_MODEL, BlackListSchema);
    return BlackListModel.insertMany(data);
}

export const SearchBlackListIP:Function = async (id?: string, ip?: string, create_time_from?: number, create_time_to?: number): Promise<any> => {
    await connect(MONGO_DB_BASEURL + MONGO_DB_NAME);
    const BlackListModel = model<BlackList>(_BL_MODEL, BlackListSchema);
    let options = {};

    if (id !== undefined) {
        //@ts-ignore
        options["_id"] = _EscapeReg(id)
    }
    if (ip !== undefined) {
        //@ts-ignore
        options["ip"] = {
            $regex: _EscapeReg(ip)
        };
    }
    if (create_time_from !== undefined && create_time_to !== undefined) {
        //@ts-ignore
        options["create_time"] = {
            $gt: create_time_from,
            $lt: create_time_to
        }
    }
    return BlackListModel.find(options);
}

export const FindBlackList:Function = async (ip: string, create_time: string) => {
    await connect(MONGO_DB_BASEURL + MONGO_DB_NAME);
}