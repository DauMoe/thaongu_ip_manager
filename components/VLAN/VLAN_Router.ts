import express from "express";
import {ADD_ELEMENT} from "../../API_URL";
import {CheckAuthMiddleWare} from "../authentication";
import {AddElement} from "./VLAN_Services";

const VLAN_Router = express.Router();

VLAN_Router.post(ADD_ELEMENT, CheckAuthMiddleWare, AddElement);

export default VLAN_Router;