import {Injector} from "@angular/core";
import {I18nService} from "./i18n.service";

const i18nTranslationsAvailabilityCheck = 'translationsAvailable';

export const i18nAppInitializer = (injector: Injector) => async () => {
  const i18n = injector.get(I18nService);
  await i18n.translateAsync(i18nTranslationsAvailabilityCheck).toPromise();
};
