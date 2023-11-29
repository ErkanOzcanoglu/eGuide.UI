import { LastVisitedStations } from './../../models/last-visited-stations';
import { Component, Input, OnInit } from '@angular/core';
import { loadModules } from 'esri-loader';
import { Station } from 'src/app/models/station';
import { StationService } from 'src/app/services/station.service';
import Search from '@arcgis/core/widgets/Search';
import * as reactiveUtils from '@arcgis/core/reactiveUtils';
import Swal from 'sweetalert2';
import { LastVisitedStationsService } from 'src/app/services/last-visited-stations.service';
import { UserStationService } from 'src/app/services/user-station.service';
import { UserStation } from 'src/app/models/user-station';
import { basemapss } from './map-data';
import { MapHelper } from './map-helper';

interface Center {
  latitude: any;
  longitude: any;
}
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [MapHelper],
})
export class MapComponent implements OnInit {
  searchType = '';
  lastVisitedStations: LastVisitedStations = new LastVisitedStations();
  nearestStations: Station[] = [];
  userStation: UserStation = new UserStation();
  currentBasemapIndex: number;
  stations: Station[] = [];
  map: any;
  view: any;
  locate: any;
  nearLocate: any;
  basemapss: any[] = [];

  chargingUnitList: any[] = [];
  connectorTypelist: any[] = [];
  facilityList: any[] = [];

  connectorFilteredStations: Station[] = [];

  constructor(
    private stationService: StationService,
    private lastVisitedStationsService: LastVisitedStationsService,
    private userStationService: UserStationService,
    private mapHelper: MapHelper
  ) {
    this.basemapss = basemapss;
    this.currentBasemapIndex = 0;
  }

  ngOnInit(): void {
    this.initializeMap();
    this.getStations();
    // initialize map
  }

  initializeMap() {
    loadModules(
      [
        'esri/Map',
        'esri/views/MapView',
        'esri/config',
        'esri/widgets/Locate',
        'esri/widgets/Search',
        'esri/core/reactiveUtils',
      ],
      {
        css: true,
      }
    ).then(([Map, MapView, esriConfig, Locate]) => {
      esriConfig.apiKey =
        'AAPKf2b222eeb0964813810746eb8274b5ffQFWRQkUMcyYrjaV9mgAMp7J1_cDz8aru5Zy2Io4ngzM10qQreoyoKIR8tQsAuEWj';
      // initialize map
      this.map = new Map({
        basemap: 'arcgis-navigation',
      });
      // initialize the map view
      this.view = new MapView({
        map: this.map,
        center: [35.2433, 38.9637],
        zoom: 5,
        container: 'viewDiv',
      });
      // add locate widget
      this.locate = new Locate({
        view: this.view,
        useHeadingEnabled: false,
        goToOverride: function (
          view: { goTo: (arg0: { scale: number }) => void },
          options: { target: { scale: number } }
        ) {
          options.target.scale = 1500;
          return view.goTo(options.target);
        },
      });
      // find only user location do not zoom in
      this.nearLocate = new Locate({
        view: this.view,
        useHeadingEnabled: false,
      });
      this.view.ui.remove('zoom'); // remove zoom buttons
      this.getStations(); // show station points
    });
  }

  zoomIn(): void {
    this.mapHelper.zoomIn(this.view);
  }

  zoomOut(): void {
    this.mapHelper.zoomOut(this.view);
  }

  locateS(): void {
    this.mapHelper.locateS(this.locate);
  }

  findNearestStations(): void {
    this.nearLocate.locate().then((userP: any) => {
      this.calculateNearestStations(userP);
    });
  }

  calculateNearestStations(userP: any): void {
    this.mapHelper.calculateNearestStations(userP, this.stations, this.view);
  }

  calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    return this.mapHelper.calculateDistance(lat1, lon1, lat2, lon2);
  }

  deg2rad(deg: number): number {
    return this.mapHelper.deg2rad(deg);
  }

  changeLayer(basemap: { name: string; id: number; title: string }): void {
    this.map.basemap = basemap.name; // change basemap
    this.currentBasemapIndex = basemap.id; // change current basemap index
  }

  // get stations from api
  getStations(): void {
    this.stationService.getStations().subscribe((data) => {
      this.stations = data;
      const userId = localStorage.getItem('authToken');
      if (userId !== null)
        this.userStationService
          .getStationProfiles(userId)
          .subscribe((favoriteStations) => {
            reactiveUtils.on(
              () => this.view.popup,
              'trigger-action',
              (event: any) => {
                if (event.action.id === 'add-favorite') {
                  this.saveUserStation(event.action.stationId, userId);
                } else if (event.action.id === 'go-location-action') {
                  this.goLocation(event.action.stationId);
                }
              }
            );
            this.stations.forEach((element) => {
              const isFavorite = favoriteStations.some(
                (station) => station.id === element.id
              );

              const point = {
                // create point
                type: 'point',
                longitude: element.longitude,
                latitude: element.latitude,
              };

              const pinSymbol = {
                // create symbol
                type: 'picture-marker',
                url: '../../assets/charging.svg',
                width: '50px',
                height: '50px',
              };

              // Yıldız rengi için sınıf ataması yap
              const starColorClass = isFavorite
                ? 'esri-icon-favorites-favorite'
                : 'esri-icon-favorites';

              const goLocationAction = {
                id: 'go-location-action',
                className: 'esri-icon-locate-circled',
                stationId: element.id,
              };

              const addFavorite = {
                id: 'add-favorite',
                className: starColorClass,
                stationId: element.id,
              };

              if (element.stationModel?.stationsChargingUnits) {
                const chargingUnits =
                  element.stationModel.stationsChargingUnits.map((unit) => ({
                    name: unit.chargingUnit?.name,
                  }));
                this.chargingUnitList = chargingUnits;
              }

              if (element.stationModel?.stationsChargingUnits) {
                const connectors =
                  element.stationModel.stationsChargingUnits.map((unit) => ({
                    type: unit.chargingUnit?.connector?.type,
                  }));

                this.connectorTypelist = connectors;
              }

              if (element.stationFacilities) {
                const facilityList = element.stationFacilities.map((unit) => ({
                  type: unit.facility?.type,
                }));
                this.facilityList = facilityList;
              }

              const pointGraphic = {
                // create graphic
                geometry: point,
                symbol: pinSymbol,
                attributes: {
                  name: element.name,
                  id: element.id,
                  address: element.address,
                  latitude: element.latitude,
                  longitude: element.longitude,
                  model: element.stationModel?.name,
                  chargingUnit: this.chargingUnitList
                    .map((chargingUnit) => chargingUnit.name)
                    .join(', '),
                  connector: this.connectorTypelist
                    .map((chargingUnit) => chargingUnit.type)
                    .join(', '),
                  stationFacilities: this.facilityList
                    .map((stationFacilities) => stationFacilities.type)
                    .join(', '),
                },

                // open popup when graphic is clicked
                popupTemplate: {
                  title: '{name}',
                  content: [
                    {
                      type: 'fields',
                      fieldInfos: [
                        {
                          fieldName: 'name',
                          label: 'Name',
                        },
                        {
                          fieldName: 'address',
                          label: 'Address',
                        },
                        {
                          fieldName: 'model',
                          label: 'Model',
                        },
                        {
                          fieldName: 'chargingUnit',
                          label: 'ChargingUnit',
                        },
                        {
                          fieldName: 'connector',
                          label: 'Connector Type',
                        },
                        {
                          fieldName: 'stationFacilities',
                          label: 'Facilities',
                        },
                      ],
                    },
                  ],
                  actions: [goLocationAction, addFavorite],
                },
              };
              // console.log(element.stationModel?.stationsChargingUnits[0].chargingUnit?.name ,"x");
              this.view.graphics.add(pointGraphic); // add graphic to the view
            });
          });
    });
  }

  // get selected station from station list component
  onStationSelected(selectedStation: Center) {
    this.view.center = [selectedStation.longitude, selectedStation.latitude]; // center the view to the selected station
    this.view.zoom = 12; // zoom in to the selected station
  }

  deneme(event: any) {
    console.log('aaaaaaaa', event);
    this.connectorFilteredStations = event;
    console.log(this.connectorFilteredStations[0].id);
    // if(this.connectorFilteredStations[0].id !== '')
    // this.getStations();
  }

  // get search text from search component
  goLocation(stationId: any) {
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
        }
        // else bloğu kaldırıldı
      });
  }

  // search function
  search(enevt: any) {
    this.searchType = enevt;
    const search = new Search({
      view: this.view,
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
