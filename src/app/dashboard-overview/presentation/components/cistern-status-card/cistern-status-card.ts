import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { CisternStatus } from '../../../domain/model/cistern-status.entity';

@Component({
  selector: 'app-cistern-status-card',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatChipsModule, MatIconModule],
  templateUrl: './cistern-status-card.html',
  styleUrl: './cistern-status-card.css',
})
export class CisternStatusCard {
  status = input.required<CisternStatus>();
}
