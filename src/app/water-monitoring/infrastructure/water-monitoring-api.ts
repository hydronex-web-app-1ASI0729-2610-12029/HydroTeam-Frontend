import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Building } from '../domain/model/building.entity';
import { Cistern } from '../domain/model/cistern.entity';
import { Sensor } from '../domain/model/sensor.entity';
import { WaterLevel } from '../domain/model/water-level.entity';
import { BuildingApiEndpoint } from './building-api-endpoint';
import { CisternApiEndpoint } from './cistern-api-endpoint';
import { SensorApiEndpoint } from './sensor-api-endpoint';
import { WaterLevelApiEndpoint } from './water-level-api-endpoint';

@Injectable({ providedIn: 'root' })
export class WaterMonitoringApi {
  private readonly buildingEndpoint: BuildingApiEndpoint;
  private readonly cisternEndpoint: CisternApiEndpoint;
  private readonly sensorEndpoint: SensorApiEndpoint;
  private readonly waterLevelEndpoint: WaterLevelApiEndpoint;

  constructor(http: HttpClient) {
    this.buildingEndpoint = new BuildingApiEndpoint(http);
    this.cisternEndpoint = new CisternApiEndpoint(http);
    this.sensorEndpoint = new SensorApiEndpoint(http);
    this.waterLevelEndpoint = new WaterLevelApiEndpoint(http);
  }

  // Buildings
  getBuildings(): Observable<Building[]> { return this.buildingEndpoint.getAll(); }
  getBuilding(id: number): Observable<Building> { return this.buildingEndpoint.getById(id); }
  createBuilding(b: Building): Observable<Building> { return this.buildingEndpoint.create(b); }
  updateBuilding(b: Building): Observable<Building> { return this.buildingEndpoint.update(b, b.id); }
  deleteBuilding(id: number): Observable<void> { return this.buildingEndpoint.delete(id); }

  // Cisterns
  getCisterns(): Observable<Cistern[]> { return this.cisternEndpoint.getAll(); }
  getCistern(id: number): Observable<Cistern> { return this.cisternEndpoint.getById(id); }
  createCistern(c: Cistern): Observable<Cistern> { return this.cisternEndpoint.create(c); }
  updateCistern(c: Cistern): Observable<Cistern> { return this.cisternEndpoint.update(c, c.id); }
  deleteCistern(id: number): Observable<void> { return this.cisternEndpoint.delete(id); }

  // Sensors
  getSensors(): Observable<Sensor[]> { return this.sensorEndpoint.getAll(); }
  getSensorsByCisternId(cisternId: number): Observable<Sensor[]> { return this.sensorEndpoint.getByCisternId(cisternId); }
  getSensor(id: number): Observable<Sensor> { return this.sensorEndpoint.getById(id); }
  createSensor(s: Sensor): Observable<Sensor> { return this.sensorEndpoint.create(s); }
  updateSensor(s: Sensor): Observable<Sensor> { return this.sensorEndpoint.update(s, s.id); }
  deleteSensor(id: number): Observable<void> { return this.sensorEndpoint.delete(id); }

  // Water level readings
  getWaterLevels(): Observable<WaterLevel[]> { return this.waterLevelEndpoint.getAll(); }
  getWaterLevelsBySensorId(sensorId: number): Observable<WaterLevel[]> { return this.waterLevelEndpoint.getBySensorId(sensorId); }
  getWaterLevel(id: number): Observable<WaterLevel> { return this.waterLevelEndpoint.getById(id); }
  createWaterLevel(r: WaterLevel): Observable<WaterLevel> { return this.waterLevelEndpoint.create(r); }
  updateWaterLevel(r: WaterLevel): Observable<WaterLevel> { return this.waterLevelEndpoint.update(r, r.id); }
  deleteWaterLevel(id: number): Observable<void> { return this.waterLevelEndpoint.delete(id); }
}
