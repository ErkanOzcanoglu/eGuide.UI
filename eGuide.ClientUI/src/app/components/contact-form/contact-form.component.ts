import { Component, OnInit } from '@angular/core';
import { loadModules } from 'esri-loader';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit {
  isValid = false;

  ngOnInit(): void {
    this.initializeMap();
  }

  initializeMap() {
    loadModules(['esri/Map', 'esri/views/MapView', 'esri/config'], {
      css: true,
    }).then(([Map, MapView, esriConfig]) => {
      esriConfig.apiKey =
        'AAPKf2b222eeb0964813810746eb8274b5ffQFWRQkUMcyYrjaV9mgAMp7J1_cDz8aru5Zy2Io4ngzM10qQreoyoKIR8tQsAuEWj';
      const map = new Map({
        basemap: 'arcgis-navigation',
      });

      const view = new MapView({
        map: map,
        container: 'viewDiv',
        center: [32.72404000000006, 39.81562000000008], // longitude, latitude
        zoom: 13,
      });

      // add point
      const point = {
        type: 'point',
        longitude: 32.72404000000006,
        latitude: 39.81562000000008,
      };

      // display point
      const simpleMarkerSymbol = {
        type: 'simple-marker',
        color: [226, 119, 40], // orange
        outline: {
          color: [255, 255, 255], // white
          width: 1,
        },
      };

      const pointGraphic = {
        geometry: point,
        symbol: simpleMarkerSymbol,
      };

      view.graphics.add(pointGraphic);

      view.ui.add('contactForm', 'top-right');
    });
  }
}
