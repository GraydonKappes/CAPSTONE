import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { VendorService } from '../../../service/vendor.service';
import { Vendor, VendorCreate } from '../../../model/vendor.interface';

@Component({
  selector: 'app-vendor-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container mt-4">
      <h1>Create Vendor</h1>
      
      @if (errorMessage) {
        <div class="alert alert-danger">{{errorMessage}}</div>
      }

      <form (ngSubmit)="save()" #vendorForm="ngForm">
        <div class="mb-3">
          <label class="form-label">Code:</label>
          <input class="form-control" [(ngModel)]="vendor.code" name="code" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Name:</label>
          <input class="form-control" [(ngModel)]="vendor.name" name="name" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Address:</label>
          <input class="form-control" [(ngModel)]="vendor.address" name="address" required>
        </div>
        <div class="mb-3">
          <label class="form-label">City:</label>
          <input class="form-control" [(ngModel)]="vendor.city" name="city" required>
        </div>
        <div class="mb-3">
          <label class="form-label">State:</label>
          <input class="form-control" [(ngModel)]="vendor.state" name="state" required>
        </div>
        <div class="mb-3">
          <label class="form-label">ZIP:</label>
          <input class="form-control" [(ngModel)]="vendor.zip" name="zip" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Phone Number:</label>
          <input class="form-control" [(ngModel)]="vendor.phoneNumber" name="phoneNumber" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Email:</label>
          <input type="email" class="form-control" [(ngModel)]="vendor.email" name="email" required>
        </div>
        <button type="submit" class="btn btn-primary" [disabled]="!vendorForm.form.valid">Save</button>
        <a [routerLink]="['../']" class="btn btn-secondary ms-2">Cancel</a>
      </form>
    </div>
  `
})
export class VendorCreateComponent {
  vendor: VendorCreate = {
    code: '',
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phoneNumber: '',
    email: ''
  };
  errorMessage = '';

  constructor(
    private vendorService: VendorService,
    private router: Router
  ) {}

  save(): void {
    this.vendorService.create(this.vendor).subscribe({
      next: () => this.router.navigate(['/vendors']),
      error: (error) => {
        console.error('Error creating vendor:', error);
        this.errorMessage = 'Failed to create vendor';
      }
    });
  }
}