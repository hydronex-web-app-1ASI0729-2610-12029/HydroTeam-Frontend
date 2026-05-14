import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { ConsumptionSummary } from '../../../domain/model/consumption-summary.entity';

@Component({
  selector: 'app-consumption-summary',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatProgressBarModule, MatTabsModule],
  templateUrl: './consumption-summary.component.html',
  styleUrls: ['./consumption-summary.component.scss']
})
export class ConsumptionSummaryComponent {
  @Input({ required: true }) items: ConsumptionSummary[] = [];
}
