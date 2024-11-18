// src/app/model/line-item.interface.ts
import { Product } from './product.interface';
import { Request } from './request.interface';

export interface LineItem {
    id?: number;
    request: Request;
    product: Product;
    quantity: number;
}