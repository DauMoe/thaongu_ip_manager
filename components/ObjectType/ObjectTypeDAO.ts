import {connection} from "../Utils/Common";

export const GetObjectTypeDAO = async() => {
    return new Promise(function (resolve, reject) {
        let SQL_QUERY = "SELECT * FROM object_type";
        let {sql} = connection.query(SQL_QUERY, [], function (err, result, fields) {
            if (err) {
                reject(err);
                console.log("============== GetObjectTypeDAO - SQL =============");
                console.log(sql);
            } else {
                resolve(result);
            }
        });
    });
}

export const GetListPropertyByObjectTypeDAO = async(obj_type_id:Number) => {
    return new Promise(function (resolve, reject) {
        let SQL_QUERY = "SELECT b.* FROM obj_type_property a, property b WHERE a.OBJ_TYPE_ID = ? AND a.PRO_ID = b.PRO_ID";
        let {sql} = connection.query(SQL_QUERY, [obj_type_id], function (err, result, fields) {
            if (err) {
                reject(err);
                console.log("============== GetListPropertyByObjectTypeDAO - SQL =============");
                console.log(sql);
            } else {
                resolve(result);
            }
        });
    });
}