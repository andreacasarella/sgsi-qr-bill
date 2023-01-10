import {TestBed} from '@angular/core/testing';

import {I18nCountriesService} from './i18n-countries.service';

describe('I18nCountriesService', () => {
  let service: I18nCountriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(I18nCountriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
