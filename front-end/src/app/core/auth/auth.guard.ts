import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  public async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return this.check(state.url, route.data);
  }

  public canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return this.check(state.url, childRoute.data);
  }

  private async check(
    url,
    data
  ): Promise<boolean> {
    // If we dont have a token
    if ( !this.authService.hasToken() ) {
      await this.router.navigateByUrl(`/auth/login?returnUrl=${encodeURIComponent(url)}`, {
        replaceUrl: true
      });
      return false;
    }

    // If we have a token but we dont have a session
    if ( this.authService.hasToken() && !this.authService.hasSession() ) {
      await this.router.navigateByUrl(`/auth/verify?returnUrl=${encodeURIComponent(url)}`, {
        replaceUrl: true
      });
      return false;
    }

    return true;
  }
}
