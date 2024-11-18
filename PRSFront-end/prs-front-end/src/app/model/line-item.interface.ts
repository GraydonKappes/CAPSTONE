// src/app/model/line-item.interface.ts
import { Product } from './product.interface';
import { Request } from './request.interface';

export interface LineItem {
    id?: number;
    quantity: number;
    requestId: number;
    productId: number;
    product?: Product;
    request?: Request;
}