import { Pipe, PipeTransform } from '@angular/core';
import { DropdownItem } from '../data-types/dropdown-item.interface';

@Pipe({
  name: 'dropdownItemsFromArray'
})
export class DropdownItemsFromArrayPipe implements PipeTransform {

  transform(array: any[], keyBy: string | Function): DropdownItem<any, any>[] {
    const res: DropdownItem<any, any>[] = [];
    if (typeof(keyBy) === 'string') {
      array.forEach(item => {
        res.push({ id: item[keyBy], data: item });
      });
    } else if (typeof(keyBy) === 'function') {
      array.forEach(item => {
        res.push({ id: keyBy(item), data: item });
      });
    } else {
      console.error('Unexpected type of "keyBy". A function or string parameter was expected');
    }
    return res;
  }

}
