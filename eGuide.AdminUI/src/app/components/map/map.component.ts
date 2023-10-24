import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { loadModules } from 'esri-loader';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import Basemap from '@arcgis/core/Basemap';
import TileLayer from '@arcgis/core/layers/TileLayer';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import { MapService } from 'src/app/services/map.service';
import { StationService } from 'src/app/services/station.service';
import PopupTemplate from '@arcgis/core/PopupTemplate';
import Search from '@arcgis/core/widgets/Search';
export interface Points {
  lat: number;
  lng: number;
}
interface Address {
  address: string;
  lat: number;
  lng: number;
}
interface View {
  goTo(target: { scale: number }): void;
}

interface Options {
  target: { scale: number };
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef;

  public lat = 0;
  public lng = 0;
  public coord: Points[] = [];
  public mapView: any;
  public points: any[] = [];
  public locator: any;
  @Output() mapClick = new EventEmitter<Address>();
  @Input() mapFormAddressData: any;

  ngOnChanges(event: any) {
    if (event.mapFormAddressData.currentValue) {
      const point = new Point({
        longitude: event.mapFormAddressData.currentValue.lng,
        latitude: event.mapFormAddressData.currentValue.lat,
      });

      this.addPointToMap(point);
    }
  }

  handleMapClick(event: any) {
    const clickedData = {
      address: event.address,
      lat: event.lat,
      lng: event.lng,
    };
    this.mapClick.emit(clickedData);

    const point = new Point({
      longitude: event.lng,
      latitude: event.lat,
    });

    this.addPointToMap(point);
  }

  addPointToMap(point: Point) {
    const markerSymbol = new SimpleMarkerSymbol({
      color: [226, 119, 40],
      outline: {
        color: [255, 255, 255],
        width: 1,
      },
    });

    const pointGraphic = new Graphic({
      geometry: point,
      symbol: markerSymbol,
    });

    // this.mapView.graphics.removeAll();
    this.mapView.graphics.add(pointGraphic);
  }

  constructor(private stationService: StationService) {}

