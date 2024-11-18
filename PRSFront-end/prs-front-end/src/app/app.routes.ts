// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { ReviewerGuard } from './guard/reviewer.guard';

// User Components
import { UserListComponent } from './feature/user/user-list/user-list.component';
import { UserCreateComponent } from './feature/user/user-create/user-create.component';
import { UserDetailComponent } from './feature/user/user-detail/user-detail.component';
import { UserEditComponent } from './feature/user/user-edit/user-edit.component';

// Product Components
import { ProductListComponent } from './feature/product/product-list/product-list.component';
import { ProductCreateComponent } from './feature/product/product-create/product-create.component';
import { ProductDetailComponent } from './feature/product/product-detail/product-detail.component';
import { ProductEditComponent } from './feature/product/product-edit/product-edit.component';

// Vendor Components
import { VendorListComponent } from './feature/vendor/vendor-list/vendor-list.component';
import { VendorCreateComponent } from './feature/vendor/vendor-create/vendor-create.component';
import { VendorDetailComponent } from './feature/vendor/vendor-detail/vendor-detail.component';
import { VendorEditComponent } from './feature/vendor/vendor-edit/vendor-edit.component';

// Request Components
import { RequestListComponent } from './feature/request/request-list/request-list.component';
import { RequestCreateComponent } from './feature/request/request-create/request-create.component';
import { RequestDetailComponent } from './feature/request/request-detail/request-detail.component';
import { RequestEditComponent } from './feature/request/request-edit/request-edit.component';
import { RequestReviewComponent } from './feature/request/request-review/request-review.component';

// Line Item Components
import { LineItemCreateComponent } from './feature/line-item/line-item-create/line-item-create.component';
import { LineItemEditComponent } from './feature/line-item/line-item-edit/line-item-edit.component';
import { LineItemListComponent } from './feature/line-item/line-item-list/line-item-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { 
    path: 'login', 
    loadComponent: () => import('./feature/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '', 
    canActivate: [AuthGuard],
    children: [
      // User routes
      { path: 'users', loadComponent: () => import('./feature/user/user-list/user-list.component').then(m => m.UserListComponent) },
      { path: 'users/create', loadComponent: () => import('./feature/user/user-create/user-create.component').then(m => m.UserCreateComponent) },
      { path: 'users/:id', loadComponent: () => import('./feature/user/user-detail/user-detail.component').then(m => m.UserDetailComponent) },
      { path: 'users/:id/edit', loadComponent: () => import('./feature/user/user-edit/user-edit.component').then(m => m.UserEditComponent) },
      
      // Product routes
      { path: 'products', loadComponent: () => import('./feature/product/product-list/product-list.component').then(m => m.ProductListComponent) },
      { path: 'products/create', loadComponent: () => import('./feature/product/product-create/product-create.component').then(m => m.ProductCreateComponent) },
      { path: 'products/:id', loadComponent: () => import('./feature/product/product-detail/product-detail.component').then(m => m.ProductDetailComponent) },
      { path: 'products/:id/edit', loadComponent: () => import('./feature/product/product-edit/product-edit.component').then(m => m.ProductEditComponent) },
      
      // Vendor routes
      { path: 'vendors', loadComponent: () => import('./feature/vendor/vendor-list/vendor-list.component').then(m => m.VendorListComponent) },
      { path: 'vendors/create', loadComponent: () => import('./feature/vendor/vendor-create/vendor-create.component').then(m => m.VendorCreateComponent) },
      { path: 'vendors/:id', loadComponent: () => import('./feature/vendor/vendor-detail/vendor-detail.component').then(m => m.VendorDetailComponent) },
      { path: 'vendors/:id/edit', loadComponent: () => import('./feature/vendor/vendor-edit/vendor-edit.component').then(m => m.VendorEditComponent) },
      
      // Request routes
      { path: 'requests', loadComponent: () => import('./feature/request/request-list/request-list.component').then(m => m.RequestListComponent) },
      { path: 'requests/create', loadComponent: () => import('./feature/request/request-create/request-create.component').then(m => m.RequestCreateComponent) },
      { path: 'requests/review', loadComponent: () => import('./feature/request/request-review/request-review.component').then(m => m.RequestReviewComponent), canActivate: [ReviewerGuard] },
      { path: 'requests/:id', loadComponent: () => import('./feature/request/request-detail/request-detail.component').then(m => m.RequestDetailComponent) },
      { path: 'requests/:id/edit', loadComponent: () => import('./feature/request/request-edit/request-edit.component').then(m => m.RequestEditComponent) },
      { path: 'requests/:requestId/line-items', loadComponent: () => import('./feature/line-item/line-item-list/line-item-list.component').then(m => m.LineItemListComponent) },
      
      // Line Item routes
      { path: 'requests/:requestId/line-items/create', loadComponent: () => import('./feature/line-item/line-item-create/line-item-create.component')
        .then(c => c.LineItemCreateComponent) },
      { path: 'requests/:requestId/line-items/:id/edit', loadComponent: () => import('./feature/line-item/line-item-edit/line-item-edit.component').then(m => m.LineItemEditComponent) }
    ]
  }
];