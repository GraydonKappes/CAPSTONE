// src/app/feature/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h3 class="mb-0">Login</h3>
            </div>
            <div class="card-body">
              @if (errorMessage) {
                <div class="alert alert-danger">{{errorMessage}}</div>
              }
              <form (ngSubmit)="login()" #loginForm="ngForm">
                <div class="mb-3">
                  <label for="username" class="form-label">Username:</label>
                  <input type="text" 
                         class="form-control" 
                         id="username"
                         [(ngModel)]="credentials.username" 
                         name="username" 
                         required>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password:</label>
                  <input type="password" 
                         class="form-control" 
                         id="password"
                         [(ngModel)]="credentials.password" 
                         name="password" 
                         required>
                </div>
                <button type="submit" 
                        class="btn btn-primary" 
                        [disabled]="!loginForm.form.valid || isLoading">
                  {{isLoading ? 'Logging in...' : 'Login'}}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  credentials = {
    username: '',
    password: ''
  };
  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    if (!this.credentials.username || !this.credentials.password) {
      this.errorMessage = 'Please enter both username and password';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    console.log('Attempting login with:', this.credentials); // Debug log

    this.authService.login(this.credentials.username, this.credentials.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.router.navigate(['/requests']);
      },
      error: (error) => {
        console.error('Login error details:', error);
        this.errorMessage = 'Login failed. Please check your credentials.';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}