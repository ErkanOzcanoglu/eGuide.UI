import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserStation } from '../models/user-station';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Station } from '../models/station';

@Injectable({
  providedIn: 'root',
})
export class UserStationService {
  private url = 'UserStation';
  constructor(private http: HttpClient, private router: Router) {}

  saveUserStation(userstation: UserStation): Observable<UserStation> {
    return this.http.post<UserStation>(
      `${environment.apiUrl}/${this.url}`,
      userstation
    );
  }

  deleteStationProfile(id: string): Observable<UserStation> {
    return this.http.delete<UserStation>(
      `${environment.apiUrl}/${this.url}/DeleteStationProfile/${id}`
    );
  }

  getStationProfiles(userId: string): Observable<Station[]> {
    return this.http.get<Station[]>(
      `${environment.apiUrl}/${this.url}/GetStationProfile/${userId}`
    );
  }
}
