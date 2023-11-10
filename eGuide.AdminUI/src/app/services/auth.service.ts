import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { Admin } from '../models/admin';

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
}
