import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { VendorService } from '../../../service/vendor.service';
import { Vendor } from '../../../model/vendor.interface';

@Component({
  selector: 'app-vendor-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container mt-4">
      <h1>Edit Vendor</h1>
      
      @if (errorMessage) {
        <div class="alert alert-danger">{{errorMessage}}</div>
      }

      @if (vendor) {
        <form (ngSubmit)="save()" #vendorForm="ngForm">
          <div class="mb-3">
            <label>Code:</label>
            <input class="form-control" [(ngModel)]="vendor!.code" name="code" required>
          </div>
          <div class="mb-3">
            <label>Name:</label>
            <input class="form-control" [(ngModel)]="vendor!.name" name="name" required>
          </div>
          <div class="mb-3">
            <label>Address:</label>
            <input class="form-control" [(ngModel)]="vendor!.address" name="address" required>
          </div>
          <div class="mb-3">
            <label>City:</label>
            <input class="form-control" [(ngModel)]="vendor!.city" name="city" required>
          </div>
          <div class="mb-3">
            <label>State:</label>
            <input class="form-control" [(ngModel)]="vendor!.state" name="state" required>
          </div>
          <div class="mb-3">
            <label>ZIP:</label>
            <input class="form-control" [(ngModel)]="vendor!.zip" name="zip" required>
          </div>
          <div class="mb-3">
            <label>Phone:</label>
            <input class="form-control" [(ngModel)]="vendor!.phoneNumber" name="phoneNumber" required>
          </div>
          <div class="mb-3">
            <label>Email:</label>
            <input type="email" class="form-control" [(ngModel)]="vendor!.email" name="email" required>
          </div>
          <button type="submit" class="btn btn-primary" [disabled]="!vendorForm.form.valid">Save</button>
          <a [routerLink]="['../../']" class="btn btn-secondary ms-2">Cancel</a>
        </form>
      } @else {
        <div>Loading...</div>
      }
    </div>
  `
})
export class VendorEditComponent implements OnInit {
  vendor: Vendor | null = null;
  errorMessage = '';

  constructor(
    private vendorService: VendorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadVendor(id);
    }
  }

  loadVendor(id: number): void {
    this.vendorService.get(id).subscribe({
      next: (vendor) => this.vendor = vendor,
      error: (error) => {
        console.error('Error loading vendor:', error);
        this.errorMessage = 'Failed to load vendor';
      }
    });
  }

  save(): void {
    if (this.vendor) {
      this.vendorService.update(this.vendor.id, this.vendor).subscribe({
        next: () => this.router.navigate(['/vendors']),
        error: (error) => {
          console.error('Error updating vendor:', error);
          this.errorMessage = 'Failed to update vendor';
        }
      });
    }
  }
}