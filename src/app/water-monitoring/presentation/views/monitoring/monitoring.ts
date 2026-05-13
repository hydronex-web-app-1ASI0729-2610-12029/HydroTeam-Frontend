import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-monitoring',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './monitoring.html',
  styleUrl: './monitoring.css',
})
export class Monitoring {}
