import {Application, NextFunction, Request, Response} from "express";
import * as _URL from './API_URL';
import {NewBlackList, GetBlackList} from "./components/BlackList/BlackListServices";
// const BL_Services           = require("./components/BlackList/BlackListServices");
const https                 = require("https");
const fs                    = require("fs");
const express               = require("express");
const cors                  = require("cors");
const dotenv                = require("dotenv");
const app: Application      = express();

/*      Variables declare   */
dotenv.config();
const PORT: number          = Number.parseInt(process.env.PORT as string) || 4000;
const privateKey: string    = fs.readFileSync("./credential/cert.key", 'utf-8');
const publicKey: string     = fs.readFileSync("./credential/cert.pem", 'utf-8');
const credential            = {key: privateKey, cert: publicKey, passphrase: 'daumoe'};
const httpsServer           = https.createServer(credential, app);

/*      Pass CORS   */
app.use(cors());

/*      Accept JSON or RAW in request's body    */
app.use(express.json());
app.use(express.raw());

/*      Middleware to check authentication and authorization    */
function CheckAuthMiddleWare(req: Request, resp: Response, next: NextFunction) {
    next();
};

/*      API AREA    */
app.post(_URL.BLACKLIST_ADD_IP, CheckAuthMiddleWare, NewBlackList);
app.post(_URL.BLACKLIST_GET_IP, CheckAuthMiddleWare, GetBlackList);

/*      Start server       */
httpsServer.listen(PORT, function(): void {
   console.log('[SUCCESS] API Server is available at URI: \'https://<your device\'s IP>:' + PORT + '\'');
});

