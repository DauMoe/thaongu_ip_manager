import {connect, model} from "mongoose";
import {MONGO_DB_BASEURL, MONGO_DB_NAME, RULE_COLLECTIONS} from "../Definition";
import {Rule} from "../Utils/Global_Interface";
import {RulesSchema} from "../Utils/Global_Schema";

export const NewRule = async (desc: string, regex: string): Promise<any> => {
    await connect(MONGO_DB_BASEURL + MONGO_DB_NAME);
    const Rule_Model = model<Rule>(RULE_COLLECTIONS, RulesSchema);
    return new Rule_Model({
        desc: desc,
        regex: regex
    }).save();
}