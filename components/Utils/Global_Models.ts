import { BlackListSchema } from './Global_Schema';
import {model} from "mongoose";
import { BlackList } from "./Global_Interface";
import dotenv from "dotenv";

dotenv.config({
    path: __dirname + "/../../.env"
});

const _BL_MODEL = process.env.BLACKLIST_MODEL || 'blkaclist';

export const BlackListModel = model<BlackList>(_BL_MODEL, BlackListSchema);