import {Component, input, output} from '@angular/core';
import {Plan} from '../../../domain/model/plan.entity';
import {disabled} from '@angular/forms/signals';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-plan-card',
  imports: [],
  templateUrl: './plan-card.html',
  styleUrl: './plan-card.css',
})
export class PlanCard {
  plan = input.required<Plan>();
  isCurrentPlan = input<boolean>(false);
  disabled = input<boolean>(false);

  planSelected = output<Plan>();

  onSelect() {
    if (!this.isCurrentPlan() && !this.disabled()) {
      this.planSelected.emit(this.plan());
    }
  }
}
