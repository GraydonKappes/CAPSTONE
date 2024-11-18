// src/app/feature/vendor/vendor-list/vendor-list.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';
import { VendorService } from '../../../service/vendor.service';
import { Vendor } from '../../../model/vendor.interface';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-vendor-list',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="container mt-4">
      <h1>Vendors</h1>
      
      @if (authService.isAdmin()) {
        <a routerLink="/vendors/create" class="btn btn-primary mb-3">Add New</a>
      }
      
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>City</th>
            <th>State</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          @for (vendor of vendors; track vendor.id) {
            <tr>
              <td>{{vendor.code}}</td>
              <td>{{vendor.name}}</td>
              <td>{{vendor.city}}</td>
              <td>{{vendor.state}}</td>
              <td>
                <a [routerLink]="['/vendors', vendor.id]" 
                   class="btn btn-info btn-sm">View</a>
                
                @if (authService.isAdmin() && vendor.id) {
                  <a [routerLink]="['/vendors', vendor.id, 'edit']" 
                     class="btn btn-warning btn-sm mx-1">Edit</a>
                  <button (click)="deleteVendor(vendor.id)" 
                          class="btn btn-danger btn-sm">Delete</button>
                }
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `
})
export class VendorListComponent implements OnInit {
  vendors: Vendor[] = [];

  constructor(
    private vendorService: VendorService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadVendors();
  }

  loadVendors(): void {
    this.vendorService.list().subscribe({
      next: (vendors) => {
        this.vendors = vendors;
      },
      error: (error) => {
        console.error('Error loading vendors:', error);
      }
    });
  }

  deleteVendor(id: number): void {
    if (id && confirm('Are you sure you want to delete this vendor?')) {
      this.vendorService.delete(id).subscribe({
        next: () => {
          this.loadVendors();
        },
        error: (error) => {
          console.error('Error deleting vendor:', error);
        }
      });
    }
  }
}