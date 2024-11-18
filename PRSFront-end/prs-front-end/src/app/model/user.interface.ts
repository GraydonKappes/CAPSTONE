// src/app/model/user.interface.ts
export interface User {
    id?: number;
    username: string;
    password?: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    reviewer: boolean;
    admin: boolean;
}