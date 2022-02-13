import {DB_POOL} from "../Utils/Common";

export const GetPropertyDAO = async() => {
    return new Promise(function (resolve, reject) {
        let SQL_QUERY = "SELECT * FROM property";
        DB_POOL().getConnection(function (err, connection) {
            connection.release();
            if (err) reject(err);
            let {sql} = connection.query(SQL_QUERY, [], function (err, result, fields) {
                if (err) {
                    reject(err);
                    console.log("============== GetPropertyDAO - SQL =============");
                    console.log(sql);
                } else {
                    resolve(result);
                }
            });
        });
    });
}

export const GetPropertyInfoDAO = async(pro_id: Number) => {
    return new Promise(function (resolve, reject) {
        let SQL_QUERY = "SELECT b.* FROM obj_type_property a, object_type b WHERE a.PRO_ID = ? AND a.OBJ_TYPE_ID = b.OBJ_TYPE_ID";
        DB_POOL().getConnection(function (err, connection) {
            connection.release();
            if (err) reject(err);
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
    });
}

export const UpdatePropertyDAO = async(pro_id: Number, pro_name: string, pro_desc: string, rule_id: Number, list_obj_type: any[]) => {
    return new Promise(function (resolve, reject) {
        let DELETE_NOT_EXIST = "DELETE FROM obj_type_property WHERE PRO_ID = ? AND OBJ_TYPE_ID NOT IN ?";
        let SQL_QUERY_1 = "INSERT INTO obj_type_property (OBJ_TYPE_ID, PRO_ID) VALUES ? ON DUPLICATE KEY UPDATE OBJ_TYPE_ID = VALUES(OBJ_TYPE_ID), PRO_ID = VALUES(PRO_ID)";
        let UPDATE_PROPERTY = "UPDATE property SET PRO_NAME = ?, PRO_DESC = ?, RULE_ID = ? WHERE PRO_ID = ?";
        DB_POOL().getConnection(function (err, connection) {
            connection.release();
            if (err) reject(err);
            let ExistedObjTypeID: any[] = [];
            let ListBindingValues: any[] = [];
            for (let i of list_obj_type) {
                ExistedObjTypeID.push(i.obj_type_id);
                ListBindingValues.push([i.obj_type_id, pro_id]);
            }
            let p1 = connection.query(DELETE_NOT_EXIST, [pro_id, [ExistedObjTypeID]]);
            let p2 = connection.query(SQL_QUERY_1, [ListBindingValues]);
            let p3 = connection.query(UPDATE_PROPERTY, [pro_name, pro_desc, rule_id, pro_id]);

            Promise.all([p1, p2, p3])
                .then(response => {
                    resolve(response);
                })
                .catch(e => {
                    console.log("============== UpdatePropertyDAO - SQL =============");
                    reject(e)
                });
        });
    });
}

export const DeletePropertyDAO = async(pro_id: Number) => {
    return new Promise(function (resolve, reject) {
        let DELETE_PROPERTY = "DELETE FROM property WHERE PRO_ID = ?";
        let DELETE_OBJ_TYPE_PRO = "DELETE FROM obj_type_property WHERE PRO_ID = ?"
        DB_POOL().getConnection(function (err, connection) {
            connection.release();
            if (err) reject(err);
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
    });
}