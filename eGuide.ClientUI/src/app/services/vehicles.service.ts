import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicle } from '../models/vehicle';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  private url = 'UserforVehicle';
  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store
  ) {}

  public getAllVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${environment.apiUrl}/${this.url}`);
  }

  public createVehicle(entity: Vehicle): Observable<Vehicle> {
    return this.http.post(`${environment.apiUrl}/Create`, entity);
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

  public getAllBrands(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiUrl}/${this.url}/brands`);
  }

  public getVehicleById(vehicleId: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(
      `${environment.apiUrl}/${this.url}/getVehiclebyId/${vehicleId}`
    );
  }
}
