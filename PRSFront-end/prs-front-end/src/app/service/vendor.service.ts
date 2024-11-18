import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vendor } from '../model/vendor.interface';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  list(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(`${this.apiUrl}/vendors`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/vendors/${id}`);
  }

  get(id: number): Observable<Vendor> {
    return this.http.get<Vendor>(`${this.apiUrl}/vendors/${id}`);
  }

  update(vendor: Vendor): Observable<Vendor> {
    return this.http.put<Vendor>(`${this.apiUrl}/vendors/${vendor.id}`, vendor);
  }

  create(vendor: Vendor): Observable<Vendor> {
    console.log('Sending to:', `${this.apiUrl}/vendors`);
    console.log('Vendor data:', vendor);
    return this.http.post<Vendor>(`${this.apiUrl}/vendors`, vendor);
  }
}
