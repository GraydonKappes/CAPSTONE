// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule
  ],
  template: `
    <mat-toolbar color="primary">
      <span>PRS System</span>
      <span class="spacer"></span>
      @if (authService.isAuthenticated()) {
        <button mat-button routerLink="/users">Users</button>
        <button mat-button routerLink="/vendors">Vendors</button>
        <button mat-button routerLink="/products">Products</button>
        <button mat-button routerLink="/requests">Requests</button>
        <button mat-button (click)="logout()">Logout</button>
      }
    </mat-toolbar>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
    main {
      padding: 20px;
    }
  `]
})
export class AppComponent {
  constructor(protected authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}