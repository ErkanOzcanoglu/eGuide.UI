import { LastVisitedStations } from './../../models/last-visited-stations';
import { Component, HostListener, OnInit } from '@angular/core';
import { loadModules } from 'esri-loader';
import { Station } from 'src/app/models/station';
import { UserStation } from 'src/app/models/user-station';
import { basemapss } from './map-data';
import { MapHelper } from './map-helper';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Comment } from 'src/app/models/comment';
import * as reactiveUtils from '@arcgis/core/core/reactiveUtils';
import { StationService } from 'src/app/services/station.service';
import { UserStationService } from 'src/app/services/user-station.service';

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
  windowSize?: any;
  isClicked = false;

  constructor(
    private formBuilder: FormBuilder,
    private mapHelper: MapHelper,
    private stationService: StationService,
    private userStationService: UserStationService
  ) {
    this.basemapss = basemapss;
    this.currentBasemapIndex = 0;
  }

  ngOnInit(): void {
    this.initializeMap();
    this.getStations();
    this.initializeForm();
  }

  clearCahce() {
    this.stationService.clearStationCache().subscribe();
  }

  @HostListener('window:resize', ['$event'])
  getWindowSize() {
    this.windowSize = window.innerWidth < 1450;
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

      // set max and min zoom
      this.view.constraints = {
        minZoom: 2,
      };

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

  FilteredStationsonMap(event: any) {
    this.FilteredStations = event;
    this.getStations();
  }

  getStations() {
    this.mapHelper.getStations(this.view, this.FilteredStations);
  }

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

  // get isLoaded from map-helper
  get isLoaded(): boolean {
    return this.mapHelper.isLoaded;
  }

  // get isFound from map-helper
  get isFound(): boolean {
    return this.mapHelper.isFound;
  }

  comment(stationId: any) {
    this.mapHelper.comment(stationId);
  }

  submitComment(comment: string, rating: number, stationId: number) {
    this.mapHelper.submitComment(comment, rating, stationId);
  }

  // search function
  search(event: any) {
    this.mapHelper.search(event, this.view);
  }

  saveUserStation(elementId: string, userId: string): void {
    this.mapHelper.saveUserStation(elementId, userId);
  }
}
