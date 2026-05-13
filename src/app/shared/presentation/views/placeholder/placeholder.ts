import { Component } from '@angular/core';
import { UnderConstruction } from '../../components/under-construction/under-construction';

@Component({
  selector: 'app-placeholder',
  standalone: true,
  imports: [UnderConstruction],
  template: '<app-under-construction />',
})
export class Placeholder {}
