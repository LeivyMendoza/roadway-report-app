// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { MatDialog } from '@angular/material/dialog';
import { ReportPotholeDialogComponent } from '../report-pothole-dialog/report-pothole-dialog.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommentDialogComponent } from '../comment-dialog/comment-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  reports: any[] = [];
  nonResolvedCount: number = 0;
  displayedColumns: string[] = ['rowIndex', 'type', 'status', 'location', 'description', 'createdAt', 'updatedAt', 'comments'];
  private destroy$ = new Subject<void>();

  constructor(private dialog: MatDialog, private reportService: ReportService) { }

  ngOnInit(): void {
    this.loadReports()
  }

  openCommentDialog(rowIndex: number) {
    const dialogRef = this.dialog.open(CommentDialogComponent, {
      width: '400px', 
      data: { reportId: rowIndex + 1 } 
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'comment_added') {
        
      }
    });
  }

  loadReports(): void {
    this.reportService.getReports().subscribe(
      data => {
        this.reports = data;
        this.nonResolvedCount = data.filter((report: { status: string; }) => report.status === 'InProgress' || report.status === 'Submitted').length;
      },
      error => console.error('There was an error retrieving reports!', error)
    );
  }
  
  reportPothole(): void {
    const dialogRef = this.dialog.open(ReportPotholeDialogComponent, {
      width: '600px',
    });
  
    dialogRef.componentInstance.reportSubmitted.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.loadReports(); // Refresh reports when a report is submitted
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
