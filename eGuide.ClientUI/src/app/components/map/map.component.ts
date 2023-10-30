import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { loadModules } from 'esri-loader';
import { Station } from 'src/app/models/station';
import { StationService } from 'src/app/services/station.service';
import Search from '@arcgis/core/widgets/Search';

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
  searchType = '';
  searchForm: FormGroup = new FormGroup({});
  @Input() searchText = '';

  public map: any;
  public view: any;
  public locate: any;
  public isLocated = false;
  public stations: Station[] = [];
  public basemapss: any[] = [];
  public currentBasemapIndex: number;

  // search(enevt: any) {
  //   // get searchType from search component
  //   this.searchType = enevt;
  //   console.log(this.searchType);
  // }

  onKeyDown(event: KeyboardEvent, basemap: any) {
    if (event.key === 'Enter') {
      this.changeLayer(basemap);
    }
  }

  constructor(
    private stationService: StationService,
    private formBuilder: FormBuilder
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
    this.initializeMap(); // initialize map/
  }

  initializeMap() {
    loadModules(
      [
        'esri/Map',
        'esri/views/MapView',
        'esri/config',
        'esri/widgets/Locate',
        'esri/widgets/Search',
      ],
      {
        css: true,
      }
    ).then(([Map, MapView, esriConfig, Locate, Search]) => {
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

      // remove zoom buttons
      this.view.ui.remove('zoom');

      // show station points
      this.getStations();
    });
  }

  // zoom in function
  zoomIn(): void {
    this.view.goTo({ zoom: this.view.zoom + 1 }); // zoom in
  }

  // zoom out function
  zoomOut(): void {
    this.view.goTo({ zoom: this.view.zoom - 1 }); // zoom out
  }

  // change basemap
  changeLayer(basemap: { name: string; id: number; title: string }): void {
    this.map.basemap = basemap.name; // change basemap
    this.currentBasemapIndex = basemap.id; // change current basemap index
  }

  // locate user
  locateS(): void {
    this.locate.locate(); // locate user
    this.isLocated = true; // change isLocated to true
  }

  // get stations from api
  getStations(): void {
    this.stationService.getStations().subscribe((data) => {
      // get stations from api
      this.stations = data; // assign stations to stations array

      this.stations.forEach((element) => {
        // loop through stations array
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
          },

          popupTemplate: {
            // add style: 'width: 300px' to the popupTemplate

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
            showAttachments: false,
          },
        };

        this.view.graphics.add(pointGraphic); // add graphic to the view
      });
    });
  }
  // get selected station from station list component
  onStationSelected(selectedStation: Center) {
    this.view.center = [selectedStation.longitude, selectedStation.latitude]; // center the view to the selected station
    this.view.zoom = 12; // zoom in to the selected station
  }

  search(enevt: any) {
    this.searchType = enevt;
    console.log(this.searchType, 'search type in the map component');
    // search in the map component

    // add search
    const search = new Search({
      view: this.view,
    });

    // search.on('search-complete', (event: { results: any[] }) => {
    //   // get search text from search component and search for it
    //   const searchTexts = this.searchText;
    //   search.search(searchTexts);
    //   console.log(searchTexts, 'search text in the map component');

    // get search text from search component and search for it
    // const searchTexts = this.searchText;
    search.search(this.searchType);
    console.log(this.searchType, 'search text in the map component 2');
  }
}
