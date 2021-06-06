export interface IDroplet {
    id: string;
    name: string;
    ip_address: string;
    pub_ip: string;
    size_slug: string;
    region: Region;
    status: string;
}

export interface Region {
    name: string;
}