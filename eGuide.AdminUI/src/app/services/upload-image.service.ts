import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadImageService {
  constructor(private httpClient: HttpClient) {}

  uploadImage(data: any): Observable<any> {
    return this.httpClient.post(
      'https://api.cloudinary.com/v1_1/dg7apl0rh/image/upload',
      data
    );
  }
}
