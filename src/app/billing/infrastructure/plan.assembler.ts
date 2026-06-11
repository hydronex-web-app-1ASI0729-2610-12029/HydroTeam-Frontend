import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {Plan} from '../domain/model/plan.entity';
import {PlanResource, PlanResponse} from './plan.response';

export class PlanAssembler implements BaseAssembler<Plan, PlanResource, PlanResponse>{

  /**
   * Transform a plan resource to plan entity.
   * @param resource plan resource from API.
   */
  toEntityFromResource(resource: PlanResource): Plan {
    return new Plan({
      id: resource.id,
      name: resource.name,
      price: resource.price_soles,
      features: resource.features,
      maxSensors: resource.max_sensors,
    });
  }

  /**
   * Transform a plan entity to plan resource.
   * @param entity plan entity.
   */
  toResourceFromEntity(entity: Plan): PlanResource {
    return {
      id: entity.id,
      name: entity.name,
      price_soles: entity.price,
      features: entity.features,
      max_sensors: entity.maxSensors,
    };
  }

  /**
   * Transform a plan response to plan list.
   * @param response plan response.
   */
  toEntitiesFromResponse(response: PlanResponse): Plan[] {
    if (!response || !response.plans) return [];

    return response.plans.map(
      resource => this.toEntityFromResource(resource));
  }
}