  ngOnInit() {
    loadModules([
      'esri/config',
      'esri/Map',
      'esri/views/MapView',
      'esri/widgets/Locate',
      'esri/widgets/Track',
      'esri/Graphic',
      'esri/layers/FeatureLayer',
      'esri/widgets/BasemapToggle',
      'esri/widgets/BasemapGallery',
      'esri/geometry/Point',
      'esri/symbols/SimpleMarkerSymbol',
      'esri/rest/locator',
      'esri/widgets/Search',
    ]).then(
      ([
        esriConfig,
        Map,
        MapView,
        Locate,
        Track,
        Graphic,
        FeatureLayer,
        BasemapToggle,
        BasemapGallery,
        Point,
        SimpleMarkerSymbol,
        locator,
        Search,
      ]) => {
        esriConfig.apiKey =
          'AAPKf2b222eeb0964813810746eb8274b5ffQFWRQkUMcyYrjaV9mgAMp7J1_cDz8aru5Zy2Io4ngzM10qQreoyoKIR8tQsAuEWj';

        const map = new Map({
          basemap: 'arcgis-navigation',
        });

        const view = new MapView({
          map: map,
          center: [35.2433, 38.9637],
          zoom: 5,
          container: 'viewDiv',
        });

        this.mapView = view;
        view.ui.remove('zoom');

        const search = new Search({
          view: view,
        });

        search.on('select-result', (event: any) => {
          const point = event.result.feature.geometry;
          const params = {
            location: point,
          };
          locator.locationToAddress(serviceUrl, params).then(
            (response: any) => {
              const address = response.address;
              const clickedData = {
                address: address,
                lat: point.latitude,
                lng: point.longitude,
              };
              this.mapClick.emit(clickedData);
              console.log(clickedData, 'aramanın sonucu');
            },
            (err: any) => {
              console.log(err, 'hata');
            }
          );
        });

        view.ui.add(search, 'top-right');

        this.stationService.getStations().subscribe((data) => {
          this.points = data;
          this.points.forEach((element) => {
            const point = new Point({
              longitude: element.longitude,
              latitude: element.latitude,
            });

            const markerSymbol = new SimpleMarkerSymbol({
              color: [226, 119, 40],
              outline: {
                color: [255, 255, 255],
                width: 1,
              },
            });

            const pointGraphic = new Graphic({
              geometry: point,
              symbol: markerSymbol,
            });

            view.graphics.add(pointGraphic);
          });
        });

        const basemapToggle = new BasemapToggle({
          view: view,
          nextBasemap: 'arcgis-imagery',
          container: document.createElement('div'), // Yeni bir div oluşturur
          titleVisible: true, // Başlık görünürlüğünü ayarlar
          visibleElements: {
            title: true, // Başlığın görünürlüğünü kontrol eder
            toggleButton: true, // Toggle butonunun görünürlüğünü kontrol eder
          },
          theme: 'light', // Arayüz temasını ayarlar (dark veya light)
        });

        view.ui.add(basemapToggle, 'bottom-right');

        const locate = new Locate({
          view: view,
          useHeadingEnabled: false,
          goToOverride: function (view: View, options: Options) {
            options.target.scale = 1500;
            return view.goTo(options.target);
          },
        });

        view.ui.add(locate, 'top-right');

        const serviceUrl =
          'http://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer';

        view.on('click', (evt: any) => {
          const point = evt.mapPoint;
          const params = {
            location: point,
          };
          locator.locationToAddress(serviceUrl, params).then(
            (response: any) => {
              const address = response.address;
              const clickedData = {
                address: address,
                lat: point.latitude,
                lng: point.longitude,
              };

              this.mapClick.emit(clickedData);
            },
            (err: any) => {
              console.log(err, 'hata');
            }
          );
        });

        const track = new Track({
          view: view,
          graphic: new Graphic({
            symbol: {
              type: 'simple-marker',
              size: '12px',
              color: 'green',
              outline: {
                color: '#efefef',
                width: '1.5px',
              },
            },
          }),
          useHeadingEnabled: false,
        });

        view.ui.add(track, 'top-right');
      }
    );
  }
}

// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { loadModules } from 'esri-loader';
// import { concatMap } from 'rxjs';
// import { Station } from 'src/app/models/station';
// import { StationService } from 'src/app/services/station.service';
// import Point from '@arcgis/core/geometry/Point';
// import Graphic from '@arcgis/core/Graphic';
// import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
// import { ViewChild, ElementRef } from '@angular/core';

// interface Address {
//   address: string;
//   lat: number;
//   lng: number;
// }
// @Component({
//   selector: 'app-map',
//   templateUrl: './map.component.html',
//   styleUrls: ['./map.component.css'],
// })
// export class MapComponent implements OnInit {
//   @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef;
//   @Output() mapClick = new EventEmitter<Address>();
//   @Input() mapFormAddressData: any;

//   public map: any;
//   public view: any;
//   public locate: any;
//   public locator: any;
//   public stations: Station[] = [];
//   public basemapss: any[];
//   public currentBasemapIndex: number;

//   constructor(private stationService: StationService) {
//     this.basemapss = [
//       {
//         id: 0,
//         name: 'arcgis-navigation',
//         title: 'Navigation',
//       },
//       {
//         id: 1,
//         name: 'arcgis-streets',
//         title: 'Streets',
//       },
//       {
//         id: 2,
//         name: 'arcgis-topographic',
//         title: 'Topographic',
//       },
//       {
//         id: 3,
//         name: 'arcgis-dark-gray',
//         title: 'Dark Gray',
//       },
//     ];

//     this.currentBasemapIndex = 0;
//   }

//   ngOnInit(): void {
//     this.initializeMap();
//   }

