import {Schema} from "mongoose";
import {BlackList, VLAN} from "./Global_Interface";

export const BlackListSchema = new Schema<BlackList>({
    "ip": {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    "create_time": {
        type: Date,
        default: new Date()
    },
    "desc": {
        type: String,
        default: ""
    }
}, {timestamps: true});

export const VLANSchema = new Schema<VLAN>({
    "ip": {
        type: String,
        required: true
    },
    "create_time": {
        type: Number,
        default: Date.now
    },
    "desc": {
        type: String,
        default: ""
    }
}, {timestamps: true});