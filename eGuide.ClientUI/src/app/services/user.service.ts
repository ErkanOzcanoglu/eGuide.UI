import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'User';

  constructor(private http: HttpClient, private router: Router) {}

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/${this.url}`);
  }

  public removeUser(userId: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${this.url}?id=${userId}`);
  }

  public getUserById(userId: string): Observable<User> {
    return this.http.get<User>(
      `${environment.apiUrl}/${this.url}/getbyId?id=${userId}`
    );
  }

  public updateUser(userId: string, user: User): Observable<any> {
    return this.http.put(`${environment.apiUrl}/${this.url}/${userId}`, user);
  }

  public forgotPassword(userId: string): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/${this.url}}/forgot-password?userId=${userId}`,
      {}
    );
  }

  public resetPassword(userId: string, request: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/${this.url}/reset-password?userId=${userId}`,
      request
    );
  }
}
