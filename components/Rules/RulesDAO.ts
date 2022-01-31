import {DB_RESPONSE, Rule} from "../Utils/Interfaces";
import {DB_RESP} from "../Utils/API_RESPONSE";
import {DB_POOL} from "../Utils/Common";

export const InsertRule = async(NewRule: Rule) => {
    return new Promise(function (resolve, reject) {
        let SQL_QUERY = "INSERT INTO RULE (RULE_NAME, RULE_DESC, RULE_REGEX) VALUES (?, ?, ?)";
        DB_POOL().getConnection(function (err, connection) {
            connection.release();
            if (err) reject(err);
            let {sql} = connection.query(SQL_QUERY, [NewRule.rule_name, NewRule.rule_desc, NewRule.rule_desc], function (err, result, fields) {
                if (err) {
                    reject(err);
                    console.log(sql);
                } else {
                    resolve("Thành công");
                }
            });
        });
    });
}