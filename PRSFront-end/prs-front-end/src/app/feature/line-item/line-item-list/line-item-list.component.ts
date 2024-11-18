import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../../../service/request.service';
import { LineItemService } from '../../../service/line-item.service';
import { ProductService } from '../../../service/product.service';
import { AuthService } from '../../../service/auth.service';
import { Request } from '../../../model/request.interface';
import { LineItem } from '../../../model/line-item.interface';
import { Product } from '../../../model/product.interface';

@Component({
  selector: 'app-line-item-list',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe],
  template: `
    <div class="container mt-4">
      @if (request) {
        <div class="mb-4">
          <h2>Purchase Request Line Items</h2>
          <div class="mb-3">
            <strong>Description:</strong> {{request.description}} |
            <strong>Status:</strong> {{request.status}} |
            <strong>Total:</strong> {{request.total | currency}}
          </div>
        </div>

        @if (canEdit) {
          <a [routerLink]="['/requests', request.id, 'line-items', 'create']" 
             class="btn btn-primary mb-3">Add Line Item</a>
        }

        <table class="table table-striped">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              @if (canEdit) {
                <th>Actions</th>
              }
            </tr>
          </thead>
          <tbody>
            @if (lineItems.length === 0) {
              <tr>
                <td [colSpan]="canEdit ? 5 : 4" class="text-center">
                  No line items found
                </td>
              </tr>
            }
            @for (item of lineItems; track item.id) {
              <tr>
                <td>{{getProductName(item.productId)}}</td>
                <td>{{item.quantity}}</td>
                <td>{{getProductPrice(item.productId) | currency}}</td>
                <td>{{calculateItemTotal(item) | currency}}</td>
                @if (canEdit) {
                  <td>
                    <button (click)="deleteLineItem(item.id)" 
                            class="btn btn-danger btn-sm">Delete</button>
                  </td>
                }
              </tr>
            }
          </tbody>
        </table>

        <div class="mt-3">
          <a routerLink="/requests" class="btn btn-secondary">Back to List</a>
          @if (canEdit && lineItems.length > 0) {
            <button (click)="submitForReview()" 
                    class="btn btn-primary ms-2">Submit for Review</button>
          }
        </div>
      } @else {
        <div>Loading...</div>
      }
    </div>
  `
})
export class LineItemListComponent implements OnInit {
  request?: Request;
  lineItems: LineItem[] = [];
  products: { [id: number]: Product } = {};
  
  get canEdit(): boolean {
    return this.request?.status === 'NEW' && 
           this.request?.userId === this.authService.getCurrentUserId();
  }

  constructor(
    private lineItemService: LineItemService,
    private requestService: RequestService,
    private productService: ProductService,
    private route: ActivatedRoute,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    const requestId = Number(this.route.snapshot.paramMap.get('requestId'));
    if (requestId) {
      this.loadRequest(requestId);
      this.loadLineItems(requestId);
      this.loadProducts();
    }
  }

  loadRequest(id: number): void {
    this.requestService.get(id).subscribe(request => {
      this.request = request;
    });
  }

  loadLineItems(requestId: number): void {
    this.lineItemService.getByRequestId(requestId).subscribe(items => {
      this.lineItems = items;
    });
  }

  loadProducts(): void {
    this.productService.list().subscribe(products => {
      products.forEach(product => {
        this.products[product.id] = product;
      });
    });
  }

  getProductName(productId: number): string {
    return this.products[productId]?.name || 'Loading...';
  }

  getProductPrice(productId: number): number {
    return this.products[productId]?.price || 0;
  }

  calculateItemTotal(item: LineItem): number {
    return item.quantity * this.getProductPrice(item.productId);
  }

  deleteLineItem(id: number): void {
    if (confirm('Are you sure you want to delete this line item?')) {
      this.lineItemService.delete(id).subscribe(() => {
        this.loadLineItems(this.request!.id);
      });
    }
  }

  submitForReview(): void {
    if (this.request?.id) {
      this.requestService.submitForReview(this.request.id).subscribe(() => {
        this.loadRequest(this.request!.id);
      });
    }
  }
}
