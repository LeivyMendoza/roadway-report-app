// dashboard.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ReportPotholeDialogComponent } from '../report-pothole-dialog/report-pothole-dialog.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommentDialogComponent } from '../comment-dialog/comment-dialog.component';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { StatusUpdateDialogComponent } from '../status-update-dialog/status-update-dialog.component';
import { FAQDialogComponent } from '../faqdialog/faqdialog.component';
import { MapComponent } from '../map/map.component';
import { GeocodeService } from 'src/app/services/geocode.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  reports: any[] = [];
  nonResolvedCount: number = 0;
  isAdminUser: boolean = false;
  displayedColumns: string[] = ['rowIndex', 'type', 'status', 'location', 'description', 'createdAt', 'updatedAt', 'comments'];
  private destroy$ = new Subject<void>();

  constructor(private dialog: MatDialog, 
    private userService: UserService, 
    private router: Router, 
    private reportService: ReportService,
    private geocodeService: GeocodeService,
   //@Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
    this.userService.isAdmin().pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      data => {
        this.isAdminUser = data.is_official;
        // Update the columns inside the subscription
        if (this.isAdminUser) {
          this.displayedColumns.push('delete', 'updateStatus');
        }
        this.loadReports();
      },
      error => {
        console.error('Error checking admin status', error);
        this.isAdminUser = false;
        this.loadReports();
      }
    );
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
  
  navigateToAdminConsole(): void {
    this.router.navigate(['/admin-console']); // Replace with your actual route
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

  onDeleteReport(reportId: number): void {
    if (confirm('Are you sure you want to delete this report?')) {
      this.reportService.deleteReport(reportId).subscribe(
        () => {
          // Handle successful deletion
          // For example, you could refresh the report list:
          this.loadReports(); // Assuming you have a method to load reports
        },
        error => {
          console.error('Error deleting report:', error);
        }
      );
    }
  }

  onUpdateReportStatus(reportId: any): void {  // Pass the entire report object
    const dialogRef = this.dialog.open(StatusUpdateDialogComponent, {
      width: '250px',
      data: { reportId: reportId}
    });
  
    dialogRef.afterClosed().subscribe(newStatus => {
      if (newStatus) {
        this.reportService.updateReportStatus(reportId, newStatus).subscribe(
          () => {
            // Handle successful status update
            this.loadReports(); // Refresh the report list
          },
          error => {
            console.error('Error updating report status:', error);
          }
        );
      }
    });
  }

  openFAQDialog(): void {
    this.dialog.open(FAQDialogComponent, {
      width: '600px'
    });
  }

  openMap(address: string): void {
    this.geocodeService.geocodeAddress(address).subscribe(
      location => {
        this.dialog.open(MapComponent, {
          width: '600px',
          data: { location }
        });
      },
      error => console.error('Geocoding error:', error)
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
