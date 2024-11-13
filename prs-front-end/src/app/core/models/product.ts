// src/app/core/models/product.ts
export interface Product {
    id: number;
    vendorId: number;
    partNumber: string;
    name: string;
    price: number;
    unit: string;
    photoPath?: string;
}