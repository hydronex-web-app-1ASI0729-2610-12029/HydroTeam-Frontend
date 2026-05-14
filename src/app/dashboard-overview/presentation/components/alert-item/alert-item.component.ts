import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { DashboardAlert } from '../../../domain/model/dashboard-alert.entity';

@Component({
  selector: 'app-alert-item',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatChipsModule],
  templateUrl: './alert-item.component.html',
  styleUrls: ['./alert-item.component.scss']
})
export class AlertItemComponent {
  @Input({ required: true }) alert!: DashboardAlert;
}
