import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:8000/dashboard/';  // URL to your Django dashboard API

  constructor(private http: HttpClient) { }

  getReports(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}