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
var multiparty_express_1 = __importDefault(require("multiparty-express"));
var _URL = __importStar(require("./API_URL"));
var BlackListServices_1 = require("./components/BlackList/BlackListServices");
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
/*      BLACKLIST API    */
app.post(_URL.BLACKLIST_ADD_IP, CheckAuthMiddleWare, BlackListServices_1.NewBlackList);
app.post(_URL.BLACKLIST_GET_IP, CheckAuthMiddleWare, BlackListServices_1.GetBlackList);
app.post(_URL.BLACKLIST_REMOVE_IP, CheckAuthMiddleWare, BlackListServices_1.RemoveDocs);
app.post(_URL.BLACKLIST_EDIT_IP, CheckAuthMiddleWare, BlackListServices_1.EditDocs);
app.post(_URL.BLACKLIST_SEARCH_IP, CheckAuthMiddleWare, BlackListServices_1.SearchByBlacklistIP);
app.post(_URL.BLACKLIST_EXPORT_EXCEL, CheckAuthMiddleWare, BlackListServices_1.ExportAllBlackListData2Excel);
app.post(_URL.BLACKLIST_IMPORTED_IP_TODAY_EXCEL, CheckAuthMiddleWare, BlackListServices_1.ExportNewBlackListToday);
app.post(_URL.BLACKLIST_ADD_EXCEL, (0, multiparty_express_1.default)(), CheckAuthMiddleWare, BlackListServices_1.NewBlackListExcel);
app.post(_URL.BLACKLIST_UPDATE_EXCEL, (0, multiparty_express_1.default)(), CheckAuthMiddleWare, BlackListServices_1.UpdateBlackListExcel);
app.post(_URL.BLACKLIST_DELETE_EXCEL, (0, multiparty_express_1.default)(), CheckAuthMiddleWare, BlackListServices_1.DeleteBlackListExcel);
// app.post("/test", ExportNewBlackListToday);
/*      Start server       */
// httpsServer.listen(PORT, function(): void {
//    console.log('[SUCCESS] API Server is available at URI: \'https://<your device\'s IP>:' + PORT + '\'');
// });
httpServer.listen(PORT, function () {
    console.log('[SUCCESS] API Server is available at URI: \'https://<your device\'s IP>:' + PORT + '\'');
});
if (module.hot) {
    module.hot.accept();
    module.hot.dispose(function () { return httpServer.close(); });
}
