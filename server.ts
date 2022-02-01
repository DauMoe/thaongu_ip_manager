import {Application, Request, Response} from "express";
import LogConfig from "./components/LogConfig";
import Rules_Router from "./components/Rules/RulesRouter";
import ObjectTypeRouter from "./components/ObjectType/ObjectTypeRouter";

const https                 = require("https");
const http                  = require("http");
const fs                    = require("fs");
const express               = require("express");
const cors                  = require("cors");
const dotenv                = require("dotenv");
const path                  = require("path");
const app: Application      = express();

/*      Variables declare   */
dotenv.config();
const PORT: number          = Number.parseInt(process.env.PORT as string) || 4000;
const privateKey: string    = fs.readFileSync("./credential/cert.key", 'utf-8');
const publicKey: string     = fs.readFileSync("./credential/cert.pem", 'utf-8');
const credential            = {key: privateKey, cert: publicKey, passphrase: 'daumoe'};
const httpsServer           = https.createServer(credential, app);
const httpServer            = http.createServer(app);

/*      Public folder   */
app.use("/asset", express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'build')));

/*      Pass CORS   */
app.use(cors());

/*      Accept JSON or RAW in request's body    */
app.use(express.json());
// app.use(express.raw());
app.use(express.urlencoded());

app.get("/*", function (req: Request, resp: Response) {
    resp.sendFile(path.join(__dirname, "build", "index.html"));
});

/* API */
app.use("/rules", Rules_Router);
app.use("/obj_type", ObjectTypeRouter);

httpServer.listen(PORT, function(): void {
    LogConfig.info('Server is running at: "http://<your device\'s IP>:' + PORT + '"');
});