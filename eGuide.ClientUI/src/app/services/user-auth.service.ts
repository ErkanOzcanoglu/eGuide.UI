import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { ResetPassword } from '../models/resetPassword';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  private url = 'User';

  constructor(private http: HttpClient) {}

  public registerUser(user: User): Observable<User> {
    return this.http.post<User>(
      `${environment.apiUrl}/${this.url}/register`,
      user
    );
  }

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

  public updateUser(userId: string, userDto: User): Observable<User> {
    return this.http.put<User>(
      `${environment.apiUrl}/${this.url}/${userId}`,
      userDto
    );
  }

  public confirmAccount(token: string): Observable<User> {
    return this.http.get<User>(
      `${environment.apiUrl}/api/user/confirm?token=${token}`
    );
  }

  public login(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/User/login`, user, {
      responseType: 'json',
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
}
