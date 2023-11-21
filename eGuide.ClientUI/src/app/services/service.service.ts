import { Observable } from 'rxjs';
import { Service } from './../models/service';
import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private httpClient: HttpClient) {}

  getAllServices(): Observable<Service[]> {
    return this.httpClient.get<Service[]>(`${environment.apiUrl}/Service`);
  }
}
