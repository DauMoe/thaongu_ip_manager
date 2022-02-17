import {connection} from "../Utils/Common";

export const GetPropertyDAO = async(obj_type_id: Number) => {
    return new Promise(function (resolve, reject) {
        let SQL_QUERY: string, BindingValues: Number[] = [];
        if (obj_type_id === -1) {
            SQL_QUERY = "SELECT * FROM property";
            BindingValues = [];
        } else {
            SQL_QUERY = "SELECT b.* FROM obj_type_property a, property b WHERE a.PRO_ID = b.PRO_ID AND a.OBJ_TYPE_ID = ?";
            BindingValues = [obj_type_id];
        }
        let {sql} = connection.query(SQL_QUERY, BindingValues, function (err, result, fields) {
            if (err) {
                reject(err);
                console.log("============== GetPropertyDAO - SQL =============");
                console.log(sql);
            } else {
                resolve(result);
            }
        });
    });
}

export const GetPropertyInfoDAO = async(pro_id: Number) => {
    return new Promise(function (resolve, reject) {
        let SQL_QUERY = "SELECT a.IS_REQUIRED, b.* FROM obj_type_property a, object_type b WHERE a.PRO_ID = ? AND a.OBJ_TYPE_ID = b.OBJ_TYPE_ID";
        let {sql} = connection.query(SQL_QUERY, [pro_id], function (err, result, fields) {
            if (err) {
                reject(err);
                console.log("============== GetPropertyInfoDAO - SQL =============");
                console.log(sql);
            } else {
                resolve(result);
            }
        });
    });
}

