export interface Brand {
    name: string;
    id: number;
    products?: Product[];
    logo_url: string;
}

export interface Product {
    name: string;
    description?: string;
    price: number;
    image_url: string;
    id: number;
    BrandId: number;
}

export interface MyError {
    param: string;
    msg: string;
    location: string;
    value: string;
}

export interface AddProduct {
    name: string;
    description?: string;
    price: number;
    image: File | null;
    BrandId: number;
    image_url?: string;
}

export interface AddBrand {
    name: string;
    image: File | null;
}

export interface User {
    email: string;
    password: string;
}

export interface Add {
    name: string;
    email?: string;
    password?: string;
    price?: number;
    image?: File;
    description?: '';
}
