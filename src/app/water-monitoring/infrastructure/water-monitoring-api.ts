import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WaterLevel } from '../domain/model/water-level.entity';
import { Cistern } from '../domain/model/cistern.entity';
import { WaterConsumption } from '../domain/model/water-consumption.entity';
import { Sensor } from '../domain/model/sensor.entity';
import { WaterLevelApiEndpoint } from './water-level-api-endpoint';
import { CisternApiEndpoint } from './cistern-api-endpoint';
import { WaterConsumptionApiEndpoint } from './water-consumption-api-endpoint';
import { SensorApiEndpoint } from './sensor-api-endpoint';

@Injectable({ providedIn: 'root' })
export class WaterMonitoringApi {
  private readonly waterLevelEndpoint: WaterLevelApiEndpoint;
  private readonly cisternEndpoint: CisternApiEndpoint;
  private readonly consumptionEndpoint: WaterConsumptionApiEndpoint;
  private readonly sensorEndpoint: SensorApiEndpoint;

  constructor(http: HttpClient) {
    this.waterLevelEndpoint = new WaterLevelApiEndpoint(http);
    this.cisternEndpoint = new CisternApiEndpoint(http);
    this.consumptionEndpoint = new WaterConsumptionApiEndpoint(http);
    this.sensorEndpoint = new SensorApiEndpoint(http);
  }

  getWaterLevels(): Observable<WaterLevel[]> {
    return this.waterLevelEndpoint.getAll();
  }

  getWaterLevel(id: number): Observable<WaterLevel> {
    return this.waterLevelEndpoint.getById(id);
  }

  getCisterns(): Observable<Cistern[]> {
    return this.cisternEndpoint.getAll();
  }

  getWaterConsumptions(): Observable<WaterConsumption[]> {
    return this.consumptionEndpoint.getAll();
  }

  getSensors(): Observable<Sensor[]> {
    return this.sensorEndpoint.getAll();
  }
}
