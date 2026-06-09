import {Observable} from 'rxjs';
import {Subscription} from '../model/subscription.entity';

/**
 * SubscriptionRepository contract for domain persistence operations.
 */
export interface SubscriptionRepository {
  /**
   * Retrieve all subscriptions.
   */
  subscriptionFindAll(): Observable<Subscription[]>;

  /**
   * Allows search a billing associated by building id.
   * @param buildingId building id associated by user.
   */
  subscriptionFindByBuildingId(buildingId: number) : Observable<Subscription | null>;

  /**
   * Allows update billing when expired or something.
   * @param id subscriptions id.
   * @param subscription new billing entity.
   */
  subscriptionUpdate(id: number, subscription: Subscription): Observable<Subscription>;
}
