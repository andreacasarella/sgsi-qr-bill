import {ErrorHandler, Inject, Injectable, LOCALE_ID} from '@angular/core';
import {getName, getNames, registerLocale} from "i18n-iso-countries";
import {I18nService} from "./i18n.service";

export interface Country {
  display: string,
  value: string
}

@Injectable({
  providedIn: 'root'
})
export class I18nCountriesService {
  localeIds = ['it'];

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private i18nService: I18nService,
    private errorHandler: ErrorHandler
  ) {
  }

  async use(localeIds: string[]) {
    this.localeIds = [...localeIds];
    await Promise.all(
      this.localeIds.map(async (localeId) => {
        try {
          const locale = await import(`i18n-iso-countries/langs/${localeId}.json`);
          registerLocale(locale.default);
        } catch (error) {
          this.errorHandler.handleError(error);
        }
      })
    );
  }

  loadCountries(): Country[] {
    return Object.entries(getNames(this.i18nService.currentLanguage()))
      .map(([key, value]) => [key, Array.isArray(value) ? value[0] : value])
      .sort((a, b) => a[1].localeCompare(b[1]))
      .map((country) => ({display: country[1], value: country[0].toLowerCase()})) as Country[];
  }

  getCountryNameByIso2(iso2: string): string {
    return getName(iso2, this.i18nService.currentLanguage());
  }

}
