import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Connector } from '../models/connector';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConnectorService {
  constructor(private http: HttpClient, private router: Router) {}

  getConnectors() {
    return this.http.get<Connector[]>(`${environment.apiUrl}/Connector`);
  }

  createConnector(connector: Connector): Observable<Connector> {
    return this.http.post<Connector>(
      `${environment.apiUrl}/Connector`,
      connector,
      { responseType: 'json' }
    );
  }
}
