import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {SubscriptionResource, SubscriptionResponse} from './subscription.response';
import {Subscription} from '../domain/model/subscription.entity';

export class SubscriptionAssembler implements BaseAssembler<Subscription, SubscriptionResource, SubscriptionResponse>{

  /**
   * Transform a billing resource to billing entity.
   * @param resource billing resource from API.
   */
  toEntityFromResource(resource: SubscriptionResource): Subscription {
    return new Subscription({
      id: resource.id,
      startDate: resource.start_date,
      endDate: resource.end_date,
      status: resource.status,
      buildingId: resource.building_id,
      planId: resource.plan_id
    });
  }

  /**
   * Transform a billing entity to billing resource.
   * @param entity billing entity.
   */
  toResourceFromEntity(entity: Subscription): SubscriptionResource {
    return {
      id: entity.id,
      start_date: entity.startDate,
      end_date: entity.endDate,
      status: entity.status,
      building_id: entity.buildingId,
      plan_id: entity.planId
    };
  }

  /**
   * Transform a billing response to plan list.
   * @param response billing response.
   */
  toEntitiesFromResponse(response: SubscriptionResponse): Subscription[] {
    return response.subscriptions.map(
      resource => this.toEntityFromResource(resource));
  }
}
