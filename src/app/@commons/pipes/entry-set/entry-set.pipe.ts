import {Pipe, PipeTransform} from '@angular/core';

/** converts a hash/map/object to a set of entries */
@Pipe({name: 'entrySet', standalone: true})
export class EntrySetPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value === null) return [];
    const entries = [];
    for (let key in value) entries.push({key: key, value: value[key]});
    return entries;
  }
}
