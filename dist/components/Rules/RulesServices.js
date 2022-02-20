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
exports.DeleteRule = exports.UpdateRule = exports.AddNewRule = exports.SearchByRuleName = exports.GetListRules = void 0;
var API_RESPONSE_1 = require("../Utils/API_RESPONSE");
var LogConfig_1 = __importDefault(require("../LogConfig"));
var Common_1 = require("../Utils/Common");
var RulesDAO_1 = require("./RulesDAO");
var moment_1 = __importDefault(require("moment"));
var HandError = function (resp, e, msg) {
    //@ts-ignore
    (0, API_RESPONSE_1.C201Resp)(resp, e);
    //@ts-ignore
    LogConfig_1.default.error(e.message);
};
var GetListRules = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var reqData, result, respResult, _i, result_1, i, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reqData = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, RulesDAO_1.GetListRuleDAO)()];
            case 2:
                result = _a.sent();
                respResult = [];
                for (_i = 0, result_1 = result; _i < result_1.length; _i++) {
                    i = result_1[_i];
                    respResult.push({
                        "rule_id": i.RULE_ID === null ? -1 : i.RULE_ID,
                        "rule_name": i.RULE_NAME === null ? "" : i.RULE_NAME,
                        "rule_desc": i.RULE_DESC === null ? "" : i.RULE_DESC,
                        "rule_regex": i.RULE_REGEX === null ? "" : i.RULE_REGEX,
                        "created_at": i.CREATED_AT === null ? "" : (0, moment_1.default)(i.CREATED_AT).format("DD/MM/YYYY HH:mm:ss"),
                        "updated_at": i.UPDATED_AT === null ? "" : (0, moment_1.default)(i.UPDATED_AT).format("DD/MM/YYYY HH:mm:ss")
                    });
                }
                (0, API_RESPONSE_1.SuccessResp)(resp, respResult);
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                //@ts-ignore
                if (e_1.hasOwnProperty("message")) {
                    //@ts-ignore
                    (0, API_RESPONSE_1.C201Resp)(resp, e_1.message);
                    return [2 /*return*/];
                }
                //@ts-ignore
                if (e_1.hasOwnProperty("sqlMessage")) {
                    //@ts-ignore
                    (0, API_RESPONSE_1.C201Resp)(resp, e_1.sqlMessage);
                    return [2 /*return*/];
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.GetListRules = GetListRules;
var SearchByRuleName = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var reqData, rule_name, result, respResult, _i, result_2, i, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reqData = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                rule_name = (0, Common_1.getString)(reqData, "rule_name").toUpperCase();
                return [4 /*yield*/, (0, RulesDAO_1.SearchByRuleNameDAO)(rule_name)];
            case 2:
                result = _a.sent();
                respResult = [];
                for (_i = 0, result_2 = result; _i < result_2.length; _i++) {
                    i = result_2[_i];
                    respResult.push({
                        "rule_id": i.RULE_ID === null ? -1 : i.RULE_ID,
                        "rule_name": i.RULE_NAME === null ? "" : i.RULE_NAME,
                        "rule_desc": i.RULE_DESC === null ? "" : i.RULE_DESC,
                        "rule_regex": i.RULE_REGEX === null ? "" : i.RULE_REGEX,
                        "created_at": i.CREATED_AT === null ? "" : (0, moment_1.default)(i.CREATED_AT).format("DD/MM/YYYY HH:mm:ss"),
                        "updated_at": i.UPDATED_AT === null ? "" : (0, moment_1.default)(i.UPDATED_AT).format("DD/MM/YYYY HH:mm:ss")
                    });
                }
                (0, API_RESPONSE_1.SuccessResp)(resp, respResult);
                return [3 /*break*/, 4];
            case 3:
                e_2 = _a.sent();
                //@ts-ignore
                if (e_2.hasOwnProperty("message")) {
                    //@ts-ignore
                    (0, API_RESPONSE_1.C201Resp)(resp, e_2.message);
                    return [2 /*return*/];
                }
                //@ts-ignore
                if (e_2.hasOwnProperty("sqlMessage")) {
                    //@ts-ignore
                    (0, API_RESPONSE_1.C201Resp)(resp, e_2.sqlMessage);
                    return [2 /*return*/];
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.SearchByRuleName = SearchByRuleName;
var AddNewRule = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var reqData, name_1, regex, desc, NewRuleInfo, result, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reqData = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                name_1 = (0, Common_1.getString)(reqData, "rule_name").toUpperCase();
                regex = (0, Common_1.getString)(reqData, "rule_regex", false);
                desc = (0, Common_1.getString)(reqData, "rule_desc", false);
                NewRuleInfo = {
                    RULE_ID: -1,
                    RULE_NAME: name_1,
                    RULE_DESC: desc,
                    RULE_REGEX: regex,
                    CREATED_AT: "",
                    UPDATED_AT: ""
                };
                return [4 /*yield*/, (0, RulesDAO_1.InsertRule)(NewRuleInfo)];
            case 2:
                result = _a.sent();
                (0, API_RESPONSE_1.SuccessResp)(resp, result);
                return [3 /*break*/, 4];
            case 3:
                e_3 = _a.sent();
                //@ts-ignore
                if (e_3.code === 11000) {
                    (0, API_RESPONSE_1.C201Resp)(resp, "'" + (0, Common_1.getString)(reqData, "name") + "' has been declare");
                    return [2 /*return*/];
                }
                //@ts-ignore
                if (e_3.hasOwnProperty("message")) {
                    //@ts-ignore
                    (0, API_RESPONSE_1.C201Resp)(resp, e_3.message);
                    return [2 /*return*/];
                }
                //@ts-ignore
                if (e_3.hasOwnProperty("sqlMessage")) {
                    //@ts-ignore
                    (0, API_RESPONSE_1.C201Resp)(resp, e_3.sqlMessage);
                    return [2 /*return*/];
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.AddNewRule = AddNewRule;
var UpdateRule = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var reqData, rule_id, rule_name, rule_desc, rule_regex, NewRuleData, result, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reqData = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                rule_id = (0, Common_1.getNumber)(reqData, "rule_id");
                rule_name = (0, Common_1.getString)(reqData, "rule_name").toUpperCase();
                rule_desc = (0, Common_1.getString)(reqData, "rule_desc", false);
                rule_regex = (0, Common_1.getString)(reqData, "rule_regex");
                NewRuleData = {
                    RULE_ID: rule_id,
                    RULE_NAME: rule_name,
                    RULE_DESC: rule_desc,
                    RULE_REGEX: rule_regex,
                    CREATED_AT: "",
                    UPDATED_AT: ""
                };
                return [4 /*yield*/, (0, RulesDAO_1.UpdateRuleDAO)(NewRuleData)];
            case 2:
                result = _a.sent();
                (0, API_RESPONSE_1.SuccessResp)(resp, result);
                return [3 /*break*/, 4];
            case 3:
                e_4 = _a.sent();
                console.log(e_4);
                //@ts-ignore
                if (e_4.hasOwnProperty("message")) {
                    //@ts-ignore
                    (0, API_RESPONSE_1.C201Resp)(resp, e_4.message);
                    return [2 /*return*/];
                }
                //@ts-ignore
                if (e_4.hasOwnProperty("sqlMessage")) {
                    //@ts-ignore
                    (0, API_RESPONSE_1.C201Resp)(resp, e_4.sqlMessage);
                    return [2 /*return*/];
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.UpdateRule = UpdateRule;
var DeleteRule = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var reqData, rule_id, result, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reqData = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                rule_id = (0, Common_1.getNumber)(reqData, "rule_id");
                return [4 /*yield*/, (0, RulesDAO_1.DeleteRuleDAO)(rule_id)];
            case 2:
                result = _a.sent();
                if (result !== true) {
                    (0, API_RESPONSE_1.C201Resp)(resp, result);
                }
                else {
                    (0, API_RESPONSE_1.SuccessResp)(resp, "Successfully!");
                }
                return [3 /*break*/, 4];
            case 3:
                e_5 = _a.sent();
                console.log(e_5);
                //@ts-ignore
                if (e_5.hasOwnProperty("message")) {
                    //@ts-ignore
                    (0, API_RESPONSE_1.C201Resp)(resp, e_5.message);
                    return [2 /*return*/];
                }
                //@ts-ignore
                if (e_5.hasOwnProperty("sqlMessage")) {
                    //@ts-ignore
                    (0, API_RESPONSE_1.C201Resp)(resp, e_5.sqlMessage);
                    return [2 /*return*/];
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.DeleteRule = DeleteRule;
