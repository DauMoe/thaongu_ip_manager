import {connect, model} from "mongoose";
import {MONGO_DB_BASEURL, MONGO_DB_NAME, VLAN_COLLECTIONS} from "../Definition";
import {VLAN} from "../Utils/Global_Interface";
import {VLANSchema} from "../Utils/Global_Schema";

export const Single_AddProperties = async (id: string | any, list: any): Promise<any> => {
    await connect(MONGO_DB_BASEURL + MONGO_DB_NAME);
    const VLAN_Model = model<VLAN>(VLAN_COLLECTIONS, VLANSchema);
    return VLAN_Model.findOneAndUpdate({_id: id}, {
        properties: list
    });
}

export const GetPropertiesByID = async (id: string | any): Promise<any> => {
    await connect(MONGO_DB_BASEURL + MONGO_DB_NAME);
    const VLAN_Model = model<VLAN>(VLAN_COLLECTIONS, VLANSchema);
    return VLAN_Model.findOne({_id: id});
}

export const NewVLAN_IP = async (ip: string, properties: any): Promise<any> => {
    await connect(MONGO_DB_BASEURL + MONGO_DB_NAME);
    const VLAN_Model = model<VLAN>(VLAN_COLLECTIONS, VLANSchema);
    return new VLAN_Model({
        ip: ip,
        properties: properties
    }).save();
}

export const GetAllDocs = async(fields?: string): Promise<any> => {
    await connect(MONGO_DB_BASEURL + MONGO_DB_NAME);
    const VLAN_Model = model<VLAN>(VLAN_COLLECTIONS, VLANSchema);
    return VLAN_Model.find({}, fields);
}

export const GetDocsLimit = async(offset: number, limit: number): Promise<any> => {
    await connect(MONGO_DB_BASEURL + MONGO_DB_NAME);
    const VLAN_Model = model<VLAN>(VLAN_COLLECTIONS, VLANSchema);
    return VLAN_Model
        .find({})
        .limit(limit)
        .skip(offset)
        .sort({'createdAt': -1})
        .exec();
}

export const CountTotalDocs = async(): Promise<any> => {
    await connect(MONGO_DB_BASEURL + MONGO_DB_NAME);
    const VLAN_Model = model<VLAN>(VLAN_COLLECTIONS, VLANSchema);
    return VLAN_Model.count({});
}

// export const Search = async(q: string): Promise<any> => {
//     await connect(MONGO_DB_BASEURL + MONGO_DB_NAME);
//     const VLAN_Model = model<VLAN>(VLAN_COLLECTIONS, VLANSchema);
//
// }