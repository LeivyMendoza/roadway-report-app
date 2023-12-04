import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-status-update-dialog',
  templateUrl: './status-update-dialog.component.html',
  styleUrls: ['./status-update-dialog.component.css']
})
export class StatusUpdateDialogComponent implements OnInit {
  statuses: string[] = ['Submitted', 'InProgress', 'Resolved']; // Modify as needed
  selectedStatus: string;

  constructor(
    public dialogRef: MatDialogRef<StatusUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.selectedStatus = data.currentStatus; // Assuming current status is passed
  }

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }
}
