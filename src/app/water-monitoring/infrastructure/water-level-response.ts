import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface WaterLevelResource extends BaseResource {
  id: number;
  level_percent: number;
  volume_liters: number;
  recorded_at: string;
  sensor_id: number;
}

export interface WaterLevelResponse extends BaseResponse {
  water_level_readings: WaterLevelResource[];
}