export const UpdatePropertyDAO = async(pro_id: Number, pro_name: string, pro_desc: string, rule_id: Number, list_obj_type: any[]) => {
    //================= Delete when not have any value in obj_pro table ==================
    return new Promise(function (resolve, reject) {
        let ListObjTypeID: Number[] = [];
        for (let i of list_obj_type) {
            ListObjTypeID.push(i.obj_type_id);
        }
        let SQL_QUERY = "SELECT b.OBJ_NAME FROM obj_pro a, object b WHERE a.PRO_ID = ? AND a.OBJ_TYPE_ID NOT IN ? AND a.OBJ_ID = b.OBJ_ID\n";
        let {sql} = connection.query(SQL_QUERY, [pro_id, [ListObjTypeID.length > 0 ? ListObjTypeID : [null]]], function(err1, result1) {
            if (err1) {
                console.log("============== UpdatePropertyDAO - SQL =============");
                console.log(sql);
                reject(err1);
            } else {
                if (result1.length > 0) {
                    let msg = "";
                    result1.map(function(item: any, index: number) {
                        msg += `'${item.OBJ_NAME}'`;
                        if (index < result1.length - 1) {
                            msg += ", ";
                        }
                    });
                    reject(new Error(`Can not remove object type because ${pro_name} property existed in ${msg}`));
                } else {
                    let DELETE_NOT_EXIST    = (ListObjTypeID.length > 0) ? "DELETE FROM obj_type_property WHERE PRO_ID = ? AND OBJ_TYPE_ID NOT IN ?" : "DELETE FROM obj_type_property WHERE PRO_ID = ?";
                    let SQL_QUERY_1         = "INSERT INTO obj_type_property (OBJ_TYPE_ID, PRO_ID, IS_REQUIRED) VALUES ? ON DUPLICATE KEY UPDATE OBJ_TYPE_ID = VALUES(OBJ_TYPE_ID), PRO_ID = VALUES(PRO_ID), IS_REQUIRED = VALUES(IS_REQUIRED)";
                    let UPDATE_PROPERTY     = "UPDATE property SET PRO_NAME = ?, PRO_DESC = ?, RULE_ID = ? WHERE PRO_ID = ?";
                    let ListBindingValues: any[] = [];
                    for (let i of list_obj_type) {
                        ListBindingValues.push([i.obj_type_id, pro_id, +i.is_required]);
                    }

                    let p1 = connection.query(DELETE_NOT_EXIST, [pro_id, [ListObjTypeID.length > 0 ? ListObjTypeID : undefined]]);
                    let p2 = connection.query(SQL_QUERY_1, [ListBindingValues]);
                    let p3 = connection.query(UPDATE_PROPERTY, [pro_name, pro_desc, rule_id, pro_id]);

                    Promise.all([p1, p2, p3])
                        .then(response => {
                            // console.log(p1.sql);
                            // console.log(p2.sql);
                            // console.log(p3.sql);
                            resolve(response);
                        })
                        .catch(e => {
                            console.log("============== UpdatePropertyDAO - SQL =============");
                            console.log(e);
                            reject(e)
                        });
                }
            }
        })
    });

    //================= Auto delete if detect change object type =================
    // return new Promise(function (resolve, reject) {
    //     let DELETE_NOT_EXIST    = "DELETE FROM obj_type_property WHERE PRO_ID = ? AND OBJ_TYPE_ID NOT IN ?";
    //     let SQL_QUERY_1         = "INSERT INTO obj_type_property (OBJ_TYPE_ID, PRO_ID, IS_REQUIRED) VALUES ? ON DUPLICATE KEY UPDATE OBJ_TYPE_ID = VALUES(OBJ_TYPE_ID), PRO_ID = VALUES(PRO_ID), IS_REQUIRED = VALUES(IS_REQUIRED)";
    //     let UPDATE_PROPERTY     = "UPDATE property SET PRO_NAME = ?, PRO_DESC = ?, RULE_ID = ? WHERE PRO_ID = ?";
    //     let DELETE_PRO_VALUE    = "DELETE FROM obj_pro WHERE PRO_ID = ? AND OBJ_TYPE_ID NOT IN (SELECT DISTINCT OBJ_TYPE_ID FROM obj_type_property WHERE PRO_ID = ?)";
    //     connection(function (err, connection) {
    //         connection.release();
    //         if (err) reject(err);
    //         let ExistedObjTypeID    : any[] = [];
    //         let ListBindingValues   : any[] = [];
    //         for (let i of list_obj_type) {
    //             ExistedObjTypeID.push(i.obj_type_id);
    //             ListBindingValues.push([i.obj_type_id, pro_id, +i.is_required]);
    //         }
    //         let p1 = connection.query(DELETE_NOT_EXIST, [pro_id, [ExistedObjTypeID]]);
    //         let p2 = connection.query(SQL_QUERY_1, [ListBindingValues]);
    //         let p3 = connection.query(UPDATE_PROPERTY, [pro_name, pro_desc, rule_id, pro_id]);
    //         let p4 = connection.query(DELETE_PRO_VALUE, [pro_id, pro_id]);
    //
    //         Promise.all([p1, p2, p3, p4])
    //             .then(response => {
    //                 resolve(response);
    //             })
    //             .catch(e => {
    //                 console.log("============== UpdatePropertyDAO - SQL =============");
    //                 reject(e)
    //             });
    //     });
    // });
}

export const DeletePropertyDAO = async(pro_id: Number) => {
    return new Promise(function (resolve, reject) {
        let DELETE_PROPERTY = "DELETE FROM property WHERE PRO_ID = ?";
        let DELETE_OBJ_TYPE_PRO = "DELETE FROM obj_type_property WHERE PRO_ID = ?"
        let p1 = connection.query(DELETE_PROPERTY, [pro_id]);
        let p2 = connection.query(DELETE_OBJ_TYPE_PRO, [pro_id]);
        Promise.all([p1, p2])
            .then(response => {
                resolve(response);
            })
            .catch(e => {
                console.log("============== DeletePropertyDAO - SQL =============");
                reject(e)
            });
    });
}

