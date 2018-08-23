import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iterableMap'
})
export class IterableMapPipe implements PipeTransform {

  transform(map: Map<any, any>, args?: any): { key: any, value: any }[] {
    return Array.from(map.entries()).map(item => {
      return { key: item[0], value: item[1] };
    });
  }

}
