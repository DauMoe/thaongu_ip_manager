"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LogConfig_1 = __importDefault(require("./components/LogConfig"));
var RulesRouter_1 = __importDefault(require("./components/Rules/RulesRouter"));
var ObjectTypeRouter_1 = __importDefault(require("./components/ObjectType/ObjectTypeRouter"));
var ObjectRouter_1 = __importDefault(require("./components/Object/ObjectRouter"));
var PropertyRouter_1 = __importDefault(require("./components/Property/PropertyRouter"));
var https = require("https");
var http = require("http");
var fs = require("fs");
var express = require("express");
var cors = require("cors");
var dotenv = require("dotenv");
var path = require("path");
var app = express();
/*      Variables declare   */
dotenv.config();
var PORT = Number.parseInt(process.env.PORT) || 4000;
var privateKey = fs.readFileSync("./credential/cert.key", 'utf-8');
var publicKey = fs.readFileSync("./credential/cert.pem", 'utf-8');
var credential = { key: privateKey, cert: publicKey, passphrase: 'daumoe' };
var httpsServer = https.createServer(credential, app);
var httpServer = http.createServer(app);
/*      Public folder   */
app.use("/asset", express.static(path.join(__dirname, 'asset')));
app.use(express.static(path.join(__dirname, 'build')));
/*      Pass CORS   */
app.use(cors());
/*      Accept JSON or RAW in request's body    */
app.use(express.json());
// app.use(express.raw());
app.use(express.urlencoded());
app.get("/*", function (req, resp) {
    resp.sendFile(path.join(__dirname, "build", "index.html"));
});
/* API */
app.use("/rules", RulesRouter_1.default);
app.use("/obj_type", ObjectTypeRouter_1.default);
app.use("/obj", ObjectRouter_1.default);
app.use("/pro", PropertyRouter_1.default);
httpServer.listen(PORT, function () {
    LogConfig_1.default.info('Server is running at: "http://<your device\'s IP>:' + PORT + '"');
});
