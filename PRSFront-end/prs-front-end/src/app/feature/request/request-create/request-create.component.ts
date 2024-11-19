import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Request, RequestStatus } from '../../../model/request.interface';
import { RequestService } from '../../../service/request.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../service/auth.service';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '../../../service/product.service';
import { LineItemService } from '../../../service/line-item.service';
import { forkJoin } from 'rxjs';
import { Product } from '../../../model/product.interface';
import { LineItem } from '../../../model/line-item.interface';

@Component({
  selector: 'app-request-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, CurrencyPipe],
  template: `
    <div class="container mt-4">
      <h2>Create Purchase Request</h2>
      <form (ngSubmit)="save()" #requestForm="ngForm">
        <!-- Request Details -->
        <div class="mb-3">
          <label class="form-label">Description:</label>
          <input type="text" class="form-control" [(ngModel)]="request.description" 
                 name="description" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Justification:</label>
          <textarea class="form-control" [(ngModel)]="request.justification" 
                    name="justification" required></textarea>
        </div>
        <div class="mb-3">
          <label class="form-label">Date Needed:</label>
          <input type="date" class="form-control" [(ngModel)]="request.dateNeeded" 
                 name="dateNeeded" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Delivery Mode:</label>
          <select class="form-control" [(ngModel)]="request.deliveryMode" 
                  name="deliveryMode" required>
            <option value="Mail">Mail</option>
            <option value="Pickup">Pickup</option>
          </select>
        </div>

        <!-- Line Items -->
        <div class="card mb-3">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h4 class="mb-0">Line Items</h4>
            <button type="button" class="btn btn-secondary" 
                    (click)="addLineItem()">Add Line Item</button>
          </div>
          <div class="card-body">
            @if (lineItems.length === 0) {
              <p>No line items added yet.</p>
            } @else {
              <table class="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  @for (item of lineItems; track $index) {
                    <tr>
                      <td>
                        <select class="form-control" [(ngModel)]="item.productId" 
                                [name]="'product-' + $index" required>
                          <option [ngValue]="null">Select a product</option>
                          @for (product of products; track product.id) {
                            <option [ngValue]="product.id">
                              {{product.name}} ({{product.price | currency}})
                            </option>
                          }
                        </select>
                      </td>
                      <td>
                        <input type="number" class="form-control" 
                               [(ngModel)]="item.quantity" 
                               [name]="'quantity-' + $index" 
                               min="1" required>
                      </td>
                      <td>{{getProductPrice(item.productId) | currency}}</td>
                      <td>{{getLineTotal(item) | currency}}</td>
                      <td>
                        <button type="button" class="btn btn-danger btn-sm" 
                                (click)="removeLineItem($index)">Remove</button>
                      </td>
                    </tr>
                  }
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3" class="text-end"><strong>Total:</strong></td>
                    <td><strong>{{getTotal() | currency}}</strong></td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            }
          </div>
        </div>

        <div class="mt-4">
          <button type="submit" class="btn btn-primary" 
                  [disabled]="!requestForm.form.valid || lineItems.length === 0">
            Create Request
          </button>
          <a routerLink="/requests" class="btn btn-secondary ms-2">Cancel</a>
        </div>
      </form>
    </div>
  `
})
export class RequestCreateComponent implements OnInit {
  request: Partial<Request> = {
    description: '',
    justification: '',
    deliveryMode: 'Mail',
    status: 'NEW',
    dateNeeded: new Date()
  };

  lineItems: Array<{
    productId: number | null;
    quantity: number;
  }> = [];

  products: Product[] = [];

  constructor(
    private requestService: RequestService,
    private productService: ProductService,
    private lineItemService: LineItemService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.list().subscribe({
      next: (products) => this.products = products,
      error: (error) => console.error('Error loading products:', error)
    });
  }

  addLineItem(): void {
    this.lineItems.push({
      productId: null,
      quantity: 1
    });
  }

  removeLineItem(index: number): void {
    this.lineItems.splice(index, 1);
  }

  getProductPrice(productId: number | null): number {
    if (!productId) return 0;
    const product = this.products.find(p => p.id === productId);
    return product?.price || 0;
  }

  getLineTotal(item: any): number {
    return item.quantity * this.getProductPrice(item.productId);
  }

  getTotal(): number {
    return this.lineItems.reduce((sum, item) => 
      sum + this.getLineTotal(item), 0);
  }

  save(): void {
    if (!this.authService.getCurrentUserId()) {
      console.error('No user ID found');
      return;
    }

    const newRequest: Partial<Request> = {
      ...this.request,
      userId: this.authService.getCurrentUserId()!,
      status: 'NEW',
      total: this.getTotal(),
      submittedDate: new Date()
    };

    this.requestService.create(newRequest as Request).subscribe({
      next: (createdRequest) => {
        const lineItemObservables = this.lineItems
          .filter(item => item.productId && item.quantity)
          .map(item => {
            const lineItem = {
              request: createdRequest,
              product: { id: item.productId! },
              quantity: item.quantity
            };
            return this.lineItemService.create(lineItem as LineItem);
          });

        forkJoin(lineItemObservables).subscribe({
          next: () => {
            this.router.navigate(['/requests']);
          },
          error: (error) => {
            console.error('Error creating line items:', error);
          }
        });
      },
      error: (error) => {
        console.error('Error creating request:', error);
      }
    });
  }
}
