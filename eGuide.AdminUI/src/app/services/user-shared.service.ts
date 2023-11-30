import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserSharedService {
  private profileSelectedSource = new Subject<string>();
  profileSelected$ = this.profileSelectedSource.asObservable();

  emitProfileSelected(userId: string): void {
    this.profileSelectedSource.next(userId);
  }
}
