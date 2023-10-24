import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { loadModules } from 'esri-loader';
import { Station } from 'src/app/models/station';
import { StationService } from 'src/app/services/station.service';

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

  constructor(private stationService: StationService, private formBuilder: FormBuilder) {
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

  searchTypeChanged(event: Event) {
    const selectedOption = (event.target as HTMLSelectElement).value;
    console.log(`Selected option in search: ${selectedOption}`);
    this.searchType.emit(selectedOption);
  }

  initializeMap() {
    loadModules(
      [
        'esri/Map',
        'esri/views/MapView',
        'esri/config',
        'esri/widgets/Locate',
        'esri/widgets/Zoom',
      ],
      {
        css: true,
      }
    ).then(([Map, MapView, esriConfig, Locate, Zoom]) => {
      esriConfig.apiKey =
        'AAPKf2b222eeb0964813810746eb8274b5ffQFWRQkUMcyYrjaV9mgAMp7J1_cDz8aru5Zy2Io4ngzM10qQreoyoKIR8tQsAuEWj';

      this.map = new Map({
        basemap: 'arcgis-navigation',
      });

      this.view = new MapView({
        map: this.map,
        center: [35.243322, 38.963745],
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

      if (this.searchType === 'station') {
        this.stationService.getStationByName
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

          popupTemplate: {
            title: '{name}',
            content: [
              {
                type: 'fields',
                fieldInfos: [
                  {
                    fieldName: 'address',
                    label: 'Address',
                  },
                  {
                    fieldName: 'name',
                    label: 'Name',
                  },
                  // {
                  //   fieldName: 'latitude',
                  //   label: 'Latitude',
                  // },
                  // {
                  //   fieldName: 'longitude',
                  //   label: 'Longitude',
                  // },
                ],
              },
            ],
          },
        };

        this.view.graphics.add(pointGraphic);
      });
    });
  }

  onButtonClick() {
    console.log('Button clicked!');
  }

  showStationInfo(station: Station): void {
    const modal = document.getElementById('myModal');
    const modalContentElement = document.getElementById('modalContent');

    if (modal && modalContentElement) {
      modalContentElement.innerText = `Name: ${station.name}\nAddress: ${station.address}`;
      modal.style.display = 'block';

      const closeBtn = document.getElementsByClassName('close')[0];
      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    }
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
}
