import { Injectable } from '@angular/core';
import Search from '@arcgis/core/widgets/Search';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LastVisitedStations } from 'src/app/models/last-visited-stations';
import { CommentService } from 'src/app/services/comment.service';
import { LastVisitedStationsService } from 'src/app/services/last-visited-stations.service';
import Swal from 'sweetalert2';
import { UserStation } from 'src/app/models/user-station';
import { UserStationService } from 'src/app/services/user-station.service';

@Injectable({
  providedIn: 'root',
})
export class MapHelper {
  lastVisitedStations: LastVisitedStations = new LastVisitedStations();
  commentForm: FormGroup = new FormGroup({});
  searchType: any;
  view: any;
  userStation: UserStation = new UserStation();
  constructor(
    private lastVisitedStationsService: LastVisitedStationsService,
    private commentService: CommentService,
    private formBuilder: FormBuilder,
    private userStationService: UserStationService
  ) {}

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

  goLocation(stationId: string) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success m-1',
        cancelButton: 'btn btn-danger m-1',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: 'Gitmek istediğine emin misin!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Evet, Istiyorum!',
        cancelButtonText: 'Hayır, Istemiyorum!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const userId = localStorage.getItem('authToken');
          if (userId != null) {
            this.lastVisitedStations.userId = userId;
            this.lastVisitedStations.stationId = stationId;
            this.lastVisitedStationsService
              .createLastVisitedStation(this.lastVisitedStations)
              .subscribe();
          }
          swalWithBootstrapButtons.fire({
            title: 'Başarılı!',
            text: 'İstasyona başarıyla gittiniz.',
            icon: 'success',
            confirmButtonText: 'Tamam',
          });
        }
      });
  }

  search(enevt: any, view: any) {
    this.searchType = enevt;
    const search = new Search({
      view: view,
    });
    console.log(this.searchType, 'aaa');
    search.search(this.searchType);
  }

  saveUserStation(elementId: string, userId: string): void {
    this.userStation.userId = userId;
    this.userStation.stationProfileId = elementId;
    console.log(this.userStation);
    this.userStationService.saveUserStation(this.userStation).subscribe();
  }
}
