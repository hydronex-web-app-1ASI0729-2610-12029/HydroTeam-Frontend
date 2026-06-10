import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { WaterConsumption } from '../domain/model/water-consumption.entity';
import { WaterConsumptionResource, WaterConsumptionResponse } from './water-consumption-response';
import { WaterConsumptionAssembler } from './water-consumption-assembler';

const baseUrl = environment.databaseProviderApiBaseUrl;
const consumptionPath = environment.databaseProviderWaterConsumptionsEndpointPath;

export class WaterConsumptionApiEndpoint extends BaseApiEndpoint<
  WaterConsumption,
  WaterConsumptionResource,
  WaterConsumptionResponse,
  WaterConsumptionAssembler
> {
  constructor(http: HttpClient) {
    super(http, `${baseUrl}${consumptionPath}`, new WaterConsumptionAssembler());
  }
}
