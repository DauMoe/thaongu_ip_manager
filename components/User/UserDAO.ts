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
        let SQL_QUERY = "SELECT UID, EMAIL, PASSWORD, IS_ADMIN, USERNAME, FULLNAME FROM USER WHERE EMAIL = ?";
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

export const DeleteSessionDAO = (token: string) => {
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

export const GetListUserDAO = (is_admin: Boolean, uid: Number) => {
    return new Promise(function (resolve, reject) {
        let SQL_QUERY: string, BindingValues: Number[];
        if (is_admin) {
            SQL_QUERY = "SELECT * FROM USER";
            BindingValues = [];
        } else {
            SQL_QUERY = "SELECT * FROM USER WHERE UID = ?";
            BindingValues = [uid];
        }
        let {sql} = connection.query(SQL_QUERY, BindingValues, function (err, result, fields) {
            if (err) {
                reject(err);
                console.log("============== GetListUserDAO - UserDAO.ts - SQL =============");
                console.log(sql);
            } else {
                resolve(result);
            }
        });
    });
}

export const GetUserInfoDAO = (uid: Number) => {
    return new Promise(function (resolve, reject) {
        let SQL_QUERY = "SELECT * FROM USER WHERE UID = ?";
        let {sql} = connection.query(SQL_QUERY, [uid], function (err, result, fields) {
            if (err) {
                reject(err);
                console.log("============== GetUserInfoDAO - UserDAO.ts - SQL =============");
                console.log(sql);
            } else {
                resolve(result);
            }
        });
    });
}

export const UpdateUserInfoDAO = (uid: Number, username: string, fullname: string, dob: string, gender: Number, phone: string, is_admin: Number, request_by_admin: Boolean) => {
    return new Promise(function (resolve, reject) {
        let SQL_QUERY: string, BindingValues: any[];
        if (request_by_admin) {
            SQL_QUERY = "UPDATE USER SET USERNAME = ?, FULLNAME = ?, DOB = ?, GENDER = ?, PHONE = ?, IS_ADMIN = ? WHERE UID = ?";
            BindingValues = [username, fullname, dob, gender, phone, is_admin, uid];
        } else {
            SQL_QUERY = "UPDATE USER SET USERNAME = ?, FULLNAME = ?, DOB = ?, GENDER = ?, PHONE = ? WHERE UID = ?";
            BindingValues = [username, fullname, dob, gender, phone, uid];
        }
        let {sql} = connection.query(SQL_QUERY, BindingValues, function (err, result, fields) {
            if (err) {
                reject(err);
                console.log("============== UpdateUserInfoDAO - UserDAO.ts - SQL =============");
                console.log(sql);
            } else {
                resolve(result);
            }
        });
    });
}

export const DeleteUserDAO = (uid: Number) => {
    return new Promise(function (resolve, reject) {
        let SQL_QUERY: string = "DELETE FROM USER WHERE UID = ?";
        let {sql} = connection.query(SQL_QUERY, [uid], function (err, result, fields) {
            if (err) {
                reject(err);
                console.log("============== DeleteUserDAO - UserDAO.ts - SQL =============");
                console.log(sql);
            } else {
                resolve(result);
            }
        });
    });
}