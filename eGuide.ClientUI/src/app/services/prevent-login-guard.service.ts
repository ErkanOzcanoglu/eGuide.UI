import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PreventLoginGuardService implements CanActivate {
  constructor(private router: Router) {
    this.checkLoginStatus();
  }
  loggedIn = false;

  isAuthenticated() {
    return this.loggedIn;
  }

  private checkLoginStatus() {
    const authToken = localStorage.getItem('authToken');
    this.loggedIn = authToken !== null;
    if (this.loggedIn) {
      this.router.navigate(['/']); // Kullanıcı zaten giriş yapmışsa ana sayfaya yönlendir
    }
  }

  canActivate(): boolean {
    if (this.loggedIn) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
