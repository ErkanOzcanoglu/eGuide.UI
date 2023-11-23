import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SocialMedia } from '../models/social-media';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocialMediaService {
  constructor(private httpClient: HttpClient) {}

  getSocialMedias() {
    return this.httpClient.get<SocialMedia[]>(
      `${environment.apiUrl}/SocialMedia`
    );
  }

  addSocialMedia(socialMedia: SocialMedia) {
    return this.httpClient.post<SocialMedia>(
      `${environment.apiUrl}/SocialMedia`,
      socialMedia
    );
  }

  updateSocialMedia(
    id: any,
    socialMedia: SocialMedia
  ): Observable<SocialMedia> {
    return this.httpClient.put<SocialMedia>(
      `${environment.apiUrl}/SocialMedia/${id}`,
      socialMedia,
      {
        responseType: 'json',
      }
    );
  }

  deleteSocialMedia(id: any) {
    return this.httpClient.delete<SocialMedia>(
      `${environment.apiUrl}/SocialMedia/${id}`
    );
  }
}
