import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { AuthService } from '../../../service/auth.service';
import { RequestService } from '../../../service/request.service';
import { Request } from '../../../model/request.interface';

@Component({
  selector: 'app-request-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe],
  template: `
    <div class="container mt-4">
      <h1>Request Details</h1>
      @if (request) {
        <div class="card">
          <div class="card-header">
            Request #{{request.id}}
          </div>
          <div class="card-body">
            <div class="mb-3">
              <strong>Description:</strong> {{request.description}}
            </div>
            <div class="mb-3">
              <strong>Justification:</strong> {{request.justification}}
            </div>
            <div class="mb-3">
              <strong>Status:</strong> {{request.status}}
            </div>
            <div class="mb-3">
              <strong>Total:</strong> {{request.total | currency}}
            </div>
            <div class="mb-3">
              <strong>Delivery Mode:</strong> {{request.deliveryMode}}
            </div>
            <div class="mb-3">
              <strong>Submitted Date:</strong> {{request.submittedDate | date}}
            </div>
            @if (request.reasonForRejection) {
              <div class="mb-3">
                <strong>Rejection Reason:</strong> {{request.reasonForRejection}}
              </div>
            }
          </div>
          <div class="card-footer">
            <a routerLink="/requests" class="btn btn-secondary">Back to List</a>
            
            <!-- Review actions for reviewers -->
            @if (canApprove(request)) {
              <button (click)="approve(request.id)" class="btn btn-success ms-2">Approve</button>
              <button (click)="reject(request.id)" class="btn btn-danger ms-2">Reject</button>
            }
            
            <!-- Submit for Review button for PENDING requests -->
            @if (canSubmitForReview(request)) {
              <button (click)="submitForReview(request.id)" class="btn btn-primary ms-2">Submit for Review</button>
            }
            
            <!-- Delete for admins -->
            @if (authService.isAdmin()) {
              <button (click)="delete(request.id)" class="btn btn-danger ms-2">Delete</button>
            }
          </div>
        </div>
      } @else {
        <div>Loading...</div>
      }
    </div>
  `
})
export class RequestDetailComponent implements OnInit {
  request?: Request;

  constructor(
    private requestService: RequestService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.requestService.get(id).subscribe({
        next: (request) => {
          this.request = request;
        },
        error: (error) => {
          console.error('Error loading request:', error);
        }
      });
    }
  }

  canApprove(request: Request): boolean {
    return request.status === 'REVIEW' && 
           (this.authService.isReviewer() || this.authService.isAdmin()) &&
           request.userId !== this.authService.getCurrentUserId();
  }

  canSubmitForReview(request: Request): boolean {
    return request.status === 'NEW' && 
           request.userId === this.authService.getCurrentUserId();
  }

  approve(id: number | undefined): void {
    if (!id) return;
    
    this.requestService.approve(id).subscribe({
      next: () => this.loadRequest(),
      error: (error) => console.error('Error approving request:', error)
    });
  }

  reject(id: number | undefined): void {
    if (!id) return;
    
    const reason = prompt('Please enter rejection reason:');
    if (reason) {
      this.requestService.reject(id, reason).subscribe({
        next: () => this.loadRequest(),
        error: (error) => console.error('Error rejecting request:', error)
      });
    }
  }

  submitForReview(id: number | undefined): void {
    if (!id) return;
    
    this.requestService.submitForReview(id).subscribe({
      next: () => {
        this.loadRequest();
      },
      error: (error) => {
        console.error('Error submitting for review:', error);
      }
    });
  }

  delete(id: number | undefined): void {
    if (!id) return;
    
    if (confirm('Are you sure you want to delete this request?')) {
      this.requestService.delete(id).subscribe({
        next: () => {
          window.location.href = '/requests';
        },
        error: (error) => {
          console.error('Error deleting request:', error);
        }
      });
    }
  }

  private loadRequest(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.requestService.get(id).subscribe({
        next: (request) => {
          this.request = request;
        },
        error: (error) => {
          console.error('Error loading request:', error);
        }
      });
    }
  }
}
