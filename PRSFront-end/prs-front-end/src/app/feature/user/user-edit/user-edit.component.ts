import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../model/user.interface';
import { UserService } from '../../../service/user.service';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container mt-4">
      <h1>Edit User</h1>
      @if (user && authService.isAdmin()) {
        <form (ngSubmit)="save()" #userForm="ngForm">
          <div class="mb-3">
            <label class="form-label">Username:</label>
            <input class="form-control" [(ngModel)]="user.username" name="username" required>
          </div>
          <div class="mb-3">
            <label class="form-label">New Password (leave blank to keep current):</label>
            <input type="password" class="form-control" [(ngModel)]="newPassword" name="password">
          </div>
          <div class="mb-3">
            <label class="form-label">First Name:</label>
            <input class="form-control" [(ngModel)]="user.firstName" name="firstName" required>
          </div>
          <div class="mb-3">
            <label class="form-label">Last Name:</label>
            <input class="form-control" [(ngModel)]="user.lastName" name="lastName" required>
          </div>
          <div class="mb-3">
            <label class="form-label">Phone:</label>
            <input class="form-control" [(ngModel)]="user.phoneNumber" name="phoneNumber" required>
          </div>
          <div class="mb-3">
            <label class="form-label">Email:</label>
            <input type="email" class="form-control" [(ngModel)]="user.email" name="email" required>
          </div>
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" [(ngModel)]="user.reviewer" name="reviewer" id="reviewer">
            <label class="form-check-label" for="reviewer">Reviewer</label>
          </div>
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" [(ngModel)]="user.admin" name="admin" id="admin">
            <label class="form-check-label" for="admin">Admin</label>
          </div>
          <button type="submit" class="btn btn-primary" [disabled]="!userForm.form.valid">Save</button>
          <a routerLink="/users" class="btn btn-secondary ms-2">Cancel</a>
        </form>
      } @else {
        <div class="alert alert-danger">
          You do not have permission to view this page.
        </div>
      }
    </div>
  `
})
export class UserEditComponent implements OnInit {
  user?: User;
  newPassword: string = '';

  constructor(
    private userService: UserService,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
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

  save(): void {
    if (this.user) {
      if (this.newPassword) {
        this.user.password = this.newPassword;
      }
      
      this.userService.update(this.user).subscribe({
        next: () => {
          this.router.navigate(['/users']);
        },
        error: (error) => {
          console.error('Error updating user:', error);
        }
      });
    }
  }
}
