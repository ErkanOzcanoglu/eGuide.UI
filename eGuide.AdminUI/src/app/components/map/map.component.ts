import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { loadModules } from 'esri-loader';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import Basemap from '@arcgis/core/Basemap';
import TileLayer from '@arcgis/core/layers/TileLayer';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef;

  public lat: any;
  public lng: any;
  public coord: any;
  public mapView: any;
  public points: any[] = [];
  public locator: any;

  constructor() {}

  ngOnInit() {
    loadModules(['esri/Map', 'esri/views/MapView', 'esri/rest/locator']).then(
      ([EsriMap, EsriMapView, locator]) => {
        const map = new Map({
          basemap: 'streets-navigation-vector',
        });

        const view = new MapView({
          container: this.mapViewEl.nativeElement,
          map: map,
          center: [32.722838, 39.815434],
          zoom: 15,
        });

        const serviceUrl =
          'http://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer';

        view.on('click', function (evt) {
          const params = {
            location: evt.mapPoint,
          };
          locator.locationToAddress(serviceUrl, params).then(
            function (response: any) {
              const address = response.address;
              showAddress(address, evt.mapPoint);
            },
            function (err: any) {
              showAddress('No address found.', evt.mapPoint);
            }
          );
        });

        function showAddress(address: any, pt: any) {
          view.openPopup({
            title:
              +Math.round(pt.longitude * 100000) / 100000 +
              ', ' +
              Math.round(pt.latitude * 100000) / 100000,
            content: address,
            location: pt,
          });
        }
      }
    );
  }
}
