import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
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
            <strong>Total:</strong> {{calculateTotal() | currency}}
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
                <td>{{item.product.name}}</td>
                <td>{{item.quantity}}</td>
                <td>{{item.product.price | currency}}</td>
                <td>{{item.quantity * item.product.price | currency}}</td>
                @if (canEdit) {
                  <td>
                    <button (click)="deleteLineItem(item.id!)" 
                            class="btn btn-danger btn-sm">Delete</button>
                  </td>
                }
              </tr>
            }
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-end"><strong>Total:</strong></td>
              <td><strong>{{calculateTotal() | currency}}</strong></td>
              @if (canEdit) {
                <td></td>
              }
            </tr>
          </tfoot>
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
  
  get canEdit(): boolean {
    return this.request?.status === 'NEW' && 
           this.request?.userId === this.authService.getCurrentUserId();
  }

  constructor(
    private lineItemService: LineItemService,
    private requestService: RequestService,
    private route: ActivatedRoute,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const requestId = Number(this.route.snapshot.paramMap.get('requestId'));
    if (requestId) {
      this.loadRequest(requestId);
      this.loadLineItems(requestId);
    }
  }

  loadRequest(id: number): void {
    this.requestService.get(id).subscribe({
      next: request => {
        this.request = request;
      },
      error: error => console.error('Error loading request:', error)
    });
  }

  loadLineItems(requestId: number): void {
    this.lineItemService.getByRequestId(requestId).subscribe({
      next: items => {
        this.lineItems = items;
      },
      error: error => console.error('Error loading line items:', error)
    });
  }

  calculateTotal(): number {
    return this.lineItems.reduce((sum, item) => 
      sum + (item.quantity * item.product.price), 0);
  }

  deleteLineItem(id: number): void {
    if (confirm('Are you sure you want to delete this line item?')) {
      this.lineItemService.delete(id).subscribe({
        next: () => {
          this.loadLineItems(this.request!.id);
        },
        error: error => console.error('Error deleting line item:', error)
      });
    }
  }

  submitForReview(): void {
    if (this.request) {
      this.requestService.submitForReview(this.request.id).subscribe({
        next: () => {
          this.router.navigate(['/requests']);
        },
        error: error => console.error('Error submitting request:', error)
      });
    }
  }
}
