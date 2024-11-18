import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Request } from '../model/request.interface';
import { User } from '../model/user.interface';
import { Product } from '../model/product.interface';
import { Vendor } from '../model/vendor.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  // User management
  reassignRequest(requestId: number, newUserId: number): Observable<Request> {
    return this.http.put<Request>(`${this.apiUrl}/admin/requests/${requestId}/reassign/${newUserId}`, {});
  }

  // Product management
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/admin/products/${product.id}`, product);
  }

  // Vendor management
  updateVendor(vendor: Vendor): Observable<Vendor> {
    return this.http.put<Vendor>(`${this.apiUrl}/admin/vendors/${vendor.id}`, vendor);
  }
} 