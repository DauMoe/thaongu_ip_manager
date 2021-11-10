import dotenv from "dotenv";

dotenv.config({
    path: __dirname + "/../.env"
});

export const RequiredVLANProperties : any       = ['vlan', 'port', 'public_ip', 'local_ip', 'used_services', 'system_manager', 'description', 'waf_status'];
export const _TIMEOUT2DELETE        : number    = 1000 * 60 * 10; //10 minutes
export const MONGO_DB_USER          : string    = process.env.MONGO_USER as string              || "";
export const MONGO_DB_PASS          : string    = process.env.MONGO_PASS as string              || "";
export const MONGO_DB_URL           : string    = process.env.MONGO_URL as string               || "localhost:27017/";
export const MONGO_DB_NAME          : string    = process.env.MONGO_DB_NAME as string           || "thao_ip_manager";
export const BL_COLLECTIONS         : string    = process.env.BLACKLIST_COLLECTIONS as string   || 'blacklist';
export const VLAN_COLLECTIONS       : string    = process.env.VLAN_COLLECTIONS as string        || 'VLAN';

let MONGO_DB  : string;

if (MONGO_DB_USER === "" && MONGO_DB_PASS === "") {
    MONGO_DB = `mongodb://${MONGO_DB_URL}`;
} else {
    MONGO_DB = `mongodb://${MONGO_DB_USER}:${MONGO_DB_PASS}@${MONGO_DB_URL}`;
}

export const MONGO_DB_BASEURL = MONGO_DB;