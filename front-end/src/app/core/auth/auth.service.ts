import { Injectable } from '@angular/core';
import { isNil } from 'lodash';
import { CookieService } from 'ngx-cookie-service';
import { Authenticate, UserRegister, UserSession } from '../../api/models';
import { AuthenticationControllerService } from '../../api/services';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userSession: UserSession;
  private userTokenLocation = 'User.Token.v1';

  constructor(
    private authenticationController: AuthenticationControllerService,
    private cookieService: CookieService
  ) {
  }

  public async login(authenticate: Authenticate) {
    this.userSession = await this.authenticationController
      .AuthenticationControllerAuthenticate(authenticate)
      .toPromise();
    this.saveToken();
  }

  public async register(register: UserRegister) {
    this.userSession = await this.authenticationController
      .AuthenticationControllerRegister(register)
      .toPromise();
    this.saveToken();
  }

  public hasToken(): boolean {
    return !isNil(this.cookieService.get(this.userTokenLocation));
  }

  public deleteToken() {
    this.cookieService.delete(this.userTokenLocation);
    this.userSession = null;
  }

  public async load() {
    this.userSession = await this.authenticationController
      .AuthenticationControllerGetMe()
      .toPromise();
  }

  public hasSession() {
    return this.hasToken() && !isNil(this.userSession);
  }

  public getToken() {
    return this.cookieService.get(this.userTokenLocation);
  }

  private saveToken() {
    this.cookieService.set(this.userTokenLocation, this.userSession.token);
  }
}
