// src/app/model/line-item.interface.ts
import { Product } from './product.interface';
import { Request } from './request.interface';

export interface LineItem {
    id: number;
    requestId: number;
    productId: number;
    quantity: number;
}