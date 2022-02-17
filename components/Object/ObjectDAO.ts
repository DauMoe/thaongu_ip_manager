import {connection} from "../Utils/Common";

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