import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { LineItemService } from '../../../service/line-item.service';
import { ProductService } from '../../../service/product.service';
import { Product } from '../../../model/product.interface';
import { LineItem } from '../../../model/line-item.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-line-item-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, CurrencyPipe],
  template: `
    <div class="container mt-4">
      <h2>Add Line Item</h2>
      <form (ngSubmit)="save()" #lineItemForm="ngForm">
        <div class="mb-3">
          <label class="form-label">Product:</label>
          <select class="form-control" [(ngModel)]="lineItem.productId" 
                  name="productId" required>
            <option [ngValue]="null">Select a product</option>
            @for (product of products; track product.id) {
              <option [ngValue]="product.id">
                {{product.name}} ({{product.price | currency}})
              </option>
            }
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label">Quantity:</label>
          <input type="number" class="form-control" [(ngModel)]="lineItem.quantity" 
                 name="quantity" required min="1">
        </div>

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
  lineItem: Partial<LineItem> = {
    quantity: 1
  };

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
      this.lineItem.requestId = requestId;
      this.loadProducts();
    } else {
      this.router.navigate(['/requests']);
    }
  }

  loadProducts(): void {
    this.productService.list().subscribe({
      next: (products) => this.products = products,
      error: (error) => console.error('Error loading products:', error)
    });
  }

  save(): void {
    if (this.lineItem.productId && this.lineItem.quantity && this.lineItem.requestId) {
      this.lineItemService.create(this.lineItem as LineItem).subscribe({
        next: () => {
          this.router.navigate(['/requests', this.requestId, 'line-items']);
        },
        error: (error) => console.error('Error creating line item:', error)
      });
    }
  }
}
