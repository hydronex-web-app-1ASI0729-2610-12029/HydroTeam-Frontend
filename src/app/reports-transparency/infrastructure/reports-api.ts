import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { Report } from '../domain/model/report.entity';
import { WaterConsumption } from '../domain/model/water-consumption.entity';
import { ReportsApiEndpoint } from './reports-api-endpoints';
import { WaterConsumptionsApiEndpoint } from './water-consumptions-api-endpoint';

@Injectable({ providedIn: 'root' })
export class ReportsApi extends BaseApi {
  private readonly reportsEndpoint: ReportsApiEndpoint;
  private readonly waterConsumptionsEndpoint: WaterConsumptionsApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.reportsEndpoint = new ReportsApiEndpoint(http);
    this.waterConsumptionsEndpoint = new WaterConsumptionsApiEndpoint(http);
  }

  getReports(): Observable<Report[]> {
    return this.reportsEndpoint.getAll();
  }

  getWaterConsumptions(): Observable<WaterConsumption[]> {
    return this.waterConsumptionsEndpoint.getAll();
  }
}
