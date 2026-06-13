import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Representing a plan from the API.
 */
export interface PlanResource extends BaseResource {
  name: string;
  price: number;
  features: string;
  maxSensors: number;
}

/**
 * Interface for plan HTTP contexts.
 */
export interface PlanResponse extends BaseResponse {
  plans: PlanResource[];
}
