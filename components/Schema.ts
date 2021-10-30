import mongoose from "mongoose";
const {Schema} = mongoose;

export const BlackListScheme = new Schema({
    "ip":{
        type: String,
        required: true
    },
    "create_time": {
        type: Date,
        default: Date.now
    },
    "desc": {
        type: String
    }
});
