import {Component, Input} from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-square',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './square.component.html',
  styleUrl: './square.component.css'
})
export class SquareComponent {
  @Input() numbers: Array<Array<Number>> = [];
  @Input() row = 0;
  @Input() column = 0;
}
