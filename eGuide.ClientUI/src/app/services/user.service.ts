import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { ResetPassword } from '../models/resetPassword';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'User';

  constructor(private http: HttpClient) {}

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/${this.url}`);
  }

  public removeUser(userId: string): Observable<User> {
    return this.http.delete<User>(
      `${environment.apiUrl}/${this.url}/${userId}`
    );
  }

  public getUserById(userId: string): Observable<User> {
    return this.http.get<User>(
      `${environment.apiUrl}/${this.url}/getbyId?id=${userId}`
    );
  }

  public updateUser(userId: string, user: User): Observable<User> {
    return this.http.put<User>(
      `${environment.apiUrl}/${this.url}/${userId}`,
      user
    );
  }

  public forgotPassword(userId: string): Observable<User> {
    return this.http.post<User>(
      `${environment.apiUrl}/${this.url}/forgot-password?userId=${userId}`,
      {}
    );
  }

  public resetPassword(
    resetPasswordModel: ResetPassword,
    userId: string
  ): Observable<User> {
    return this.http.post<User>(
      `${environment.apiUrl}/${this.url}/reset-password?userId=${userId}`,
      resetPasswordModel
    );
  }

  public forgotPasswordScreen(userEmail: string): Observable<User> {
    const encodedEmail = userEmail.replace('@', '%40');
    return this.http.post<User>(
      `${environment.apiUrl}/${this.url}/forgot-password/${encodedEmail}`,
      encodedEmail
    );
  }

  public resetPasswordScreen(
    resetInfo: ResetPassword,
    token: string
  ): Observable<User> {
    return this.http.post<User>(
      `${environment.apiUrl}/${this.url}/reset-password-screen?token=${token}`,
      resetInfo
    );
  }

  public confirmAccount(token: string) {
    const url = `${environment.apiUrl}/${this.url}/confirm?token=${token}`;
    return this.http.get(url);
  }
}
