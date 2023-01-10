import {Pipe, PipeTransform} from '@angular/core';
import {I18nCountriesService} from "../../../@core/i18n/i18n-countries.service";

@Pipe({
  name: 'country',
  standalone: true
})
export class CountryPipe implements PipeTransform {

  constructor(
    private i18nCountriesService: I18nCountriesService
  ) {
  }

  transform(iso2: string, ...args: unknown[]): unknown {
    return this.i18nCountriesService.getCountryNameByIso2(iso2);
  }

}
