import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Vendor } from '../../../model/vendor.interface';
import { VendorService } from '../../../service/vendor.service';
import { CommonModule } from '@angular/common';

// src/app/feature/vendor/vendor-create/vendor-create.component.ts
@Component({
  selector: 'app-vendor-create',
  standalone: true,
  imports: [RouterModule, FormsModule],
  template: `
    <div class="container">
      <h1>Create Vendor</h1>
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
  vendor: Vendor = {
    code: '',
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phoneNumber: '',
    email: ''
  };

  constructor(
    private vendorService: VendorService,
    private router: Router
  ) {}

  save(): void {
    this.vendorService.create(this.vendor).subscribe(() => {
      this.router.navigate(['/vendors']);
    });
  }
}