import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ChargingUnit } from '../models/charging-unit';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChargingUnitService {
  constructor(private http: HttpClient, private router: Router) {}

  addChargingUnit(chargingUnit: ChargingUnit): Observable<ChargingUnit> {
    return this.http.post<ChargingUnit>(
      `${environment.apiUrl}/ChargingUnit`,
      chargingUnit,
      {
        responseType: 'json',
      }
    );
  }

  getChargingUnits(): Observable<ChargingUnit[]> {
    return this.http.get<ChargingUnit[]>(
      `${environment.apiUrl}/ChargingUnit/AllChargingUnits`,
      {
        responseType: 'json',
      }
    );
  }

  getChargingUnit(id: string): Observable<ChargingUnit> {
    return this.http.get<ChargingUnit>(
      `${environment.apiUrl}/ChargingUnit/${id}`,
      {
        responseType: 'json',
      }
    );
  }

  updateChargingUnit(
    id: string,
    chargingUnit: ChargingUnit
  ): Observable<ChargingUnit> {
    return this.http.put<ChargingUnit>(
      `${environment.apiUrl}/ChargingUnit?id=${id}`,
      chargingUnit,
      {
        responseType: 'json',
      }
    );
  }

  deleteChargingUnit(id: string) {
    return this.http.delete(`${environment.apiUrl}/ChargingUnit/${id}`);
  }

  hardDeleteChargingUnit(id: string) {
    return this.http.patch(`${environment.apiUrl}/ChargingUnit/${id}`, null);
  }
}
