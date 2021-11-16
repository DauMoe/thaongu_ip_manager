export interface BlackList {
    ip: string;
    desc: string;
    create_time: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface VLAN {
    ip: string;
    desc: string;
    properties: any;
    createdAt: Date;
    updatedAt: Date;
}

export interface Rule {
    name: string;
    desc: string;
    regex: string;
    createdAt: Date;
    updatedAt: Date;
}