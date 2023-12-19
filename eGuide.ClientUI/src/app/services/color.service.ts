import { Observable } from 'rxjs';
import { Color } from 'src/app/models/color';
import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  constructor(private httpClient: HttpClient) {}

  getColors(): Observable<Color[]> {
    return this.httpClient.get<Color[]>(`${environment.apiUrl}/Color`);
  }
}
