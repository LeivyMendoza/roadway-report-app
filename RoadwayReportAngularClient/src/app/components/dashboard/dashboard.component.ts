// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { MatDialog } from '@angular/material/dialog';
import { ReportPotholeDialogComponent } from '../report-pothole-dialog/report-pothole-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  reports: any[] = [];
  nonResolvedCount: number = 0;
  displayedColumns: string[] = ['id', 'type', 'status', 'location', 'description', 'createdAt', 'updatedAt'];

  constructor(private dialog: MatDialog, private reportService: ReportService) { }

  ngOnInit(): void {
    this.loadReports()
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

    dialogRef.componentInstance.reportSubmitted.subscribe(() => {
      this.loadReports();  // Refresh reports when a report is submitted
    });
  }
}
