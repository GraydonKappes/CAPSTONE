// src/app/feature/menu/menu.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { User } from '../../model/user.interface';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" routerLink="/">PRS</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" routerLink="/requests" routerLinkActive="active">Requests</a>
            </li>
            @if (authService.isReviewer()) {
              <li class="nav-item">
                <a class="nav-link" routerLink="/requests/review" routerLinkActive="active">Review</a>
              </li>
            }
            <li class="nav-item">
              <a class="nav-link" routerLink="/users" routerLinkActive="active">Users</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/vendors" routerLinkActive="active">Vendors</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/products" routerLinkActive="active">Products</a>
            </li>
          </ul>
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <span class="nav-link">{{authService.getCurrentUser()?.username}}</span>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/login" (click)="logout()">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `
})
export class MenuComponent implements OnInit {
  currentUser: User | null = null;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  logout(): void {
    this.authService.logout();
  }
}