// src/app/core/models/vendor.ts
export interface Vendor {
    id: number;
    code: string;  // 10-digit alphanumeric
    name: string;
    address: string;
    city: string;
    state: string;  // 2 characters
    zip: string;
    phone: string;
    email: string;
}