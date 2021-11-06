"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteBlackListDocsByExcel = exports.UpdateBlackListDocsByExcel = exports.CreateBlackListDocsByExcel = exports.SearchBlackListIP = exports.EditBlackList = exports.RemoveByID = exports.CountBlackListDocuments = exports.GetAllBlackList = exports.CreateOneBlackList = void 0;
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
const Global_Schema_1 = require("../Utils/Global_Schema");
const mongodb_1 = require("mongodb");
dotenv_1.default.config({
    path: __dirname + "/../../.env"
});
let _EscapeReg = (msg) => {
    return msg.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
};
const MONGO_DB_BASEURL = process.env.MONGO_URL || "mongodb://localhost:27017/";
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || "thao_ip_manager";
const _BL_MODEL = process.env.BLACKLIST_MODEL || 'blacklist';
const CreateOneBlackList = (ip, desc, create_time) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoose_1.connect)(MONGO_DB_BASEURL + MONGO_DB_NAME);
    const BlackListModel = (0, mongoose_1.model)(_BL_MODEL, Global_Schema_1.BlackListSchema);
    return new BlackListModel({
        "ip": ip,
        "desc": desc,
        "create_time": create_time
    }).save();
});
exports.CreateOneBlackList = CreateOneBlackList;
const GetAllBlackList = (offset, limit) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoose_1.connect)(MONGO_DB_BASEURL + MONGO_DB_NAME);
    const BlackListModel = (0, mongoose_1.model)(_BL_MODEL, Global_Schema_1.BlackListSchema);
    return BlackListModel
        .find({})
        .limit(limit)
        .skip(offset)
        .sort({ 'createAt': -1 })
        .exec();
});
exports.GetAllBlackList = GetAllBlackList;
const CountBlackListDocuments = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoose_1.connect)(MONGO_DB_BASEURL + MONGO_DB_NAME);
    const BlackListModel = (0, mongoose_1.model)(_BL_MODEL, Global_Schema_1.BlackListSchema);
    return BlackListModel.count({});
});
exports.CountBlackListDocuments = CountBlackListDocuments;
const RemoveByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoose_1.connect)(MONGO_DB_BASEURL + MONGO_DB_NAME);
    const BlackListModel = (0, mongoose_1.model)(_BL_MODEL, Global_Schema_1.BlackListSchema);
    return BlackListModel.findByIdAndRemove(new mongodb_1.ObjectId(id));
});
exports.RemoveByID = RemoveByID;
const EditBlackList = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoose_1.connect)(MONGO_DB_BASEURL + MONGO_DB_NAME);
    const BlackListModel = (0, mongoose_1.model)(_BL_MODEL, Global_Schema_1.BlackListSchema);
    return BlackListModel.updateOne({
        _id: new mongodb_1.ObjectId(id),
    }, Object.assign({}, data));
});
exports.EditBlackList = EditBlackList;
const SearchBlackListIP = (id, ip, create_time_from, create_time_to) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoose_1.connect)(MONGO_DB_BASEURL + MONGO_DB_NAME);
    const BlackListModel = (0, mongoose_1.model)(_BL_MODEL, Global_Schema_1.BlackListSchema);
    let options = {};
    if (id !== undefined) {
        //@ts-ignore
        options["_id"] = _EscapeReg(id);
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
        };
    }
    return BlackListModel.find(options);
});
exports.SearchBlackListIP = SearchBlackListIP;
const CreateBlackListDocsByExcel = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoose_1.connect)(MONGO_DB_BASEURL + MONGO_DB_NAME);
    const BlackListModel = (0, mongoose_1.model)(_BL_MODEL, Global_Schema_1.BlackListSchema);
    return BlackListModel.insertMany(data);
});
exports.CreateBlackListDocsByExcel = CreateBlackListDocsByExcel;
const UpdateBlackListDocsByExcel = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoose_1.connect)(MONGO_DB_BASEURL + MONGO_DB_NAME);
    const BlackListModel = (0, mongoose_1.model)(_BL_MODEL, Global_Schema_1.BlackListSchema);
    let ListPromise = [];
    for (let i of data) {
        ListPromise.push(BlackListModel.findByIdAndUpdate(i.id, i));
    }
    return Promise.all(ListPromise);
});
exports.UpdateBlackListDocsByExcel = UpdateBlackListDocsByExcel;
const DeleteBlackListDocsByExcel = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoose_1.connect)(MONGO_DB_BASEURL + MONGO_DB_NAME);
    const BlackListModel = (0, mongoose_1.model)(_BL_MODEL, Global_Schema_1.BlackListSchema);
    let ListPromise = [];
    for (let i of data) {
        ListPromise.push(BlackListModel.findByIdAndDelete(i.id));
    }
    return Promise.all(ListPromise);
});
exports.DeleteBlackListDocsByExcel = DeleteBlackListDocsByExcel;
