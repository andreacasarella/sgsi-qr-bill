import {Pipe, PipeTransform} from '@angular/core';
import {EntrySetPipe} from "../entry-set/entry-set.pipe";
import {ValidationErrors} from "@angular/forms";
import {I18nService} from "../../../@core/i18n/i18n.service";

/** * Maps ValidationErrors to an array, mapping each error to its translation, finally joins in a single phrase. * N.B.: errors with key nestedError are ignored as they are just placeholder used by nested forms to prevent submission * of their parents if one of their controls is invalid; control-specific errors are handled and displayed by controls in nested forms * */
@Pipe({name: 'errorsPhrase', standalone: true})
export class ErrorsPhrasePipe extends EntrySetPipe implements PipeTransform {

  constructor(private i18n: I18nService) {
    super();
  }

  override transform(errors: ValidationErrors | null | undefined, args?: any): any {
    if (errors) return super.transform(errors, args).filter((entry: ValidationErrors) => entry['key'] !== 'nestedError')
      .map((entry: ValidationErrors) => {
        let key = entry['key'].indexOf('.') === -1 ? `errors.${entry['key']}` : entry['key'];
        if (!!args && args.hasOwnProperty('prefix')) key = args['prefix'] + key;
        return this.i18n.translate(key, entry['value'] || {});
      }).join(', ');
    return null;
  }
}
