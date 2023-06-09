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
        const nombre = c.properties.state[0];
        const circle = L.circleMarker([lat, lon],nombre);
        circle.addTo(map).bindPopup(

          `
          <h4>CORDENADAS ACTUALES</h4>
          <p> ${lon} y ${lat}
          </p>
          <button>Actualizar</button>
          <button>Modificar</button>
          `
          );
      }
    });
  }

}