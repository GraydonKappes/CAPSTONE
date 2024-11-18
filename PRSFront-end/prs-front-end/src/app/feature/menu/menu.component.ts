// src/app/feature/menu/menu.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" routerLink="/">PRS</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            @if (authService.isLoggedIn()) {
              <li class="nav-item">
                <a class="nav-link" routerLink="/requests" routerLinkActive="active">Requests</a>
              </li>
              @if (authService.isReviewer()) {
                <li class="nav-item">
                  <a class="nav-link" routerLink="/requests/review" routerLinkActive="active">Review</a>
                </li>
              }
              @if (authService.isAdmin()) {
                <li class="nav-item">
                  <a class="nav-link" routerLink="/users" routerLinkActive="active">Users</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" routerLink="/vendors" routerLinkActive="active">Vendors</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" routerLink="/products" routerLinkActive="active">Products</a>
                </li>
              }
            }
          </ul>
          <ul class="navbar-nav">
            @if (authService.isLoggedIn()) {
              <li class="nav-item">
                <a class="nav-link" style="cursor: pointer;" (click)="logout()">Logout</a>
              </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  `
})
export class MenuComponent {
  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}