// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: 'users',
    loadChildren: () => import('./features/user/user.routes')
      .then(m => m.USER_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: 'vendors',
    loadChildren: () => import('./features/vendor/vendor.routes')
      .then(m => m.VENDOR_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: 'products',
    loadChildren: () => import('./features/product/product.routes')
      .then(m => m.PRODUCT_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: 'requests',
    loadChildren: () => import('./features/request/request.routes')
      .then(m => m.REQUEST_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];