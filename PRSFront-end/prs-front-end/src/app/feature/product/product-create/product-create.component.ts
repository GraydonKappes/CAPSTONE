// src/app/feature/product/product-create/product-create.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../../service/product.service';
import { VendorService } from '../../../service/vendor.service';
import { Product } from '../../../model/product.interface';
import { Vendor } from '../../../model/vendor.interface';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container mt-4">
      <h1>Create Product</h1>
      
      @if (errorMessage) {
        <div class="alert alert-danger">{{errorMessage}}</div>
      }

      <form (ngSubmit)="save()" #productForm="ngForm">
        <div class="mb-3">
          <label class="form-label">Part Number:</label>
          <input type="text" class="form-control" [(ngModel)]="product.partNumber" 
                 name="partNumber" required>
        </div>

        <div class="mb-3">
          <label class="form-label">Name:</label>
          <input type="text" class="form-control" [(ngModel)]="product.name" 
                 name="name" required>
        </div>

        <div class="mb-3">
          <label class="form-label">Price:</label>
          <input type="number" class="form-control" [(ngModel)]="product.price" 
                 name="price" required min="0" step="0.01">
        </div>

        <div class="mb-3">
          <label class="form-label">Unit:</label>
          <input type="text" class="form-control" [(ngModel)]="product.unit" 
                 name="unit" required>
        </div>

        <div class="mb-3">
          <label class="form-label">Vendor:</label>
          <select class="form-control" [(ngModel)]="product.vendorId" 
                  name="vendorId" required>
            <option [ngValue]="null">Select a vendor</option>
            @for (vendor of vendors; track vendor.id) {
              <option [ngValue]="vendor.id">{{vendor.name}}</option>
            }
          </select>
        </div>

        <button type="submit" class="btn btn-primary" 
                [disabled]="!productForm.form.valid">Create</button>
        <a routerLink="/products" class="btn btn-secondary ms-2">Cancel</a>
      </form>
    </div>
  `
})
export class ProductCreateComponent implements OnInit {
  product: Product = {
    id: 0,
    vendorId: 0,
    partNumber: '',
    name: '',
    price: 0,
    unit: ''
  };
  vendors: Vendor[] = [];
  errorMessage: string = '';

  constructor(
    private productService: ProductService,
    private vendorService: VendorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadVendors();
  }

  loadVendors(): void {
    this.vendorService.list().subscribe({
      next: (vendors) => this.vendors = vendors,
      error: (error) => {
        console.error('Error loading vendors:', error);
        this.errorMessage = 'Failed to load vendors';
      }
    });
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