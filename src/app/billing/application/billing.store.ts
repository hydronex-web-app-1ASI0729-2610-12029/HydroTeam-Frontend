import {computed, Injectable, signal} from '@angular/core';
import {Plan} from '../domain/model/plan.entity';
import {Subscription} from '../domain/model/subscription.entity';
import {BillingApi} from '../infrastructure/billing-api';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {SubscriptionStatus} from '../domain/model/subscription-status.enum';

/**
 * Handles state management for plans, subscriptions, loading phases, and errors.
 */
@Injectable({providedIn: 'root'})
export class BillingStore {
  private readonly plansSignal = signal<Plan[]>([]);
  private readonly subscriptionsSignal = signal<Subscription[]>([]);

  readonly planCount = computed(()=>this.plansSignal().length);
  readonly subscriptionCount = computed(()=>this.subscriptionsSignal().length);

  readonly plans = this.plansSignal.asReadonly();
  readonly subscriptions = this.subscriptionsSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  constructor(private billingApi: BillingApi) {
    this.loadPlans();
    this.loadSubscriptions();
  }

  /**
   * Readable error format.
   * @param err The captured object error.
   * @param fallback The text to be used if the error does not have a clear message.
   */
  private formatError(err: any, fallback: string): string {
    if (err instanceof Error) {
      return err.message.includes('Resource not found') ? `${fallback }" Not found` : err.message;
    }
    return fallback;
  }

  /**
   * Loading plans from the API.
   */
  private loadPlans(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.billingApi.getAllPlan().pipe(takeUntilDestroyed()).subscribe({
      next: plans => {
        this.plansSignal.set(plans);
        this.loadingSignal.set(false);
        this.errorSignal.set(null);
      },
      error: e => {
        this.errorSignal.set(this.formatError(e, 'Failed to load plan.'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Loading subscriptions from the API.
   */
  private loadSubscriptions(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.billingApi.getAllSubscription().pipe(takeUntilDestroyed()).subscribe({
      next: subscriptions => {
        this.subscriptionsSignal.set(subscriptions);
        this.loadingSignal.set(false);
        this.errorSignal.set(null);
      },
      error: e => {
        this.errorSignal.set(this.formatError(e, 'Failed to load subscriptions.'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Get details about subscription associated with the builder id.
   * @param buildingId users builder id.
   */
  getSubscriptionDetailsByBuildingId(buildingId: number){
    const subscription = this.subscriptionsSignal().find(s=>s.buildingId === buildingId);
    if (!subscription) { return null; }
    const associatedPlan = this.plansSignal().find(p=>p.id === subscription.planId);

    return {
      ...subscription,
      plan: associatedPlan
    };
  }

  getAllSubscriptionDetails(){
    const plans = this.plansSignal();
    return this.subscriptionsSignal().map(sub=>({
      ...sub,
      plan: plans.find(p=>p.id === sub.planId) || null
    }));
  }

  /**
   * Updates the subscription of a specific plan.
   * @param subscriptionId subscription identifier of user.
   * @param targetPlan the new plan to be linked.
   */
  updateSubscriptionPlan(subscriptionId: number, targetPlan: Plan){
    const currentSub = this.subscriptionsSignal().find(s=>s.id === subscriptionId);
    if (!currentSub)
    {
      this.errorSignal.set(`Subscription with ID ${subscriptionId} not found.`);
      return;
    }
    this.loadingSignal.set(true);

    const updateSubscription = {
      ...currentSub,
      planId: targetPlan.id
    } as Subscription;

    this.billingApi.updateSubscription(subscriptionId, updateSubscription).subscribe({
      next: (persistedSub) => {
        this.subscriptionsSignal.update(subs=>
          subs.map(s => s.id === subscriptionId ? persistedSub : s)
        );
        this.loadingSignal.set(false);
        this.errorSignal.set(null);
      },
      error: e => {
        this.errorSignal.set(this.formatError(e, 'Failed to update subscription plan.'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Transitions a given subscription status to 'expired' through the API.
   * @param subscriptionId subscription identifier.
   */
  expireSubscription(subscriptionId: number){
    const currentSub = this.subscriptionsSignal().find(s => s.id === subscriptionId);
    if (!currentSub) return;
    this.loadingSignal.set(true);

    const expiredSubscriptions = {
      ...currentSub,
      status: SubscriptionStatus.expired
    } as Subscription;

    this.billingApi.updateSubscription(subscriptionId, expiredSubscriptions).subscribe({
      next: persistedSub => {
        this.subscriptionsSignal.update(subs=>
          subs.map(s=>s.id === subscriptionId ? persistedSub : s)
        );
        this.loadingSignal.set(false);
        this.errorSignal.set(null);
      },
      error: e => {
        this.errorSignal.set(this.formatError(e, 'Failed to expired subscription.'));
        this.loadingSignal.set(false);
      }
    });
  }
}
