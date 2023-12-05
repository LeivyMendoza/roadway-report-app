import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeocodeService } from 'src/app/services/geocode.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  center!: google.maps.LatLngLiteral;
  zoom: number = 15;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    if (this.data.location) {
      this.center = {
        lat: this.data.location.lat,
        lng: this.data.location.lng
      };
    }
  }
}
