// src/app/service/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../model/user.interface';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/users/login';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  login(username: string, password: string): Observable<User> {
    const credentials = {
      "username": username,
      "password": password
    };

    console.log('Sending login request:', credentials);
    
    return this.http.post<User>(this.apiUrl, credentials).pipe(
      tap({
        next: (user) => {
          console.log('Login response:', user);
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        },
        error: (error) => {
          console.error('Login error:', error);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    window.location.href = '/login';
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getCurrentUserId(): number | undefined {
    return this.getCurrentUser()?.id;
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  isReviewer(): boolean {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return false;
    return currentUser.reviewer || currentUser.admin || false;
  }

  isAdmin(): boolean {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return false;
    return currentUser.admin || false;
  }
}