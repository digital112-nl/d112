/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { UserSession } from '../models/user-session';
import { Authenticate } from '../models/authenticate';
import { UserRegister } from '../models/user-register';
@Injectable({
  providedIn: 'root',
})
class AuthenticationControllerService extends __BaseService {
  static readonly AuthenticationControllerAuthenticatePath = '/api/v1/auth/login';
  static readonly AuthenticationControllerRegisterPath = '/api/v1/auth/register';
  static readonly AuthenticationControllerGetMePath = '/api/v1/auth/me';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param body undefined
   * @return Success
   */
  AuthenticationControllerAuthenticateResponse(body?: Authenticate): __Observable<__StrictHttpResponse<UserSession>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/auth/login`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserSession>;
      })
    );
  }
  /**
   * @param body undefined
   * @return Success
   */
  AuthenticationControllerAuthenticate(body?: Authenticate): __Observable<UserSession> {
    return this.AuthenticationControllerAuthenticateResponse(body).pipe(
      __map(_r => _r.body as UserSession)
    );
  }

  /**
   * @param body undefined
   * @return Success
   */
  AuthenticationControllerRegisterResponse(body?: UserRegister): __Observable<__StrictHttpResponse<UserSession>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/auth/register`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserSession>;
      })
    );
  }
  /**
   * @param body undefined
   * @return Success
   */
  AuthenticationControllerRegister(body?: UserRegister): __Observable<UserSession> {
    return this.AuthenticationControllerRegisterResponse(body).pipe(
      __map(_r => _r.body as UserSession)
    );
  }

  /**
   * @return Success
   */
  AuthenticationControllerGetMeResponse(): __Observable<__StrictHttpResponse<UserSession>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/auth/me`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserSession>;
      })
    );
  }
  /**
   * @return Success
   */
  AuthenticationControllerGetMe(): __Observable<UserSession> {
    return this.AuthenticationControllerGetMeResponse().pipe(
      __map(_r => _r.body as UserSession)
    );
  }
}

module AuthenticationControllerService {
}

export { AuthenticationControllerService }
