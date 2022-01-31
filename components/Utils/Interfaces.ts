export interface DB_RESPONSE {
    code: Number;
    msg: any;
}

export interface Rule {
    rule_name: string;
    rule_desc: string;
    rule_regex: string;
    created_at: string;
    updated_at: string;
}