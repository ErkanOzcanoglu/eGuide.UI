import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Station } from '../models/station';
import { environment } from '../environments/environment';
import { Model } from '../models/stationInformationModel';

@Injectable({
  providedIn: 'root',
})
export class StationService {
  constructor(private http: HttpClient, private router: Router) {}

  getStations() {
    return this.http.get<Station[]>(`${environment.apiUrl}/Station`, {
      responseType: 'json',
    });
  }

  createStation(station: Station) {
    return this.http.post<Station>(`${environment.apiUrl}/Station`, station, {
      responseType: 'json',
    });
  }

  getAllStaiton() {
    return this.http.get<Model[]>(`${environment.apiUrl}/Station`, {
      responseType: 'json',
    });
  }

  getStationById(id: string) {
    return this.http.get<Station>(`${environment.apiUrl}/Station/${id}`, {
      responseType: 'json',
    });
  }

  updateStation(id: string, station: Station) {
    return this.http.put<Station>(
      `${environment.apiUrl}/Station/${id}`,
      station,
      {
        responseType: 'json',
      }
    );
  }

  deleteStation(id: string) {
    return this.http.delete(`${environment.apiUrl}/Station?id=${id}`);
  }

  hardDeleteStation(id: string) {
    return this.http.patch(`${environment.apiUrl}/Station/${id}`, null);
  }
}
