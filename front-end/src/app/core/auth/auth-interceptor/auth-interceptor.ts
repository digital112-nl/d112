import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if ( this.authService.hasToken() ) {
      req = this.setToken(req, this.authService.getToken());
    }

    // Also handle errors globally
    return this.handle(req, next);
  }

  private setToken(
    req: HttpRequest<any>,
    token: string
  ) {
    return req.clone({
      setHeaders: {
        'X-User-Token': `${token}`
      }
    });
  }

  private handle(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(x => x, err => {
        if ( err.status === 401 ) {
          this.router.navigateByUrl('/auth/login');
          return;
        }
      })
    );
  }
}
