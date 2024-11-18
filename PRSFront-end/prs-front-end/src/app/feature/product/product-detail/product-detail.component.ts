import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Product } from '../../../model/product.interface';
import { ProductService } from '../../../service/product.service';
import { AuthService } from '../../../service/auth.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe],
  template: `
    <div class="container mt-4">
      <h1>Product Details</h1>
      @if (product) {
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{product.name}}</h5>
            <div class="card-text">
              <p><strong>Part Number:</strong> {{product.partNumber}}</p>
              <p><strong>Price:</strong> {{product.price | currency}}</p>
              <p><strong>Unit:</strong> {{product.unit}}</p>
              <p><strong>Vendor:</strong> {{product.vendor?.name}}</p>
            </div>
            <div class="mt-3">
              <a routerLink="/products" class="btn btn-secondary">Back to List</a>
              @if (authService.isAdmin()) {
                <a [routerLink]="['edit']" class="btn btn-primary ms-2">Edit</a>
                <button (click)="deleteProduct()" class="btn btn-danger ms-2">Delete</button>
              }
            </div>
          </div>
        </div>
      } @else {
        <p>Loading...</p>
      }
    </div>
  `
})
export class ProductDetailComponent implements OnInit {
  product?: Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadProduct(id);
    }
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

  deleteProduct(): void {
    if (this.product && confirm('Are you sure you want to delete this product?')) {
      this.productService.delete(this.product.id!).subscribe({
        next: () => {
          window.location.href = '/products';
        },
        error: (error) => {
          console.error('Error deleting product:', error);
        }
      });
    }
  }
}
