import {Request, Response} from "express";
import {C201Resp, SuccessResp} from "../Utils/API_RESPONSE";
import {getJSONArray, getNumber, getNumberArray, getString, GetCellNameByIndex, DELETE_FILE_TIMEOUT} from "../Utils/Common";
import {
    AddObjectPropertyDAO,
    DeleteObjectDAO,
    GetListPropertyByObjTypeIDDAO,
    GetObjectDAO,
    GetObjectInfoDAO,
    InsertObjectDAO,
    UpdatePropertyValueDAO,
    InsertObjectExcelDAO,
    ExportDataDAO
} from "./ObjectDAO";
import moment from "moment";
import * as path from "path";
import ExcelJS, { Cell } from "exceljs";
import * as fs from "fs";
import { GetListRuleDAO } from "../Rules/RulesDAO";

export const GetObject = async(req: Request, resp: Response) => {
    let reqData = req.body;
    try {
        let obj_type_id: Number = getNumber(reqData, "obj_type_id");
        //@ts-ignore
        let result: any[] = await GetObjectDAO(obj_type_id);
        let respResult = [];
        for (let i of result) {
            respResult.push({
                "obj_id": i.OBJ_ID              === null ? -1 : i.OBJ_ID,
                "obj_name": i.OBJ_NAME          === null ? "" : i.OBJ_NAME,
                "obj_desc": i.OBJ_DESC          === null ? "" : i.OBJ_DESC,
                "obj_type_id": i.OBJ_TYPE_ID    === null ? -1 : i.OBJ_TYPE_ID
            });
        }
        SuccessResp(resp, respResult);
    } catch (e) {
        //@ts-ignore
        if (e.hasOwnProperty("message")) {
            //@ts-ignore
            C201Resp(resp, e.message);
            return;
        }
        //@ts-ignore
        if (e.hasOwnProperty("sqlMessage")) {
            //@ts-ignore
            C201Resp(resp, e.sqlMessage);
            return;
        }
    }
}

export const GetObjectInfo = async(req: Request, resp: Response) => {
    let reqData = req.body;
    try {
        let obj_id: Number = getNumber(reqData, "obj_id");
        //@ts-ignore
        let result: any[] = await GetObjectInfoDAO(obj_id);
        let respResult = [];
        for (let i of result) {
            respResult.push({
                "obj_id": i.OBJ_ID              === null ? -1 : i.OBJ_ID,
                "obj_name": i.OBJ_NAME          === null ? "" : i.OBJ_NAME,
                "obj_desc": i.OBJ_DESC          === null ? "" : i.OBJ_DESC,
                "obj_type_id": i.OBJ_TYPE_ID    === null ? -1 : i.OBJ_TYPE_ID,
                "pro_id": i.PRO_ID              === null ? -1 : i.PRO_ID,
                "pro_name": i.PRO_NAME          === null ? "" : i.PRO_NAME,
                "pro_desc": i.PRO_DESC          === null ? "" : i.PRO_DESC,
                "pro_value": i.PRO_VALUE        === null ? "" : i.PRO_VALUE,
                "rule_id": i.RULE_ID            === null ? -1 : i.RULE_ID,
                "rule_regex": i.RULE_REGEX      === null ? "" : i.RULE_REGEX,
                "created_at": i.CREATED_AT      === null ? "" : moment(i.CREATED_AT).format("DD/MM/YYYY HH:mm:ss"),
                "updated_at": i.CREATED_AT      === null ? "" : moment(i.UPDATED_AT).format("DD/MM/YYYY HH:mm:ss"),
            });
        }
        SuccessResp(resp, respResult);
    } catch (e) {
        //@ts-ignore
        if (e.hasOwnProperty("message")) {
            //@ts-ignore
            C201Resp(resp, e.message);
            return;
        }
        //@ts-ignore
        if (e.hasOwnProperty("sqlMessage")) {
            //@ts-ignore
            C201Resp(resp, e.sqlMessage);
            return;
        }
    }
}

