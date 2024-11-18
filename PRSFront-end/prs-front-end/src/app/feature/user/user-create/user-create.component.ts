import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { User, UserCreate } from '../../../model/user.interface';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container mt-4">
      <h1>Create User</h1>
      
      @if (errorMessage) {
        <div class="alert alert-danger">{{errorMessage}}</div>
      }

      <form (ngSubmit)="save()" #userForm="ngForm">
        <div class="mb-3">
          <label class="form-label">Username:</label>
          <input type="text" class="form-control" [(ngModel)]="user.username" 
                 name="username" required>
        </div>

        <div class="mb-3">
          <label class="form-label">Password:</label>
          <input type="password" class="form-control" [(ngModel)]="user.password" 
                 name="password" required>
        </div>

        <div class="mb-3">
          <label class="form-label">First Name:</label>
          <input type="text" class="form-control" [(ngModel)]="user.firstName" 
                 name="firstName" required>
        </div>

        <div class="mb-3">
          <label class="form-label">Last Name:</label>
          <input type="text" class="form-control" [(ngModel)]="user.lastName" 
                 name="lastName" required>
        </div>

        <div class="mb-3">
          <label class="form-label">Phone Number:</label>
          <input type="tel" class="form-control" [(ngModel)]="user.phoneNumber" 
                 name="phoneNumber" required>
        </div>

        <div class="mb-3">
          <label class="form-label">Email:</label>
          <input type="email" class="form-control" [(ngModel)]="user.email" 
                 name="email" required>
        </div>

        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" [(ngModel)]="user.reviewer" 
                 name="reviewer" id="reviewer">
          <label class="form-check-label" for="reviewer">Reviewer</label>
        </div>

        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" [(ngModel)]="user.admin" 
                 name="admin" id="admin">
          <label class="form-check-label" for="admin">Admin</label>
        </div>

        <button type="submit" class="btn btn-primary" 
                [disabled]="!userForm.form.valid">Create</button>
        <a routerLink="/users" class="btn btn-secondary ms-2">Cancel</a>
      </form>
    </div>
  `
})
export class UserCreateComponent {
  user: UserCreate = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    reviewer: false,
    admin: false
  };
  errorMessage = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  save(): void {
    this.userService.create(this.user).subscribe({
      next: () => this.router.navigate(['/users']),
      error: (error) => {
        console.error('Error creating user:', error);
        this.errorMessage = 'Failed to create user';
      }
    });
  }
}
