import express from "express";
import {ADD_PROPERTIES} from "../API_URL";
import {CheckAuthMiddleWare} from "../authentication";
import {AddProperties, GetProByID, NewIP} from "./VLAN_Services";

const VLAN_Router = express.Router();

const ADD_NEW_IP = "/new_vlan_ip";
const GET_PRO_BY_ID = "/get_pro_by_id";

VLAN_Router.post(ADD_PROPERTIES, CheckAuthMiddleWare, AddProperties);
VLAN_Router.post(ADD_NEW_IP, CheckAuthMiddleWare, NewIP);
VLAN_Router.post(GET_PRO_BY_ID, CheckAuthMiddleWare, GetProByID);

export default VLAN_Router;