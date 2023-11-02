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

  updateConnector(id: string, socket: Connector): Observable<Connector> {
    return this.http.put<Connector>(
      `${environment.apiUrl}/Connector?id=${id}`,
      socket,
      {
        responseType: 'json',
      }
    );
  }

  hardDeleteConnector(id: string) {
    return this.http.delete(`${environment.apiUrl}/Connector/${id}`);
  }

  deleteConnector(id: string) {
    return this.http.patch(`${environment.apiUrl}/Connector/${id}`, null);
  }
}
