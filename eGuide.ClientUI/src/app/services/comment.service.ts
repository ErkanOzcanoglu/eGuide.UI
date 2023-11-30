import { Comment } from './../models/comment';
import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private httpClient: HttpClient) {}

  getComments(stationId: string): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(
      `${environment.apiUrl}/Comment/${stationId}`
    );
  }

  addComment(comment: Comment): Observable<Comment> {
    return this.httpClient.post<Comment>(
      `${environment.apiUrl}/Comment`,
      comment
    );
  }
}
