import { connection, query } from "../Utils/Common";
import mysql from "mysql";

export const CreateUserDAO = (email: string, username: string, fullname: string, password: string, gender: string, phone: string, dob: string, is_admin: Number) => {
    return new Promise(function (resolve, reject) {
        let SQL_QUERY = "INSERT INTO USER (EMAIL, USERNAME, FULLNAME, PASSWORD, DOB, GENDER, PHONE, IS_ADMIN) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        let {sql} = connection.query(SQL_QUERY, [email, username, fullname, password, dob, gender, phone, is_admin], function (err, result, fields) {
            if (err) {
                reject(err);
                console.log("============== CreateUserDAO - UserDAO.ts - SQL =============");
                console.log(sql);
            } else {
                resolve(result);
            }
        });
    });
}

export const LoginDAO = async (email: string, pass: string) => {
    return new Promise(function (resolve, reject) {
        let SQL_QUERY = "SELECT UID, EMAIL, PASSWORD FROM USER WHERE EMAIL = ?";
        let {sql} = connection.query(SQL_QUERY, [email, pass], function (err, result, fields) {
            if (err) {
                reject(err);
                console.log("============== LoginDAO - UserDAO.ts - SQL =============");
                console.log(sql);
            } else {
                resolve(result);
            }
        });
    });
}

export const InsertSessionDAO = async (token: string, uid: number) => {
    return new Promise(function (resolve, reject) {
        let SQL_QUERY = "INSERT INTO SESSION (SESSION_TOKEN, UID) VALUES (?, ?)";
        let {sql} = connection.query(SQL_QUERY, [token, uid], function (err, result, fields) {
            if (err) {
                reject(err);
                console.log("============== InsertSessionDAO - UserDAO.ts - SQL =============");
                console.log(sql);
            } else {
                resolve(result);
            }
        });
    });
}

export const DeleteSessionDAO = async (token: string) => {
    return new Promise(function (resolve, reject) {
        let SQL_QUERY = "DELETE FROM SESSION WHERE SESSION_TOKEN = ?";
        let {sql} = connection.query(SQL_QUERY, [token], function (err, result, fields) {
            if (err) {
                reject(err);
                console.log("============== DeleteSessionDAO - UserDAO.ts - SQL =============");
                console.log(sql);
            } else {
                resolve(result);
            }
        });
    });
}