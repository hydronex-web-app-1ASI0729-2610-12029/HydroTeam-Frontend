import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';
import {SubscriptionStatus} from '../domain/model/subscription-status.enum';

/**
 * Representing a billing from the API.
 */
export interface SubscriptionResource extends BaseResource {
  start_date: string;
  end_date: string;
  status: SubscriptionStatus;
  building_id: number;
  plan_id: number;
}

/**
 * Interface for billing HTTP contexts.
 */
export interface SubscriptionResponse extends BaseResponse {
  subscriptions: SubscriptionResource[];
}
