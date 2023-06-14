import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  capitals: string = '/assets/data/usa-capitals.geojson';
  
  constructor(private http: HttpClient) {
  }

  makeCapitalMarkers(map: any): void {
    this.http.get(this.capitals).subscribe((res: any) => {
      L.marker
      
      for (const c of res.features) {
        const lon = c.geometry.coordinates[0];
        const lat = c.geometry.coordinates[1];
        const circle = L.circleMarker([lat, lon])
          .bindPopup(L.popup().setLatLng([lat,lon]).setContent('<p>Test</p>').openOn(map)).openPopup();
      
        circle.addTo(map);
      }
    });
  } 

  makePolygon(map: any){
    const latlngs: any = [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]];
    const polygon = L.polygon(latlngs, {color: 'red'}).addTo(map);
    map.fitBounds(polygon.getBounds());
  }
}