import {DB_POOL} from "../Utils/Common";

export const GetObjectTypeDAO = async() => {
    return new Promise(function (resolve, reject) {
        let SQL_QUERY = "SELECT * FROM object_type";
        DB_POOL().getConnection(function (err, connection) {
            connection.release();
            if (err) reject(err);
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
    });
}