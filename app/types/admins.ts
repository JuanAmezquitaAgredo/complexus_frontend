export interface UserAdmin {
    name: string;
    email: string;
    password: string;
    phone: string;
    towers: string;
    rol: string;
}

export interface ResidentialUnit{
    name: string;
    city: string;
    address: string;
    admin_id: string;
}