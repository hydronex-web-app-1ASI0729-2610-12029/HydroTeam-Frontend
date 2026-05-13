import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './alerts.html',
  styleUrl: './alerts.css',
})
export class Alerts {}
