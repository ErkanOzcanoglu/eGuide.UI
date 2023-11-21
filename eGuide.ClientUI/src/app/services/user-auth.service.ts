import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { ResetPassword } from '../models/resetPassword';
import { UserLog } from '../models/user-log';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  private url = 'User';

  constructor(private http: HttpClient, private router: Router) {}

  public registerUser(user: User): Observable<User> {
    return this.http.post<User>(
      `${environment.apiUrl}/${this.url}/register`,
      user
    );
  }

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

  public updateUser(userId: string, userDto: User): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}/${this.url}/${userId}`,
      userDto
    );
  }

  public confirmAccount(token: string): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/api/user/confirm?token=${token}`
    );
  }

  public login(user: User): Observable<string> {
    return this.http.post(`${environment.apiUrl}/${this.url}/login`, user, {
      responseType: 'text',
    });
  }

  public forgotPassword(email: string): Observable<string> {
    const requestBody = { email };
    return this.http.post<string>(
      `${environment.apiUrl}/${this.url}/forgot-password?email=`,
      requestBody
    );
  }

  public resetPassword(request: ResetPassword): Observable<string> {
    return this.http.post<string>(
      `${environment.apiUrl}/${this.url}//reset-password`,
      request
    );
  }

  public login_Log(userLog: UserLog): Observable<UserLog> {
    return this.http.post<UserLog>(
      `${environment.apiUrl}/${this.url}/users-log`,
      userLog
    );
  }
}
