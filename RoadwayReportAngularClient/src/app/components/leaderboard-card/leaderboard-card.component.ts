// leaderboard-card.component.ts
import { Component, OnInit } from '@angular/core';
import { LeaderboardItem } from 'src/app/models/leaderboard.model';
import { LeaderboardService } from 'src/app/services/leaderboard.service';

@Component({
  selector: 'app-leaderboard-card',
  templateUrl: './leaderboard-card.component.html',
  styleUrls: ['./leaderboard-card.component.css']
})
export class LeaderboardCardComponent implements OnInit {
  leaderboard: LeaderboardItem[] = [];

  constructor(private leaderboardService: LeaderboardService) {}

  ngOnInit(): void {
    this.leaderboardService.getLeaderboard().subscribe(
      data => {
        this.leaderboard = data.sort((a, b) => b.reports_count - a.reports_count);
      },
      error => console.error('Error fetching leaderboard data', error)
    );
  }
}
