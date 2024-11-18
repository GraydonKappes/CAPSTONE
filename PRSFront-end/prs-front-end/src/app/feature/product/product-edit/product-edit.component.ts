import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../../model/product.interface';
import { ProductService } from '../../../service/product.service';
import { VendorService } from '../../../service/vendor.service';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container mt-4">
      <h1>Edit Product</h1>
      @if (product) {
        <form (ngSubmit)="save()" #productForm="ngForm">
          <div class="mb-3">
            <label class="form-label">Vendor:</label>
            <select class="form-control" [(ngModel)]="product.vendor" name="vendor" required>
              <option *ngFor="let v of vendors" [ngValue]="v">{{v.name}}</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">Part Number:</label>
            <input class="form-control" [(ngModel)]="product.partNumber" name="partNumber" required>
          </div>
          <div class="mb-3">
            <label class="form-label">Name:</label>
            <input class="form-control" [(ngModel)]="product.name" name="name" required>
          </div>
          <div class="mb-3">
            <label class="form-label">Price:</label>
            <input type="number" class="form-control" [(ngModel)]="product.price" name="price" required>
          </div>
          <div class="mb-3">
            <label class="form-label">Unit:</label>
            <input class="form-control" [(ngModel)]="product.unit" name="unit" required>
          </div>
          <button type="submit" class="btn btn-primary" [disabled]="!productForm.form.valid">Save</button>
          <a routerLink="/products" class="btn btn-secondary ms-2">Cancel</a>
        </form>
      } @else {
        <p>Loading...</p>
      }
    </div>
  `
})
export class ProductEditComponent implements OnInit {
  product?: Product;
  vendors: any[] = [];

  constructor(
    private productService: ProductService,
    private vendorService: VendorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadVendors();
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadProduct(id);
    }
  }

  loadVendors(): void {
    this.vendorService.list().subscribe({
      next: (vendors) => {
        this.vendors = vendors;
      },
      error: (error) => {
        console.error('Error loading vendors:', error);
      }
    });
  }

  loadProduct(id: number): void {
    this.productService.get(id).subscribe({
      next: (product) => {
        this.product = product;
      },
      error: (error) => {
        console.error('Error loading product:', error);
      }
    });
  }

  save(): void {
    if (this.product) {
      this.productService.update(this.product).subscribe({
        next: () => {
          this.router.navigate(['/products']);
        },
        error: (error) => {
          console.error('Error updating product:', error);
        }
      });
    }
  }
}
