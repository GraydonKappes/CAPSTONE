// src/app/model/product.interface.ts
import { Vendor } from './vendor.interface';

export interface Product {
    id?: number;
    partNumber: string;
    name: string;
    price: number;
    unit: string;
    photoPath?: string;
    vendorId: number;
    vendor?: Vendor;
}