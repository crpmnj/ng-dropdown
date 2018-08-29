import { Pipe, PipeTransform } from '@angular/core';
import { DropdownItem } from '../data-types/dropdown-item.interface';

@Pipe({
  name: 'filterMapValue'
})
export class FilterMapValuePipe implements PipeTransform {

  transform(map: Map<any, DropdownItem[]>, filter: Function, expr: string): { key: any, value: any }[] {
    const result: { key: any, value: any[] }[] = [];
    if (expr) {
      map.forEach((items, key) => {
        const value = items.filter(el => filter(el.data, expr));
        if (value.length) {
          result.push({ key: key, value: value });
        }
      });
    } else {
      map.forEach((items, key) => result.push({ key: key, value: items }));
    }
    return result;

  }

}
