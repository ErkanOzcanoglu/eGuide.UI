import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ReplayMail } from '../models/replayMail';

@Injectable({
  providedIn: 'root',
})
export class ContactFormService {
  constructor(private httpClient: HttpClient) {}

  sendEmail(email: ReplayMail) {
    return this.httpClient.post(`${environment.apiUrl}/ContactForm`, email);
  }

  storeMail(email: ReplayMail) {
    return this.httpClient.post(
      `${environment.apiUrl}/ContactForm/send`,
      email
    );
  }

  replayMail(replayMail: ReplayMail) {
    return this.httpClient.post(
      `${environment.apiUrl}/ContactForm/reply-mail`,
      replayMail
    );
  }
}
