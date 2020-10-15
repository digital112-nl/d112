/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
class TwilioControllerService extends __BaseService {
  static readonly TwilioControllerIncomingCallPath = '/api/v1/twilio';
  static readonly TwilioControllerIncomingCallbackPath = '/api/v1/twilio/callback';
  static readonly TwilioControllerIncomingTranscribePath = '/api/v1/twilio/transcribe';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param body undefined
   */
  TwilioControllerIncomingCallResponse(body?: {}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/twilio`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param body undefined
   */
  TwilioControllerIncomingCall(body?: {}): __Observable<null> {
    return this.TwilioControllerIncomingCallResponse(body).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param body undefined
   */
  TwilioControllerIncomingCallbackResponse(body?: {}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/twilio/callback`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param body undefined
   */
  TwilioControllerIncomingCallback(body?: {}): __Observable<null> {
    return this.TwilioControllerIncomingCallbackResponse(body).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param body undefined
   */
  TwilioControllerIncomingTranscribeResponse(body?: {}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/twilio/transcribe`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param body undefined
   */
  TwilioControllerIncomingTranscribe(body?: {}): __Observable<null> {
    return this.TwilioControllerIncomingTranscribeResponse(body).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module TwilioControllerService {
}

export { TwilioControllerService }
