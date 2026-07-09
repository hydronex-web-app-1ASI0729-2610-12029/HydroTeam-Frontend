import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { WaterLevel } from '../domain/model/water-level.entity';
import { WaterLevelResource, WaterLevelResponse } from './water-level-response';
import { WaterLevelAssembler } from './water-level-assembler';

export class WaterLevelApiEndpoint extends BaseApiEndpoint<
  WaterLevel,
  WaterLevelResource,
  WaterLevelResponse,
  WaterLevelAssembler
> {
  constructor(http: HttpClient) {
    super(http, `${environment.monitoringApiBaseUrl}/water-level-readings`, new WaterLevelAssembler());
  }

  getBySensorId(sensorId: number): Observable<WaterLevel[]> {
    return this.http
      .get<WaterLevelResource[]>(this.endpointUrl, {
        params: new HttpParams().set('sensorId', sensorId),
      })
      .pipe(
        map((resources) => resources.map((r) => this.assembler.toEntityFromResource(r))),
        catchError(this.handleError('Failed to fetch readings by sensor')),
      );
  }
}
