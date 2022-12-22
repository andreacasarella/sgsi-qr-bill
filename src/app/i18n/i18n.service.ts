import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private _languageUpdates = new BehaviorSubject<string>('it');
  language$ = this._languageUpdates.asObservable();
  private _localeUpdates = new BehaviorSubject<string>('it-CH');
  locale$ = this._localeUpdates.asObservable();

  constructor(
    private _translateService: TranslateService,
    @Inject(LOCALE_ID) private locale: string,
    // private _materialDateAdapter: DateAdapter<Date>
  ) {
    this._translateService.addLangs(['it']);
    const language = locale.substring(0, 2);
    this._setLanguage(language);
    this._setLocale(locale);
  }

  private static _localeFromLanguage(lang: string): string {
    switch (lang) {
      case 'en':
        return 'en-CH';
      case 'de':
        return 'de-CH';
      case 'fr':
        return 'fr-CH';
      default:
        return 'it-CH';
    }
  }

  currentLanguage(): string {
    return this._translateService.currentLang;
  }

  currentLocale(): string {
    return I18nService._localeFromLanguage(this.currentLanguage());
  }

  translate(key: string, interpolateParams?: any): string | any {
    return this._translateService.instant(key, interpolateParams);
  }

  translateAsync(key: string, interpolations?: any): Observable<string | any> {
    return this._translateService.get(key, interpolations);
  }

  mergeTranslations(translations: any) {
    this._translateService.setTranslation(this._translateService.currentLang, translations, true);
  }

  changeLanguage(lang: string): void {
    this._setLanguage(lang);
    this._setLocale(I18nService._localeFromLanguage(lang));
  }

  private _setLanguage(lang: string) {
    this._translateService.use(lang); // translations
    this._languageUpdates.next(lang);
  }

  /** * Clients of this service are supposed to set this using {setLanguageAndLocale} * @param locale * @private */
  private _setLocale(locale: string) {
    // this._materialDateAdapter.setLocale(locale);
    this._localeUpdates.next(locale);
  }

}
