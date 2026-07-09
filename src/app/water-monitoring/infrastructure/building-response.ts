import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface BuildingResource extends BaseResource {
  id: number;
  name: string;
  address: string;
  district: string;
}

export interface BuildingResponse extends BaseResponse {
  buildings: BuildingResource[];
}
