import express from "express";
import {ADD_NEW_IP, ADD_PROPERTIES, GET_PRO_BY_ID, VLAN_GET_IP} from "../API_URL";
import {CheckAuthMiddleWare} from "../authentication";
import {AddProperties, GetListVLANIPs, GetProByID, NewIP} from "./VLAN_Services";

const VLAN_Router = express.Router();

VLAN_Router.post(ADD_PROPERTIES, CheckAuthMiddleWare, AddProperties);
VLAN_Router.post(ADD_NEW_IP, CheckAuthMiddleWare, NewIP);
VLAN_Router.post(GET_PRO_BY_ID, CheckAuthMiddleWare, GetProByID);
VLAN_Router.post(VLAN_GET_IP, CheckAuthMiddleWare, GetListVLANIPs);

export default VLAN_Router;