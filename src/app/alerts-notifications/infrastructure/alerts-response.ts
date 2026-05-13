import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';
import { AlertType } from '../domain/model/alert.entity';

export interface AlertResource extends BaseResource {
  id: number;
  type: AlertType;
  message: string;
  timestamp: string;
  isResolved: boolean;
  cisternId: number;
}

export interface AlertsResponse extends BaseResponse {
  alerts: AlertResource[];
}
