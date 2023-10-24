import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { StationSocket } from './../models/stationSocket';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class StationSocketService {
  constructor(private http: HttpClient, private route: Router) {}

  getStationSockets() {
    return this.http.get<StationSocket[]>(
      `${environment.apiUrl}/StationSocket`
    );
  }

  createStationSocket(stationSocket: StationSocket) {
    return this.http.post<StationSocket>(
      `${environment.apiUrl}/StationSocket`,
      stationSocket,
      { responseType: 'json' }
    );
  }
}
