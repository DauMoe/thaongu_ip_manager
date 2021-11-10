import express from "express";
import * as _URL from "../API_URL";
import {
    DeleteBlackListExcel,
    EditDocs,
    ExportAllBlackListData2Excel, ExportNewBlackListToday,
    GetBlackList,
    NewBlackList, NewBlackListExcel,
    RemoveDocs,
    SearchByBlacklistIP, UpdateBlackListExcel
} from "./BlackListServices";
import multiparty from "multiparty-express";
import { CheckAuthMiddleWare } from "../authentication";

const BL_Router = express.Router();

BL_Router.post(_URL.BLACKLIST_ADD_IP, CheckAuthMiddleWare, NewBlackList);
BL_Router.post(_URL.BLACKLIST_GET_IP, CheckAuthMiddleWare, GetBlackList);
BL_Router.post(_URL.BLACKLIST_REMOVE_IP, CheckAuthMiddleWare, RemoveDocs);
BL_Router.post(_URL.BLACKLIST_EDIT_IP, CheckAuthMiddleWare, EditDocs);
BL_Router.post(_URL.BLACKLIST_SEARCH_IP, CheckAuthMiddleWare, SearchByBlacklistIP);
BL_Router.post(_URL.BLACKLIST_EXPORT_EXCEL, CheckAuthMiddleWare, ExportAllBlackListData2Excel);
BL_Router.post(_URL.BLACKLIST_IMPORTED_IP_TODAY_EXCEL, CheckAuthMiddleWare, ExportNewBlackListToday);
BL_Router.post(_URL.BLACKLIST_ADD_EXCEL, multiparty(), CheckAuthMiddleWare, NewBlackListExcel);
BL_Router.post(_URL.BLACKLIST_UPDATE_EXCEL, multiparty(), CheckAuthMiddleWare, UpdateBlackListExcel);
BL_Router.post(_URL.BLACKLIST_DELETE_EXCEL, multiparty(), CheckAuthMiddleWare, DeleteBlackListExcel);

export default BL_Router;