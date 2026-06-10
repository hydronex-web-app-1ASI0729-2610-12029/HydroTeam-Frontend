import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface CisternResource extends BaseResource {
  id: number;
  capacity_liters: number;
  current_level_percent: number;
  alert_threshold_percent: number;
  building_id: number;
}

export interface CisternResponse extends BaseResponse {
  cisterns: CisternResource[];
}
