import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { User } from '../../../model/user.interface';
import { UserService } from '../../../service/user.service';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container mt-4">
      <h1>Create User</h1>
      @if (authService.isAdmin()) {
        <form (ngSubmit)="save()" #userForm="ngForm">
          <div class="mb-3">
            <label class="form-label">Username:</label>
            <input class="form-control" [(ngModel)]="user.username" name="username" required>
          </div>
          <div class="mb-3">
            <label class="form-label">Password:</label>
            <input type="password" class="form-control" [(ngModel)]="user.password" name="password" required>
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
export class UserCreateComponent {
  user: User = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    reviewer: false,
    admin: false
  };

  constructor(
    private userService: UserService,
    public authService: AuthService,
    private router: Router
  ) {}

  save(): void {
    if (!this.user.username || !this.user.password || !this.user.firstName || 
        !this.user.lastName || !this.user.phoneNumber || !this.user.email) {
      console.error('Missing required fields');
      return;
    }

    const userToCreate = {
      username: this.user.username,
      password: this.user.password,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      phoneNumber: this.user.phoneNumber,
      email: this.user.email,
      reviewer: this.user.reviewer || false,
      admin: this.user.admin || false
    };

    console.log('Attempting to create user:', userToCreate);

    this.userService.create(userToCreate).subscribe({
      next: (response) => {
        console.log('User created successfully:', response);
        this.router.navigate(['/users']);
      },
      error: (error) => {
        console.error('Detailed error creating user:', error);
        if (error.error) {
          console.error('Server error message:', error.error);
        }
      }
    });
  }
}
