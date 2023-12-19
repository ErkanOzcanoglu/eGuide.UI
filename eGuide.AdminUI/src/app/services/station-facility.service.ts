import { Observable } from 'rxjs';
import { StationFacility } from '../models/station-facility';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StationFacilityService {
  constructor(private httpClient: HttpClient) {}

  getStationFacilities(): Observable<StationFacility[]> {
    return this.httpClient.get<StationFacility[]>(
      `${environment.apiUrl}/StationFacility`
    );
  }

  getStationFacilityById(id: string): Observable<StationFacility> {
    return this.httpClient.get<StationFacility>(
      `${environment.apiUrl}/StationFacility/${id}`
    );
  }

  createStationFacility(stationFacility: StationFacility) {
    return this.httpClient.post(
      `${environment.apiUrl}/StationFacility`,
      stationFacility
    );
  }

  updateStationFacility(id: any, stationFacility: StationFacility) {
    return this.httpClient.put(
      `${environment.apiUrl}/StationFacility/${id}`,
      stationFacility
    );
  }

  deleteStationFacility(id: string) {
    return this.httpClient.delete(
      `${environment.apiUrl}/StationFacility/${id}`
    );
  }
}
