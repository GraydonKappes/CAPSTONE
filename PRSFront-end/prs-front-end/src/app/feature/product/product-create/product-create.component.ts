// src/app/feature/product/product-create/product-create.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../model/product.interface';
import { ProductService } from '../../../service/product.service';
import { VendorService } from '../../../service/vendor.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h1>Create Product</h1>
      <form (ngSubmit)="save()" #productForm="ngForm">
        <div class="form-group">
          <label>Vendor:</label>
          <select [(ngModel)]="product.vendor" name="vendor" required>
            <option *ngFor="let v of vendors" [ngValue]="v">{{v.name}}</option>
          </select>
        </div>
        <div class="form-group">
          <label>Part Number:</label>
          <input [(ngModel)]="product.partNumber" name="partNumber" required>
        </div>
        <div class="form-group">
          <label>Name:</label>
          <input [(ngModel)]="product.name" name="name" required>
        </div>
        <div class="form-group">
          <label>Price:</label>
          <input type="number" [(ngModel)]="product.price" name="price" required>
        </div>
        <div class="form-group">
          <label>Unit:</label>
          <input [(ngModel)]="product.unit" name="unit" required>
        </div>
        <button type="submit" [disabled]="!productForm.form.valid">Save</button>
        <button type="button" (click)="cancel()">Cancel</button>
      </form>
    </div>
  `
})
export class ProductCreateComponent {
  product: Product = {} as Product;
  vendors: any[] = [];

  constructor(
    private productService: ProductService,
    private vendorService: VendorService,
    private router: Router
  ) {
    this.loadVendors();
  }

  loadVendors(): void {
    this.vendorService.list().subscribe(
      vendors => this.vendors = vendors,
      error => console.error('Error loading vendors:', error)
    );
  }

  save(): void {
    this.productService.create(this.product).subscribe(
      () => this.router.navigate(['/products']),
      (error: Error) => console.error('Error creating product:', error)
    );
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}