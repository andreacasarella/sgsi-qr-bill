import {Pipe, PipeTransform} from '@angular/core';
import {friendlyFormatIBAN, isValidIBAN} from "ibantools";

@Pipe({
  name: 'iban',
  standalone: true
})
export class IbanPipe implements PipeTransform {

  transform(iban: string, ...args: unknown[]): string | null {
    return isValidIBAN(iban) ? friendlyFormatIBAN(iban) : iban;
  }

}
