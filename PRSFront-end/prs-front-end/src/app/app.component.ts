// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './feature/menu/menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MenuComponent],
  template: `
    <app-menu></app-menu>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'prs-front-end';
}
