"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteBlackListDocsByExcel = exports.UpdateBlackListDocsByExcel = exports.CreateBlackListDocsByExcel = exports.SearchBlackListIP = exports.EditBlackList = exports.RemoveByID = exports.CountBlackListDocuments = exports.GetAllBlackList = exports.CreateOneBlackList = void 0;
var mongoose_1 = require("mongoose");
var dotenv_1 = __importDefault(require("dotenv"));
var Global_Schema_1 = require("../Utils/Global_Schema");
var mongodb_1 = require("mongodb");
dotenv_1.default.config({
    path: __dirname + "/../../.env"
});
var _EscapeReg = function (msg) {
    return msg.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
};
var MONGO_DB_USER = process.env.MONGO_USER || "";
var MONGO_DB_PASS = process.env.MONGO_PASS || "";
var MONGO_DB_URL = process.env.MONGO_URL || "localhost:27017/";
var MONGO_DB_NAME = process.env.MONGO_DB_NAME || "thao_ip_manager";
var _BL_MODEL = process.env.BLACKLIST_MODEL || 'blacklist';
var MONGO_DB_BASEURL;
if (MONGO_DB_USER === "" && MONGO_DB_PASS === "") {
    MONGO_DB_BASEURL = "mongodb://" + MONGO_DB_URL;
}
else {
    MONGO_DB_BASEURL = "mongodb://" + MONGO_DB_USER + ":" + MONGO_DB_PASS + "@" + MONGO_DB_URL;
}
console.log(MONGO_DB_BASEURL);
var CreateOneBlackList = function (ip, desc, create_time) { return __awaiter(void 0, void 0, void 0, function () {
    var BlackListModel;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, mongoose_1.connect)(MONGO_DB_BASEURL + MONGO_DB_NAME)];
            case 1:
                _a.sent();
                BlackListModel = (0, mongoose_1.model)(_BL_MODEL, Global_Schema_1.BlackListSchema);
                return [2 /*return*/, new BlackListModel({
                        "ip": ip,
                        "desc": desc,
                        "create_time": create_time
                    }).save()];
        }
    });
}); };
exports.CreateOneBlackList = CreateOneBlackList;
var GetAllBlackList = function (offset, limit) { return __awaiter(void 0, void 0, void 0, function () {
    var BlackListModel;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, mongoose_1.connect)(MONGO_DB_BASEURL + MONGO_DB_NAME)];
            case 1:
                _a.sent();
                BlackListModel = (0, mongoose_1.model)(_BL_MODEL, Global_Schema_1.BlackListSchema);
                return [2 /*return*/, BlackListModel
                        .find({})
                        .limit(limit)
                        .skip(offset)
                        .sort({ 'createAt': -1 })
                        .exec()];
        }
    });
}); };
exports.GetAllBlackList = GetAllBlackList;
var CountBlackListDocuments = function () { return __awaiter(void 0, void 0, void 0, function () {
    var BlackListModel;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, mongoose_1.connect)(MONGO_DB_BASEURL + MONGO_DB_NAME)];
            case 1:
                _a.sent();
                BlackListModel = (0, mongoose_1.model)(_BL_MODEL, Global_Schema_1.BlackListSchema);
                return [2 /*return*/, BlackListModel.count({})];
        }
    });
}); };
exports.CountBlackListDocuments = CountBlackListDocuments;
var RemoveByID = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var BlackListModel;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, mongoose_1.connect)(MONGO_DB_BASEURL + MONGO_DB_NAME)];
            case 1:
                _a.sent();
                BlackListModel = (0, mongoose_1.model)(_BL_MODEL, Global_Schema_1.BlackListSchema);
                return [2 /*return*/, BlackListModel.findByIdAndRemove(new mongodb_1.ObjectId(id))];
        }
    });
}); };
exports.RemoveByID = RemoveByID;
var EditBlackList = function (id, data) { return __awaiter(void 0, void 0, void 0, function () {
    var BlackListModel;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, mongoose_1.connect)(MONGO_DB_BASEURL + MONGO_DB_NAME)];
            case 1:
                _a.sent();
                BlackListModel = (0, mongoose_1.model)(_BL_MODEL, Global_Schema_1.BlackListSchema);
                return [2 /*return*/, BlackListModel.updateOne({
                        _id: new mongodb_1.ObjectId(id),
                    }, __assign({}, data))];
        }
    });
}); };
exports.EditBlackList = EditBlackList;
var SearchBlackListIP = function (id, ip, create_time_from, create_time_to, created_at_from, created_at_to, updated_at_from, updated_at_to) { return __awaiter(void 0, void 0, void 0, function () {
    var BlackListModel, options;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, mongoose_1.connect)(MONGO_DB_BASEURL + MONGO_DB_NAME)];
            case 1:
                _a.sent();
                BlackListModel = (0, mongoose_1.model)(_BL_MODEL, Global_Schema_1.BlackListSchema);
                options = {};
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
                if (created_at_from !== undefined && created_at_to !== undefined) {
                    //@ts-ignore
                    options["createdAt"] = {
                        $gt: created_at_from,
                        $lt: created_at_to
                    };
                }
                if (updated_at_from !== undefined && updated_at_to !== undefined) {
                    //@ts-ignore
                    options["updatedAt"] = {
                        $gt: updated_at_from,
                        $lt: updated_at_to
                    };
                }
                return [2 /*return*/, BlackListModel.find(options)];
        }
    });
}); };
exports.SearchBlackListIP = SearchBlackListIP;
var CreateBlackListDocsByExcel = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var BlackListModel;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, mongoose_1.connect)(MONGO_DB_BASEURL + MONGO_DB_NAME)];
            case 1:
                _a.sent();
                BlackListModel = (0, mongoose_1.model)(_BL_MODEL, Global_Schema_1.BlackListSchema);
                return [2 /*return*/, BlackListModel.insertMany(data)];
        }
    });
}); };
exports.CreateBlackListDocsByExcel = CreateBlackListDocsByExcel;
var UpdateBlackListDocsByExcel = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var BlackListModel, ListPromise, _i, data_1, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, mongoose_1.connect)(MONGO_DB_BASEURL + MONGO_DB_NAME)];
            case 1:
                _a.sent();
                BlackListModel = (0, mongoose_1.model)(_BL_MODEL, Global_Schema_1.BlackListSchema);
                ListPromise = [];
                for (_i = 0, data_1 = data; _i < data_1.length; _i++) {
                    i = data_1[_i];
                    ListPromise.push(BlackListModel.findByIdAndUpdate(i.id, i));
                }
                return [2 /*return*/, Promise.all(ListPromise)];
        }
    });
}); };
exports.UpdateBlackListDocsByExcel = UpdateBlackListDocsByExcel;
var DeleteBlackListDocsByExcel = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var BlackListModel, ListPromise, _i, data_2, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, mongoose_1.connect)(MONGO_DB_BASEURL + MONGO_DB_NAME)];
            case 1:
                _a.sent();
                BlackListModel = (0, mongoose_1.model)(_BL_MODEL, Global_Schema_1.BlackListSchema);
                ListPromise = [];
                for (_i = 0, data_2 = data; _i < data_2.length; _i++) {
                    i = data_2[_i];
                    ListPromise.push(BlackListModel.findByIdAndDelete(i.id));
                }
                return [2 /*return*/, Promise.all(ListPromise)];
        }
    });
}); };
exports.DeleteBlackListDocsByExcel = DeleteBlackListDocsByExcel;
