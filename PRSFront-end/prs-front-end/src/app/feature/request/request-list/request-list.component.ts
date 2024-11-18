import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RequestService } from '../../../service/request.service';
import { Request } from '../../../model/request.interface';
import { AuthService } from '../../../service/auth.service';
import { CurrencyPipe } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-request-list',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe],
  template: `
    <div class="container mt-4">
      <h1>Purchase Requests</h1>
      
      <a routerLink="/requests/create" class="btn btn-primary mb-3">Create New Request</a>
      
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Justification</th>
              <th>Status</th>
              <th>Date Needed</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            @if (requests.length === 0) {
              <tr>
                <td colspan="7" class="text-center">No requests found</td>
              </tr>
            }
            @for (request of requests; track request.id) {
              <tr>
                <td>{{request.id}}</td>
                <td>{{request.description}}</td>
                <td>{{request.justification}}</td>
                <td>{{request.status}}</td>
                <td>{{request.dateNeeded | date}}</td>
                <td>{{request.total | currency}}</td>
                <td>
                  @if (request.status === 'NEW' && request.userId === authService.getCurrentUserId()) {
                    <button (click)="submitForReview(request.id!)" 
                            class="btn btn-primary btn-sm me-1">Submit</button>
                    <a [routerLink]="['/requests', request.id, 'line-items']" 
                       class="btn btn-warning btn-sm">Edit Lines</a>
                  }
                  
                  @if (authService.isReviewer() && request.status === 'REVIEW' && request.userId !== authService.getCurrentUserId()) {
                    <button (click)="approve(request.id!)" 
                            class="btn btn-success btn-sm me-1">Approve</button>
                    <button (click)="reject(request.id!)" 
                            class="btn btn-danger btn-sm">Reject</button>
                  }

                  @if (request.status === 'REJECTED') {
                    <span class="text-danger">{{request.reasonForRejection}}</span>
                  }
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class RequestListComponent implements OnInit {
  requests: Request[] = [];

  constructor(
    private requestService: RequestService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    if (this.authService.isReviewer()) {
      forkJoin({
        reviewRequests: this.requestService.getRequestsForReview(),
        ownRequests: this.requestService.getRequestsForUser(this.authService.getCurrentUserId()!)
      }).subscribe(({ reviewRequests, ownRequests }) => {
        this.requests = [...reviewRequests, ...ownRequests]
          .filter((request, index, self) => 
            index === self.findIndex((r) => r.id === request.id)
          );
      });
    } else {
      this.requestService.getRequestsForUser(this.authService.getCurrentUserId()!)
        .subscribe(requests => this.requests = requests);
    }
  }

  submitForReview(id: number): void {
    this.requestService.submitForReview(id).subscribe(() => this.loadRequests());
  }

  approve(id: number): void {
    this.requestService.approve(id).subscribe(() => this.loadRequests());
  }

  reject(id: number): void {
    const reason = prompt('Please enter rejection reason:');
    if (reason) {
      this.requestService.reject(id, reason).subscribe(() => this.loadRequests());
    }
  }
}
