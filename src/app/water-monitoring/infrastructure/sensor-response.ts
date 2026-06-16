import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface SensorResource extends BaseResource {
  id: number;
  hardware_id: string;
  type: string;
  status: string;
  last_sync_at: string;
  cistern_id: number;
}

export interface SensorResponse extends BaseResponse {
  sensors: SensorResource[];
}
