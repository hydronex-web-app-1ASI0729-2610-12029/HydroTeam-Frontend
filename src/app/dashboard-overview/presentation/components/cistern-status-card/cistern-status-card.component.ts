import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CisternStatus } from '../../../domain/model/cistern-status.entity';

@Component({
  selector: 'app-cistern-status-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatDividerModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './cistern-status-card.component.html',
  styleUrls: ['./cistern-status-card.component.scss']
})
export class CisternStatusCardComponent {
  @Input({ required: true }) cistern!: CisternStatus;
}
