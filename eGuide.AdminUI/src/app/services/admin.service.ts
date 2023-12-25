import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Admin } from '../models/admin';
import { ResetPassword } from '../models/resetPassword';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private url = 'Admin';

  constructor(private http: HttpClient) {}

  adminRegister(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(
      `${environment.apiUrl}/${this.url}/registerAdmin`,
      admin,
      {
        responseType: 'json',
      }
    );
  }

  getAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${environment.apiUrl}/${this.url}`, {
      responseType: 'json',
    });
  }

  public login(admin: Admin): Observable<string> {
    return this.http.post<string>(
      `${environment.apiUrl}/${this.url}/login`,
      admin,
      {
        responseType: 'json',
      }
    );
  }

  getAdminInfo(adminId: any): Observable<Admin> {
    return this.http.get(`${environment.apiUrl}/Admin/getbyId?id=${adminId}`, {
      responseType: 'json',
    });
  }

  confirmAccount(token: string) {
    const url = `${environment.apiUrl}/${this.url}/confirm?token=${token}`;
    return this.http.get(url);
  }

  resetPasswordScreen(resetInfo: ResetPassword, userId: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/${this.url}/reset-password?userId=${userId}`,
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

  updateAdminInformation(adminId: string, admin: Admin): Observable<Admin> {
    return this.http.put<Admin>(
      `${environment.apiUrl}/Admin/${adminId}`,
      admin
    );
  }

  adminForgotPassword(adminId: any): Observable<Admin> {
    return this.http.post<Admin>(
      `${environment.apiUrl}/Admin/forgot-password?userId=${adminId}`,
      adminId
    );
  }

  passChange(adminId: any, admin: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/Admin/pass-change?id=${adminId}`,
      admin
    );
  }

  deleteAdmin(id: string): Observable<Admin> {
    return this.http.delete<Admin>(`${environment.apiUrl}/Admin?id=${id}`);
  }
}
