import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Sensor } from '../domain/model/sensor.entity';
import { SensorResource, SensorResponse } from './sensor-response';
import { SensorAssembler } from './sensor-assembler';

export class SensorApiEndpoint extends BaseApiEndpoint<
  Sensor,
  SensorResource,
  SensorResponse,
  SensorAssembler
> {
  constructor(http: HttpClient) {
    super(http, `${environment.monitoringApiBaseUrl}/sensors`, new SensorAssembler());
  }

  getByCisternId(cisternId: number): Observable<Sensor[]> {
    return this.http
      .get<SensorResource[]>(this.endpointUrl, {
        params: new HttpParams().set('cisternId', cisternId),
      })
      .pipe(
        map((resources) => resources.map((r) => this.assembler.toEntityFromResource(r))),
        catchError(this.handleError('Failed to fetch sensors by cistern')),
      );
  }
}
