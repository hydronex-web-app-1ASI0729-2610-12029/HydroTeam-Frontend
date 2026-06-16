import {Component, computed, inject, signal} from '@angular/core';
import {BillingStore} from '../../../application/billing.store';
import {Plan} from '../../../domain/model/plan.entity';
import {PlanCard} from '../../components/plan-card/plan-card';
import {DecimalPipe} from '@angular/common';
import {SubscriptionCard} from '../../components/subscription-card/subscription-card';
import {AuthenticationStore} from '../../../../iam/application/authentication.store';

@Component({
  selector: 'app-billing-view',
  imports: [
    PlanCard,
    DecimalPipe,
    SubscriptionCard
  ],
  templateUrl: './billing-view.html',
  styleUrl: './billing-view.css',
})
export class BillingView {
  // inject service billing Store and authentication
  private readonly billingStore = inject(BillingStore);
  private readonly authStore = inject(AuthenticationStore);

  // to check if the iam context is working
  readonly currentUser = this.authStore.currentUser;

  // get currentUsers buildingId.
  readonly currentBuildingId = computed(() => {
    const user = this.authStore.currentUser();
    if (!user) { return null; }
    try {
      const rawUser = localStorage.getItem('tankiq-user');
      if (rawUser) {
        const parsed = JSON.parse(rawUser);
        return parsed.buildingId ? Number(parsed.buildingId) : null;
      }
    } catch (e) {
      console.error(`Error parsing billing id ${e}`);
    }
    return null;
  });

  // Signals from billing store
  readonly plans = this.billingStore.plans;
  readonly isLoading = this.billingStore.loading;
  readonly errorMessage = this.billingStore.error;

  readonly invoice = signal<any | null>(null);
  readonly selectedPlanForUpgrade = signal<Plan | null>(null);

  readonly currentSubscription = computed(() => {
    const buildingId = this.currentBuildingId();
    if (!buildingId) { return null; }
    return this.billingStore.subscriptions().find(s => s.buildingId === buildingId);
  })

  readonly currentPlanName = computed(() => {
    const sub = this.currentSubscription();
    if (!sub) return 'Do not have a subscription';
    const associatedPlan = this.plans().find(p => p.id === sub.planId);
    return associatedPlan ? associatedPlan.name : 'Unknown plan';
  });

  onUpgradePlan(selectedPlan: Plan) {
    const activeSub = this.currentSubscription();
    const today = new Date();
    const expirationDate = new Date();
    expirationDate.setMonth(today.getMonth() + 1);

    const buildingId = this.currentBuildingId();

    if (!activeSub) {
      alert('Building Id do not have a subscription');
      return;
    }

    this.selectedPlanForUpgrade.set(selectedPlan);

    this.invoice.set({
      planName: selectedPlan.name,
      price: selectedPlan.price,
      purchaseDate: today.toLocaleDateString('es-PE'),
      expiryDate: expirationDate.toLocaleDateString('es-PE'),
      buildingId: buildingId
    });
  }

  onConfirmUpgrade() {
    const activeSub = this.currentSubscription();
    const planTarget = this.selectedPlanForUpgrade();

    if (activeSub && planTarget) {
      this.billingStore.updateSubscriptionPlan(activeSub.id, planTarget);
    }

    this.clearInvoice();
  }

  onCancelUpgrade(): void {
    this.clearInvoice();
  }

  clearInvoice(): void {
    this.invoice.set(null);
    this.selectedPlanForUpgrade.set(null);
  }
}
