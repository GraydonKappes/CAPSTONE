import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Request, RequestStatus } from '../model/request.interface';

@Injectable({
  providedIn: 'root'
})
export class RequestStateService {
  private requestSubject = new BehaviorSubject<Request[]>([]);
  requests$ = this.requestSubject.asObservable();

  updateRequestStatus(requestId: number, newStatus: RequestStatus, reason?: string): void {
    const currentRequests = this.requestSubject.value;
    const updatedRequests = currentRequests.map(request => {
      if (request.id === requestId) {
        return {
          ...request,
          status: newStatus,
          reasonForRejection: reason
        };
      }
      return request;
    });
    this.requestSubject.next(updatedRequests);
  }
} 