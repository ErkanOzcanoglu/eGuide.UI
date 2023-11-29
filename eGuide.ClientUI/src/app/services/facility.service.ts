import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Facility } from '../models/facility';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FacilityService {
  private url = 'Facility';
  constructor(private http: HttpClient, private router: Router) {}

  public getFacilityById(facilityId: string): Observable<any> {
    return this.http.get<Facility>(
      `${environment.apiUrl}/${this.url}/facility-by-facility-id/${facilityId}`
    );
  }

  // public getFacilities(): Observable<Facility[]> {
  //   return this.http.get<Facility[]>(`${environment.apiUrl}/${this.url}`);
  // }
}
