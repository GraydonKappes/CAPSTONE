import { LineItem } from './line-item.interface';

export type DeliveryMode = 'Mail' | 'Pickup';
export type RequestStatus = 'NEW' | 'REVIEW' | 'APPROVED' | 'REJECTED';

export interface Request {
    id?: number;
    description: string;
    justification: string;
    dateNeeded?: Date;
    deliveryMode: 'Pickup' | 'Mail';
    status: 'NEW' | 'REVIEW' | 'APPROVED' | 'REJECTED';
    total: number;
    submittedDate?: Date;
    reasonForRejection?: string;
    userId: number;
}