import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Website } from '../models/website';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebsiteService {
  constructor(private httpClient: HttpClient) {}

  getWebsite(): Observable<Website[]> {
    return this.httpClient.get<Website[]>(`${environment.apiUrl}/Website`, {
      responseType: 'json',
    });
  }

  updateWebsite(id: any, website: Website): Observable<Website> {
    return this.httpClient.put<Website>(
      `${environment.apiUrl}/Website/${id}`,
      website
    );
  }

  getWebsiteById(id: string): Observable<Website> {
    return this.httpClient.get<Website>(`${environment.apiUrl}/Website/${id}`);
  }

  deleteWebsite(id: string): Observable<Website> {
    return this.httpClient.delete<Website>(
      `${environment.apiUrl}/ebsite/${id}`
    );
  }

  addWebsite(website: Website): Observable<Website> {
    return this.httpClient.post<Website>(
      `${environment.apiUrl}/Website`,
      website
    );
  }

  updateNavbar(id: any, num: any): Observable<any> {
    return this.httpClient.put<any>(
      `${environment.apiUrl}/Website/updateNavbar/${id}?num=${num}`,
      num
    );
  }

  updateFooter(id: any, num: any): Observable<any> {
    return this.httpClient.put<any>(
      `${environment.apiUrl}/Website/updateFooter/${id}?num=${num}`,
      num
    );
  }
}
