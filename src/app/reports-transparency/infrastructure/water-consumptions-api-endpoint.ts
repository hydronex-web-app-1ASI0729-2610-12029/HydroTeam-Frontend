import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { WaterConsumption } from '../domain/model/water-consumption.entity';
import { WaterConsumptionAssembler } from './water-consumption-assembler';
import { WaterConsumptionResource, WaterConsumptionsResponse } from './water-consumption-response';

const baseUrl = environment.databaseProviderApiBaseUrl;
const waterConsumptionsPath = environment.databaseProviderWaterConsumptionsEndpointPath;

export class WaterConsumptionsApiEndpoint extends BaseApiEndpoint<
  WaterConsumption,
  WaterConsumptionResource,
  WaterConsumptionsResponse,
  WaterConsumptionAssembler
> {
  constructor(http: HttpClient) {
    super(http, `${baseUrl}${waterConsumptionsPath}`, new WaterConsumptionAssembler());
  }
}