export const AddObjectProperty = async(req: Request, resp: Response) => {
    let reqData = req.body;
    try {
        let obj_id      : Number = getNumber(reqData, "obj_id");
        let pro_id      : Number = getNumber(reqData, "pro_id");
        let pro_value   : string = getString(reqData, "pro_value");
        //@ts-ignore
        let result: any[] = await AddObjectPropertyDAO(obj_id, pro_id, pro_value);
        if (result[0].A === 0) {
            C201Resp(resp, "Thuộc tính này đã nằm trong đối tượng!");
        } else {
            SuccessResp(resp, "Thành công");
        }
    } catch (e) {
        //@ts-ignore
        if (e.hasOwnProperty("message")) {
            //@ts-ignore
            C201Resp(resp, e.message);
            return;
        }
        //@ts-ignore
        if (e.hasOwnProperty("sqlMessage")) {
            //@ts-ignore
            C201Resp(resp, e.sqlMessage);
            return;
        }
    }
}

export const UpdatePropertyValue = async(req: Request, resp: Response) => {
    let reqData = req.body;
    try {
        let list_property: any[] = getJSONArray(reqData, "list_property");
        await UpdatePropertyValueDAO(list_property);
        SuccessResp(resp, "Update successfully!");
    } catch (e) {
        //@ts-ignore
        if (e.hasOwnProperty("message")) {
            //@ts-ignore
            C201Resp(resp, e.message);
            return;
        }
        //@ts-ignore
        if (e.hasOwnProperty("sqlMessage")) {
            //@ts-ignore
            C201Resp(resp, e.sqlMessage);
            return;
        }
    }
}

export const DeleteObject = async(req: Request, resp: Response) => {
    let reqData = req.body;
    try {
        let obj_id: Number = getNumber(reqData, "obj_id");
        await DeleteObjectDAO(obj_id);
        SuccessResp(resp, "Delete successfully!");
    } catch (e) {
        //@ts-ignore
        if (e.hasOwnProperty("message")) {
            //@ts-ignore
            C201Resp(resp, e.message);
            return;
        }
        //@ts-ignore
        if (e.hasOwnProperty("sqlMessage")) {
            //@ts-ignore
            C201Resp(resp, e.sqlMessage);
            return;
        }
    }
}

export const InsertObject = async(req: Request, resp: Response) => {
    let reqData = req.body;
    try {
        let obj_name: string    = getString(reqData, "obj_name").toUpperCase();
        let obj_desc: string    = getString(reqData, "obj_desc", false);
        let obj_type_id: Number = getNumber(reqData, "obj_type_id");
        let list_pro: Number[]  = getNumberArray(reqData, "list_pro_id");
        await InsertObjectDAO(obj_name, obj_desc, obj_type_id, list_pro);
        SuccessResp(resp, "Created!");
    } catch (e) {
        //@ts-ignore
        if (e.hasOwnProperty("message")) {
            //@ts-ignore
            C201Resp(resp, e.message);
            return;
        }
        //@ts-ignore
        if (e.hasOwnProperty("sqlMessage")) {
            //@ts-ignore
            C201Resp(resp, e.sqlMessage);
            return;
        }
    }
}
//exceljs: https://www.npmjs.com/package/exceljs#file-io
//ARGB Picker: https://cssgenerator.org/rgba-and-hex-color-generator.html
export const GetCreateExcelTemplate = async(req: Request, resp: Response) => {
    let reqData = req.body;
    try {
        let obj_type_id: Number     = getNumber(reqData, "obj_type_id");
        //@ts-ignore
        let result: any[]           = await GetListPropertyByObjTypeIDDAO(obj_type_id);
        //@ts-ignore
        let list_rule: any[]        = await GetListRuleDAO();
        const workbook              = new ExcelJS.Workbook();
        workbook.creator            = "IP Manager";
        const sheet                 = workbook.addWorksheet('IP Manager | Create object');

        /**==================== Create Object Sheet Area ====================*/
        let list_pro_name: string[] = ["Object name", "Object desc"];
        let list_pro_id: Number[]   = [-1, -2];
        for (let i of result) {
            list_pro_name.push(i.PRO_NAME);
            list_pro_id.push(i.PRO_ID);
        }
        sheet.addRow("");
        sheet.addRow(list_pro_name);
        sheet.addRow(list_pro_id);
        let list_cell: string[] = GetCellNameByIndex(list_pro_name.length, 2, true);
        list_cell.map(function(item, index) {
            sheet.getCell(`${item}`).fill =  {
                type: 'pattern',
                pattern:'solid',
                fgColor:{
                    argb: "98D3DA"
                }
            }
            sheet.getCell(`${item}`).note =  {
                texts: [
                    {'text': "Property name (DO NOT EDIT)"}
                ],
                margins: {
                    insetmode: 'custom',
                    inset: [0.25, 0.25, 0.35, 0.35]
                },
                protection: {
                    locked: "True",
                    lockText: "True"
                },
            }
        });
        list_cell = GetCellNameByIndex(list_pro_name.length, 3, true);
        list_cell.map(function(item, index) {
            sheet.getCell(`${item}`).fill =  {
                type: 'pattern',
                pattern:'solid',
                fgColor:{
                    argb: "D8D9DE"
                }
            }
            sheet.getCell(`${item}`).note =  {
                texts: [
                    {'text': `${list_pro_name[index]} ID (DO NOT EDIT)`}
                ],
                margins: {
                    insetmode: 'custom',
                    inset: [0.25, 0.25, 0.35, 0.35]
                },
                protection: {
                    locked: "True",
                    lockText: "True"
                },
            }
        });
        list_cell = GetCellNameByIndex(list_pro_name.length, 1, true);
        sheet.mergeCells(`${list_cell[0]}:${list_cell[list_cell.length-1]}`);
        sheet.getCell(`${list_cell[0]}`).value = "Create object by Excel";

        /**==================== Write Excel File Area ====================*/
        let file_path: string = `asset/report/${new Date().getTime()}_create_object.xlsx`;
        await workbook.xlsx.writeFile(file_path);
        SuccessResp(resp, file_path);
        setTimeout(() => {
            fs.unlink(file_path, function(e) {
                if (e) console.log(e);
            });
        }, DELETE_FILE_TIMEOUT);
    } catch (e) {
        //@ts-ignore
        if (e.hasOwnProperty("message")) {
            //@ts-ignore
            C201Resp(resp, e.message);
            return;
        }
        //@ts-ignore
        if (e.hasOwnProperty("sqlMessage")) {
            //@ts-ignore
            C201Resp(resp, e.sqlMessage);
            return;
        }
    }
}

