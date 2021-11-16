import {Schema} from "mongoose";
import {BlackList, Rule, VLAN} from "./Global_Interface";

export const BlackListSchema = new Schema<BlackList>({
    ip: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    create_time: {
        type: Date,
        default: new Date()
    },
    desc: {
        type: String,
        default: ""
    }
}, {timestamps: true});

/*  Dynamic fields: https://stackoverflow.com/questions/24517358/how-to-add-dynamic-field-to-existing-collection-using-mongoose */
export const VLANSchema = new Schema<VLAN>({
    ip: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    properties: {}
}, {timestamps: true});


export const RulesSchema = new Schema<Rule>({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    desc: {
        type: String,
        default: "Fit regex"
    },
    regex: {
        type: String,
        default: ""
    }
}, {timestamps: true});