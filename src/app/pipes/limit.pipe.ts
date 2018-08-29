import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limit'
})
export class LimitPipe implements PipeTransform {

  transform(array: any[], limit?: number): any[] {
    return limit ? array.slice(0, limit) : array;
  }

}
