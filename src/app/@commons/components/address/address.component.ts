import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Address} from "../../../../../shared/sgsi-qr-bill-types";
import {CommonModule} from "@angular/common";
import {CountryPipe} from "../../pipes/country/country.pipe";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CountryPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressComponent {
  @Input() address: Address | null = null;

}
