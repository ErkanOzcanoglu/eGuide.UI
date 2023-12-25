import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicle } from '../models/vehicle';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private url = 'Vehicle';
  constructor(private http: HttpClient, private router: Router) {}

  public addVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(
      `${environment.apiUrl}/${this.url}`,
      vehicle
    );
  }

  public getAllVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${environment.apiUrl}/${this.url}`);
  }

  public getVehicleById(userId: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(
      `${environment.apiUrl}/${this.url}/getbyId?id=${userId}`
    );
  }

  public updateVehicle(vehicleId: any, model: string) {
    return this.http.put(
      `${environment.apiUrl}/${this.url}/${vehicleId}`,
      vehicleId
    );
  }

  hardDeleteVehicle(id: string) {
    return this.http.delete(`${environment.apiUrl}/${this.url}/${id}`);
  }

  public getModelsByBrand(brand: string): Observable<string[]> {
    return this.http.get<string[]>(
      `${environment.apiUrl}/${this.url}/models/${brand}`
    );
  }

  public getPrimaryKeyByBrandAndModel(
    brand: string,
    model: string
  ): Observable<string> {
    return this.http.get<string>(
      `${environment.apiUrl}/${this.url}/primarykey/${brand}/${model}`
    );
  }
}
