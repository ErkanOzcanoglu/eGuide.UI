import { Pipe, PipeTransform } from '@angular/core';
import { Station } from '../models/station';

@Pipe({
  name: 'stationFilter',
})
export class StationFilterPipe implements PipeTransform {
  /**
   * Pipe filters the list of elements based on the search text provided
   *
   * @param items list of elements to search in
   * @param searchText search string
   * @returns list of elements filtered by search text or []
   */
  transform(items: Station[], searchText: string): Station[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }

    return items.filter((it) => {
      // return name and also the address of the station
      return (
        it.name.toLowerCase().includes(searchText.toLowerCase()) ||
        it.address.toLowerCase().includes(searchText.toLowerCase()) ||
        it.stationModel?.name.toLowerCase().includes(searchText.toLowerCase())
      );
    });
  }
}
