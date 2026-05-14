import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WaterLevel } from '../domain/model/water-level.entity';
import { WaterLevelApiEndpoint } from './water-level-api-endpoint';

@Injectable({ providedIn: 'root' })
export class WaterMonitoringApi {
  private readonly waterLevelEndpoint: WaterLevelApiEndpoint;

  constructor(http: HttpClient) {
    this.waterLevelEndpoint = new WaterLevelApiEndpoint(http);
  }

  getWaterLevels(): Observable<WaterLevel[]> {
    return this.waterLevelEndpoint.getAll();
  }

  getWaterLevel(id: number): Observable<WaterLevel> {
    return this.waterLevelEndpoint.getById(id);
  }
}
