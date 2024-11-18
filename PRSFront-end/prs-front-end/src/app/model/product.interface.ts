// src/app/model/product.interface.ts
import { Vendor } from './vendor.interface';

export interface Product {
    id: number;
    vendorId: number;
    partNumber: string;
    name: string;
    price: number;
    unit: string;
}