//   initializeMap() {
//     loadModules(
//       ['esri/Map', 'esri/views/MapView', 'esri/config', 'esri/widgets/Locate'],
//       { css: true }
//     ).then(([Map, MapView, esriConfig, Locate]) => {
//       esriConfig.apiKey =
//         'AAPKf2b222eeb0964813810746eb8274b5ffQFWRQkUMcyYrjaV9mgAMp7J1_cDz8aru5Zy2Io4ngzM10qQreoyoKIR8tQsAuEWj';

//       this.map = new Map({
//         basemap: 'arcgis-navigation',
//       });

//       this.view = new MapView({
//         map: this.map,
//         center: [35.243322, 38.963745],
//         zoom: 5,
//         container: 'viewDiv',
//       });

//       this.locate = new Locate({
//         view: this.view,
//         useHeadingEnabled: false,
//         goToOverride: function (view: any, options: any) {
//           options.target.scale = 1500;
//           return view.goTo(options.target);
//         },
//       });

//       this.view.ui.add(this.locator, 'top-right');

//       this.getStations();

//       this.view.on('click', (evt: any) => {
//         const point = evt.mapPoint;
//         const params = {
//           location: point,
//         };
//         const serviceUrl =
//           'http://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer';

//         console.log(point, 'point');

//         this.locator.locationToAddress(serviceUrl, params).then(
//           (response: any) => {
//             const address = response.address;
//             const clickedData = {
//               address: address,
//               lat: point.latitude,
//               lng: point.longitude,
//             };
//             this.mapClick.emit(clickedData);
//             console.log(clickedData, 'aramanın sonucu');
//           },
//           (err: any) => {
//             console.log(err, 'hata');
//           }
//         );
//       });
//     });
//   }

//   getStations(): void {
//     this.stationService.getStations().subscribe((data) => {
//       this.stations = data;

//       this.stations.forEach((element) => {
//         const point = {
//           type: 'point',
//           longitude: element.longitude,
//           latitude: element.latitude,
//         };

//         const pinSymbol = {
//           type: 'picture-marker',
//           url: 'assets/pin.svg',
//           width: '25px',
//           height: '25px',
//         };

//         const pointGraphic = {
//           geometry: point,
//           symbol: pinSymbol,

//           attributes: {
//             name: element.name,
//             id: element.id,
//             address: element.address,
//             latitude: element.latitude,
//             longitude: element.longitude,
//           },

//           popupTemplate: {
//             title: '{name}',
//             content: [
//               {
//                 type: 'fields',
//                 fieldInfos: [
//                   {
//                     fieldName: 'address',
//                     label: 'Address',
//                   },
//                   {
//                     fieldName: 'name',
//                     label: 'Name',
//                   },
//                   // {
//                   //   fieldName: 'latitude',
//                   //   label: 'Latitude',
//                   // },
//                   // {
//                   //   fieldName: 'longitude',
//                   //   label: 'Longitude',
//                   // },
//                 ],
//               },
//             ],
//           },
//         };

//         this.view.graphics.add(pointGraphic);
//       });
//     });
//   }

//   handleMapClick(event: any) {
//     const clickedData = {
//       address: event.address,
//       lat: event.lat,
//       lng: event.lng,
//     };
//     this.mapClick.emit(clickedData);

//     const point = new Point({
//       longitude: event.lng,
//       latitude: event.lat,
//     });

//     this.addPointToMap(point);
//   }

//   addPointToMap(point: Point) {
//     const markerSymbol = new SimpleMarkerSymbol({
//       color: [226, 119, 40],
//       outline: {
//         color: [255, 255, 255],
//         width: 1,
//       },
//     });

//     const pointGraphic = new Graphic({
//       geometry: point,
//       symbol: markerSymbol,
//     });

//     this.view.graphics.removeAll();
//     this.view.graphics.add(pointGraphic);
//   }
// }
