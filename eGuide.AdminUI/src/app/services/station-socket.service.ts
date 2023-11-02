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

  getStationSocketWithStationId(stationId: number) {
    return this.http.get<StationSocket[]>(
      `${environment.apiUrl}/StationSocket?stationId=${stationId}`
    );
  }

  createStationSocket(stationSocket: StationSocket) {
    return this.http.post<StationSocket>(
      `${environment.apiUrl}/StationSocket`,
      stationSocket,
      { responseType: 'json' }
    );
  }

  deleteStationSocket(id: number) {
    return this.http.delete(`${environment.apiUrl}/StationSocket/${id}`);
  }

  hardDeleteStationSocket(id: number) {
    return this.http.patch(`${environment.apiUrl}/StationSocket/${id}`, null);
  }

  getStationInformationByStationModelId(stationModelId: string) {
    return this.http.get<StationSocket[]>(
      `${environment.apiUrl}/StationSocket/${stationModelId}`
    );
  }

  getAllStationInformation() {
    return this.http.get<StationSocket[]>(
      `${environment.apiUrl}/StationSocket/GetAllStationProfile`
    );
  }
}
