import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Params, Router, RouterStateSnapshot } from '@angular/router';
import * as _ from 'lodash';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
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
    // if ( !this.sessionService.hasToken() ) {
    //   await this.router.navigateByUrl(`/auth/login?returnUrl=${encodeURIComponent(url)}`, {
    //     replaceUrl: true
    //   });
    //   return false;
    // }

    // If we have a token but we dont have a session
    // if ( this.sessionService.hasToken() && !this.sessionService.hasSession() ) {
    //   await this.router.navigateByUrl(`/auth/verify?returnUrl=${encodeURIComponent(url)}`, {
    //     replaceUrl: true
    //   });
    //   return false;
    // }

    // If we have a session and we are not on verify-phone

    return true;
  }
}
