import { LastVisitedStations } from './../../models/last-visited-stations';
import { Component, Input, OnInit } from '@angular/core';
import { loadModules } from 'esri-loader';
import { Station } from 'src/app/models/station';
import { StationService } from 'src/app/services/station.service';
import Search from '@arcgis/core/widgets/Search';
import * as reactiveUtils from '@arcgis/core/reactiveUtils';
import Swal from 'sweetalert2';
import { LastVisitedStationsService } from 'src/app/services/last-visited-stations.service';
import { UserStationService } from 'src/app/services/user-station.service';
import { UserStation } from 'src/app/models/user-station';
import { basemapss } from './map-data';
import { MapHelper } from './map-helper';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from 'src/app/models/comment';

interface Center {
  latitude: any;
  longitude: any;
}
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [MapHelper],
})
export class MapComponent implements OnInit {
  searchType = '';
  lastVisitedStations: LastVisitedStations = new LastVisitedStations();
  nearestStations: Station[] = [];
  userStation: UserStation = new UserStation();
  currentBasemapIndex: number;
  stations: Station[] = [];
  comments: Comment[] = [];
  map: any;
  view: any;
  locate: any;
  nearLocate: any;
  basemapss: any[] = [];
  chargingUnitList: any[] = [];
  connectorTypelist: any[] = [];
  facilityList: any[] = [];

  connectorFilteredStations: Station[] = [];

  commentForm: FormGroup = new FormGroup({});

  constructor(
    private stationService: StationService,
    private lastVisitedStationsService: LastVisitedStationsService,
    private userStationService: UserStationService,
    private formBuilder: FormBuilder,
    private mapHelper: MapHelper,
    private commentService: CommentService
  ) {
    this.basemapss = basemapss;
    this.currentBasemapIndex = 0;
  }

