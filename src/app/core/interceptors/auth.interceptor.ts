import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router); // Use `inject()` to get dependencies
  const token = sessionStorage.getItem('token');
  // const lang = sessionStorage.getItem('lang');

  // Clone and modify the request headers
  const modifiedReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      ...(token
        ? {
            Authorization: `JWT ${token}`,
            'x-access-token': `JWT ${token}`,
          }
        : {}),
      // ...(lang ? { language: lang } : {}),
    },
  });

  return next(modifiedReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        sessionStorage.clear();
        router.navigate(['/admin/login']);
      } else if (error.name === 'TimeoutError' || error.status === 0) {
        alert('Server timed out! Please try again later.');
        sessionStorage.clear();
        router.navigate(['/admin/login']);
      }

      return throwError(() => error);
    })
  );
};
