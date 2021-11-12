import {model, connect} from 'mongoose';
import {BlackListSchema} from '../Utils/Global_Schema';
import {BlackList} from '../Utils/Global_Interface';
import {ObjectId} from "mongodb";
import {BL_COLLECTIONS, MONGO_DB_NAME, MONGO_DB_BASEURL} from "../Definition";
import { _EscapeReg } from '../Utils/Common';

export const CreateOneBlackList: Function = async (ip: string, desc?: string, create_time?: number) => {
    await connect(MONGO_DB_BASEURL + MONGO_DB_NAME);
    const BlackListModel = model<BlackList>(BL_COLLECTIONS, BlackListSchema);
    return new BlackListModel({
        "ip": ip,
        "desc": desc,
        "create_time": create_time
    }).save();
}

export const GetAllBlackList:Function = async (offset: number, limit: number) => {
    await connect(MONGO_DB_BASEURL + MONGO_DB_NAME);
    const BlackListModel = model<BlackList>(BL_COLLECTIONS, BlackListSchema);
    return BlackListModel
        .find({})
        .limit(limit)
        .skip(offset)
        .sort({'createdAt': -1})
        .exec();
}

export const CountBlackListDocuments: Function = async () => {
    await connect(MONGO_DB_BASEURL + MONGO_DB_NAME);
    const BlackListModel = model<BlackList>(BL_COLLECTIONS, BlackListSchema);
    return BlackListModel.count({});
}

export const RemoveByID: Function = async (id: string) => {
    await connect(MONGO_DB_BASEURL + MONGO_DB_NAME);
    const BlackListModel = model<BlackList>(BL_COLLECTIONS, BlackListSchema);
    return BlackListModel.findByIdAndRemove(new ObjectId(id));
}

export const EditBlackList: Function = async (id: string, data: any) => {
    await connect(MONGO_DB_BASEURL + MONGO_DB_NAME);
    const BlackListModel = model<BlackList>(BL_COLLECTIONS, BlackListSchema);
    return BlackListModel.updateOne({
        _id: new ObjectId(id),
    }, {
        ...data
    });
}

export const SearchBlackListIP:Function = async (id: string, ip: string, create_time_from: number, create_time_to: number, created_at_from: number, created_at_to: number, updated_at_from: number, updated_at_to: number): Promise<any> => {
    await connect(MONGO_DB_BASEURL + MONGO_DB_NAME);
    const BlackListModel = model<BlackList>(BL_COLLECTIONS, BlackListSchema);
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
    const BlackListModel = model<BlackList>(BL_COLLECTIONS, BlackListSchema);
    return BlackListModel.insertMany(data);
}

export const UpdateBlackListDocsByExcel = async (data: any) => {
    await connect(MONGO_DB_BASEURL + MONGO_DB_NAME);
    const BlackListModel = model<BlackList>(BL_COLLECTIONS, BlackListSchema);
    let ListPromise = [];
    for (let i of data) {
        ListPromise.push(BlackListModel.findByIdAndUpdate(i.id, i));
    }
    return Promise.all(ListPromise);
}

export const DeleteBlackListDocsByExcel = async (data: any[]) => {
    await connect(MONGO_DB_BASEURL + MONGO_DB_NAME);
    const BlackListModel = model<BlackList>(BL_COLLECTIONS, BlackListSchema);
    let ListPromise = [];
    for (let i of data) {
        ListPromise.push(BlackListModel.findByIdAndDelete(i.id));
    }
    return Promise.all(ListPromise);
}