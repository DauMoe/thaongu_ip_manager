import {DB_RESPONSE, Rule} from "../Utils/Interfaces";
import {DB_RESP} from "../Utils/API_RESPONSE";
import {DB_POOL} from "../Utils/Common";

export const GetListRuleDAO = async() => {
    return new Promise(function (resolve, reject) {
        let SQL_QUERY = "SELECT * FROM RULE";
        DB_POOL().getConnection(function (err, connection) {
            connection.release();
            if (err) reject(err);
            let {sql} = connection.query(SQL_QUERY, [], function (err, result, fields) {
                if (err) {
                    reject(err);
                    console.log("============== SQL =============");
                    console.log(sql);
                } else {
                    resolve(result);
                }
            });
        });
    });
}

export const InsertRule = async(NewRule: Rule) => {
    return new Promise(function (resolve, reject) {
        let SQL_QUERY = "INSERT INTO RULE (RULE_NAME, RULE_DESC, RULE_REGEX) VALUES (?, ?, ?)";
        DB_POOL().getConnection(function (err, connection) {
            connection.release();
            if (err) reject(err);
            let {sql} = connection.query(SQL_QUERY, [NewRule.RULE_NAME, NewRule.RULE_DESC, NewRule.RULE_REGEX], function (err, result, fields) {
                if (err) {
                    reject(err);
                    console.log("============== SQL =============");
                    console.log(sql);
                } else {
                    resolve("Thành công");
                }
            });
        });
    });
}

export const UpdateRuleDAO = async(NewRule: Rule) => {
    return new Promise(function (resolve, reject) {
        let SQL_QUERY = "UPDATE RULE SET RULE_NAME = ?, RULE_DESC = ?, RULE_REGEX = ? WHERE RULE_ID = ?";
        DB_POOL().getConnection(function (err, connection) {
            connection.release();
            if (err) reject(err);
            let {sql} = connection.query(SQL_QUERY, [NewRule.RULE_NAME, NewRule.RULE_DESC, NewRule.RULE_REGEX, NewRule.RULE_ID], function (err, result, fields) {
                if (err) {
                    reject(err);
                    console.log("============== SQL =============");
                    console.log(sql);
                } else {
                    resolve("Thành công");
                }
            });
        });
    });
}

export const DeleteRuleDAO = async(NewRule: Rule) => {
    return new Promise(function (resolve, reject) {
        let SQL_QUERY = "DELETE FROM RULE WHERE RULE_ID = ?";
        DB_POOL().getConnection(function (err, connection) {
            connection.release();
            if (err) reject(err);
            let {sql} = connection.query(SQL_QUERY, [NewRule.RULE_ID], function (err, result, fields) {
                if (err) {
                    reject(err);
                    console.log("============== SQL =============");
                    console.log(sql);
                } else {
                    resolve("Thành công");
                }
            });
        });
    });
}