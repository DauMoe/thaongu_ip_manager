"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VLANSchema = exports.BlackListSchema = void 0;
var mongoose_1 = require("mongoose");
exports.BlackListSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
exports.VLANSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
