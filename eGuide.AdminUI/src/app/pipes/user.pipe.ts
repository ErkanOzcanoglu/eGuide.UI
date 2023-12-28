import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userFilter',
})
export class UserFilterPipe implements PipeTransform {
  transform(items: any[], searchTerm: string): any[] {
    if (!items || !searchTerm) {
      return items;
    }

    searchTerm = searchTerm.toLowerCase();

    return items.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.surname.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );
  }
}