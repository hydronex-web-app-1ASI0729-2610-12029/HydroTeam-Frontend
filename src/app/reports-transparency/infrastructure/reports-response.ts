import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface ReportResource extends BaseResource {
  id: number;
  period_month?: number;
  periodMonth?: number;
  period_year?: number;
  periodYear?: number;
  total_cost_soles?: number;
  totalCostSoles?: number;
  total_water_liters?: number;
  totalWaterLiters?: number;
  total_liters?: number;
  totalLiters?: number;
  refill_count?: number;
  refillCount?: number;
  generated_at?: string;
  generatedAt?: string;
  status?: string;
  building_id?: number;
  buildingId?: number;
  generated_by_user_id?: number;
  generatedByUserId?: number;
}

export interface ReportsResponse extends BaseResponse {
  reports: ReportResource[];
}
