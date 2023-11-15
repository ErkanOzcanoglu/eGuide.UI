import { environment } from './../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient) {}

  uploadImage(imageData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/ImageModel`, imageData);
  }

  getImageById(): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/ImageModel?id=735dbfbc-7395-459e-839c-80127df670af`
    );
  }
}
