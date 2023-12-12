import { Mail, ReplyMail } from './../models/mail';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private httpClient: HttpClient) {}

  getMails(): Observable<Mail[]> {
    return this.httpClient.get<Mail[]>(`${environment.apiUrl}/ContactForm`);
  }

  getUnreadMails(): Observable<Mail[]> {
    return this.httpClient.get<Mail[]>(
      `${environment.apiUrl}/ContactForm/unread`
    );
  }

  readMail(id: any): Observable<Mail> {
    return this.httpClient.put<Mail>(
      `${environment.apiUrl}/ContactForm?id=${id}`,
      {}
    );
  }

  deleteMail(id: any): Observable<Mail> {
    return this.httpClient.delete<Mail>(
      `${environment.apiUrl}/ContactForm/${id}`
    );
  }

  replyMail(mail: ReplyMail): Observable<ReplyMail> {
    return this.httpClient.post<ReplyMail>(
      `${environment.apiUrl}/ContactForm/reply-mail`,
      mail
    );
  }

  replyTo(mail: ReplyMail): Observable<ReplyMail> {
    return this.httpClient.post<ReplyMail>(
      `${environment.apiUrl}/ContactForm/reply-to`,
      mail
    );
  }
}
