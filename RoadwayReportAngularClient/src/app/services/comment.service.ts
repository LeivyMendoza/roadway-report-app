import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {}

  addComment(reportId: number, comment: string) {
    const commentData = { report: reportId, content: comment };
    return this.http.post(`${this.apiUrl}comments/`, commentData);
  }

  getComments(reportId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}comments/report/${reportId}`);
  }
}