export const GetListObjectTypeExcelTemplate = async(req: Request, resp: Response) => {
    let reqData = req.body;
    try {
        let obj_type_id: Number = getNumber(reqData, "obj_type_id");
    } catch (e) {
        //@ts-ignore
        if (e.hasOwnProperty("message")) {
            //@ts-ignore
            C201Resp(resp, e.message);
            return;
        }
        //@ts-ignore
        if (e.hasOwnProperty("sqlMessage")) {
            //@ts-ignore
            C201Resp(resp, e.sqlMessage);
            return;
        }
    }
}

export const InsertObjectExcel = async(req: Request, resp: Response) => {
    try {
        if (!req.files.hasOwnProperty("excel_file")) {
            C201Resp(resp, "Missing 'excel_file' field!");
            return;
        }
        if (!req.fields.hasOwnProperty("obj_type_id")) {
            C201Resp(resp, "Missing 'obj_type_id' field!");
            return;
        }

        let OriginPath: string  = req.files.excel_file[0].path;
        let obj_type_id:Number  = req.fields.obj_type_id[0];

        const wb = new ExcelJS.Workbook();
        await wb.xlsx.readFile(OriginPath);
        fs.unlinkSync(OriginPath);
        wb.eachSheet(async function (sheet: ExcelJS.Worksheet, sheet_index: number) {
            /**Get first sheet only*/
            if (sheet_index === 1) {
                let errMsg: string              = "";
                let ListPropertyID: number[]    = [];
                let ListPropertyValues: any[]   = [];
                let obj_name_index: Number      = -1;
                let obj_desc_index: Number      = -1;
                sheet.eachRow(function (row: ExcelJS.Row, row_index: number) {
                    if (row_index === 3) {
                        row.eachCell(function (cell: ExcelJS.Cell, cell_index: number) {
                            if (cell.value !== null && cell.value !== undefined && !isNaN(Number.parseInt(cell.value.toString()))) {
                                ListPropertyID.push(Number.parseInt(cell.value.toString()));
                            } else {
                                errMsg += `Cell at index ${cell_index} must be a Number and CAN NOT null,\n `;
                            }
                        });
                        obj_name_index  = ListPropertyID.indexOf(-1) + 1;
                        obj_desc_index  = ListPropertyID.indexOf(-2) + 1;
                    }
                    if (row_index > 3) {
                        let temp: any = {
                            "obj_name": "",
                            "obj_desc": "",
                            "properties": []
                        }
                        row.eachCell({ includeEmpty: true }, function (cell: ExcelJS.Cell, cell_index: number) {
                            if (cell.value !== null && cell.value !== undefined) {
                                if (cell_index === obj_name_index) {
                                    temp.obj_name = cell.value.toString().localeCompare("#") !== 0 ? cell.value.toString().toUpperCase() : null;
                                } else if (cell_index === obj_desc_index) {
                                    temp.obj_desc = cell.value.toString().localeCompare("#") !== 0 ? cell.value.toString() : '';
                                } else {
                                    if (cell.value.toString().localeCompare("#") !== 0) {
                                        let x = {
                                            "pro_id": ListPropertyID[cell_index-1],
                                            "pro_value": cell.value.toString()
                                        }
                                        temp.properties.push(x);
                                    }
                                }
                            } else {
                                errMsg += `Cell at index ${cell_index} CAN NOT null or undefined, `;
                            }
                        });
                        if (temp.obj_name !== null) ListPropertyValues.push(temp);
                    }
                });
                if (errMsg.trim() !== "") {
                    C201Resp(resp, errMsg.substring(0, errMsg.length-2));
                    return;
                }
                if (ListPropertyValues.length > 0) {
                    try {
                        await InsertObjectExcelDAO(ListPropertyValues, obj_type_id);
                        SuccessResp(resp, "Successfully!");
                    } catch (e) {
                        // @ts-ignore
                        C201Resp(resp, e.message);
                    }
                } else {
                    SuccessResp(resp, "Successfully!");
                }
            }
        });
    } catch (e) {
        //@ts-ignore
        if (e.hasOwnProperty("message")) {
            //@ts-ignore
            C201Resp(resp, e.message);
            return;
        }
        //@ts-ignore
        if (e.hasOwnProperty("sqlMessage")) {
            //@ts-ignore
            C201Resp(resp, e.sqlMessage);
            return;
        }
    }
}

