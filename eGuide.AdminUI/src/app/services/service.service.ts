import { Observable } from 'rxjs';
import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '../models/service';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private httpClient: HttpClient) {}

  getAllServiceList(): Observable<Service[]> {
    return this.httpClient.get<Service[]>(`${environment.apiUrl}/Service`);
  }

  getServiceById(id: number): Observable<Service> {
    return this.httpClient.get<Service>(`${environment.apiUrl}/Service/${id}`);
  }

  createService(service: Service): Observable<Service> {
    return this.httpClient.post<Service>(
      `${environment.apiUrl}/Service`,
      service,
      { responseType: 'json' }
    );
  }

  updateService(id: any, service: Service): Observable<Service> {
    return this.httpClient.put<Service>(
      `${environment.apiUrl}/Service?id=${id}`,
      service,
      { responseType: 'json' }
    );
  }

  deleteService(id: string) {
    return this.httpClient.delete(`${environment.apiUrl}/Service/${id}`);
  }
}
