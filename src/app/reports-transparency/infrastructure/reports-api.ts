import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { Report } from '../domain/model/report.entity';
import { WaterConsumption } from '../domain/model/water-consumption.entity';
import { ReportsApiEndpoint } from './reports-api-endpoints';
import { CreateReportResource, ReportRefillResource } from './reports-response';
import { WaterConsumptionsApiEndpoint } from './water-consumptions-api-endpoint';

@Injectable({ providedIn: 'root' })
export class ReportsApi extends BaseApi {
  private readonly reportsEndpoint: ReportsApiEndpoint;
  private readonly waterConsumptionsEndpoint: WaterConsumptionsApiEndpoint;
  private readonly refillsUrl = `${environment.databaseProviderApiBaseUrl}${environment.databaseProviderRefillsEndpointPath}`;

  constructor(private readonly http: HttpClient) {
    super();
    this.reportsEndpoint = new ReportsApiEndpoint(http);
    this.waterConsumptionsEndpoint = new WaterConsumptionsApiEndpoint(http);
  }

  getReports(buildingId: number): Observable<Report[]> {
    return this.reportsEndpoint.getByBuildingId(buildingId);
  }

  createReport(resource: CreateReportResource): Observable<Report> {
    return this.reportsEndpoint.createReport(resource);
  }

  getRefills(): Observable<ReportRefillResource[]> {
    return this.http
      .get<ReportRefillResource[] | { refills: ReportRefillResource[] }>(this.refillsUrl)
      .pipe(map((response) => Array.isArray(response) ? response : response.refills));
  }

  getWaterConsumptions(): Observable<WaterConsumption[]> {
    return this.waterConsumptionsEndpoint.getAll();
  }
}
