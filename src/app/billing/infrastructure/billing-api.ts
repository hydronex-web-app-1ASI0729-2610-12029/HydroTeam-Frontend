import {BaseApi} from '../../shared/infrastructure/base-api';
import {Injectable} from '@angular/core';
import {PlanApiEndpoint} from './plan.api-endpoint';
import {SubscriptionApiEndpoint} from './subscription.api-endpoint';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Plan} from '../domain/model/plan.entity';
import {Subscription} from '../domain/model/subscription.entity';
import {PlanRepository} from '../domain/repository/plan-repository';
import {SubscriptionRepository} from '../domain/repository/subscription-repository';

/**
 * Methods to responds repository, about how operation in API
 */
@Injectable({providedIn: 'root'})
export class BillingApi extends BaseApi implements PlanRepository, SubscriptionRepository{
  private readonly plansEndpoint: PlanApiEndpoint;
  private readonly subscriptionsEndpoint: SubscriptionApiEndpoint;

  constructor(httpClient: HttpClient) {
    super();
    this.plansEndpoint = new PlanApiEndpoint(httpClient);
    this.subscriptionsEndpoint = new SubscriptionApiEndpoint(httpClient);
  }

  // Implements repository of plan
  /**
   * Retrieves all available subscriptions plans.
   */
  getAllPlan(): Observable<Plan[]>{
    return this.plansEndpoint.getAll();
  }

  /**
   * Finds a specific subscriptions plan by its unique number ID.
   * @param id - The ID of the plan.
   * @returns found plan if exists, in otherwise is null.
   */
  getByIdPlan(id: number): Observable<Plan|null>{
    return this.plansEndpoint.getById(id);
  }

  /**
   * Finds a billing plan by name.
   * @param name - The name of the plan.
   * @returns found plan if exists, in otherwise is null.
   */
  getByNamePlan(name: string): Observable<Plan | null> {
    return this.plansEndpoint.getAll().pipe(
      map(plans => plans.find(p => p.name.toLowerCase() === name.toLowerCase()) || null)
    );
  }

  // Implements repository of subscription
  /**
   * Retrieve all subscriptions.
   */
  getAllSubscription(): Observable<Subscription[]>{
    return this.subscriptionsEndpoint.getAll();
  }

  /**
   * Allows search a billing associated by building id.
   * @param buildingId building id associated by user.
   * @returns subscription linked by building id.
   */
  getByBuildingIdSubscription(buildingId: number): Observable<Subscription | null>{
    return this.subscriptionsEndpoint.getAll().pipe(
      map(subs => subs.find(s => s.buildingId === buildingId) || null)
    );
  }

  /**
   * Allows update billing when expired or something.
   * @param id subscriptions id.
   * @param subscription new billing entity.
   * @returns subscription updated.
   */
  updateSubscription(id: number, subscription: Subscription): Observable<Subscription>{
      return this.subscriptionsEndpoint.update(subscription, id);
  }
}
