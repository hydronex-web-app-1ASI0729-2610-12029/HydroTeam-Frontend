import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';
import { AlertType } from '../domain/model/alert-type.enum';
import { AlertStatus } from '../domain/model/alert-status.enum';

export interface AlertResource extends BaseResource {
  id: number;
  type: AlertType;
  message: string;
  status: AlertStatus;
  triggeredAt: string;
  resolvedAt: string | null;
  cisternId: string;
}

export interface AlertsResponse extends BaseResponse {
  alerts: AlertResource[];
}
