import { LastVisitedStations } from './../../models/last-visited-stations';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { loadModules } from 'esri-loader';
import { Station } from 'src/app/models/station';
import { StationService } from 'src/app/services/station.service';
import Search from '@arcgis/core/widgets/Search';
import * as reactiveUtils from '@arcgis/core/reactiveUtils';
import Swal from 'sweetalert2';
import { LastVisitedStationsService } from 'src/app/services/last-visited-stations.service';
import { UserStationService } from 'src/app/services/user-station.service';
import { UserStation } from 'src/app/models/user-station';
import TextSymbol from '@arcgis/symbols/TextSymbol';

interface Center {
  latitude: any;
  longitude: any;
}
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css', './_Popup.scss'],
})
export class MapComponent implements OnInit {
  searchType = '';
  searchForm: FormGroup = new FormGroup({});
  @Input() searchText = '';
  lastVisitedStations: LastVisitedStations = new LastVisitedStations();

  public userStation: UserStation = new UserStation();
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
  public reactive: any;
  public stationId: any;
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
    private formBuilder: FormBuilder,
    private lastVisitedStationsService: LastVisitedStationsService
    private userStationService: UserStationService,
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
        'esri/core/reactiveUtils',
      ],
      {
        css: true,
      }
    ).then(([Map, MapView, esriConfig, Locate, reactiveUtils]) => {
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
  // getStations(): void {
  //   this.stationService.getStations().subscribe((data) => {
  //     // get stations from api
  //     this.stations = data; // assign stations to stations array

  //     this.stations.forEach((element) => {

  //       // loop through stations array
  //       const point = {
  //         // create point
  //         type: 'point',
  //         longitude: element.longitude,
  //         latitude: element.latitude,
  //       };

  //       const pinSymbol = {
  //         // create symbol
  //         type: 'picture-marker',
  //         url: '../../assets/charging.svg',
  //         width: '50px',
  //         height: '50px',
  //       };

  //       const goLocationAction = {
  //         id: 'go-location-action',
  //         title: 'Add Favourites',
  //         className: 'esri-icon-favorites',
  //       };

  //       reactiveUtils.on(
  //         () => this.view.popup,
  //         'trigger-action',
  //         (event: any) => {
  //           if (event.action.id === 'go-location-action') {
  //             const userId = localStorage.getItem('authToken');
  //             const stationId = element.id;
  //             if (userId !== null) this.saveUserStation(stationId, userId);
  //           }
  //         }
  //       );

  //       const pointGraphic = {
  //         // create graphic
  //         geometry: point,
  //         symbol: pinSymbol,
  //         attributes: {
  //           name: element.name,
  //           id: element.id,
  //           address: element.address,
  //           latitude: element.latitude,
  //           longitude: element.longitude,
  //         },

  //         // open popup when graphic is clicked
  //         popupTemplate: {
  //           title: '{name}',
  //           content: [
  //             {
  //               type: 'fields',
  //               fieldInfos: [
  //                 {
  //                   fieldName: 'name',
  //                   label: 'Name',
  //                 },
  //                 {
  //                   fieldName: 'address',
  //                   label: 'Address',
  //                 },
  //               ],
  //             },
  //           ],
  //           actions: [goLocationAction],
  //         },
  //       };
  //       this.view.graphics.add(pointGraphic); // add graphic to the view
  //     });
  //   });
  // }

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

        const goLocationAction = {
          id: 'go-location-action',
          title: 'Go Location',
          className: 'esri-icon-directions',
        };

        reactiveUtils.on(
          () => this.view.popup,
          'trigger-action',
          (event: any) => {
            if (event.action.id === 'go-location-action') {
              this.stationId = element.id;
              // console.log(this.stationId, 'station id in the map component');
              this.goLocation(this.stationId);
            }
          }
        );
      const userId = localStorage.getItem('authToken');
      if (userId !== null)
        // Favori istasyonları getir
        this.userStationService.getStationProfiles(userId).subscribe(
          (favoriteStations) => {
            // Her bir istasyon için favori kontrolü yap
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
                title: 'Add Favourites',
                className: starColorClass,
              };

              reactiveUtils.on(
                () => this.view.popup,
                'trigger-action',
                (event: any) => {
                  if (event.action.id === 'go-location-action') {
                    this.getStations();
                    if (userId !== null)
                      this.saveUserStation(element.id, userId);
                    this.getStations();
                  }
                }
              );

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
                      ],
                    },
                  ],
                  actions: [goLocationAction],
                },
              };
              this.view.graphics.add(pointGraphic); // add graphic to the view
            });
          },
          (error) => {
            console.error('Error fetching favorite stations:', error);
          }
        );
    });
  }
  // get selected station from station list component
  onStationSelected(selectedStation: Center) {
    this.view.center = [selectedStation.longitude, selectedStation.latitude]; // center the view to the selected station
    this.view.zoom = 12; // zoom in to the selected station
  }

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
          swalWithBootstrapButtons.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success',
          });
          const userId = localStorage.getItem('authToken');
          if (userId != null) {
            this.lastVisitedStations.userId = userId;
            this.lastVisitedStations.stationId = stationId;

            console.log(this.lastVisitedStations, 'last visited station');
            this.lastVisitedStationsService
              .createLastVisitedStation(this.lastVisitedStations)
              .subscribe((data) => {
                console.log(data);
              });
          }

          console.log('go location');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: 'Cancelled',
            text: 'Your imaginary file is safe :)',
            icon: 'error',
          });
        }
      });
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

  addFacorite() {
    console.log('favor');
  }

  saveUserStation(elementId: string, userId: string): void {
    this.userStation.userId = userId;
    this.userStation.stationProfileId = elementId;

    this.userStationService.saveUserStation(this.userStation).subscribe(
      (response) => {
        console.log('Save successful!', response);
        // İsteğin başarılı bir şekilde tamamlandığında yapılacak işlemleri ekleyebilirsiniz.
      },
      (error) => {
        console.error('Save failed!', error);
        // İsteğin hata ile sonuçlandığında yapılacak işlemleri ekleyebilirsiniz.
      }
    );
  }
}
