import MapView from '@arcgis/core/views/MapView';
import PopupTemplate from '@arcgis/core/PopupTemplate';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { loadModules } from 'esri-loader';
import { Station } from 'src/app/models/station';
import { StationService } from 'src/app/services/station.service';
import { PopupComponent } from '../popup/popup.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import Popup from '@arcgis/core/widgets/Popup.js';

interface Center {
  latitude: any;
  longitude: any;
}
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  searchType: any;
  searchForm: FormGroup = new FormGroup({});

  public map: any;
  public view: any;
  public locate: any;
  public graphicsLayer: any;
  public pop: any;
  public stationInformation: any;
  public isLocated = false;
  public stations: Station[] = [];
  public basemapss: any[] = [];
  public currentBasemapIndex: number;

  search(enevt: any) {
    // get searchType from search component
    this.searchType = enevt;
    console.log(this.searchType);
  }

  onKeyDown(event: KeyboardEvent, basemap: any) {
    if (event.key === 'Enter') {
      this.changeLayer(basemap);
    }
  }

  constructor(
    private stationService: StationService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {
    // data for the basemap gallery
    this.basemapss = [
      {
        id: 0,
        name: 'arcgis-navigation',
        title: 'Navigation',
      },
      {
        id: 1,
        name: 'arcgis-streets',
        title: 'Streets',
      },
      {
        id: 2,
        name: 'arcgis-topographic',
        title: 'Topographic',
      },
      {
        id: 3,
        name: 'arcgis-dark-gray',
        title: 'Dark Gray',
      },
    ];

    this.currentBasemapIndex = 0;
  }

  ngOnInit(): void {
    this.initializeMap();
    this.initializeForm();
  }

  initializeForm() {
    this.searchForm = this.formBuilder.group({
      searchType: [''],
      text: [''],
    });
  }

  ngOnChanges(): void {
    console.log(this.searchType);
  }

  initializeMap() {
    loadModules(
      [
        'esri/Map',
        'esri/views/MapView',
        'esri/config',
        'esri/widgets/Locate',
        'esri/widgets/Zoom',
        // popup
        'esri/PopupTemplate',
      ],
      {
        css: true,
      }
    ).then(([Map, MapView, esriConfig, Locate, Zoom, PopupTemplate]) => {
      esriConfig.apiKey =
        'AAPKf2b222eeb0964813810746eb8274b5ffQFWRQkUMcyYrjaV9mgAMp7J1_cDz8aru5Zy2Io4ngzM10qQreoyoKIR8tQsAuEWj';

      this.map = new Map({
        basemap: 'arcgis-navigation',
      });

      this.view = new MapView({
        map: this.map,
        center: [35.2433, 38.9637],
        zoom: 5,
        container: 'viewDiv',
      });

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

      // remove zoom buttons
      this.view.ui.remove('zoom');

      // show station points
      this.getStations();
    });
  }

  zoomIn(): void {
    this.view.goTo({ zoom: this.view.zoom + 1 });
  }

  zoomOut(): void {
    this.view.goTo({ zoom: this.view.zoom - 1 });
  }

  changeLayer(basemap: any): void {
    this.map.basemap = basemap.name;
    this.currentBasemapIndex = basemap.id;
    this.displayLayerName(basemap.title);
  }

  locateS(): void {
    this.locate.locate();
    this.isLocated = true;
  }

  getStations(): void {
    this.stationService.getStations().subscribe((data) => {
      this.stations = data;

      this.stations.forEach((element) => {
        const point = {
          type: 'point',
          longitude: element.longitude,
          latitude: element.latitude,
        };

        const pinSymbol = {
          type: 'picture-marker',
          url: '../../assets/charging.svg',
          width: '50px',
          height: '50px',
        };

        const pointGraphic = {
          geometry: point,
          symbol: pinSymbol,
          attributes: {
            name: element.name,
            id: element.id,
            address: element.address,
            latitude: element.latitude,
            longitude: element.longitude,
          },
        };

        pointGraphic.attributes = element;
        // on click event for each station point on the map view to show station info in a modal window when clicked on the point on the map view
        this.view.on('click', (event: any) => {
          this.view.hitTest(event).then((response: any) => {
            if (response.results.length > 0) {
              // console.log(response.results[0].graphic.attributes);
              const graphic = response.results[0].graphic;
              this.graphicsLayer = graphic;
              // this.showStationInfo(graphic.attributes);
              console.log(graphic.attributes, 'graphic');
              // write html for the popup
              const stationInfo = `
                <div class="station-info">
                  <h3>Station Information</h3>
                  <ul>
                    <li>Name: ${graphic.attributes.name}</li>
                    <li>Address: ${graphic.attributes.address}</li>
                    <li>Latitude: ${graphic.attributes.latitude}</li>
                    <li>Longitude: ${graphic.attributes.longitude}</li>
                  </ul>asdasd
                </div>
              `;

              // Cannot read properties of undefined (reading 'shouldFocus')

              const popup = new PopupTemplate({
                content: stationInfo,
              });

              this.view.popup.open({
                title: graphic.attributes.name,
                location: graphic.geometry,
                content: popup,
              });
            }
          });
        });

        this.view.graphics.add(pointGraphic);
      });
    });
  }

  onButtonClick(event: any) {
    console.log('button clicked');
    console.log(event, 'event');
    this.stationInformation = event;
  }

  showStationInfo(station: Station): void {
    // open popup
    this.onButtonClick(station);

    const dialogRef = this.dialog.open(PopupComponent, {
      data: {
        stationInformation: station,
      },
    });

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.height = '500px';

    // dialogRef.afterClosed().subscribe(() => {
    //   console.log('Dialog closed');
    // });

    // send station info to popup component
    dialogRef.componentInstance.stationInformation = station;
  }

  displayLayerName(layerName: string) {
    const modal = document.getElementById('myModal');
    const modalContent = document.getElementById('modalContent');

    if (modal && modalContent) {
      modalContent.innerText = `Layer Name: ${layerName}`;
      modal.style.display = 'block';

      const closeBtn = document.getElementsByClassName('close')[0];
      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    }
  }

  onStationSelected(selectedStation: Center) {
    this.view.center = [selectedStation.longitude, selectedStation.latitude];
    this.view.zoom = 12;
  }
}
