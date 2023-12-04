import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'User';

  constructor(private http: HttpClient, private router: Router) {}

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/${this.url}`);
  }

  public removeUser(userId: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${this.url}?id=${userId}`);
  }

  public getUserById(userId: string): Observable<User> {
    return this.http.get<User>(
      `${environment.apiUrl}/${this.url}/getbyId?id=${userId}`
    );
  }

  public updateUser(userId: string, user: User): Observable<any> {
    return this.http.put(`${environment.apiUrl}/${this.url}/${userId}`, user);
  }

}
