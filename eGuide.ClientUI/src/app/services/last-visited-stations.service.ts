import { Observable } from 'rxjs';
import { LastVisitedStations } from '../models/last-visited-stations';
import { environment } from '../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LastVisitedStationsService {
  constructor(private httpClient: HttpClient) {}

  createLastVisitedStation(
    favoriteStation: LastVisitedStations
  ): Observable<LastVisitedStations> {
    return this.httpClient.post<LastVisitedStations>(
      environment.apiUrl + '/LastVisitedStations',
      favoriteStation
    );
  }

  getLastVisitedStationsByUserId(
    userId: string
  ): Observable<LastVisitedStations[]> {
    return this.httpClient.get<LastVisitedStations[]>(
      environment.apiUrl + '/LastVisitedStations/' + userId
    );
  }

  removeLastVisitedStation(id: string): Observable<LastVisitedStations> {
    return this.httpClient.delete<LastVisitedStations>(
      environment.apiUrl + '/LastVisitedStations/' + id
    );
  }
}
