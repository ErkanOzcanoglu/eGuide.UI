import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getFirstTwoParts',
})
export class GetFirstTwoPartsPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const parts = value.split(',').slice(0, 2);
    return parts.join(',');
  }
}
