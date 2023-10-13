import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserVehicle } from '../models/user-vehicle';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserVehicleService {
  private url = 'UserVehicle';

  constructor(private http: HttpClient, private router: Router) {}

  public saveVehicle(uservehicle: UserVehicle): Observable<any> {
    return this.http.post(`${environment.apiUrl}/Save`, uservehicle);
  }

  public getvehicleById(userId: string): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/${this.url}/getbyId?id=${userId}`
    );
  }

  updateVehicle(userId: string,vehicleId: string,idNew: string): Observable<any> {
    const data = {
      userId: userId,
      vehicleId: vehicleId,
      idNew: idNew,
    };
    return this.http.put(
      `${environment.apiUrl}/${this.url}/update-vehicle?userId${userId}&vehicleId=${vehicleId}&idNew=${idNew}`,data
    );
  }
  
}
