import { Injectable } from '@angular/core';
import Search from '@arcgis/core/widgets/Search';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LastVisitedStations } from 'src/app/models/last-visited-stations';
import { CommentService } from 'src/app/services/comment.service';
import { LastVisitedStationsService } from 'src/app/services/last-visited-stations.service';
import Swal from 'sweetalert2';
import { UserStation } from 'src/app/models/user-station';
import { UserStationService } from 'src/app/services/user-station.service';
import { StationService } from 'src/app/services/station.service';
import { Station } from 'src/app/models/station';
import * as reactiveUtils from '@arcgis/core/core/reactiveUtils';
import { Comment } from 'src/app/models/comment';
import { ToastrService } from 'ngx-toastr';
import { ChargingUnit } from 'src/app/models/charging-unit';
import { Facility } from 'src/app/models/facility';
import { Connector } from 'src/app/models/connector';

@Injectable({
  providedIn: 'root',
})
export class MapHelper {
  lastVisitedStations: LastVisitedStations = new LastVisitedStations();
  commentForm: FormGroup = new FormGroup({});
  searchType?: string;
  view: any;
  userStation: UserStation = new UserStation();
  stations: Station[] = [];
  comments: Comment[] = [];
  rating?: string;
  chargingUnitList: any;
  facilityList: any;
  connectorTypelist: any;
  isLoaded = false;
  isFound = false;

  constructor(
    private lastVisitedStationsService: LastVisitedStationsService,
    private commentService: CommentService,
    private formBuilder: FormBuilder,
    private userStationService: UserStationService,
    private stationService: StationService,
    private toastrService: ToastrService
  ) {}

  zoomIn(view: any): void {
    console.log(view, 'view');
    view.goTo({ zoom: view.zoom + 1 });
  }

  zoomOut(view: any): void {
    view.goTo({ zoom: view.zoom - 1 });
  }

  clickLayer(
    map: any,
    basemap: { name: string; id: number; title: string }
  ): void {
    map.basemap = basemap.name;
  }

  locateS(locate: any): void {
    this.isFound = true;
    locate.locate().then(() => {
      this.isFound = false;
    });
  }

  windowSize() {
    const size = window.innerWidth;
    console.log(size, 'size');
  }

  calculateNearestStations(userP: any, view: any): void {
    // Calculate distance between user and each station
    this.stations.forEach((station) => {
      if (station.latitude !== undefined && station.longitude !== undefined) {
        const distance = this.calculateDistance(
          userP.coords.latitude,
          userP.coords.longitude,
          station.latitude,
          station.longitude
        );
        station.distance = distance;
      }
    });

    // Sort stations by distance
    this.stations.sort((a, b) => {
      // Handle the case where distance is undefined
      if (a.distance === undefined && b.distance === undefined) {
        return 0; // If both distances are undefined, consider them equal
      } else if (a.distance === undefined) {
        return 1; // If only a.distance is undefined, consider a greater (move it towards the end)
      } else if (b.distance === undefined) {
        return -1; // If only b.distance is undefined, consider b greater (move it towards the end)
      } else {
        return a.distance - b.distance; // Normal comparison when both distances are defined
      }
    });

    // Get nearest station
    const nearestStation = this.stations[0];
    // Display nearest station
    view.center = [nearestStation.longitude, nearestStation.latitude];
    view.zoom = 12;
  }

  calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1); // Convert degrees to radians
    const dLon = this.deg2rad(lon2 - lon1); // Convert degrees to radians
    const a = // Haversine formula
      Math.sin(dLat / 2) * Math.sin(dLat / 2) + // Calculate distance between two points on the earth in km
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  }

  deg2rad(deg: number): number {
    // Convert degrees to radians
    return deg * (Math.PI / 180);
  }

  goLocation(stationId: string) {
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
        text: 'Are you sure you want to go to this station?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, go!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const userId = localStorage.getItem('authToken');
          if (userId != null) {
            this.lastVisitedStations.userId = userId;
            this.lastVisitedStations.stationId = stationId;
            this.lastVisitedStationsService
              .createLastVisitedStation(this.lastVisitedStations)
              .subscribe();
          }
          swalWithBootstrapButtons.fire({
            title: 'Success!',
            text: 'You will be redirected to the station page.',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
        }
      });
  }

  search(enevt: string, view: any) {
    console.log(enevt, 'event');
    this.searchType = enevt;
    console.log(this.searchType, 'searchType');
    const search = new Search({
      view: view,
    });
    search.search(this.searchType);
  }

  saveUserStation(elementId: string, userId: string): void {
    this.userStation.userId = userId;
    this.userStation.stationProfileId = elementId;
    this.userStationService.saveUserStation(this.userStation).subscribe(() => {
      this.toastrService.success('Station added to favorites.');
    });
  }

  getStations(view: any, FilteredStations: Station[]): void {
    this.stationService.getStations().subscribe({
      next: (data) => {
        if (FilteredStations.length === 0) {
          this.stations = data;
        } else {
          view.graphics.removeAll();
          this.stations = FilteredStations;
        }

        const userId: string | null = localStorage.getItem('authToken');
        if (userId !== null) {
          this.userStationService
            .getStationProfiles(userId)
            .subscribe((favoriteStations) => {
              this.isLoaded = true;
              reactiveUtils.on(
                () => view.popup,
                'trigger-action',
                (event: any) => {
                  if (event.action.id === 'add-favorite') {
                    this.saveUserStation(event.action.stationId, userId);
                  } else if (event.action.id === 'go-location-action') {
                    this.goLocation(event.action.stationId);
                  } else if (event.action.id === 'comment') {
                    this.getComments(event.action.stationId);
                    this.comment(event.action.stationId);
                    this.initializeCommentForm();
                  }
                }
              );
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

                const starColorClass = isFavorite
                  ? 'esri-icon-favorites-favorite'
                  : 'esri-icon-favorites';

                const goLocationAction = {
                  id: 'go-location-action',
                  className: 'esri-icon-locate-circled',
                  stationId: element.id,
                };

                const addFavorite = {
                  id: 'add-favorite',
                  className: starColorClass,
                  stationId: element.id,
                };

                const comment = {
                  id: 'comment',
                  className: 'esri-icon-comment',
                  stationId: element.id,
                };

                if (element.stationModel?.stationsChargingUnits) {
                  const chargingUnits =
                    element.stationModel.stationsChargingUnits.map((unit) => ({
                      name: unit.chargingUnit?.name,
                    }));
                  this.chargingUnitList = chargingUnits;
                }

                if (element.stationModel?.stationsChargingUnits) {
                  const connectors =
                    element.stationModel.stationsChargingUnits.map((unit) => ({
                      type: unit.chargingUnit?.connector?.type,
                    }));

                  this.connectorTypelist = connectors;
                }

                if (element.stationFacilities) {
                  const facilityList = element.stationFacilities.map(
                    (unit) => ({
                      type: unit.facility?.type,
                    })
                  );
                  this.facilityList = facilityList;
                }

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
                    model: element.stationModel?.name,
                    chargingUnit: this.chargingUnitList
                      .map((chargingUnit: any) => chargingUnit.name)
                      .join(', '),
                    connector: this.connectorTypelist
                      .map((chargingUnit: any) => chargingUnit.type)
                      .join(', '),
                    stationFacilities: this.facilityList
                      .map((stationFacilities: any) => stationFacilities.type)
                      .join(', '),
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
                          {
                            fieldName: 'model',
                            label: 'Model',
                          },
                          {
                            fieldName: 'chargingUnit',
                            label: 'ChargingUnit',
                          },
                          {
                            fieldName: 'connector',
                            label: 'Connector Type',
                          },
                          {
                            fieldName: 'stationFacilities',
                            label: 'Facilities',
                          },
                        ],
                      },
                    ],
                    actions: [goLocationAction, addFavorite, comment],
                  },
                };

                view.graphics.add(pointGraphic); // add graphic to the view
              });
            });
        } else {
          this.stationService.getStations().subscribe((favoriteStations) => {
            this.isLoaded = true;
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
                className: 'esri-icon-locate-circled',
                stationId: element.id,
              };

              const addFavorite = {
                id: 'add-favorite',
                className: starColorClass,
                stationId: element.id,
              };

              if (element.stationModel?.stationsChargingUnits) {
                const chargingUnits =
                  element.stationModel.stationsChargingUnits.map((unit) => ({
                    name: unit.chargingUnit?.name,
                  }));
                this.chargingUnitList = chargingUnits;
              }

              if (element.stationModel?.stationsChargingUnits) {
                const connectors =
                  element.stationModel.stationsChargingUnits.map((unit) => ({
                    type: unit.chargingUnit?.connector?.type,
                  }));

                this.connectorTypelist = connectors;
              }

              if (element.stationFacilities) {
                const facilityList = element.stationFacilities.map((unit) => ({
                  type: unit.facility?.type,
                }));
                this.facilityList = facilityList;
              }

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
                  model: element.stationModel?.name,
                  chargingUnit: this.chargingUnitList.map(
                    (chargingUnit: any) => chargingUnit.name
                  ),
                  connector: this.connectorTypelist.map(
                    (chargingUnit: any) => chargingUnit.type
                  ),
                  stationFacilities: this.facilityList.map(
                    (stationFacilities: any) => stationFacilities.type
                  ),
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
                        {
                          fieldName: 'model',
                          label: 'Model',
                        },
                        {
                          fieldName: 'chargingUnit',
                          label: 'ChargingUnit',
                        },
                        {
                          fieldName: 'connector',
                          label: 'Connector Type',
                        },
                        {
                          fieldName: 'stationFacilities',
                          label: 'Facilities',
                        },
                      ],
                    },
                  ],
                  actions: [goLocationAction, addFavorite],
                },
              };
              view.graphics.add(pointGraphic); // add graphic to the view
            });
          });
        }
      },
      error: () => (this.isLoaded = false),
    });
  }

  getComments(stationId: any) {
    this.commentService.getComments(stationId).subscribe((data) => {
      this.comments = data;
    });
  }

  comment(stationId: any) {
    setTimeout(() => {
      Swal.fire({
        title: 'Comments',
        html: generateCommentsHTML(this.comments),
        showCancelButton: true,
        confirmButtonText: 'Add Comment',
        cancelButtonText: 'Cancel',
        reverseButtons: true,
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Leave a Comment',
            input: 'textarea',
            inputLabel: 'Comment',
            inputPlaceholder: 'Type your comment here...',
            inputAttributes: {
              'aria-label': 'Type your comment here',
            },
            html: `<p>Rating</p>
              <div class="rating" id="swal-rating">
                <input type="radio" name="rating-2" value="1" class="mask mask-star-2 bg-orange-400" />
                <input type="radio" name="rating-2" value="2" class="mask mask-star-2 bg-orange-400" />
                <input type="radio" name="rating-2" value="3" class="mask mask-star-2 bg-orange-400" />
                <input type="radio" name="rating-2" value="4" class="mask mask-star-2 bg-orange-400" />
                <input type="radio" name="rating-2" value="5" class="mask mask-star-2 bg-orange-400" />
              </div>`,
            showCancelButton: true,
            confirmButtonText: 'Submit',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
            allowOutsideClick: () => !Swal.isLoading(),
            preConfirm: () => {
              const selectedRatingInput = document.querySelector(
                'input[name="rating-2"]:checked'
              ) as HTMLInputElement;

              if (selectedRatingInput) {
                this.rating = selectedRatingInput.value;
              }

              const comment = Swal.getInput()?.value;

              if (!selectedRatingInput || !comment) {
                Swal.showValidationMessage(
                  'You must enter a comment and select a rating.'
                );
              }

              return { comment, rating: this.rating };
            },
          }).then((result) => {
            if (result.isConfirmed) {
              const { comment, rating } = result.value;
              this.submitComment(comment, rating, stationId);
              console.log(rating);

              Swal.fire({
                title: 'Success!',
                text: 'Your comment has been added.',
                icon: 'success',
                confirmButtonText: 'Ok',
              });
            }
          });
        }
      });
    }, 300);

    function generateCommentsHTML(comments: Comment[]) {
      if (comments.length === 0) {
        return '<p>No comments yet.</p>';
      }

      const commentsList = comments
        .map(
          (comment: Comment) => `
            <body class="bg-white">
              <div class="container justify-content-center mt-5 border-left border-right p-4">
                <div class="flex justify-content-center py-2">
                  <div class="second py-2 px-2 bg-white rounded-lg shadow-md w-96">
                    <span class="text1 text-gray-700 text-start flex">${comment.text}</span>
                    <div class="flex justify-between py-1 pt-2">
                      <div class="flex items-center justify-end w-full">
                          <span class="text2 text-gray-700">⭐${comment.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </body>
      `
        )
        .join('');

      const commentsContainerStyle = `
    max-height: 300px;
    overflow-y: scroll;
  `;

      return `<div style="${commentsContainerStyle}">${commentsList}</div>`;
    }
  }

  initializeCommentForm() {
    this.commentForm = this.formBuilder.group({
      text: [''],
      ownerId: [''],
      stationId: [''],
      rating: [''],
    });
  }

  submitComment(comment: string, rating: number, stationId: number) {
    const userId = localStorage.getItem('authToken');
    this.commentForm.patchValue({
      text: comment,
      ownerId: userId,
      stationId: stationId,
      rating: rating,
    });
    this.commentService.addComment(this.commentForm.value).subscribe();
  }
}
