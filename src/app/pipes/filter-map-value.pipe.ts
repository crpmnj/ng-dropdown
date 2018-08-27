import { Pipe, PipeTransform } from '@angular/core';
import { DropdownItem } from '../data-types/dropdown-item.interface';

@Pipe({
  name: 'filterMapValue'
})
export class FilterMapValuePipe implements PipeTransform {

  transform(map: Map<any, DropdownItem[]>, filter: Function, expr: string): { key: any, value: any }[] {
    return Array.from(map.entries()).map(item => {
      return { key: item[0], value: expr ? item[1].filter(el => filter(el.data, expr)) : item[1] };
    });
  }

}
