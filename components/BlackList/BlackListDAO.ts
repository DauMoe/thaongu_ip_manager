import {model, connect} from 'mongoose';
import dotenv from "dotenv";
import {BlackListSchema} from '../Utils/Global_Schema';
import {BlackList} from '../Utils/Global_Interface';
import {ObjectId} from "mongodb";

dotenv.config({
    path: __dirname + "/../../.env"
});

let _EscapeReg: Function = (msg: string): string => {
    return msg.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
}

const MONGO_DB_USER     : string = process.env.MONGO_USER as string         || "";
const MONGO_DB_PASS     : string = process.env.MONGO_PASS as string         || "";
const MONGO_DB_URL      : string = process.env.MONGO_URL as string          || "localhost:27017/";
const MONGO_DB_NAME     : string = process.env.MONGO_DB_NAME as string      || "thao_ip_manager";
const _BL_MODEL         : string = process.env.BLACKLIST_MODEL as string    || 'blacklist';

let MONGO_DB_BASEURL  : string;

if (MONGO_DB_USER === "" && MONGO_DB_PASS === "") {
    MONGO_DB_BASEURL = `mongodb://${MONGO_DB_URL}`;
} else {
    MONGO_DB_BASEURL = `mongodb://${MONGO_DB_USER}:${MONGO_DB_PASS}@${MONGO_DB_URL}`;
}

console.log(MONGO_DB_BASEURL);

export const CreateOneBlackList: Function = async (ip: string, desc?: string, create_time?: number) => {
    await connect(MONGO_DB_BASEURL + MONGO_DB_NAME);
    const BlackListModel = model<BlackList>(_BL_MODEL, BlackListSchema);
    return new BlackListModel({
        "ip": ip,
        "desc": desc,
        "create_time": create_time
    }).save();
}

export const GetAllBlackList:Function = async (offset: number, limit: number) => {
    await connect(MONGO_DB_BASEURL + MONGO_DB_NAME);
    const BlackListModel = model<BlackList>(_BL_MODEL, BlackListSchema);
    return BlackListModel
        .find({})
        .limit(limit)
        .skip(offset)
        .sort({'createAt': -1})
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

export const SearchBlackListIP:Function = async (id: string, ip: string, create_time_from: number, create_time_to: number, created_at_from: number, created_at_to: number, updated_at_from: number, updated_at_to: number): Promise<any> => {
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

    if (created_at_from !== undefined && created_at_to !== undefined) {
        //@ts-ignore
        options["createdAt"] = {
            $gt: created_at_from,
            $lt: created_at_to
        }
    }

    if (updated_at_from !== undefined && updated_at_to !== undefined) {
        //@ts-ignore
        options["updatedAt"] = {
            $gt: updated_at_from,
            $lt: updated_at_to
        }
    }
    return BlackListModel.find(options);
}

export const CreateBlackListDocsByExcel = async(data: any) => {
    await connect(MONGO_DB_BASEURL + MONGO_DB_NAME);
    const BlackListModel = model<BlackList>(_BL_MODEL, BlackListSchema);
    return BlackListModel.insertMany(data);
}

export const UpdateBlackListDocsByExcel = async (data: any) => {
    await connect(MONGO_DB_BASEURL + MONGO_DB_NAME);
    const BlackListModel = model<BlackList>(_BL_MODEL, BlackListSchema);
    let ListPromise = [];
    for (let i of data) {
        ListPromise.push(BlackListModel.findByIdAndUpdate(i.id, i));
    }
    return Promise.all(ListPromise);
}

export const DeleteBlackListDocsByExcel = async (data: any[]) => {
    await connect(MONGO_DB_BASEURL + MONGO_DB_NAME);
    const BlackListModel = model<BlackList>(_BL_MODEL, BlackListSchema);
    let ListPromise = [];
    for (let i of data) {
        ListPromise.push(BlackListModel.findByIdAndDelete(i.id));
    }
    return Promise.all(ListPromise);
}