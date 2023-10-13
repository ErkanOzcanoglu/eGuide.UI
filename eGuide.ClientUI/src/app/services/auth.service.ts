import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  loggedIn = false;

  isAuthenticated() {
    const userId = localStorage.getItem('userId');
    const authToken = localStorage.getItem('authToken');
     this.loggedIn = userId !== null || authToken !== null;
    return this.loggedIn;
  }

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }
}
