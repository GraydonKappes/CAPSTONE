import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LineItem } from '../model/line-item.interface';

@Injectable({
    providedIn: 'root'
})
export class LineItemService {
    private url = 'http://localhost:8080/api/line-items';

    constructor(private http: HttpClient) {}

    getByRequestId(requestId: number): Observable<LineItem[]> {
        return this.http.get<LineItem[]>(`${this.url}/request/${requestId}`);
    }

    create(lineItem: LineItem): Observable<LineItem> {
        return this.http.post<LineItem>(this.url, lineItem);
    }

    update(lineItem: LineItem): Observable<LineItem> {
        return this.http.put<LineItem>(`${this.url}/${lineItem.id}`, lineItem);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.url}/${id}`);
    }
}
