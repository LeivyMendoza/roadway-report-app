// report-pothole-dialog.component.ts
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ReportService } from 'src/app/services/report.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-report-pothole-dialog',
  templateUrl: './report-pothole-dialog.component.html',
  styleUrls: ['./report-pothole-dialog.component.css']
})
export class ReportPotholeDialogComponent implements OnInit {
  reportForm!: FormGroup;
  fileName: string = '';
  isLoading: boolean = false; 
  @Output() reportSubmitted = new EventEmitter<void>();

  constructor(
    private dialog: MatDialog, // Add this line
    private reportService: ReportService,
    private dialogRef: MatDialogRef<ReportPotholeDialogComponent>
  ) { }

  ngOnInit(): void {
    this.reportForm = new FormGroup({
      type: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      file: new FormControl(null) // File control is optional
    });
  }

  onFileSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    const file = element.files && element.files.length > 0 ? element.files[0] : null;
    if (file) {
      this.reportForm.patchValue({ file: file });
      this.fileName = file.name;
    } else {
      // Handle the case where no file was selected
      this.fileName = 'No file chosen';
    }
  }
  

  onSubmit(): void {
    if (this.reportForm.valid) {
      this.isLoading = true; // Show loading indicator

      // Prepare the form data for submission
      const formData = new FormData();
      formData.append('type', this.reportForm.value.type);
      formData.append('status', this.reportForm.value.status);
      formData.append('location', this.reportForm.value.location);
      formData.append('description', this.reportForm.value.description);

      if (this.reportForm.value.file) {
        formData.append('file', this.reportForm.value.file, this.fileName);
      }

      // Call the service to send the data to your backend
      this.reportService.submitReport(formData).subscribe(
        (response) => {
          console.log('Report submitted successfully', response);
          this.isLoading = false; // Hide loading indicator
          this.dialogRef.close(); // Close the dialog on success
          this.openConfirmationDialog(); // Open the confirmation dialog
          this.reportSubmitted.emit();  // Emit event after successful submission
          this.dialogRef.close();
        },
        (error) => {
          console.error('Failed to submit report', error);
          this.isLoading = false; // Hide loading indicator
          // Handle the error, e.g., show an error message to the user
        }
      );
    }
  }

  
  openConfirmationDialog(): void {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '350px'
    });
  }
}
