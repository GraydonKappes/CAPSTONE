import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LineItem } from '../model/line-item.interface';

@Injectable({
    providedIn: 'root'
})
export class LineItemService {
    private apiUrl = 'http://localhost:8080/api/lineitems';

    constructor(private http: HttpClient) {}

    list(): Observable<LineItem[]> {
        return this.http.get<LineItem[]>(this.apiUrl);
    }

    get(id: number): Observable<LineItem> {
        return this.http.get<LineItem>(`${this.apiUrl}/${id}`);
    }

    getByRequestId(requestId: number): Observable<LineItem[]> {
        return this.http.get<LineItem[]>(`${this.apiUrl}/request/${requestId}`);
    }

    create(lineItem: LineItem): Observable<LineItem> {
        return this.http.post<LineItem>(this.apiUrl, lineItem);
    }

    update(lineItem: LineItem): Observable<LineItem> {
        return this.http.put<LineItem>(this.apiUrl, lineItem);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
