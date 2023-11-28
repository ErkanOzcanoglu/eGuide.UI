import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserStationService {

  private url = 'UserStation';
  constructor(private http: HttpClient, private router: Router) {}

  getTotalUserCountForStation(stationId: string): Observable<number> { 
    return this.http.get<number>(`${environment.apiUrl}/${this.url}/GetTotalUserCountForStation/${stationId}`);
  }

  getDistinctStationIds(): Observable<string[]> { 
  
    return this.http.get<string[]>(`${environment.apiUrl}/${this.url}/GetDistinctStationIds/`);
  }
 
}
