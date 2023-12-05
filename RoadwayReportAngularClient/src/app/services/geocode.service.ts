import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class GeocodeService {
  private geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

  constructor(private http: HttpClient) {}

  geocodeAddress(address: string): Observable<any> {
    const url = `http://localhost:8000/api/geocode/?address=${encodeURIComponent(address)}`;
    return this.http.get<any>(url).pipe(
      map(response => {
        // Assuming the response structure is similar to the Google Maps API
        if (response.status === 'OK') {
          // Extract the location (latitude and longitude) from the response
          const location = response.results[0].geometry.location;
          return location; // { lat: ..., lng: ... }
        } else {
          // Throw an error if the status is not 'OK'
          throw new Error(response.error_message || 'Geocoding failed');
        }
      })
    );
  }
}

interface GeocodingApiResponse {
  status: string;
  results: { geometry: { location: { lat: number; lng: number; }; }; }[];
  error_message?: string;
}