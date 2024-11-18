import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../service/product.service';
import { VendorService } from '../../../service/vendor.service';
import { Product } from '../../../model/product.interface';
import { Vendor } from '../../../model/vendor.interface';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe],
  template: `
    <div class="container mt-4">
      @if (product) {
        <div class="card">
          <div class="card-header">
            <h2>Product Details</h2>
          </div>
          <div class="card-body">
            <p><strong>ID:</strong> {{product.id}}</p>
            <p><strong>Part Number:</strong> {{product.partNumber}}</p>
            <p><strong>Name:</strong> {{product.name}}</p>
            <p><strong>Price:</strong> {{product.price | currency}}</p>
            <p><strong>Unit:</strong> {{product.unit}}</p>
            <p><strong>Vendor:</strong> {{vendorName}}</p>
          </div>
          <div class="card-footer">
            <a [routerLink]="['/products', product.id, 'edit']" 
               class="btn btn-primary">Edit</a>
            <a routerLink="/products" class="btn btn-secondary ms-2">Back to List</a>
          </div>
        </div>
      } @else {
        <div>Loading...</div>
      }
    </div>
  `
})
export class ProductDetailComponent implements OnInit {
  product?: Product;
  vendorName: string = '';

  constructor(
    private productService: ProductService,
    private vendorService: VendorService,
    private route: ActivatedRoute
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
        this.loadVendorName(product.vendorId);
      },
      error: (error) => console.error('Error loading product:', error)
    });
  }

  loadVendorName(vendorId: number): void {
    this.vendorService.get(vendorId).subscribe({
      next: (vendor) => this.vendorName = vendor.name,
      error: (error) => console.error('Error loading vendor:', error)
    });
  }
}
