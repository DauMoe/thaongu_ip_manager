import {Schema} from "mongoose";
import {BlackList, VLAN} from "./Global_Interface";

export const BlackListSchema = new Schema<BlackList>({
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
    },
    "last_update": {
        type: Number,
        default: Date.now
    }
});

export const VLANSchema = new Schema<VLAN>({
    "ip": {
        type: String,
        required: true
    },
    "create_time": {
        type: Number,
        default: Date.now
    },
    "desc": String,
    "last_update": {
        type: Number,
        default: Date.now
    }
});