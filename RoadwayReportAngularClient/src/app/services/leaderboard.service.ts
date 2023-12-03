import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  private leaderboardUrl = 'http://localhost:8000/api/leaderboard/'; // Adjust based on your API endpoint

  constructor(private http: HttpClient) {}

  getLeaderboard(): Observable<any[]> {
    return this.http.get<any[]>(this.leaderboardUrl);
  }
}
