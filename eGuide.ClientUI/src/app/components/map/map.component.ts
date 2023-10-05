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

  constructor() {}

  ngOnInit() {
    loadModules(['esri/Map', 'esri/views/MapView'])
      .then(([EsriMap, EsriMapView]) => {
        const map = new Map({
          basemap: 'streets-navigation-vector',
        });

        const view = new MapView({
          container: this.mapViewEl.nativeElement,
          map: map,
          center: [32.722838, 39.815434],
          zoom: 15,
        });

        // Tıklama olayını ekle
        view.on('click', this.addPointOnClick.bind(this));

        this.mapView = view;

        const pointsfromDatabase = [
          {
            latitude: 39.815434,
            longitude: 32.722838,
          },
          {
            latitude: 40.815434,
            longitude: 32.722838,
          },
          {
            latitude: 23.815434,
            longitude: 42.722838,
          },
        ];

        this.addPointsFromDatabase(pointsfromDatabase);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  addPointsFromDatabase(points: any[]) {
    points.forEach((point) => {
      const lat = point.latitude.toFixed(6);
      const lng = point.longitude.toFixed(6);

      const markerSymbol = new SimpleMarkerSymbol({
        color: [226, 119, 40],
        outline: {
          color: [255, 255, 255],
          width: 1,
        },
        size: 12,
      });

      const graphic = new Graphic({
        geometry: new Point({
          latitude: point.latitude,
          longitude: point.longitude,
        }),
        symbol: markerSymbol,
        attributes: {
          lat: lat,
          lng: lng,
        },
        popupTemplate: {
          title: 'Coordinates',
          content: `Lat: {lat}<br>Long: {lng}`,
        },
      });

      this.mapView.graphics.add(graphic);
    });
  }

  addPointOnClick(event: any) {
    const point = this.mapView.toMap({ x: event.x, y: event.y });
    const lat = point.latitude.toFixed(6);
    const lng = point.longitude.toFixed(6);

    const markerSymbol = new SimpleMarkerSymbol({
      color: [226, 119, 40],
      outline: {
        color: [255, 255, 255],
        width: 1,
      },
      size: 12,
    });

    const graphic = new Graphic({
      geometry: point,
      symbol: markerSymbol,
      attributes: {
        lat: lat,
        lng: lng,
      },
      popupTemplate: {
        title: 'Coordinates',
        content: `Lat: {lat}<br>Long: {lng}`,
      },
    });

    this.mapView.graphics.add(graphic);

    // Noktayı saklayın
    this.points.push({
      graphic: graphic,
      lat: lat,
      lng: lng,
    });
  }

  // Noktayı kaldırmak için bir fonksiyon oluşturun
  removePoint(index: number) {
    const point = this.points[index];
    this.mapView.graphics.remove(point.graphic);
    this.points.splice(index, 1);
  }

  addPointToMap(point: any) {
    const markerSymbol = new SimpleMarkerSymbol({
      color: [226, 119, 40],
      outline: {
        color: [255, 255, 255],
        width: 1,
      },
      size: 12,
    });

    const graphic = new Graphic({
      geometry: point,
      symbol: markerSymbol,
      attributes: {
        lat: point.latitude,
        lng: point.longitude,
      },
      popupTemplate: {
        title: 'Koordinatlar',
        content: `Lat: {lat}<br>Long: {lng}`,
      },
    });

    this.mapView.graphics.add(graphic);
  }
}
