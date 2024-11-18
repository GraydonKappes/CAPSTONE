import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RequestService } from '../../../service/request.service';
import { LineItemService } from '../../../service/line-item.service';
import { ProductService } from '../../../service/product.service';
import { AuthService } from '../../../service/auth.service';
import { Request } from '../../../model/request.interface';
import { LineItem } from '../../../model/line-item.interface';
import { Product } from '../../../model/product.interface';

@Component({
  selector: 'app-request-review',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe],
  template: `
    <div class="container mt-4">
      <h1>Requests for Review</h1>
      
      @if (errorMessage) {
        <div class="alert alert-danger">{{errorMessage}}</div>
      }

      @if (loading) {
        <div class="text-center">
          <p>Loading requests...</p>
        </div>
      }

      @if (!loading && requests.length === 0) {
        <div class="alert alert-info">
          No requests pending review.
        </div>
      }
      
      @for (request of requests; track request.id) {
        <div class="card mb-4">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Request #{{request.id}}</h5>
            <div>
              <button (click)="approve(request.id)" class="btn btn-success btn-sm me-1">Approve</button>
              <button (click)="reject(request.id)" class="btn btn-danger btn-sm">Reject</button>
            </div>
          </div>
          <div class="card-body">
            <div class="row mb-3">
              <div class="col-md-6">
                <p><strong>Description:</strong> {{request.description}}</p>
                <p><strong>Justification:</strong> {{request.justification}}</p>
                <p><strong>Delivery Mode:</strong> {{request.deliveryMode}}</p>
              </div>
              <div class="col-md-6">
                <p><strong>Status:</strong> {{request.status}}</p>
                <p><strong>Total:</strong> {{request.total | currency}}</p>
                <p><strong>Date Needed:</strong> {{request.dateNeeded | date}}</p>
              </div>
            </div>
            
            <h6>Line Items</h6>
            <table class="table table-sm">
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                @for (item of lineItems[request.id] || []; track item.id) {
                  <tr>
                    <td>{{getProductName(item.product.id)}}</td>
                    <td>{{item.quantity}}</td>
                    <td>{{getProductPrice(item.product.id) | currency}}</td>
                    <td>{{calculateLineTotal(item) | currency}}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>
  `
})
export class RequestReviewComponent implements OnInit {
  requests: Request[] = [];
  lineItems: { [requestId: number]: LineItem[] } = {};
  products: { [id: number]: Product } = {};
  errorMessage: string = '';
  loading: boolean = true;

  constructor(
    private requestService: RequestService,
    private lineItemService: LineItemService,
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.isReviewer()) {
      this.loadReviewRequests();
      this.loadProducts();
    }
  }

  loadReviewRequests(): void {
    this.requestService.getRequestsForReview().subscribe({
      next: (requests) => {
        this.requests = requests;
        requests.forEach(request => {
          this.loadLineItemsForRequest(request.id);
        });
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.loading = false;
      }
    });
  }

  loadLineItemsForRequest(requestId: number): void {
    this.lineItemService.getByRequestId(requestId).subscribe({
      next: (items) => {
        this.lineItems[requestId] = items;
      },
      error: (error) => console.error('Error loading line items:', error)
    });
  }

  loadProducts(): void {
    this.productService.list().subscribe({
      next: (products) => {
        products.forEach(product => {
          this.products[product.id] = product;
        });
      },
      error: (error) => console.error('Error loading products:', error)
    });
  }

  getProductName(productId: number): string {
    return this.products[productId]?.name || 'Loading...';
  }

  getProductPrice(productId: number): number {
    return this.products[productId]?.price || 0;
  }

  calculateLineTotal(item: LineItem): number {
    return item.quantity * this.getProductPrice(item.product.id);
  }

  approve(id: number): void {
    this.requestService.approve(id).subscribe({
      next: () => this.loadReviewRequests(),
      error: (error) => {
        console.error('Error approving request:', error);
        this.errorMessage = 'Failed to approve request';
      }
    });
  }

  reject(id: number): void {
    const reason = prompt('Please enter rejection reason:');
    if (reason) {
      this.requestService.reject(id, reason).subscribe({
        next: () => this.loadReviewRequests(),
        error: (error) => {
          console.error('Error rejecting request:', error);
          this.errorMessage = 'Failed to reject request';
        }
      });
    }
  }
}