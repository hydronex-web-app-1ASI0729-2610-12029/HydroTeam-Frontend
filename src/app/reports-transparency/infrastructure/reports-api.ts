import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { Report } from '../domain/model/report.entity';
import { ReportsApiEndpoint } from './reports-api-endpoints';

@Injectable({ providedIn: 'root' })
export class ReportsApi extends BaseApi {
  private readonly reportsEndpoint: ReportsApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.reportsEndpoint = new ReportsApiEndpoint(http);
  }

  getReports(): Observable<Report[]> {
    return this.reportsEndpoint.getAll();
  }
}