export const ExportData = async(req: Request, resp: Response) => {
    let reqData = req.body;
    try {
        let obj_type_id: Number     = getNumber(reqData, "obj_type_id");
        // @ts-ignore
        let result: any[]           = await ExportDataDAO(obj_type_id);
        // @ts-ignore
        let ListProID: any[]        = await GetListPropertyByObjTypeIDDAO(obj_type_id);
        let ExcelData               = [];
        let ListObjID: Number[]     = [];
        let ListHeader: string[]    = ["ID", "Name", "Description"];
        let ListProHeader: Number[] = [-3, -2, -1];
        let f = [];
        for (let i of ListProID) {
            f.push({
                pro_id: i.PRO_ID,
                pro_value: '#'
            });
            ListProHeader.push(i.PRO_ID);
            ListHeader.push(i.PRO_NAME);
        }
        for (let i of result) {
            if (ListObjID.indexOf(i.OBJ_ID) === -1) {
                ListObjID.push(i.OBJ_ID);
                ExcelData.push({
                    obj_id: i.OBJ_ID,
                    obj_name: i.OBJ_NAME,
                    obj_desc: i.OBJ_DESC,
                    properties: JSON.parse(JSON.stringify(f))
                });
            }
        }
        for(let currentIndex = 0; currentIndex < ExcelData.length; currentIndex++) {
            for (let j of ExcelData[currentIndex].properties) {
                for (let i of result) {
                    if (i.PRO_ID === j.pro_id && i.OBJ_ID == ExcelData[currentIndex].obj_id) {
                        j.pro_value = i.PRO_VALUE
                    }
                }
            }
        }
        const wb    = new ExcelJS.Workbook();
        const sheet = wb.addWorksheet("List object");
        sheet.addRow(ListHeader);
        sheet.addRow(ListProHeader);
        for (let i of ExcelData) {
            let t = [i.obj_id, i.obj_name, i.obj_desc];
            for (let j of i.properties) {
                t.push(j.pro_value);
            }
            sheet.addRow(t);
        }
        let filePath: string = `asset/report/${new Date().getTime()}_list_object.xlsx`;
        await wb.xlsx.writeFile(filePath);
        // fs.unlinkSync(filePath);
        resp.json({
            code: 202,
            msg: filePath
        })
    } catch (e) {
        //@ts-ignore
        if (e.hasOwnProperty("message")) {
            //@ts-ignore
            C201Resp(resp, e.message);
            return;
        }
        //@ts-ignore
        if (e.hasOwnProperty("sqlMessage")) {
            //@ts-ignore
            C201Resp(resp, e.sqlMessage);
            return;
        }
    }
}