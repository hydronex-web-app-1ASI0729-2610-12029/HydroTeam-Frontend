import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface WaterConsumptionResource extends BaseResource {
  id: number;
  period_start?: string;
  periodStart?: string;
  period_end?: string;
  periodEnd?: string;
  avg_daily_liters?: number;
  avgDailyLiters?: number;
  total_period_liters?: number;
  totalPeriodLiters?: number;
  building_id?: number;
  buildingId?: number;
}

export interface WaterConsumptionsResponse extends BaseResponse {
  water_consumptions: WaterConsumptionResource[];
}
