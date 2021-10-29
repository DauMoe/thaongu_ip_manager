import {MysqlError} from "mysql";

export const DB_PROMISE: Function = (err: MysqlError | null, result: any): Promise<any> => {
    return new Promise((resolve, reject) => {
        if (err) {
            reject(err);
        } else {
            resolve(result);
        }
    });
}
