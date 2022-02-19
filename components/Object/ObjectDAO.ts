import {connection, query} from "../Utils/Common";
import * as util from "util";
import mysql from "mysql";
//Update multiple rows in mysql: https://stackoverflow.com/questions/3432/multiple-updates-in-mysql
//Insert multiple rows in mysql: https://stackoverflow.com/questions/8899802/how-do-i-do-a-bulk-insert-in-mysql-using-node-js

export const GetObjectDAO = async(obj_type_id: Number) => {
    return new Promise(function (resolve, reject) {
        let SQL_QUERY = "SELECT * FROM object WHERE OBJ_TYPE_ID = ?";
        let {sql} = connection.query(SQL_QUERY, [obj_type_id], function (err, result, fields) {
            if (err) {
                reject(err);
                console.log("============== GetObjectDAO - SQL =============");
                console.log(sql);
            } else {
                resolve(result);
            }
        });
    });
}

export const GetObjectInfoDAO = async(obj_id: Number) => {
    return new Promise(function (resolve, reject) {
        let SQL_QUERY = "SELECT a.*, b.*, c.PRO_VALUE, c.CREATED_AT, c.UPDATED_AT, d.RULE_REGEX FROM object a, property b, obj_pro c, rule d WHERE a.OBJ_ID = ? AND b.PRO_ID = c.PRO_ID AND a.OBJ_ID = c.OBJ_ID AND b.RULE_ID = d.RULE_ID";
        let {sql} = connection.query(SQL_QUERY, [obj_id], function (err, result, fields) {
            if (err) {
                reject(err);
                console.log("============== GetObjectInfoDAO - SQL =============");
                console.log(sql);
            } else {
                resolve(result);
            }
        });
    });
}

export const AddObjectPropertyDAO = async(obj_id: Number, pro_id: Number, pro_value: string) => {
    return new Promise(function (resolve, reject) {
        let SQL_QUERY = "SELECT insert_property_obj(?, ?, ?) AS A";
        let {sql} = connection.query(SQL_QUERY, [obj_id, pro_id, pro_value], function (err, result, fields) {
            if (err) {
                reject(err);
                console.log("============== AddObjectPropertyDAO - SQL =============");
                console.log(sql);
            } else {
                resolve(result);
            }
        });
    });
}

export const UpdatePropertyValueDAO = async(list_property: any[]) => {
    return new Promise(function (resolve, reject) {
        let SQL_QUERY = "INSERT INTO obj_pro (OBJ_ID, PRO_ID, PRO_VALUE) VALUES ? ON DUPLICATE KEY UPDATE PRO_VALUE = VALUES(PRO_VALUE)";
        let BindingValues = [];
        for (let i of list_property) {
            BindingValues.push([i.obj_id, i.pro_id, i.pro_value]);
        }
        let {sql} = connection.query(SQL_QUERY, [BindingValues], function (err, result, fields) {
            if (err) {
                reject(err);
                console.log("============== AddObjectPropertyDAO - SQL =============");
                console.log(sql);
            } else {
                resolve(result);
            }
        });
    });
}

export const DeleteObjectDAO = async(obj_id: Number) => {
    return new Promise(function (resolve, reject) {
        let SQL_QUERY = "DELETE FROM object WHERE OBJ_ID = ?";
        let {sql} = connection.query(SQL_QUERY, [obj_id], function (err, result, fields) {
            if (err) {
                reject(err);
                console.log("============== DeleteObjectDAO - SQL =============");
                console.log(sql);
            } else {
                resolve(result);
            }
        });
    });
}

