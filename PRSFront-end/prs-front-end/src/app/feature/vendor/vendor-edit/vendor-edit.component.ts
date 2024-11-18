// Add this import at the top of the file
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Vendor } from '../../../model/vendor.interface';
import { VendorService } from '../../../service/vendor.service';
import { CommonModule } from '@angular/common';

// Missing Vendor Edit Component
@Component({
  selector: 'app-vendor-edit',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  providers: [VendorService],
  template: `
    <div class="container" *ngIf="vendor">
      <h1>Edit Vendor</h1>
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
    </div>
  `
})
export class VendorEditComponent implements OnInit {
  vendor?: Vendor;

  constructor(
    private vendorService: VendorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.vendorService.get(id).subscribe((vendor: Vendor) => this.vendor = vendor);
  }

  save(): void {
    if (this.vendor) {
      this.vendorService.update(this.vendor).subscribe(() => {
        this.router.navigate(['/vendors']);
      });
    }
  }
}