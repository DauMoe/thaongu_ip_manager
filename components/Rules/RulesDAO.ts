import {DB_RESPONSE, Rule} from "../Utils/Interfaces";
import {DB_RESP} from "../Utils/API_RESPONSE";
import {connection, query} from "../Utils/Common";
import mysql from "mysql";

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

export const DeleteRuleDAO = async(rule_id: Number) => {
    return new Promise(async (resolve, reject) => {
        let SQL_QUERY: string = "SELECT * FROM property WHERE RULE_ID = ?";
        try {
            // @ts-ignore
            let result: any[] = await query(mysql.format(SQL_QUERY, [rule_id]));
            if (result.length > 0) {
                let errMsg = "";
                errMsg = "CAN NOT delete because ";
                for (let i of result) {
                    console.log(i.PRO_NAME);
                    errMsg += `'${i.PRO_NAME}', `;
                }
                errMsg = errMsg.substring(0, errMsg.length - 2);
                errMsg += " contain this rule";
                resolve(errMsg);
            } else {
                SQL_QUERY = "DELETE FROM rule WHERE RULE_ID = ?";
                await query(mysql.format(SQL_QUERY, [rule_id]));
                resolve(true);
            }
        } catch (e) {
            reject(e);
        }
    });
}

export const SearchByRuleNameDAO = (rule_name: string) => {
    return new Promise((resolve, reject) => {
        let SQL_QUERY = "SELECT * FROM rule WHERE RULE_NAME LIKE ?";
        let {sql}  = connection.query(SQL_QUERY, [`%${rule_name}%`], function(e, r) {
            if (e) {
                console.log("============== SearchByRuleNameDAO - SQL ==============");
                console.log(sql);
                reject(e);
            } else {
                resolve(r);
            }
        });
    });
}