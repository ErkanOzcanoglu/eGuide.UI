// import { loadModules } from 'esri-loader';
// import { Component, OnInit } from '@angular/core';
// import { StationService } from 'src/app/services/station.service';
// import { Station } from 'src/app/models/station';

// @Component({
//   selector: 'app-map',
//   templateUrl: './map.component.html',
//   styleUrls: ['./map.component.css'],
// })
// export class MapComponent implements OnInit {
//   public points: Station[] = [];
//   constructor(private stationService: StationService) {} // Inject the station service
//   public isPopupOpen = false;
//   public popupContent = '';
//   openPopup(content: string): void {
//     this.popupContent = content;
//     this.isPopupOpen = true;
//   }
//   ngOnInit(): void {
//     this.getStations(); // Call the getStations() method when the component is initialized

//     loadModules(
//       [
//         'esri/Map',
//         'esri/views/MapView',
//         'esri/config',
//         'esri/widgets/Track',
//         'esri/Graphic',
//         'esri/layers/GraphicsLayer',
//         'esri/geometry/Point',
//         'esri/widgets/BasemapToggle',
//       ],
//       {
//         css: true,
//       }
//     ).then(
//       ([
//         Map,
//         MapView,
//         esriConfig,
//         Track,
//         Graphic,
//         GraphicsLayer,
//         Point,
//         BasemapToggle,
//       ]) => {
//         esriConfig.apiKey =
//           'AAPKf2b222eeb0964813810746eb8274b5ffQFWRQkUMcyYrjaV9mgAMp7J1_cDz8aru5Zy2Io4ngzM10qQreoyoKIR8tQsAuEWj';

//         const map = new Map({
//           // Basemap layer service
//           basemap: 'arcgis-navigation',
//         });

//         const view = new MapView({
//           // Map view
//           map: map,
//           center: [35.243322, 38.963745], // Longitude, latitude
//           zoom: 6, // Zoom level
//           container: 'viewDiv', // Div element
//           popup: {
//             dockEnabled: true,
//             dockOptions: {
//               // Disables the dock button from the popup
//               buttonEnabled: false,
//               // Ignore the default sizes that trigger responsive docking
//               breakpoint: false,
//               position: 'bottom-right',
//             },
//           },
//         });

//         const graphicsLayer = new GraphicsLayer(); // Create a graphics layer to hold the graphics
//         map.add(graphicsLayer); // Add the graphics layer to the map

//         // const locate = new Locate({
//         //   // Locate button
//         //   view: view,
//         //   useHeadingEnabled: false,
//         //   goToOverride: function (
//         //     view: { goTo: (arg0: { scale: number }) => void },
//         //     options: { target: { scale: number } }
//         //   ) {
//         //     options.target.scale = 1500;
//         //     return view.goTo(options.target);
//         //   },
//         // });
//         // view.ui.add(locate, 'top-left'); // Add to the map
//         view.ui.move('zoom', 'bottom-left');

//         const track = new Track({
//           // Track button
//           view: view,
//           graphic: new Graphic({
//             symbol: {
//               type: 'simple-marker',
//               size: '12px',
//               color: 'green',
//               outline: {
//                 color: '#efefef',
//                 width: '1.5px',
//               },
//             },
//           }),
//           useHeadingEnabled: false,
//         });
//         // add button style margin-left: 10px; margin-top: 10px;
//         view.ui.add(track, 'bottom-left'); // Add to the map

//         const basemapToggle = new BasemapToggle({
//           view: view,
//           nextBasemap: 'arcgis-imagery',
//         });

//         view.ui.add(basemapToggle, 'bottom-right');

//         // yakınlaştırma butonunu sol alta al
//         // const point = {
//         //   // Create a point
//         //   //Create a point
//         //   type: 'point',
//         //   longitude: -118.80657463861,
//         //   latitude: 34.0005930608889,
//         // };

//         // const simpleMarkerSymbol = {
//         //   // Create a symbol for drawing the point
//         //   type: 'simple-marker',
//         //   color: [226, 119, 40], // Orange
//         //   outline: {
//         //     color: [255, 255, 255], // White
//         //     width: 1,
//         //   },
//         // };

//         // const pointGraphic = new Graphic({
//         //   // Create a graphic and add the geometry and symbol to it
//         //   geometry: point,
//         //   symbol: simpleMarkerSymbol,
//         // });
//         // graphicsLayer.add(pointGraphic); // Add the graphic to the graphics layer
//         // graphicsLayer.on('click', (event: any) => {
//         //   const clickedPoint = event.graphic.geometry;
//         //   const modalContent = `Latitude: ${clickedPoint.latitude}, Longitude: ${clickedPoint.longitude}`;

//         //   // Modalı aç
//         //   const modal = document.getElementById('myModal');
//         //   const modalContentElement = document.getElementById('modalContent');

//         //   if (modal && modalContentElement) {
//         //     modalContentElement.innerText = modalContent;
//         //     modal.style.display = 'block';

//         //     // Kapat butonuna tıklanınca modalı kapat
//         //     const closeBtn = document.getElementsByClassName('close')[0];
//         //     closeBtn.addEventListener('click', () => {
//         //       modal.style.display = 'none';
//         //     });
//         //   }
//         // });

//         this.stationService.getStations().subscribe((data) => {
//           this.points = data;

//           this.points.forEach((element) => {
//             const point = new Point({
//               longitude: element.longitude,
//               latitude: element.latitude,
//             });

//             const pinSymbol = {
//               type: 'picture-marker',
//               url: '../../assets/charging.svg',
//               width: '30px',
//               height: '30px',
//             };

//             const pointGraphic = new Graphic({
//               geometry: point,
//               symbol: pinSymbol,
//               attributes: {
//                 name: element.name,
//                 id: element.id,
//                 address: element.address,
//                 latitude: element.latitude,
//                 longitude: element.longitude,
//               },

//               popupTemplate: {
//                 title: '{name}',
//                 content: [
//                   {
//                     type: 'fields',
//                     fieldInfos: [
//                       {
//                         fieldName: 'address',
//                         label: 'Address',
//                       },
//                       {
//                         fieldName: 'name',
//                         label: 'Name',
//                       },
//                       // {
//                       //   fieldName: 'latitude',
//                       //   label: 'Latitude',
//                       // },
//                       // {
//                       //   fieldName: 'longitude',
//                       //   label: 'Longitude',
//                       // },
//                     ],
//                   },
//                 ],
//               },
//             });
//             view.graphics.add(pointGraphic);
//           });
//         });
//       }
//     );
//   }

//   zoomIn(): void {
//     loadModules(['esri/views/MapView']).then(([MapView]) => {
//       const view = new MapView({
//         container: 'viewDiv',
//         map: this.map,
//       });
//       view.zoom += 1;
//     });
//   }

//   getStations(): void {
//     this.stationService.getStations().subscribe((data) => {
//       data.forEach((item) => {
//         const point = {
//           type: 'point',
//           longitude: item.longitude,
//           latitude: item.latitude,
//         };
//         console.log(point);
//       });
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { loadModules } from 'esri-loader';
import { StationService } from 'src/app/services/station.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  public map: any;
  public view: any;
  public locate: any;
  public isLocated = false;
  public stations: any[] = [];
  public basemapss: any[] = [];
  public currentBasemapIndex: number;

  onKeyDown(event: KeyboardEvent, basemap: any) {
    if (event.key === 'Enter') {
      this.changeLayer(basemap);
    }
  }

  constructor(private stationService: StationService) {
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
  showStationInfo(station: any): void {
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
