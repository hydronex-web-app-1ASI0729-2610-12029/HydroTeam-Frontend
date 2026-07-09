import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface CisternResource extends BaseResource {
  id: number;
  capacityLiters: number;
  currentLevelPercent: number;
  alertThresholdPercent: number;
  buildingId: number;
}

export interface CisternResponse extends BaseResponse {
  cisterns: CisternResource[];
}
