import {DB_POOL} from "../Utils/Common";

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