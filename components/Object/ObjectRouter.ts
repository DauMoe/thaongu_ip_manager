import express from "express";
import {
    AddObjectProperty,
    DeleteObject,
    ExportData,
    GetCreateExcelTemplate,
    GetListObjectTypeExcelTemplate,
    GetObject,
    GetObjectInfo,
    InsertObject,
    InsertObjectExcel,
    SearchByObjectName,
    UpdatePropertyValue
} from "./ObjectService";
import multiparty from "multiparty-express";
import {CheckAdminRole, CheckAuthMiddleWare } from "../Utils/Authentication";

const ObjectRouter = express.Router();

ObjectRouter.post("/list", CheckAuthMiddleWare, GetObject);
ObjectRouter.post("/get_object_info", CheckAuthMiddleWare, GetObjectInfo);
ObjectRouter.post("/add_property_to_object", CheckAuthMiddleWare, CheckAdminRole, AddObjectProperty);
ObjectRouter.post("/update_property", CheckAuthMiddleWare, CheckAdminRole, UpdatePropertyValue);
ObjectRouter.post("/delete", CheckAuthMiddleWare, CheckAdminRole, DeleteObject);
ObjectRouter.post("/insert", CheckAuthMiddleWare, CheckAdminRole, InsertObject);
ObjectRouter.post("/get_excel_template", CheckAuthMiddleWare, GetCreateExcelTemplate);
ObjectRouter.post("/get_obj_type_template", CheckAuthMiddleWare, GetListObjectTypeExcelTemplate);
ObjectRouter.post("/insert_object_excel", multiparty(), CheckAuthMiddleWare, CheckAdminRole, InsertObjectExcel);
ObjectRouter.post("/export_data", CheckAuthMiddleWare, ExportData);
ObjectRouter.post("/search", CheckAuthMiddleWare, SearchByObjectName);

export default ObjectRouter;