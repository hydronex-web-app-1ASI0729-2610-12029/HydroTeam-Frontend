import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Building } from '../domain/model/building.entity';
import { BuildingResource, BuildingResponse } from './building-response';
import { BuildingAssembler } from './building-assembler';

export class BuildingApiEndpoint extends BaseApiEndpoint<
  Building,
  BuildingResource,
  BuildingResponse,
  BuildingAssembler
> {
  constructor(http: HttpClient) {
    super(http, `${environment.monitoringApiBaseUrl}/buildings`, new BuildingAssembler());
  }
}
