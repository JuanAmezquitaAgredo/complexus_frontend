export interface UserAdmin {
    name: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    tower: string;
    residential_id: string;
    rol_id: string;
}

export interface ResidentialUnit{
    id?: string;
    name: string;
    city: string;
    address: string;
    has_tower: string;
    admin_id: string;
}

