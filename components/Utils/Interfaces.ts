export interface DB_RESPONSE {
    code: Number;
    msg: any;
}

export interface Rule {
    RULE_ID: Number;
    RULE_NAME: string;
    RULE_DESC: string;
    RULE_REGEX: string;
    CREATED_AT: string;
    UPDATED_AT: string;
}

export interface ObjectType {
    OBJ_TYPE_ID: Number;
    OBJ_TYPE_NAME: string;
    OBJ_TYPE_DESC: string;
    CREATED_AT: string;
    UPDATED_AT: string;
}