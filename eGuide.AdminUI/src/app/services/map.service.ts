import { Injectable } from '@angular/core';
import { loadModules } from 'esri-loader';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor() {}

  addMarker(lat: number, lng: number) {
    loadModules(['esri/Graphic']).then(([Graphic]) => {
      const point = {
        type: 'point',
        latitude: lat,
        longitude: lng,
      };
      const graphic = new Graphic({
        geometry: point,
        symbol: {
          type: 'simple-marker',
          color: [226, 119, 40],
          outline: {
            color: [255, 255, 255],
            width: 1,
          },
        },
      });
    });
  }
}
