import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private authTokenKey = 'authToken';
  private authTokenSubject: Subject<string> = new Subject<string>();

  constructor() {
    // Yerel depolama değişikliklerini dinle
    window.addEventListener('storage', (event) => {
      if (event.key === this.authTokenKey) {
        const newValue = event.newValue;
        if (newValue !== null) {
          // Yerel depolama değişikliği olduğunda bu Subject'i güncelle
          this.authTokenSubject.next(newValue);
        }
      }
    });
  }

  setAuthToken(authToken: string): void {
    localStorage.setItem(this.authTokenKey, authToken);
    this.authTokenSubject.next(authToken);
  }

  getAuthToken(): string | null {
    const authToken = localStorage.getItem(this.authTokenKey);
    return authToken !== null ? authToken : null;
  }

  authTokenChanges(): Observable<string> {
    return this.authTokenSubject.asObservable();
  }
}
