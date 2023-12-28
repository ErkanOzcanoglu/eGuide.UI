import { Observable } from 'rxjs';
import { Logs } from './../models/logs';
import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LogsService {
  constructor(private httpClient: HttpClient) {}

  getAllLogs(): Observable<Logs[]> {
    return this.httpClient.get<Logs[]>(`${environment.apiUrl}/logs`);
  }

  getErrorLogs(): Observable<Logs[]> {
    return this.httpClient.get<Logs[]>(
      `${environment.apiUrl}/Log/get-error-log`
    );
  }

  getInfoLogs(): Observable<Logs[]> {
    return this.httpClient.get<Logs[]>(
      `${environment.apiUrl}/Log/get-info-log`
    );
  }
}
