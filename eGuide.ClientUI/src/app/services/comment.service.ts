import { Comment } from './../models/comment';
import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private httpClient: HttpClient) {}

  getComments(stationId: string) {
    return this.httpClient.get<Comment[]>(
      `${environment.apiUrl}/api/comments/${stationId}`
    );
  }

  addComment(comment: Comment) {
    return this.httpClient.post<Comment>(
      `${environment.apiUrl}/Comment`,
      comment
    );
  }
}
