import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {SubscriptionResource, SubscriptionResponse} from './subscription.response';
import {Subscription} from '../domain/model/subscription.entity';

export class SubscriptionAssembler implements BaseAssembler<Subscription, SubscriptionResource, SubscriptionResponse>{

  /**
   * Transform a subscription resource to subscription entity.
   * @param resource subscription resource from API.
   */
  toEntityFromResource(resource: SubscriptionResource): Subscription {
    return new Subscription({
      id: resource.id,
      startDate: resource.startDate,
      endDate: resource.endDate,
      status: resource.status,
      buildingId: resource.buildingId,
      planId: resource.planId
    });
  }

  /**
   * Transform a subscription entity to subscription resource.
   * @param entity subscription entity.
   */
  toResourceFromEntity(entity: Subscription): SubscriptionResource {
    return {
      id: entity.id,
      startDate: entity.startDate,
      endDate: entity.endDate,
      status: entity.status,
      buildingId: entity.buildingId,
      planId: entity.planId
    };
  }

  /**
   * Transform a subscription response to plan list.
   * @param response subscription response.
   */
  toEntitiesFromResponse(response: SubscriptionResponse): Subscription[] {
    return response.subscriptions.map(
      resource => this.toEntityFromResource(resource));
  }
}
