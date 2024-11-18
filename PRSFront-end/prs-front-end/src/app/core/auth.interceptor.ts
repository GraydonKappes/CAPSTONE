// src/app/core/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const user = localStorage.getItem('currentUser');
  if (user) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${JSON.parse(user).token}`)
    });
    return next(authReq);
  }
  return next(req);
};