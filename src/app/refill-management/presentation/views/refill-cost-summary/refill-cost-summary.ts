import { CommonModule } from '@angular/common';
import { Component, OnInit, computed } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { RefillManagementStore } from '../../../application/refill-management.store';

@Component({
  selector: 'app-refill-cost-summary',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule
  ],
  providers: [RefillManagementStore],
  templateUrl: './refill-cost-summary.html',
  styleUrl: './refill-cost-summary.css'
})
export class RefillCostSummary implements OnInit {
  readonly currentMonthRefills = computed(() => this.store.currentMonthRefills());
  readonly currentMonthCost = computed(() => this.store.currentMonthCostSoles());
  readonly averageCost = computed(() => this.store.averageCostSoles());
  readonly totalLiters = computed(() => this.store.totalLiters());

  constructor(readonly store: RefillManagementStore) {}

  ngOnInit(): void {
    this.store.loadRefills();
  }
}
