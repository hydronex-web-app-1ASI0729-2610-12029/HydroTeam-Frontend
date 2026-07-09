import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface WaterLevelResource extends BaseResource {
  id: number;
  levelPercent: number;
  volumeLiters: number;
  recordedAt: string;
  sensorId: number;
}

export interface WaterLevelResponse extends BaseResponse {
  waterLevelReadings: WaterLevelResource[];
}
