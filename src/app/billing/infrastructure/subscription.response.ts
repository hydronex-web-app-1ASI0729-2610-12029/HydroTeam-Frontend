import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';
import {SubscriptionStatus} from '../domain/model/subscription-status.enum';

/**
 * Representing a billing from the API.
 */
export interface SubscriptionResource extends BaseResource {
  startDate: string;
  endDate: string;
  status: SubscriptionStatus;
  buildingId: number;
  planId: number;
}

/**
 * Interface for billing HTTP contexts.
 */
export interface SubscriptionResponse extends BaseResponse {
  subscriptions: SubscriptionResource[];
}
