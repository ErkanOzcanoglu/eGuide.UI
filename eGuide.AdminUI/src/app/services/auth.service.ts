import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Admin } from '../models/admin';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  public login(user: Admin): Observable<Admin> {
    return this.http.post<Admin>(`${environment.apiUrl}/Admin/login`, user, {
      responseType: 'json',
    });
  }

  public logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  loggedIn = false;

  // constructor(private router: Router) {
  //   this.checkLoginStatus();
  // }

  isAuthenticated() {
    return this.loggedIn;
  }

  private checkLoginStatus() {
    const authToken = localStorage.getItem('authToken');
    this.loggedIn = authToken !== null;
    if (this.loggedIn) {
      this.router.navigate(['/']);
    }
  }
}