  ngOnInit(): void {
    this.initializeMap();
    this.getStations();
    this.initializeForm();
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
    ).then(([Map, MapView, esriConfig, Locate]) => {
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
      // find only user location do not zoom in
      this.nearLocate = new Locate({
        view: this.view,
        useHeadingEnabled: false,
      });
      this.view.ui.remove('zoom'); // remove zoom buttons
      this.getStations(); // show station points
    });
  }

  zoomIn(): void {
    this.mapHelper.zoomIn(this.view);
  }

  zoomOut(): void {
    this.mapHelper.zoomOut(this.view);
  }

  locateS(): void {
    this.mapHelper.locateS(this.locate);
  }

  findNearestStations(): void {
    this.nearLocate.locate().then((userP: any) => {
      this.calculateNearestStations(userP);
    });
  }

  calculateNearestStations(userP: any): void {
    this.mapHelper.calculateNearestStations(userP, this.stations, this.view);
  }

  calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    return this.mapHelper.calculateDistance(lat1, lon1, lat2, lon2);
  }

  deg2rad(deg: number): number {
    return this.mapHelper.deg2rad(deg);
  }

  changeLayer(basemap: { name: string; id: number; title: string }): void {
    this.map.basemap = basemap.name; // change basemap
    this.currentBasemapIndex = basemap.id; // change current basemap index
  }

  // get stations from api
  getStations(): void {
    this.mapHelper.getStations(this.view);
  }

  // get selected station from station list component
  onStationSelected(selectedStation: Center) {
    this.view.center = [selectedStation.longitude, selectedStation.latitude]; // center the view to the selected station
    this.view.zoom = 12; // zoom in to the selected station
  }

  deneme(event: any) {
    console.log('aaaaaaaa', event);
    this.connectorFilteredStations = event;
    console.log(this.connectorFilteredStations[0].id);
  }

  // get search text from search component
  goLocation(stationId: any) {
    this.mapHelper.goLocation(stationId);
  }

  initializeForm() {
    this.commentForm = this.formBuilder.group({
      text: [''],
      rating: [''],
      ownerId: [''],
      stationId: [''],
    });
  }

  getComments(stationId: any) {
    // this.commentService.getComments(stationId).subscribe((data) => {
    //   console.log(data);
    //   this.comments = data;
    // });
    this.mapHelper.getComments(stationId);
  }

  comment(stationId: any) {
    // Swal.fire({
    //   title: 'Comments',
    //   html: generateCommentsHTML(this.comments),
    //   showCancelButton: true,
    //   confirmButtonText: 'Add Comment',
    //   cancelButtonText: 'Cancel',
    //   reverseButtons: true,
    //   allowOutsideClick: () => !Swal.isLoading(),
    //   preConfirm: (comment) => {
    //     // Handle the added comment (you might want to save it to the database here)
    //     console.log('Added comment:', comment);
    //   },
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     Swal.fire({
    //       title: 'Leave a Comment',
    //       input: 'textarea',
    //       inputLabel: 'Comment',
    //       inputPlaceholder: 'Type your comment here...',
    //       inputAttributes: {
    //         'aria-label': 'Type your comment here',
    //       },
    //       // html: `<p>Rating</p>
    //       //   <div class="rating">
    //       //   <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" (change)="asd(1)"/>
    //       //   <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" checked />
    //       //   <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" (change)="asd(2)"/>
    //       //   <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" (change)="asd(3)"/>
    //       //   <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" (change)="asd(4)"/>
    //       //     </div>`,
    //       showCancelButton: true,
    //       confirmButtonText: 'Submit',
    //       cancelButtonText: 'Cancel',
    //       reverseButtons: true,
    //       allowOutsideClick: () => !Swal.isLoading(),
    //       preConfirm: (login) => {
    //         return login;
    //       },
    //     }).then((result) => {
    //       if (result.value !== '' && result.isConfirmed) {
    //         this.submitComment(result.value, stationId);
    //         Swal.fire({
    //           title: 'Success!',
    //           text: 'Your comment has been added.',
    //           icon: 'success',
    //           confirmButtonText: 'Ok',
    //         });
    //       } else if (result.value === '') {
    //         Swal.fire({
    //           title: 'Error!',
    //           text: 'You must enter a comment.',
    //           icon: 'error',
    //           confirmButtonText: 'Ok',
    //         });
    //       }
    //     });
    //   }
    // });
    // function generateCommentsHTML(comments: any) {
    //   if (comments.length === 0) {
    //     return '<p>No comments yet.</p>';
    //   }

    //   const commentsList = comments
    //     .map((comment: any) => `<p>${comment}</p>`)
    //     .join('');
    //   return commentsList;
    // }

    // // Swal.fire({
    // //   title: 'Leave a Comment',
    // //   input: 'textarea',
    // //   inputLabel: 'Comment',
    // //   inputPlaceholder: 'Type your comment here...',
    // //   inputAttributes: {
    // //     'aria-label': 'Type your comment here',
    // //   },
    // //   // html: `<p>Rating</p>
    // //   //   <div class="rating">
    // //   //   <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" (change)="asd(1)"/>
    // //   //   <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" checked />
    // //   //   <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" (change)="asd(2)"/>
    // //   //   <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" (change)="asd(3)"/>
    // //   //   <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" (change)="asd(4)"/>
    // //   //     </div>`,
    // //   showCancelButton: true,
    // //   confirmButtonText: 'Submit',
    // //   cancelButtonText: 'Cancel',
    // //   reverseButtons: true,
    // //   allowOutsideClick: () => !Swal.isLoading(),
    // //   preConfirm: (login) => {
    // //     return login;
    // //   },
    // // }).then((result) => {
    // //   if (result.value !== '' && result.isConfirmed) {
    // //     this.submitComment(result.value, stationId);
    // //     Swal.fire({
    // //       title: 'Success!',
    // //       text: 'Your comment has been added.',
    // //       icon: 'success',
    // //       confirmButtonText: 'Ok',
    // //     });
    // //   } else if (result.value === '') {
    // //     Swal.fire({
    // //       title: 'Error!',
    // //       text: 'You must enter a comment.',
    // //       icon: 'error',
    // //       confirmButtonText: 'Ok',
    // //     });
    // //   }
    // // });
    this.mapHelper.comment(stationId);
  }

  submitComment(comment: string, stationId: number) {
    // const userId = localStorage.getItem('authToken');
    // this.commentForm.patchValue({
    //   text: comment,
    //   ownerId: userId,
    //   stationId: stationId,
    //   rating: 2,
    // });
    // console.log(this.commentForm.value);
    // this.commentService.addComment(this.commentForm.value).subscribe();
    this.mapHelper.submitComment(comment, stationId);
  }

  // search function
  search(enevt: any) {
    this.mapHelper.search(enevt, this.view);
  }

  saveUserStation(elementId: string, userId: string): void {
    this.mapHelper.saveUserStation(elementId, userId);
  }
}
