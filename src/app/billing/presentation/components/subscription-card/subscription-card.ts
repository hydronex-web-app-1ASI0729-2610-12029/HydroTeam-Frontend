import {Component, input} from '@angular/core';
import { Subscription } from "../../../domain/model/subscription.entity";
import {SubscriptionStatus} from '../../../domain/model/subscription-status.enum';
import {DatePipe, TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-subscription-card',
  imports: [
    TitleCasePipe,
    DatePipe
  ],
  templateUrl: './subscription-card.html',
  styleUrl: './subscription-card.css',
})
export class SubscriptionCard {
  subscription = input.required<Subscription>();
  planName = input<string>('Loading...');

  isExpired(): boolean {
    return this.subscription().status === SubscriptionStatus.expired;
  }
}
