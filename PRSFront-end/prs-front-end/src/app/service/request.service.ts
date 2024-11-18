import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Request } from '../model/request.interface';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private apiUrl = 'http://localhost:8080/api/requests';

  constructor(private http: HttpClient) { }

  // CRUD Operations
  list(): Observable<Request[]> {
    return this.http.get<Request[]>(this.apiUrl);
  }

  get(id: number): Observable<Request> {
    return this.http.get<Request>(`${this.apiUrl}/${id}`);
  }

  create(request: Request): Observable<Request> {
    return this.http.post<Request>(this.apiUrl, request);
  }

  update(id: number, request: Request): Observable<Request> {
    return this.http.put<Request>(`${this.apiUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Business Logic Operations
  submitForReview(id: number): Observable<Request> {
    return this.http.put<Request>(`${this.apiUrl}/${id}/submit-review`, {});
  }

  getRequestsForReview(): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.apiUrl}/reviews`);
  }

  approve(id: number): Observable<Request> {
    return this.http.put<Request>(`${this.apiUrl}/${id}/approve`, {});
  }

  reject(id: number, reason: string): Observable<Request> {
    return this.http.put<Request>(`${this.apiUrl}/${id}/reject?reasonForRejection=${reason}`, {});
  }
}