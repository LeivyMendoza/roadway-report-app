import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:8000';  // URL to your Django dashboard API

  constructor(private http: HttpClient) { }

  getReports(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard/`);
  }

  submitReport(formData: FormData): Observable<any> {
    // Use the full URL for the Django endpoint
    const fullUrl = 'http://localhost:8000/report/';
    return this.http.post(fullUrl, formData);
  }

  deleteReport(reportId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/reports/delete/${reportId}/`);
  }

  updateReportStatus(reportId: number, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/api/reports/update_status/${reportId}/`, { status });
  }
}