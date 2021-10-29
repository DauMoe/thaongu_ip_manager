//MongoDB: https://www.w3schools.com/nodejs/nodejs_mongodb.asp

const mongoDB = require("mongodb").MongoClient;
const DB_URL = "mongodb://localhost:21017/thao_ip_manager/";

mongoDB.connect(DB_URL, function (err: any, db: any) {
    if (err) throw err;
    var blDB = db.db('blacklist');
});
