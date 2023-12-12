import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactFormService {
  constructor(private httpClient: HttpClient) {}

  sendEmail(email: any) {
    return this.httpClient.post(`${environment.apiUrl}/ContactForm`, email);
  }

  storeMail(email: any) {
    return this.httpClient.post(
      `${environment.apiUrl}/ContactForm/send`,
      email
    );
  }

  replayMail(replayMail: any) {
    return this.httpClient.post(
      `${environment.apiUrl}/ContactForm/reply-mail`,
      replayMail
    );
  }
}
