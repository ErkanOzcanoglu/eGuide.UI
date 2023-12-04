import { LastVisitedStations } from './../../models/last-visited-stations';
import { Component, Input, OnInit } from '@angular/core';
import { loadModules } from 'esri-loader';
import { Station } from 'src/app/models/station';
import { StationService } from 'src/app/services/station.service';
import { LastVisitedStationsService } from 'src/app/services/last-visited-stations.service';
import { UserStationService } from 'src/app/services/user-station.service';
import { UserStation } from 'src/app/models/user-station';
import { basemapss } from './map-data';
import { MapHelper } from './map-helper';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from 'src/app/models/comment';

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
  comments: Comment[] = [];
  map: any;
  view: any;
  locate: any;
  nearLocate: any;
  basemapss: any[] = [];
  chargingUnitList: any[] = [];
  connectorTypelist: any[] = [];
  facilityList: any[] = [];

  FilteredStations: Station[] = [];
  commentForm: FormGroup = new FormGroup({});


  constructor(
    private stationService: StationService,
    private lastVisitedStationsService: LastVisitedStationsService,
    private userStationService: UserStationService,
    private formBuilder: FormBuilder,
    private mapHelper: MapHelper,
    private commentService: CommentService
  ) {
    this.basemapss = basemapss;
    this.currentBasemapIndex = 0;
  }

  ngOnInit(): void {
    this.initializeMap();
    this.getStations();
    this.initializeForm();
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
    this.mapHelper.calculateNearestStations(userP, this.view);
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
  
  deneme(event: any) {
    this.FilteredStations = event;
    console.log('DENEME', this.FilteredStations);
    this.getStations();
  }

  getStations(): void {

    this.stationService.getStations().subscribe((data) => {
      if (this.FilteredStations.length === 0) {
        this.stations = data;
      } else {
        this.view.graphics.removeAll();
        this.stations = this.FilteredStations;
      }

      const userId: string | null = localStorage.getItem('authToken');
      if (userId !== null) {
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
      } else {
        this.stationService.getStations().subscribe((favoriteStations) => {
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
              const connectors = element.stationModel.stationsChargingUnits.map(
                (unit) => ({
                  type: unit.chargingUnit?.connector?.type,
                })
              );

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
      }
    });

  

  }

  // get selected station from station list component
  onStationSelected(selectedStation: Center) {
    this.view.center = [selectedStation.longitude, selectedStation.latitude]; // center the view to the selected station
    this.view.zoom = 12; // zoom in to the selected station
  }

  FilteredStationsGet(event: any) {
    this.FilteredStations = event;
  }


  // get search text from search component
  goLocation(stationId: any) {
    this.mapHelper.goLocation(stationId);
  }

  initializeForm() {
    this.commentForm = this.formBuilder.group({
      text: [''],
      rating: [''],
      ownerId: [''],
      stationId: [''],
    });
  }

  getComments(stationId: any) {
    this.mapHelper.getComments(stationId);
  }

  comment(stationId: any) {
    this.mapHelper.comment(stationId);
  }

  submitComment(comment: string, stationId: number) {
    this.mapHelper.submitComment(comment, stationId);
  }

  // search function
  search(enevt: any) {
    this.mapHelper.search(enevt, this.view);
  }

  saveUserStation(elementId: string, userId: string): void {
    this.mapHelper.saveUserStation(elementId, userId);
  }
}
