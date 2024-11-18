import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LineItemService } from '../../../service/line-item.service';
import { RequestService } from '../../../service/request.service';
import { AuthService } from '../../../service/auth.service';
import { LineItem } from '../../../model/line-item.interface';
import { Request } from '../../../model/request.interface';

@Component({
  selector: 'app-line-item-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
                <td>{{item.product?.name}}</td>
                <td>{{item.quantity}}</td>
                <td>{{item.product?.price | currency}}</td>
                <td>{{(item.quantity * (item.product?.price || 0)) | currency}}</td>
                @if (canEdit) {
                  <td>
                    <button (click)="deleteLineItem(item.id!)" 
                            class="btn btn-danger btn-sm">Delete</button>
                  </td>
                }
              </tr>
            }
            <tr>
              <td [colSpan]="canEdit ? 3 : 2" class="text-end">
                <strong>Total:</strong>
              </td>
              <td><strong>{{calculateTotal() | currency}}</strong></td>
              @if (canEdit) {
                <td></td>
              }
            </tr>
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
  
  get canEdit(): boolean {
    return this.request?.status === 'NEW' && 
           this.request?.userId === this.authService.getCurrentUserId();
  }

  constructor(
    private lineItemService: LineItemService,
    private requestService: RequestService,
    private route: ActivatedRoute,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    const requestId = Number(this.route.snapshot.paramMap.get('requestId'));
    if (requestId) {
      this.loadRequest(requestId);
      this.loadLineItems(requestId);
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

  deleteLineItem(id: number): void {
    if (confirm('Are you sure you want to delete this line item?')) {
      this.lineItemService.delete(id).subscribe(() => {
        this.loadLineItems(this.request!.id!);
      });
    }
  }

  calculateTotal(): number {
    return this.lineItems.reduce((sum, item) => 
      sum + (item.quantity * (item.product?.price || 0)), 0);
  }

  submitForReview(): void {
    if (this.request?.id) {
      this.requestService.submitForReview(this.request.id).subscribe(() => {
        this.loadRequest(this.request!.id!);
      });
    }
  }
}