export const InsertObjectDAO = async(obj_name: string, obj_desc: string, obj_type_id: Number, list_pro_id: Number[]) => {
    return new Promise(function (resolve, reject) {
        let SQL_QUERY = "INSERT INTO object (OBJ_NAME, OBJ_DESC, OBJ_TYPE_ID) VALUES (?, ?, ?)";
        let {sql} = connection.query(SQL_QUERY, [obj_name, obj_desc, obj_type_id], function (err, result, fields) {
            if (err) {
                reject(new Error(`${obj_name} already existed!`));
                console.log("============== InsertObjectDAO - SQL =============");
                console.log(sql);
            } else {
                /** Get required property of this object type **/
                connection.query("SELECT PRO_ID FROM obj_type_property WHERE OBJ_TYPE_ID = ? AND IS_REQUIRED = 1", [obj_type_id], function (e4, r4) {
                    if (e4) {
                        console.log("Get required property err");
                        console.log(e4);
                    }
                    for (let i of r4) {
                        if (list_pro_id.indexOf(i.PRO_ID) === -1) {
                            list_pro_id.push(i.PRO_ID);
                        }
                    }
                    if (list_pro_id.length > 0) {
                        /** If you don't have any property to assign this object, insert query IS NOT EXECUTE**/
                        let ListBindingValues: any[] = [];
                        for (let i of list_pro_id) {
                            ListBindingValues.push([result.insertId, obj_type_id, i]);
                        }

                        SQL_QUERY = "INSERT INTO obj_pro (OBJ_ID, OBJ_TYPE_ID, PRO_ID) VALUES ?";
                        let {sql} = connection.query(SQL_QUERY, [ListBindingValues], function(e1, r1) {
                            if (e1) {
                                console.log("============== InsertObjectDAO - SQL =============");
                                console.log(sql);
                                reject(new Error(`${obj_name} is created but CAN NOT create property because pro_id(s) in 'list_pro_id' is(are) not exist in this object type!`));
                            } else {
                                resolve(r1);
                            }
                        });
                    } else {
                        resolve(result);
                    }
                });
            }
        });
    });
}

export const GetListPropertyByObjTypeIDDAO = (obj_type_id: Number) => {
    return new Promise(function (resolve, reject) {
       let SQL_QUERY = "SELECT a.OBJ_TYPE_ID, b.* FROM obj_type_property a JOIN property b ON a.PRO_ID = b.PRO_ID AND a.OBJ_TYPE_ID = ?";
       let {sql} = connection.query(SQL_QUERY, [obj_type_id], function(e, r) {
          if (e) {
              console.log("============== GetListPropertyByObjTypeIDDAO - SQL ==============");
              console.log(e);
              console.log(sql);
              reject(e);
          } else {
              resolve(r);
          }
       });
    });
}

export const InsertObjectExcelDAO = async(ListPropertyValues: any[], obj_type_id: Number) => {
    return new Promise(function (resolve, reject) {
        let INSERT_OBJECT       = "INSERT INTO object(OBJ_NAME, OBJ_DESC, OBJ_TYPE_ID) VALUES (?, ?, ?)";
        let INSERT_PRO_VALUE    = "INSERT INTO obj_pro (OBJ_ID, OBJ_TYPE_ID, PRO_ID, PRO_VALUE) VALUES ?";
        let GET_REQUIRED_PRO    = "SELECT PRO_ID FROM obj_type_property WHERE OBJ_TYPE_ID = ? AND IS_REQUIRED = 1";

        let {sql} = connection.query(GET_REQUIRED_PRO, [obj_type_id], async function (e1, r1) {
            if (e1) {
                console.log("============== InsertObjectExcelDAO - SQL ==============");
                console.log(sql);
                reject(e1);
            } else {
                let ListProIDRequired: Number[] = [];
                let BindingPropertyValues: any[] = [];
                for (let i of ListPropertyValues) {
                    try {
                        for (let x of r1) {
                            ListProIDRequired.push(x.PRO_ID);
                        }
                        // @ts-ignore
                        let {insertId} = await query(mysql.format(INSERT_OBJECT, [i.obj_name, i.obj_desc, obj_type_id]));
                        i.properties.map(function(item: any) {
                            let index: number = ListProIDRequired.indexOf(item.pro_id);
                            if (index > -1) {
                                ListProIDRequired.splice(index, 1);
                            }
                            BindingPropertyValues.push([insertId, obj_type_id, item.pro_id, item.pro_value]);
                        });
                        for (let j of ListProIDRequired) {
                            BindingPropertyValues.push([insertId, obj_type_id, j, ""]);
                        }
                        await query(mysql.format(INSERT_PRO_VALUE, [BindingPropertyValues]));
                        resolve("Successfully");
                    } catch (e) {
                        reject(e);
                    }
                }
            }
        });
    });
}

export const ExportDataDAO = (obj_type_id: Number) => {
    return new Promise((resolve, reject) => {
        let SQL_QUERY = "SELECT b.*, a.PRO_VALUE, a.PRO_ID FROM object b LEFT JOIN obj_pro a ON a.OBJ_ID = b.OBJ_ID AND b.OBJ_TYPE_ID = a.OBJ_TYPE_ID WHERE b.OBJ_TYPE_ID = ? ORDER BY b.OBJ_ID";
        let {sql} = connection.query(SQL_QUERY, [obj_type_id], function(e, r) {
           if (e) {
               console.log("============== ExportDataDAO - SQL ==============");
               console.log(sql);
               reject(e);
           } else {
               resolve(r);
           }
        });
    })
}