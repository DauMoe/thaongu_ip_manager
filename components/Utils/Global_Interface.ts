export interface BlackList {
    ip: string;
    desc: string;
    create_time: Date;
}

export interface VLAN {
    ip: string;
    desc: string;
    create_time: number;
    last_update: number;
}