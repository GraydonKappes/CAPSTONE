import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../model/user.interface';
import { UserService } from '../../../service/user.service';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mt-4">
      <h1>User Details</h1>
      @if (user && authService.isAdmin()) {
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{user.firstName}} {{user.lastName}}</h5>
            <div class="card-text">
              <p><strong>Username:</strong> {{user.username}}</p>
              <p><strong>Email:</strong> {{user.email}}</p>
              <p><strong>Phone:</strong> {{user.phoneNumber}}</p>
              <p><strong>Reviewer:</strong> {{user.reviewer ? 'Yes' : 'No'}}</p>
              <p><strong>Admin:</strong> {{user.admin ? 'Yes' : 'No'}}</p>
            </div>
            <div class="mt-3">
              <a routerLink="/users" class="btn btn-secondary">Back to List</a>
              <a [routerLink]="['/users', user.id, 'edit']" class="btn btn-primary ms-2">Edit</a>
              <button (click)="deleteUser()" class="btn btn-danger ms-2">Delete</button>
            </div>
          </div>
        </div>
      } @else {
        <div class="alert alert-danger">
          You do not have permission to view this page.
        </div>
      }
    </div>
  `
})
export class UserDetailComponent implements OnInit {
  user?: User;

  constructor(
    private userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isAdmin()) {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      if (id) {
        this.loadUser(id);
      }
    }
  }

  loadUser(id: number): void {
    this.userService.get(id).subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (error) => {
        console.error('Error loading user:', error);
      }
    });
  }

  deleteUser(): void {
    if (this.user && confirm('Are you sure you want to delete this user?')) {
      this.userService.delete(this.user.id!).subscribe({
        next: () => {
          this.router.navigate(['/users']);
        },
        error: (error) => {
          console.error('Error deleting user:', error);
        }
      });
    }
  }
}
