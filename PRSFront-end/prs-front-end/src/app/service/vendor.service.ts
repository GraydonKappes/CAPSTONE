import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vendor, VendorCreate } from '../model/vendor.interface';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private url = 'http://localhost:8080/api/vendors';

  constructor(private http: HttpClient) {}

  list(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.url);
  }

  get(id: number): Observable<Vendor> {
    return this.http.get<Vendor>(`${this.url}/${id}`);
  }

  create(vendor: VendorCreate): Observable<Vendor> {
    return this.http.post<Vendor>(this.url, vendor);
  }

  update(id: number, vendor: Vendor): Observable<Vendor> {
    return this.http.put<Vendor>(`${this.url}/${id}`, vendor);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
