import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { Report } from '../domain/model/report.entity';
import { WaterConsumption } from '../domain/model/water-consumption.entity';
import { ReportsApiEndpoint } from './reports-api-endpoints';
import { WaterConsumptionsApiEndpoint } from './water-consumptions-api-endpoint';
import { CreateReportResource, ReportRefillResource } from './reports-response';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ReportsApi extends BaseApi {
  private readonly reportsEndpoint: ReportsApiEndpoint;
  private readonly waterConsumptionsEndpoint: WaterConsumptionsApiEndpoint;

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
    const endpoint = `${environment.databaseProviderApiBaseUrl}${environment.databaseProviderRefillsEndpointPath}`;
    return this.http.get<ReportRefillResource[]>(endpoint);
  }

  getWaterConsumptions(): Observable<WaterConsumption[]> {
    return this.waterConsumptionsEndpoint.getAll();
  }
}
