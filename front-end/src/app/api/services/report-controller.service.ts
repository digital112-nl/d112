/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Report } from '../models/report';
import { ReportMessage } from '../models/report-message';
@Injectable({
  providedIn: 'root',
})
class ReportControllerService extends __BaseService {
  static readonly ReportControllerFindAllPath = '/api/v1/reports';
  static readonly ReportControllerFindOnePath = '/api/v1/reports/{id}';
  static readonly ReportControllerFindAllMessagesPath = '/api/v1/reports/{id}/messages';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  ReportControllerFindAllResponse(): __Observable<__StrictHttpResponse<Array<Report>>> {
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
        return _r as __StrictHttpResponse<Array<Report>>;
      })
    );
  }
  /**
   * @return Success
   */
  ReportControllerFindAll(): __Observable<Array<Report>> {
    return this.ReportControllerFindAllResponse().pipe(
      __map(_r => _r.body as Array<Report>)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ReportControllerFindOneResponse(id: string): __Observable<__StrictHttpResponse<Report>> {
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
        return _r as __StrictHttpResponse<Report>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ReportControllerFindOne(id: string): __Observable<Report> {
    return this.ReportControllerFindOneResponse(id).pipe(
      __map(_r => _r.body as Report)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ReportControllerFindAllMessagesResponse(id: string): __Observable<__StrictHttpResponse<Array<ReportMessage>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/v1/reports/${encodeURIComponent(id)}/messages`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ReportMessage>>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  ReportControllerFindAllMessages(id: string): __Observable<Array<ReportMessage>> {
    return this.ReportControllerFindAllMessagesResponse(id).pipe(
      __map(_r => _r.body as Array<ReportMessage>)
    );
  }
}

module ReportControllerService {
}

export { ReportControllerService }
