// src/app/feature/vendor/vendor-detail/vendor-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { Vendor } from '../../../model/vendor.interface';
import { VendorService } from '../../../service/vendor.service';

@Component({
  selector: 'app-vendor-detail',
  standalone: true,
  imports: [RouterModule, NgIf],
  template: `
    <div class="container" *ngIf="vendor">
      <h1>Vendor Details</h1>
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{{vendor.name}}</h5>
          <p class="card-text">
            <strong>Code:</strong> {{vendor.code}}<br>
            <strong>Address:</strong> {{vendor.address}}<br>
            <strong>City:</strong> {{vendor.city}}<br>
            <strong>State:</strong> {{vendor.state}}<br>
            <strong>ZIP:</strong> {{vendor.zip}}<br>
            <strong>Phone:</strong> {{vendor.phoneNumber}}<br>
            <strong>Email:</strong> {{vendor.email}}
          </p>
          <a [routerLink]="['../']" class="btn btn-secondary">Back</a>
          <a [routerLink]="['edit']" class="btn btn-primary ms-2">Edit</a>
        </div>
      </div>
    </div>
  `
})
export class VendorDetailComponent implements OnInit {
  vendor?: Vendor;

  constructor(
    private route: ActivatedRoute,
    private vendorService: VendorService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.vendorService.get(id).subscribe(vendor => this.vendor = vendor);
  }
}