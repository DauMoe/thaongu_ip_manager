//MongoDB: https://www.w3schools.com/nodejs/nodejs_mongodb.asp

const mongoDB = require("mongodb").MongoClient;
const DB_URL = "mongodb://localhost:21017/thao_ip_manager/";

let init: Function =  () => {
    mongoDB.connect(DB_URL, function (err: any, db: any) {
        if (err) {
            console.log("Have an error when connect to Database. Trying to reconnect...");
            init();
            return;
        }
        var blDB = db.db('blacklist');
    });
}

init();
