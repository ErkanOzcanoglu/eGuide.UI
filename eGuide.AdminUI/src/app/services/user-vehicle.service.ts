import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserVehicle } from '../models/user-vehicle';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserVehicleService {
  private url = 'UserVehicle';

  constructor(private http: HttpClient, private router: Router) {}

  public saveVehicle(uservehicle: UserVehicle): Observable<UserVehicle[]> {
    return this.http.post<UserVehicle[]>(
      `${environment.apiUrl}/${this.url}`,
      uservehicle
    );
  }

  getvehicleById(userId: string): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(
      `${environment.apiUrl}/${this.url}/GetVehicleByUserId/${userId}`
    );
  }

  updateVehicle(
    userId: string,
    vehicleId: string,
    idNew: string,
    connectorId: string
  ): Observable<any> {
    const data = {
      userId: userId,
      vehicleId: vehicleId,
      idNew: idNew,
      connectorId: connectorId,
    };
    return this.http.put(
      `${environment.apiUrl}/${this.url}/update-vehicle?userid=${userId}&vehicleId=${vehicleId}&idNew=${idNew}&connectorId=${connectorId}`,
      data
    );
  }

  deleteUserVehicleByVehicleId(
    userId: string,
    vehicleId: string
  ): Observable<any> {
    return this.http.delete(
      `${environment.apiUrl}/${this.url}/DeleteByVehicleId/${vehicleId}?userid=${userId}`
    );
  }
}