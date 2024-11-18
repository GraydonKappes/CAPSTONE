import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { LineItemService } from '../../../service/line-item.service';
import { ProductService } from '../../../service/product.service';
import { Product } from '../../../model/product.interface';
import { CurrencyPipe } from '@angular/common';
import { LineItem } from '../../../model/line-item.interface';
import { Request } from '../../../model/request.interface';

@Component({
  selector: 'app-line-item-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, CurrencyPipe],
  template: `
    <div class="container mt-4">
      <h2>Add Line Item</h2>
      @if (errorMessage) {
        <div class="alert alert-danger">{{errorMessage}}</div>
      }
      <form (ngSubmit)="save()" #lineItemForm="ngForm">
        <div class="mb-3">
          <label class="form-label">Product:</label>
          <select class="form-control" [(ngModel)]="selectedProduct" 
                  name="product" required>
            <option [ngValue]="null">Select a product</option>
            @for (product of products; track product.id) {
              <option [ngValue]="product">
                {{product.name}} ({{product.price | currency}})
              </option>
            }
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label">Quantity:</label>
          <input type="number" class="form-control" [(ngModel)]="quantity" 
                 name="quantity" required min="1">
        </div>

        @if (selectedProduct) {
          <div class="mb-3">
            <strong>Line Total: </strong>
            {{selectedProduct.price * quantity | currency}}
          </div>
        }

        <button type="submit" class="btn btn-primary" 
                [disabled]="!lineItemForm.form.valid">Add Line Item</button>
        <a [routerLink]="['/requests', requestId, 'line-items']" 
           class="btn btn-secondary ms-2">Cancel</a>
      </form>
    </div>
  `
})
export class LineItemCreateComponent implements OnInit {
  requestId!: number;
  products: Product[] = [];
  selectedProduct: Product | null = null;
  quantity: number = 1;
  errorMessage = '';

  constructor(
    private lineItemService: LineItemService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const requestId = Number(this.route.snapshot.paramMap.get('requestId'));
    if (requestId) {
      this.requestId = requestId;
      this.loadProducts();
    } else {
      this.router.navigate(['/requests']);
    }
  }

  loadProducts(): void {
    this.productService.list().subscribe({
      next: (products) => this.products = products,
      error: (error) => {
        console.error('Error loading products:', error);
        this.errorMessage = 'Failed to load products';
      }
    });
  }

  save(): void {
    if (this.selectedProduct && this.quantity > 0) {
      const lineItem: LineItem = {
        request: { id: this.requestId } as Request,
        product: this.selectedProduct,
        quantity: this.quantity
      };

      this.lineItemService.create(lineItem).subscribe({
        next: () => {
          this.router.navigate(['/requests', this.requestId, 'line-items']);
        },
        error: (error) => {
          console.error('Error creating line item:', error);
          this.errorMessage = 'Failed to create line item. Please try again.';
        }
      });
    }
  }
}
