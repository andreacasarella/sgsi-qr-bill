import {Component, Input} from '@angular/core';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  imports: [
    MatProgressSpinnerModule,
    NgIf
  ],
  standalone: true
})
export class SpinnerComponent {

  @Input() message: string | null = null;

}
