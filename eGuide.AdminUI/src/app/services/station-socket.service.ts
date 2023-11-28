import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StationChargingUnit } from '../models/stationSocket';

@Injectable({
  providedIn: 'root',
})
export class StationSocketService {
  constructor(private http: HttpClient, private route: Router) {}

  getStationSockets() {
    return this.http.get<StationChargingUnit[]>(
      `${environment.apiUrl}/StationsChargingUnit`
    );
  }

  getStationSocketWithStationId(stationId: number) {
    return this.http.get<StationChargingUnit[]>(
      `${environment.apiUrl}/StationsChargingUnit?stationId=${stationId}`
    );
  }

  createStationSocket(stationSocket: StationChargingUnit) {
    return this.http.post<StationChargingUnit>(
      `${environment.apiUrl}/StationsChargingUnit`,
      stationSocket,
      { responseType: 'json' }
    );
  }

  deleteStationSocket(id: number) {
    return this.http.delete(`${environment.apiUrl}/StationsChargingUnit/${id}`);
  }

  hardDeleteStationSocket(id: number) {
    return this.http.patch(
      `${environment.apiUrl}/StationsChargingUnit/${id}`,
      null
    );
  }

  getStationInformationByStationModelId(stationModelId: string) {
    return this.http.get<StationChargingUnit[]>(
      `${environment.apiUrl}/StationsChargingUnit/${stationModelId}`
    );
  }

  getAllStationInformation() {
    return this.http.get<StationChargingUnit[]>(
      `${environment.apiUrl}/StationsChargingUnit/GetAllStationProfile`
    );
  }

  updateStationSocket(id: any, stationSocket: StationChargingUnit) {
    return this.http.put<StationChargingUnit>(
      `${environment.apiUrl}/StationsChargingUnit/${id}`,
      stationSocket,
      { responseType: 'json' }
    );
  }
}
