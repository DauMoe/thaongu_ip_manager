import express from "express";
import {AuthenticationUser} from "../Utils/Common";
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
    UpdatePropertyValue
} from "./ObjectService";
import multiparty from "multiparty-express";

const ObjectRouter = express.Router();

ObjectRouter.post("/list", AuthenticationUser, GetObject);
ObjectRouter.post("/get_object_info", AuthenticationUser, GetObjectInfo);
ObjectRouter.post("/add_property_to_object", AuthenticationUser, AddObjectProperty);
ObjectRouter.post("/update_property", AuthenticationUser, UpdatePropertyValue);
ObjectRouter.post("/delete", AuthenticationUser, DeleteObject);
ObjectRouter.post("/insert", AuthenticationUser, InsertObject);
ObjectRouter.post("/get_excel_template", AuthenticationUser, GetCreateExcelTemplate);
ObjectRouter.post("/get_obj_type_template", AuthenticationUser, GetListObjectTypeExcelTemplate);
ObjectRouter.post("/insert_object_excel", multiparty(), AuthenticationUser, InsertObjectExcel);
ObjectRouter.post("/export_data", AuthenticationUser, ExportData);

export default ObjectRouter;