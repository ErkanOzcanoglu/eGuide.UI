import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private httpClient: HttpClient) {}

  getAdminInfo(adminId: string) {
    return this.httpClient.get(`${environment.apiUrl}/Admin/${adminId}`);
  }
}