export const GetListPropertyByObjIDDAO = async (obj_id: Number) => {
    return new Promise(function (resolve, reject) {
        let SELECT_ALL = "SELECT a.*, b.* FROM obj_type_property a, property b WHERE a.OBJ_TYPE_ID = (SELECT OBJ_TYPE_ID FROM object WHERE OBJ_ID = ?) AND a.PRO_ID = b.PRO_ID";
        let sql1 = "SELECT a.*, b.PRO_NAME, c.IS_REQUIRED FROM obj_pro a LEFT JOIN property b ON a.PRO_ID = b.PRO_ID LEFT JOIN obj_type_property c ON a.OBJ_TYPE_ID = c.OBJ_TYPE_ID AND c.PRO_ID = a.PRO_ID WHERE a.OBJ_ID = ?";
        connection.query(SELECT_ALL, [obj_id], function (err1, results1) {
            if (err1) {
                console.log("SQL"  + SELECT_ALL);
                reject(err1);
            }
            let {sql} = connection.query(sql1, [obj_id], function (err2, results2) {
                // console.log(sql);
                if (err2) {
                    console.log("SQL"  + sql1);
                    reject(err2);
                }
                resolve({
                    list_property: results1,
                    list_property_assign: results2
                });
            });
        });
    });
}

export const AddProperty2ObjectDAO = async(obj_id: Number, obj_type_id: Number, list_pro: Number[]) => {
    return new Promise(function (resolve, reject) {
        let SQL_QUERY = "SELECT a.PRO_VALUE, b.PRO_NAME FROM obj_pro a, property b WHERE a.OBJ_ID = ? AND a.PRO_ID NOT IN ? AND a.PRO_ID = b.PRO_ID";
        let UpdatedProID: Number[][] = [];
        let InsertArr: Number[][] = [];
        for (let i of list_pro) {
            UpdatedProID.push([i]);
            InsertArr.push([i, obj_id, obj_type_id]);
        }
        let {sql} = connection.query(SQL_QUERY, [obj_id, [UpdatedProID.length > 0 ? UpdatedProID : [null]]], async function (err1, result1) {
            if (err1) {
                console.log("==================== AddProperty2ObjectDAO - SQL: =======================")
                console.log(sql);
                reject(err1);
            } else {
                let ValueExisted = false;
                let msg = "";
                for (let i of result1) {
                    if (i.PRO_VALUE.trim() != "") {
                        ValueExisted = true;
                        msg += `'${i.PRO_NAME}', `;
                    }
                }
                msg = msg.substring(0, msg.length - 2);
                if (ValueExisted) {
                    reject(new Error(`Can not remove because ${msg} (has) have non empty value!`));
                } else {
                    SQL_QUERY = "DELETE FROM obj_pro WHERE PRO_ID NOT IN ? AND OBJ_ID = ?";
                    let INSERT_NEW = "INSERT INTO obj_pro (PRO_ID, OBJ_ID, OBJ_TYPE_ID) VALUES ? ON DUPLICATE KEY UPDATE PRO_ID = VALUES(PRO_ID), OBJ_ID = VALUES(OBJ_ID)";
                    if (list_pro.length > 0) {
                        let {sql} = connection.query(SQL_QUERY, [[list_pro.length > 0 ? list_pro : [null]], obj_id], function (e1, r1) {
                            if (e1) {
                                console.log("==================== AddProperty2ObjectDAO - SQL: =======================")
                                console.log(sql);
                                reject(e1);
                            } else {
                                let {sql} = connection.query(INSERT_NEW, [InsertArr.length > 0 ? InsertArr : [null]], function (e2, r2) {
                                    if (e2) {
                                        console.log("==================== AddProperty2ObjectDAO - SQL: =======================")
                                        console.log(sql);
                                        reject(new Error("Some property id not exist. Please check again!"));
                                    } else {
                                        resolve("ok");
                                    }
                                });
                            }
                        });
                    } else {
                        let {sql} = connection.query("DELETE FROM obj_pro WHERE OBJ_ID = ?", [obj_id], function (e1, r1) {
                            if (e1) {
                                console.log("==================== AddProperty2ObjectDAO - SQL: =======================")
                                console.log(sql);
                                reject(e1);
                            } else {
                                resolve(r1);
                            }
                        });
                    }
                }
            }
        });
    });
}