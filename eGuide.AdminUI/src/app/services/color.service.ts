import { Color } from 'src/app/models/color';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  constructor(private httpClient: HttpClient) {}

  getColor(): Observable<Color[]> {
    return this.httpClient.get<Color[]>(environment.apiUrl + '/Color', {
      responseType: 'json',
    });
  }

  updateColor(id: any, color: Color): Observable<Color> {
    return this.httpClient.put<Color>(
      environment.apiUrl + '/Color/' + id,
      color,
      {
        responseType: 'json',
      }
    );
  }
}
