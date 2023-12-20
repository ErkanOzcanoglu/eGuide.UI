import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Station } from 'src/app/models/station';
import { Model } from 'src/app/models/stationInformationModel';
import { ChargingUnitService } from 'src/app/services/charging-unit.service';
import { CommentService } from 'src/app/services/comment.service';
import { StationSocketService } from 'src/app/services/station-socket.service';
import { StationService } from 'src/app/services/station.service';
import { UserStationService } from 'src/app/services/user-station.service';
import { setStationEditData } from 'src/app/state/station-edit-data/station-edit-data.action';
import { Comment } from 'src/app/models/comment';

@Component({
  selector: 'app-station-profile',
  templateUrl: './station-profile.component.html',
  styleUrls: ['./station-profile.component.css'],
})
export class StationProfileComponent {
  model: Model = new Model();
  socket = '';
  socketArray: any;
  stations: Station[] = [];
  stationInfo: Station = new Station();
  showList: any;
  selectedItem: any;
  searchText = '';
  station: Station = new Station();
  stationId = '';
  chargingUnits: any;
  connectorTypelist: any;
  facilityList: any;
  comments: Comment[] = [];
  stationUserCounts?: number;

  constructor(
    private stationService: StationService,
    private chargingUnitService: ChargingUnitService,
    private stationSocketService: StationSocketService,
    private toastr: ToastrService,
    private store: Store<{ stationEditData: any }>,
    private router: Router,
    private route: ActivatedRoute,
    private userStationService: UserStationService,
    private commentService: CommentService
  ) {}

  // ngOnInit(): void {
  //   this.route.params.subscribe((params) => {
  //     this.stationId = params['id'];

  //     // Burada userId'yi kullanabilirsiniz
  //     console.log('StationID from route parameters:', this.stationId);

  //     this.stationService.getStationById(this.stationId).subscribe(
  //       (station: Station) => {
  //         this.station = station;
  //         // You can perform additional actions with the station data here if needed
  //         console.log('istasyon ismim', this.station.name);
  //       },
  //       (error) => {
  //         console.error('Error fetching station:', error);
  //         // Handle the error as needed
  //       }
  //     );
  //   });

  // }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.stationId = params['id'];

      console.log('StationID from route parameters:', this.stationId);

      this.getTotalUserCount(this.stationId);

      this.stationService.getStationById(this.stationId).subscribe(
        (station: Station) => {
          this.station = station;

          if (
            this.station &&
            this.station.stationModel?.stationsChargingUnits
          ) {
            this.chargingUnits = this.station.stationModel.stationsChargingUnits
              .map((unit) => unit?.chargingUnit?.name)
              .join(', ');
          }
          if (
            this.station &&
            this.station.stationModel?.stationsChargingUnits
          ) {
            this.connectorTypelist =
              this.station.stationModel.stationsChargingUnits
                .map((unit) => unit.chargingUnit?.connector?.type)
                .join(', ');
          }

          if (this.station.stationFacilities) {
            this.facilityList = this.station.stationFacilities.map(
              (unit) => unit.facility?.type
            );

            this.facilityList = this.facilityList.join(', ');
          }
        },
        (error) => {
          console.error('Error fetching station:', error);
        }
      );
    });
  }

  getTotalUserCount(stationId: string) {
    this.userStationService
      .getTotalUserCountForStation(this.stationId)
      .subscribe(
        (totalUserCount) => {
          this.stationUserCounts = totalUserCount;
          console.log('total kullanıcı sayısı', this.stationUserCounts);
        },
        (error) => {
          console.error(
            `Error getting total user count for Station ${stationId}:`,
            error
          );
        }
      );
  }

  getComments(stationId: any) {
    this.commentService.getComments(stationId).subscribe((data) => {
      this.comments = data;
    });
  }
  goBack(): void {
    window.history.back();
  }
}
