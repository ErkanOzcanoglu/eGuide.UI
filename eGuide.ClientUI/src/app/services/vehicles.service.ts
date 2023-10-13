import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicle } from '../models/vehicle';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  private url = 'VehiclesControllerForUser';
  constructor(private http: HttpClient, private router: Router) {}

  public getAllVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${environment.apiUrl}/${this.url}`);
  }

  public createVehicle(entity: Vehicle): Observable<any> {
    return this.http.post(`${environment.apiUrl}/Create`, entity);
  }

  public getModelsByBrand(brand: string): Observable<string[]> {
    const url = `${environment.apiUrl}/models/${brand}`;
    return this.http.get<string[]>(url);
  }

  public getPrimaryKeyByBrandAndModel(
    brand: string,
    model: string
  ): Observable<string> {
    const url = `${environment.apiUrl}/primarykey/${brand}/${model}`;
    return this.http.get<string>(url);
  }

  public getAllBrands(): Observable<string[]> {   
    return this.http.get<string[]>(`${environment.apiUrl}/${this.url}/brands`);
  }
  
}
