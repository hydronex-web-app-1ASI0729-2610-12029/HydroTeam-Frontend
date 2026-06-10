import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface WaterConsumptionResource extends BaseResource {
  id: number;
  avg_daily_liters: number;
  building_id: number;
}

export interface WaterConsumptionResponse extends BaseResponse {
  water_consumptions: WaterConsumptionResource[];
}
