"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multiparty_express_1 = __importDefault(require("multiparty-express"));
const _URL = __importStar(require("./API_URL"));
const BlackListServices_1 = require("./components/BlackList/BlackListServices");
const https = require("https");
const http = require("http");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const app = express();
/*      Variables declare   */
dotenv.config();
const PORT = Number.parseInt(process.env.PORT) || 4000;
const privateKey = fs.readFileSync("./credential/cert.key", 'utf-8');
const publicKey = fs.readFileSync("./credential/cert.pem", 'utf-8');
const credential = { key: privateKey, cert: publicKey, passphrase: 'daumoe' };
const httpsServer = https.createServer(credential, app);
const httpServer = http.createServer(app);
/*      Public folder   */
app.use("/asset", express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'build')));
/*      Pass CORS   */
app.use(cors());
/*      Accept JSON or RAW in request's body    */
app.use(express.json());
app.use(express.raw());
app.use(express.urlencoded());
/*      Middleware to check authentication and authorization    */
function CheckAuthMiddleWare(req, resp, next) {
    next();
}
app.get("/*", function (req, resp) {
    resp.sendFile(path.join(__dirname, "build", "index.html"));
});
/*      API AREA    */
app.post(_URL.BLACKLIST_ADD_IP, CheckAuthMiddleWare, BlackListServices_1.NewBlackList);
app.post(_URL.BLACKLIST_GET_IP, CheckAuthMiddleWare, BlackListServices_1.GetBlackList);
app.post(_URL.BLACKLIST_REMOVE_IP, CheckAuthMiddleWare, BlackListServices_1.RemoveDocs);
app.post(_URL.BLACKLIST_EDIT_IP, CheckAuthMiddleWare, BlackListServices_1.EditDocs);
app.post(_URL.BLACKLIST_SEARCH_IP, CheckAuthMiddleWare, BlackListServices_1.SearchByBlacklistIP);
app.post(_URL.BLACKLIST_ADD_EXCEL, (0, multiparty_express_1.default)(), CheckAuthMiddleWare, BlackListServices_1.NewBlackListExcel);
app.post(_URL.BLACKLIST_UPDATE_EXCEL, (0, multiparty_express_1.default)(), CheckAuthMiddleWare, BlackListServices_1.UpdateBlackListExcel);
app.post(_URL.BLACKLIST_DELETE_EXCEL, (0, multiparty_express_1.default)(), CheckAuthMiddleWare, BlackListServices_1.DeleteBlackListExcel);
app.post(_URL.BLACKLIST_EXPORT_EXCEL, CheckAuthMiddleWare, BlackListServices_1.ExportAllBlackListData2Excel);
/*      Start server       */
// httpsServer.listen(PORT, function(): void {
//    console.log('[SUCCESS] API Server is available at URI: \'https://<your device\'s IP>:' + PORT + '\'');
// });
httpServer.listen(PORT, function () {
    console.log('[SUCCESS] API Server is available at URI: \'https://<your device\'s IP>:' + PORT + '\'');
});
