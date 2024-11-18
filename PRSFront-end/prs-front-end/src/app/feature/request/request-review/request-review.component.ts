import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RequestService } from '../../../service/request.service';
import { AuthService } from '../../../service/auth.service';
import { LineItemService } from '../../../service/line-item.service';
import { Request } from '../../../model/request.interface';
import { CurrencyPipe } from '@angular/common';
import { LineItem } from '../../../model/line-item.interface';

@Component({
  selector: 'app-request-review',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe],
  template: `
    <div class="container mt-4">
      <h1>Requests for Review</h1>
      
      <div *ngFor="let request of requests" class="card mb-4">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h5 class="mb-0">Request #{{request.id}}</h5>
          <div>
            <button (click)="approve(request.id!)" class="btn btn-success btn-sm me-1">Approve</button>
            <button (click)="reject(request.id!)" class="btn btn-danger btn-sm">Reject</button>
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
              <p><strong>Submitted:</strong> {{request.submittedDate | date}}</p>
            </div>
          </div>
          
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
            <tr *ngFor="let item of lineItems[request.id!] || []">
  <td>{{item.product?.name || 'N/A'}}</td>
  <td>{{item.quantity}}</td>
  <td>{{item.product?.price || 0 | currency}}</td>
  <td>{{(item.quantity * (item.product?.price || 0)) | currency}}</td>
</tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class RequestReviewComponent implements OnInit {
  requests: Request[] = [];
  lineItems: { [requestId: number]: LineItem[] } = {};

  constructor(
    private requestService: RequestService,
    private lineItemService: LineItemService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.isReviewer()) {
      this.loadReviewRequests();
    }
  }

  loadReviewRequests(): void {
    this.requestService.getRequestsForReview().subscribe(requests => {
      this.requests = requests;
      // Load line items for each request
      requests.forEach(request => {
        this.lineItemService.getByRequestId(request.id!).subscribe(items => {
          this.lineItems[request.id!] = items;
        });
      });
    });
  }

  approve(id: number): void {
    this.requestService.approve(id).subscribe(() => {
      this.loadReviewRequests();
    });
  }

  reject(id: number): void {
    const reason = prompt('Please enter rejection reason:');
    if (reason) {
      this.requestService.reject(id, reason).subscribe(() => {
        this.loadReviewRequests();
      });
    }
  }
}