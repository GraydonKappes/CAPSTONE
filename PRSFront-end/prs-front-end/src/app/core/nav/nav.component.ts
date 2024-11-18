import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { User } from '../../model/user.interface';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" routerLink="/">
          <i class="bi bi-cart3"></i> PRS
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="/requests" routerLinkActive="active">
                <i class="bi bi-list-check"></i> Requests
              </a>
            </li>
            @if (authService.isAdmin()) {
              <li class="nav-item">
                <a class="nav-link" routerLink="/products" routerLinkActive="active">
                  <i class="bi bi-box"></i> Products
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/vendors" routerLinkActive="active">
                  <i class="bi bi-building"></i> Vendors
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/users" routerLinkActive="active">
                  <i class="bi bi-people"></i> Users
                </a>
              </li>
            }
            @if (authService.isReviewer()) {
              <li class="nav-item">
                <a class="nav-link" routerLink="/requests/review" routerLinkActive="active">
                  <i class="bi bi-check-square"></i> Review
                </a>
              </li>
            }
          </ul>
          
          @if (currentUser) {
            <ul class="navbar-nav">
              <li class="nav-item">
                <span class="nav-link me-3">
                  <i class="bi bi-person-circle"></i> {{currentUser.username}}
                </span>
              </li>
              <li class="nav-item">
                <a class="nav-link" style="cursor: pointer;" (click)="logout()">
                  <i class="bi bi-box-arrow-right"></i> Logout
                </a>
              </li>
            </ul>
          }
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar-nav .nav-link i {
      margin-right: 5px;
    }
    .nav-link.active {
      font-weight: bold;
      color: white !important;
    }
  `]
})
export class NavComponent implements OnInit {
  currentUser: User | null = null;

  constructor(
    public authService: AuthService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
} 