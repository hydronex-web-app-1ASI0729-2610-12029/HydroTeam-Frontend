import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [TranslatePipe, RouterLink, MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
