import { SocialMedia } from './../models/social-media';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocialMediaService {
  constructor(private httpClient: HttpClient) {}

  getSocialMedia() {
    return this.httpClient.get<SocialMedia[]>(
      environment.apiUrl + '/SocialMedia'
    );
  }
}
