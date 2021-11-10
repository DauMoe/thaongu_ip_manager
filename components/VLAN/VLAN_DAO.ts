import {connect, model} from "mongoose";
import {MONGO_DB_BASEURL, MONGO_DB_NAME, VLAN_COLLECTIONS} from "../Definition";
import {VLAN} from "../Utils/Global_Interface";
import {VLANSchema} from "../Utils/Global_Schema";

export const Single_AddProperties = async (id: string | any, list: any): Promise<any> => {
    await connect(MONGO_DB_BASEURL + MONGO_DB_NAME);
    const VLAN_Model = model<VLAN>(VLAN_COLLECTIONS, VLANSchema);
    return VLAN_Model.findByIdAndUpdate(id, list);
}

export const GetPropertiesByID = async (id: string | any): Promise<any> => {
    await connect(MONGO_DB_BASEURL + MONGO_DB_NAME);
    const VLAN_Model = model<VLAN>(VLAN_COLLECTIONS, VLANSchema);
    return VLAN_Model.findById(id);
}

export const NewVLAN_IP = async (ip: string, properties: any): Promise<any> => {
    await connect(MONGO_DB_BASEURL + MONGO_DB_NAME);
    const VLAN_Model = model<VLAN>(VLAN_COLLECTIONS, VLANSchema);
    return new VLAN_Model({
        "ip": ip,
        "properties": properties
    }).save();
}