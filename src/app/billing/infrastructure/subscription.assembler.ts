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
      startDate: resource.startDate,
      endDate: resource.endDate,
      status: resource.status,
      buildingId: resource.buildingId,
      planId: resource.planId
    });
  }

  /**
   * Transform a billing entity to billing resource.
   * @param entity billing entity.
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
   * Transform a billing response to plan list.
   * @param response billing response.
   */
  toEntitiesFromResponse(response: SubscriptionResponse): Subscription[] {
    return response.subscriptions.map(
      resource => this.toEntityFromResource(resource));
  }
}
