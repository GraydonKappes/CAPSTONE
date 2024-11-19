import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RequestService } from '../../../service/request.service';
import { LineItemService } from '../../../service/line-item.service';
import { ProductService } from '../../../service/product.service';
import { AuthService } from '../../../service/auth.service';
import { Request } from '../../../model/request.interface';
import { LineItem } from '../../../model/line-item.interface';
import { Product } from '../../../model/product.interface';

@Component({
  selector: 'app-request-list',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  template: `
    <div class="container mt-4">
      <h1>Purchase Requests</h1>
      
      <a routerLink="/requests/create" class="btn btn-primary mb-3">Create New Request</a>
      
      @if (loading) {
        <div class="text-center">Loading...</div>
      } @else if (error) {
        <div class="alert alert-danger">{{error}}</div>
      } @else {
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Justification</th>
                <th>Status</th>
                <th>Date Needed</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              @if (requests.length === 0) {
                <tr>
                  <td colspan="7" class="text-center">No requests found</td>
                </tr>
              }
              @for (request of requests; track request.id) {
                <tr>
                  <td>{{request.id}}</td>
                  <td>{{request.description}}</td>
                  <td>{{request.justification}}</td>
                  <td>
                    <span [class]="getStatusBadgeClass(request.status)">
                      {{request.status}}
                    </span>
                  </td>
                  <td>
                    @if (request.dateNeeded) {
                      {{request.dateNeeded | date:'MM/dd/yyyy'}}
                    } @else {
                      <span class="text-muted">Not specified</span>
                    }
                  </td>
                  <td>{{request.total | currency}}</td>
                  <td>
                    @if (authService.isAdmin() && request.userId !== authService.getCurrentUserId()) {
                      <button (click)="delete(request.id!)" 
                              class="btn btn-danger btn-sm me-1">Delete</button>
                    }
                    
                    @if (request.status === 'NEW' && request.userId === authService.getCurrentUserId()) {
                      <button (click)="submitForReview(request.id!)" 
                              class="btn btn-primary btn-sm me-1">Submit</button>
                      <a [routerLink]="['/requests', request.id, 'line-items']" 
                         class="btn btn-warning btn-sm">Edit Lines</a>
                    }
                    
                    @if (canReview(request)) {
                      <button (click)="approve(request.id!)" 
                              class="btn btn-success btn-sm me-1">Approve</button>
                      <button (click)="reject(request.id!)" 
                              class="btn btn-danger btn-sm">Reject</button>
                    }

                    @if (request.status === 'REJECTED') {
                      <span class="text-danger">{{request.reasonForRejection}}</span>
                    }
                  </td>
                </tr>
                <!-- Line Items Expansion Row -->
                @if (expandedRequestId === request.id) {
                  <tr>
                    <td colspan="7">
                      <div class="p-3 bg-light">
                        <h6>Line Items</h6>
                        <table class="table table-sm">
                          <thead>
                            <tr>
                              <th>Product</th>
                              <th>Quantity</th>
                              <th>Price</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                          @for (item of lineItems[request.id] || []; track item.id) {
                            <tr>
                              <td>{{getProductName(item)}}</td>
                              <td>{{item.quantity}}</td>
                              <td>{{getProductPrice(item) | currency}}</td>
                              <td>{{calculateLineTotal(item) | currency}}</td>
                            </tr>
                          }
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                }
              }
            </tbody>
          </table>
        </div>
      }
    </div>
  `,
  styles: [`
    .status-badge {
      padding: 0.25em 0.5em;
      border-radius: 0.25rem;
      font-size: 0.875rem;
    }
    .status-new { background-color: #e9ecef; }
    .status-review { background-color: #fff3cd; }
    .status-approved { background-color: #d4edda; }
    .status-rejected { background-color: #f8d7da; }
  `]
})
export class RequestListComponent implements OnInit {
  requests: Request[] = [];
  loading = true;
  error?: string;
  products: { [key: number]: Product } = {};
  lineItems: { [key: number]: LineItem[] } = {};
  expandedRequestId: number | null = null;

  constructor(
    private requestService: RequestService,
    private lineItemService: LineItemService,
    private productService: ProductService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadRequests();
    this.loadProducts();
  }

  loadRequests(): void {
    if (this.authService.isAdmin() || this.authService.isReviewer()) {
      // Load all requests for admins and reviewers
      this.requestService.list().subscribe({
        next: (requests) => {
          this.requests = requests;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading requests:', err);
          this.error = 'Failed to load requests';
          this.loading = false;
        }
      });
    } else {
      // Load only user's requests for regular users
      const userId = this.authService.getCurrentUserId();
      if (userId) {
        this.requestService.getMyRequests(String(userId)).subscribe({
          next: (requests) => {
            this.requests = requests;
            this.loading = false;
          },
          error: (err) => {
            console.error('Error loading requests:', err);
            this.error = 'Failed to load requests';
            this.loading = false;
          }
        });
      }
    }
  }

  loadLineItemsForRequests(): void {
    this.requests.forEach(request => {
      this.lineItemService.getByRequestId(request.id).subscribe({
        next: (items) => {
          this.lineItems[request.id] = items;
        },
        error: (err) => console.error(`Error loading line items for request ${request.id}:`, err)
      });
    });
  }

  loadProducts(): void {
    this.productService.list().subscribe({
      next: (products) => {
        products.forEach(product => {
          this.products[product.id] = product;
        });
      },
      error: (err) => console.error('Error loading products:', err)
    });
  }

  getProductName(item: LineItem): string {
    return this.products[item.product.id]?.name || 'Loading...';
  }

  getProductPrice(item: LineItem): number {
    return this.products[item.product.id]?.price || 0;
  }

  calculateLineTotal(item: LineItem): number {
    return item.quantity * this.getProductPrice(item);
  }

  getStatusBadgeClass(status: string): string {
    return `status-badge status-${status.toLowerCase()}`;
  }

  canReview(request: Request): boolean {
    const isOwnRequest = request.userId === this.authService.getCurrentUserId();
    
    if (isOwnRequest) {
      return false;
    }
    
    if (this.authService.isAdmin()) {
      return true;
    }
    
    return request.status === 'REVIEW' && this.authService.isReviewer();
  }

  submitForReview(id: number): void {
    this.requestService.submitForReview(id).subscribe({
      next: () => this.loadRequests(),
      error: (err) => {
        console.error('Error submitting request for review:', err);
        this.error = 'Failed to submit request for review';
      }
    });
  }

  approve(id: number): void {
    this.requestService.approve(id).subscribe({
      next: () => this.loadRequests(),
      error: (err) => {
        console.error('Error approving request:', err);
        this.error = 'Failed to approve request';
      }
    });
  }

  reject(id: number): void {
    const reason = prompt('Please enter rejection reason:');
    if (reason) {
      this.requestService.reject(id, reason).subscribe({
        next: () => this.loadRequests(),
        error: (err) => {
          console.error('Error rejecting request:', err);
          this.error = 'Failed to reject request';
        }
      });
    }
  }

  toggleExpand(requestId: number): void {
    this.expandedRequestId = this.expandedRequestId === requestId ? null : requestId;
  }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this request?')) {
      this.requestService.delete(id).subscribe({
        next: () => {
          this.loadRequests();
        },
        error: (err) => {
          console.error('Error deleting request:', err);
          this.error = 'Failed to delete request';
        }
      });
    }
  }}
