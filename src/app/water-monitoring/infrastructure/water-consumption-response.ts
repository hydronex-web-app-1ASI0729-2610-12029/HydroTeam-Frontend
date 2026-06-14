import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface WaterConsumptionResource extends BaseResource {
  id: number;
  period_start: string;
  period_end: string;
  avg_daily_liters: number;
  total_period_liters: number;
  building_id: number;
}

export interface WaterConsumptionResponse extends BaseResponse {
  water_consumptions: WaterConsumptionResource[];
}
