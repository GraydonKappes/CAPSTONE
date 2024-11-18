import { LineItem } from './line-item.interface';

export type DeliveryMode = 'Mail' | 'Pickup';
export type RequestStatus = 'NEW' | 'REVIEW' | 'APPROVED' | 'REJECTED';

export interface Request {
    id: number;
    userId: number;
    description: string;
    justification: string;
    dateNeeded: Date;
    deliveryMode: string;
    status: string;
    total: number;
    submittedDate: Date;
    reasonForRejection?: string;
}