import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export type SensorType = 'ULTRASONIC' | 'PRESSURE';
export type SensorStatus = 'ACTIVE' | 'MAINTENANCE' | 'OFFLINE';

export interface SensorResource extends BaseResource {
  id: number;
  hardwareId: string;
  type: SensorType;
  status: SensorStatus;
  lastSyncAt: string;
  cisternId: number;
}

export interface SensorResponse extends BaseResponse {
  sensors: SensorResource[];
}
