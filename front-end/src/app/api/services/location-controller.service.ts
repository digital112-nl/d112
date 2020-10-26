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
class LocationControllerService extends __BaseService {
  static readonly LocationControllerGetLocationPagePath = '/location/{token}';
  static readonly LocationControllerSaveLocationPath = '/location/{token}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param token undefined
   */
  LocationControllerGetLocationPageResponse(token: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/location/${encodeURIComponent(token)}`,
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
   * @param token undefined
   */
  LocationControllerGetLocationPage(token: string): __Observable<null> {
    return this.LocationControllerGetLocationPageResponse(token).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `LocationControllerService.LocationControllerSaveLocationParams` containing the following parameters:
   *
   * - `token`:
   *
   * - `body`:
   */
  LocationControllerSaveLocationResponse(params: LocationControllerService.LocationControllerSaveLocationParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/location/${encodeURIComponent(params.token)}`,
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
   * @param params The `LocationControllerService.LocationControllerSaveLocationParams` containing the following parameters:
   *
   * - `token`:
   *
   * - `body`:
   */
  LocationControllerSaveLocation(params: LocationControllerService.LocationControllerSaveLocationParams): __Observable<null> {
    return this.LocationControllerSaveLocationResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module LocationControllerService {

  /**
   * Parameters for LocationControllerSaveLocation
   */
  export interface LocationControllerSaveLocationParams {
    token: string;
    body?: {};
  }
}

export { LocationControllerService }
