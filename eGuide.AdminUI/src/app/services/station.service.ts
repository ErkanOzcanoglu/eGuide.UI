import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Station } from '../models/station';
import { environment } from '../environments/environment';

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
}