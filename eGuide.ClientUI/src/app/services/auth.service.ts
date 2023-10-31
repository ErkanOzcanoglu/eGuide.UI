import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = false;

  constructor(private router: Router) {
    this.checkLoginStatus();
  }

  isAuthenticated() {
    return this.loggedIn;
  }

  login() {
    if (!this.loggedIn) {
      this.loggedIn = true;
      this.router.navigate(['/']);
    }
  }

  logout() {
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }

  private checkLoginStatus() {
    const authToken = localStorage.getItem('authToken');
    this.loggedIn = authToken !== null;
    if (this.loggedIn) {
      this.router.navigate(['/']); // Kullanıcı zaten giriş yapmışsa ana sayfaya yönlendir
    }
  }
}
