// search-filter.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilterVehicle',
})
export class SearchFilterPipe implements PipeTransform {
  transform(items: any[], searchTerm: string): any[] {
    if (!items || !searchTerm) {
      return items;
    }

    searchTerm = searchTerm.toLowerCase();

    return items.filter(
      (item) =>
        item.brand.toLowerCase().includes(searchTerm) ||
        item.model.toLowerCase().includes(searchTerm)
    );
  }
}
