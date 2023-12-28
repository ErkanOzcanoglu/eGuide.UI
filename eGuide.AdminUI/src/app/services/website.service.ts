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

  updateWebsite(id: string, website: Website): Observable<Website> {
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

  updateNavbar(id: string, num: number): Observable<Website> {
    return this.httpClient.put<Website>(
      `${environment.apiUrl}/Website/updateNavbar/${id}?num=${num}`,
      num
    );
  }

  updateFooter(id: string, num: number): Observable<Website> {
    return this.httpClient.put<Website>(
      `${environment.apiUrl}/Website/updateFooter/${id}?num=${num}`,
      num
    );
  }
}
