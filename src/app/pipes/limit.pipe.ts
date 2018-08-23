import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limit'
})
export class LimitPipe implements PipeTransform {

  transform(array: any[], count?: number): any[] {
    return count ? array.slice(0, count) : array;
  }

}
