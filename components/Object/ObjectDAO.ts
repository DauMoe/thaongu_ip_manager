import {DB_POOL} from "../Utils/Common";

//Update multiple rows in mysql: https://stackoverflow.com/questions/3432/multiple-updates-in-mysql
//Insert multiple rows in mysql: https://stackoverflow.com/questions/8899802/how-do-i-do-a-bulk-insert-in-mysql-using-node-js

export const GetObjectDAO = async(obj_type_id: Number) => {
    return new Promise(function (resolve, reject) {
        let SQL_QUERY = "SELECT * FROM object WHERE OBJ_TYPE_ID = ?";
        DB_POOL().getConnection(function (err, connection) {
            connection.release();
            if (err) reject(err);
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
    });
}

export const GetObjectInfoDAO = async(obj_id: Number) => {
    return new Promise(function (resolve, reject) {
        let SQL_QUERY = "SELECT a.*, b.*, c.PRO_VALUE, c.CREATED_AT, c.UPDATED_AT, d.RULE_REGEX FROM object a, property b, obj_pro c, rule d WHERE a.OBJ_ID = ? AND b.PRO_ID = c.PRO_ID AND a.OBJ_ID = c.OBJ_ID AND b.RULE_ID = d.RULE_ID";
        DB_POOL().getConnection(function (err, connection) {
            connection.release();
            if (err) reject(err);
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
    });
}

export const AddObjectPropertyDAO = async(obj_id: Number, pro_id: Number, pro_value: string) => {
    return new Promise(function (resolve, reject) {
        let SQL_QUERY = "SELECT insert_property_obj(?, ?, ?) AS A";
        DB_POOL().getConnection(function (err, connection) {
            connection.release();
            if (err) reject(err);
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
    });
}

export const UpdatePropertyValueDAO = async(list_property: any[]) => {
    return new Promise(function (resolve, reject) {
        let SQL_QUERY = "INSERT INTO obj_pro (OBJ_ID, PRO_ID, PRO_VALUE) VALUES ? ON DUPLICATE KEY UPDATE PRO_VALUE = VALUES(PRO_VALUE)";
        DB_POOL().getConnection(function (err, connection) {
            connection.release();
            if (err) reject(err);
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
    });
}
