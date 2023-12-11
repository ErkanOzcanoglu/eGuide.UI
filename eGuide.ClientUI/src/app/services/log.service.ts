import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLog } from '../models/user-log';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  constructor(private httpClient: HttpClient) {}

  public userLog(userLog: UserLog): Observable<UserLog> {
    return this.httpClient.post<UserLog>(
      `${environment.apiUrl}/Log/users-log`,
      userLog
    );
  }
}
