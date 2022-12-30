import {ErrorsPhrasePipe} from './errors-phrase.pipe';
import {TranslateService} from '@ngx-translate/core';
import {TestBed} from '@angular/core/testing';

class TranslateServiceMock {
  instant(key: string | Array<string>, interpolateParams?: Object): string {
    return key.indexOf('err1') > -1 ? 'Errore Primario' : 'Errore Secondario';
  }
}

describe('ErrorsPhrasePipe', () => {
  let translateService: TranslateService;
  let pipe: ErrorsPhrasePipe;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: TranslateService, useClass: TranslateServiceMock}],
      teardown: {destroyAfterEach: false}
    });
    translateService = TestBed.inject(TranslateService);
    pipe = new ErrorsPhrasePipe(translateService);
  });
  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('maps error keys to messages using TranslateService', () => {
    const input = {err1: null, err2: {a: 1}};
    const expected = 'Errore Primario, Errore Secondario';
    const actual = pipe.transform(input);
    expect(actual).toEqual(expected);
  });
  it('maps error key nested to messages using TranslateService', () => {
    const input = {'err1.error': null};
    const expected = 'Errore Primario';
    const actual = pipe.transform(input);
    expect(actual).toEqual(expected);
  });
  it('maps error keys to messages using prefix TranslateService', () => {
    const input = {'err1.error': null};
    const expected = 'Errore Primario';
    const actual = pipe.transform(input, {prefix: 'prefix'});
    expect(actual).toEqual(expected);
  });
});
