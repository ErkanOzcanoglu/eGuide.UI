import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Admin } from '../models/admin';
import { ResetPassword } from '../models/resetPassword';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private httpClient: HttpClient) {}

  getAdminInfo(adminId: string) {
    return this.httpClient.get(`${environment.apiUrl}/Admin/${adminId}`);
  admin: Admin = new Admin();
  private url = 'Admin';

  constructor(private http: HttpClient) {}

  public login(admin: Admin): Observable<string> {
    return this.http.post(`${environment.apiUrl}/${this.url}/login`, admin, {
      responseType: 'text',
    });
  }

  confirmAccount(token: string) {
    const url = `${environment.apiUrl}/${this.url}/confirm?token=${token}`;
    return this.http.get(url);
  }

  resetPasswordScreen(
    resetInfo: ResetPassword,
    token: string
  ): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/${this.url}/reset-password-screen?token=${token}`,
      resetInfo
    );
  }

  forgotPasswordScreen(userEmail: string): Observable<any> {
    const encodedEmail = userEmail.replace('@', '%40');
    return this.http.post<any>(
      `${environment.apiUrl}/${this.url}/forgot-password/${encodedEmail}`,
      encodedEmail
    );
  }
}
