import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBySubscribers'
})
export class SortBySubscribersPipe implements PipeTransform {

  transform(value: any, propName: string): unknown {
    return value.sort((a, b) => {
      if (a[propName].length > b[propName].length) {
        return -1;
      } else {
        return 1;
      }
    });
  }

}
