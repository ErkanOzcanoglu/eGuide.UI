import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Socket } from '../models/socket';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor(private http: HttpClient, private router: Router) {}

  addSocket(socket: Socket): Observable<Socket> {
    return this.http.post<Socket>(`${environment.apiUrl}/Socket`, socket, {
      responseType: 'json',
    });
  }

  getSockets(): Observable<Socket[]> {
    return this.http.get<Socket[]>(`${environment.apiUrl}/Socket`, {
      responseType: 'json',
    });
  }

  getSocket(id: string): Observable<Socket> {
    return this.http.get<Socket>(`${environment.apiUrl}/Socket/${id}`, {
      responseType: 'json',
    });
  }

  updateSocket(id: string, socket: Socket): Observable<Socket> {
    return this.http.put<Socket>(
      `${environment.apiUrl}/Socket?id=${id}`,
      socket,
      {
        responseType: 'json',
      }
    );
  }

  deleteSocket(id: string) {
    return this.http.delete(`${environment.apiUrl}/Socket/${id}`);
  }

  hardDeleteSocket(id: string) {
    return this.http.patch(`${environment.apiUrl}/Socket/${id}`, null);
  }
}
