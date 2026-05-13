import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-under-construction',
  imports: [MatCardModule, TranslatePipe],
  templateUrl: './under-construction.html',
  styleUrl: './under-construction.css',
})
export class UnderConstruction {
  titleKey = input('underConstruction.title');
  descriptionKey = input('underConstruction.description');
}
