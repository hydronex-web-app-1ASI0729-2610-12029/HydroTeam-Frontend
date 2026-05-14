import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface WaterLevelResource extends BaseResource {
  id: number;
  levelPercent: number;
  recordedAt: string;
}

export interface WaterLevelResponse extends BaseResponse {
  waterLevels: WaterLevelResource[];
}
