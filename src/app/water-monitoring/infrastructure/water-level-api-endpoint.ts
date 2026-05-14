import { HttpClient } from '@angular/common/http';
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
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.waterLevelEndpointPath}`,
      new WaterLevelAssembler(),
    );
  }
}
