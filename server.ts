import {Application, Request, Response} from "express";
import BL_Router from "./components/BlackList/BlackListRouter";
import VLAN_Router from "./components/VLAN/VLAN_Router";
import LogConfig from "./components/LogConfig";
import Rules_Router from "./components/Rules/RulesRouter";

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
app.use("/blacklist", BL_Router);
app.use("/vlan", VLAN_Router);
app.use("/rules", Rules_Router);

httpServer.listen(PORT, function(): void {
    LogConfig.info('Server is running at: "http://<your device\'s IP>:' + PORT + '"');
});


type ModuleId = string | number;

interface WebpackHotModule {
    hot?: {
        data: any;
        accept(
            dependencies: string[],
            callback?: (updatedDependencies: ModuleId[]) => void,
        ): void;
        accept(dependency: string, callback?: () => void): void;
        accept(errHandler?: (err: Error) => void): void;
        dispose(callback: (data: any) => void): void;
    };
}

declare const module: WebpackHotModule;

if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => httpServer.close());
}

