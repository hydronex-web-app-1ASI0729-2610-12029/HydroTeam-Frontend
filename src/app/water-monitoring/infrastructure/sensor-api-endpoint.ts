import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Sensor } from '../domain/model/sensor.entity';
import { SensorResource, SensorResponse } from './sensor-response';
import { SensorAssembler } from './sensor-assembler';

const baseUrl = environment.databaseProviderApiBaseUrl;
const sensorPath = environment.databaseProviderSensorsEndpointPath;

export class SensorApiEndpoint extends BaseApiEndpoint<
  Sensor,
  SensorResource,
  SensorResponse,
  SensorAssembler
> {
  constructor(http: HttpClient) {
    super(http, `${baseUrl}${sensorPath}`, new SensorAssembler());
  }
}
