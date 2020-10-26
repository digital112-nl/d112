/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ReportModel } from '../models/report-model';
@Injectable({
  providedIn: 'root',
})
class ReportControllerService extends __BaseService {
  static readonly ReportControllerFindAllPath = '/api/v1/reports';
  static readonly ReportControllerFindAllWithLocationPath = '/api/v1/reports/locations';
  static readonly ReportControllerFindOnePath = '/api/v1/reports/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  ReportControllerFindAllResponse(): __Observable<__StrictHttpResponse<Array<ReportModel>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/reports`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ReportModel>>;
      })
    );
  }
  /**
   * @return Success
   */
  ReportControllerFindAll(): __Observable<Array<ReportModel>> {
    return this.ReportControllerFindAllResponse().pipe(
      __map(_r => _r.body as Array<ReportModel>)
    );
  }

  /**
   * @return Success
   */
  ReportControllerFindAllWithLocationResponse(): __Observable<__StrictHttpResponse<Array<ReportModel>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/reports/locations`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ReportModel>>;
      })
    );
  }
  /**
   * @return Success
   */
  ReportControllerFindAllWithLocation(): __Observable<Array<ReportModel>> {
    return this.ReportControllerFindAllWithLocationResponse().pipe(
      __map(_r => _r.body as Array<ReportModel>)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ReportControllerFindOneResponse(id: string): __Observable<__StrictHttpResponse<ReportModel>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/reports/${encodeURIComponent(id)}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ReportModel>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ReportControllerFindOne(id: string): __Observable<ReportModel> {
    return this.ReportControllerFindOneResponse(id).pipe(
      __map(_r => _r.body as ReportModel)
    );
  }
}

module ReportControllerService {
}

export { ReportControllerService }
