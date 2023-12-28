import { Observable } from 'rxjs';
import { Website } from './../models/website';
import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebsiteService {
  constructor(private httpClient: HttpClient) {}

  getWebsite(): Observable<Website[]> {
    return this.httpClient.get<Website[]>(environment.apiUrl + '/Website');
  }
}
