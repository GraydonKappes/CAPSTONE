import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { User } from '../../../model/user.interface';
import { UserService } from '../../../service/user.service';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mt-4">
      <h1>Users</h1>
      
      @if (authService.isAdmin()) {
        <a routerLink="/users/create" class="btn btn-primary mb-3">Add New User</a>
        
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Reviewer</th>
              <th>Admin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            @for (user of users; track user.id) {
              <tr>
                <td>{{user.username}}</td>
                <td>{{user.firstName}} {{user.lastName}}</td>
                <td>{{user.email}}</td>
                <td>{{user.phoneNumber}}</td>
                <td>{{user.reviewer ? 'Yes' : 'No'}}</td>
                <td>{{user.admin ? 'Yes' : 'No'}}</td>
                <td>
                  <a [routerLink]="['/users', user.id]" 
                     class="btn btn-info btn-sm">View</a>
                  <a [routerLink]="['/users', user.id, 'edit']" 
                     class="btn btn-warning btn-sm mx-1">Edit</a>
                  <button (click)="deleteUser(user.id!)" 
                          class="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            }
          </tbody>
        </table>
      } @else {
        <div class="alert alert-danger">
          You do not have permission to view this page.
        </div>
      }
    </div>
  `
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UserService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.isAdmin()) {
      this.loadUsers();
    }
  }

  loadUsers(): void {
    this.userService.list().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        console.error('Error loading users:', error);
      }
    });
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.delete(id).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (error) => {
          console.error('Error deleting user:', error);
        }
      });
    }
  }
}
