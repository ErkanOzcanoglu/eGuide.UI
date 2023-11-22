import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { Station } from '../models/station';

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

  getStationByName(name: string) {
    return this.http.get<Station>(`${environment.apiUrl}/Station/${name}`, {
      responseType: 'json',
    });
  }

  getStationById(id: any) {
    return this.http.get<Station>(`${environment.apiUrl}/Station/${id}`, {
      responseType: 'json',
    });
  }
}
