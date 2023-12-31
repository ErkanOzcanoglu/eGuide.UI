import { setClickedData } from './../../state/map-click-data/map-click-data.action';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnChanges,
} from '@angular/core';
import { loadModules } from 'esri-loader';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import { StationService } from 'src/app/services/station.service';
import { Store } from '@ngrx/store';
import { getClickedData } from 'src/app/state/map-click-data/map-click-data.selector';
import { Station } from 'src/app/models/station';
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
export class MapComponent implements OnInit, OnChanges {
  @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef;

  public lat = 0;
  public lng = 0;
  public coord: Points[] = [];
  public points: Station[] = [];
  public mapView: any;
  public locator: any;

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
    this.store.dispatch(setClickedData({ clickedData }));

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

    this.mapView.graphics.add(pointGraphic);
  }

  constructor(private stationService: StationService, private store: Store) {
    this.store.select(getClickedData);
  }

  ngOnInit() {
    loadModules([
      'esri/config',
      'esri/Map',
      'esri/views/MapView',
      'esri/widgets/Locate',
      'esri/widgets/Track',
      'esri/Graphic',
      'esri/widgets/BasemapToggle',
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
        BasemapToggle,
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
              this.store.dispatch(setClickedData({ clickedData }));
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
          container: document.createElement('div'),
          titleVisible: true,
          visibleElements: {
            title: true,
            toggleButton: true,
          },
          theme: 'light',
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

              this.store.dispatch(setClickedData({ clickedData }));
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
