import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Connector } from '../models/connector';

@Injectable({
  providedIn: 'root',
})
export class ConnectorService {
  constructor(private http: HttpClient, private router: Router) {}

  getConnectors(): Observable<Connector[]> {
    return this.http.get<Connector[]>(`${environment.apiUrl}/UserConnector`);
  }
}
