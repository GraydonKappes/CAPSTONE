import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../../model/product.interface';
import { ProductService } from '../../../service/product.service';
import { AuthService } from '../../../service/auth.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe],
  template: `
    <div class="container mt-4">
      <h1>Products</h1>
      
      @if (authService.isAdmin()) {
        <a routerLink="/products/create" class="btn btn-primary mb-3">Add New Product</a>
      }
      
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Part Number</th>
            <th>Name</th>
            <th>Price</th>
            <th>Unit</th>
            <th>Vendor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          @for (product of products; track product.id) {
            <tr>
              <td>{{product.partNumber}}</td>
              <td>{{product.name}}</td>
              <td>{{product.price | currency}}</td>
              <td>{{product.unit}}</td>
              <td>{{product.vendor?.name}}</td>
              <td>
                <a [routerLink]="['/products', product.id]" 
                   class="btn btn-info btn-sm">View</a>
                
                @if (authService.isAdmin()) {
                  <a [routerLink]="['/products', product.id, 'edit']" 
                     class="btn btn-warning btn-sm mx-1">Edit</a>
                  <button (click)="deleteProduct(product.id!)" 
                          class="btn btn-danger btn-sm">Delete</button>
                }
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.list().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.delete(id).subscribe({
        next: () => {
          this.loadProducts();
        },
        error: (error) => {
          console.error('Error deleting product:', error);
        }
      });
    }
  }
}
