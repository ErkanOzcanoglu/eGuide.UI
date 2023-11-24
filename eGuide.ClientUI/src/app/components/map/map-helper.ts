import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MapHelper {
  zoomIn(view: any): void {
    view.goTo({ zoom: view.zoom + 1 });
  }

  zoomOut(view: any): void {
    view.goTo({ zoom: view.zoom - 1 });
  }

  changeLayer(
    map: any,
    basemap: { name: string; id: number; title: string }
  ): void {
    map.basemap = basemap.name;
  }

  locateS(locate: any): void {
    locate.locate();
  }

  calculateNearestStations(userP: any, stations: any[], view: any): void {
    // Calculate distance between user and each station
    stations.forEach((station) => {
      if (station.latitude !== undefined && station.longitude !== undefined) {
        const distance = this.calculateDistance(
          userP.coords.latitude,
          userP.coords.longitude,
          station.latitude,
          station.longitude
        );
        station.distance = distance;
      }
    });

    // Sort stations by distance
    stations.sort((a, b) => {
      // Handle the case where distance is undefined
      if (a.distance === undefined && b.distance === undefined) {
        return 0; // If both distances are undefined, consider them equal
      } else if (a.distance === undefined) {
        return 1; // If only a.distance is undefined, consider a greater (move it towards the end)
      } else if (b.distance === undefined) {
        return -1; // If only b.distance is undefined, consider b greater (move it towards the end)
      } else {
        return a.distance - b.distance; // Normal comparison when both distances are defined
      }
    });

    // Get nearest station
    const nearestStation = stations[0];

    // Display nearest station
    view.center = [nearestStation.longitude, nearestStation.latitude];
    view.zoom = 12;
  }

  calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  }

  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
