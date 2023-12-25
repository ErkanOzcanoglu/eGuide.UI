import { Observable } from 'rxjs';
import { Facility } from './../models/facility';
import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FacilityService {
  constructor(private httpClient: HttpClient) {}

  getFacilities(): Observable<Facility[]> {
    return this.httpClient.get<Facility[]>(environment.apiUrl + '/Facility');
  }

  createFacility(facility: Facility): Observable<Facility> {
    return this.httpClient.post<Facility>(
      environment.apiUrl + '/Facility',
      facility
    );
  }

  updateFacility(facilityId: string, facility: Facility): Observable<Facility> {
    return this.httpClient.put<Facility>(
      environment.apiUrl + '/Facility?id=' + facilityId,
      facility
    );
  }

  deleteFacility(facilityId: string): Observable<Facility> {
    return this.httpClient.delete<Facility>(
      environment.apiUrl + '/Facility?id=' + facilityId
    );
  }
}
