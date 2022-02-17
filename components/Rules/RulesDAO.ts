import {DB_RESPONSE, Rule} from "../Utils/Interfaces";
import {DB_RESP} from "../Utils/API_RESPONSE";
import {connection} from "../Utils/Common";

export const GetListRuleDAO = async() => {
    return new Promise(function (resolve, reject) {
        let SQL_QUERY = "SELECT * FROM RULE";
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
}

export const InsertRule = async(NewRule: Rule) => {
    return new Promise(function (resolve, reject) {
        let SQL_QUERY = "INSERT INTO RULE (RULE_NAME, RULE_DESC, RULE_REGEX) VALUES (?, ?, ?)";
        let {sql} = connection.query(SQL_QUERY, [NewRule.RULE_NAME, NewRule.RULE_DESC, NewRule.RULE_REGEX], function (err, result, fields) {
            if (err) {
                reject(err);
                console.log("============== InsertRule - SQL =============");
                console.log(sql);
            } else {
                resolve("Thành công");
            }
        });
    });
}

export const UpdateRuleDAO = async(NewRule: Rule) => {
    return new Promise(function (resolve, reject) {
        let SQL_QUERY = "UPDATE RULE SET RULE_NAME = ?, RULE_DESC = ?, RULE_REGEX = ? WHERE RULE_ID = ?";
        let {sql} = connection.query(SQL_QUERY, [NewRule.RULE_NAME, NewRule.RULE_DESC, NewRule.RULE_REGEX, NewRule.RULE_ID], function (err, result, fields) {
            if (err) {
                reject(err);
                console.log("============== UpdateRuleDAO - SQL =============");
                console.log(sql);
            } else {
                resolve("Thành công");
            }
        });
    });
}

export const DeleteRuleDAO = async(NewRule: Rule) => {
    return new Promise(function (resolve, reject) {
        let SQL_QUERY = "DELETE FROM RULE WHERE RULE_ID = ?";
        let {sql} = connection.query(SQL_QUERY, [NewRule.RULE_ID], function (err, result, fields) {
            if (err) {
                reject(err);
                console.log("============== DeleteRuleDAO - SQL =============");
                console.log(sql);
            } else {
                resolve("Thành công");
            }
        });
    });
}