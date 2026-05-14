import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DashboardAlert } from '../../../domain/model/dashboard-alert.entity';

@Component({
  selector: 'app-dashboard-alert-item',
  standalone: true,
  imports: [NgClass, MatIconModule],
  templateUrl: './alert-item.html',
  styleUrl: './alert-item.css',
})
export class AlertItem {
  alert = input.required<DashboardAlert>();
}
