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
  station: Station = new Station();
  stations: Station[] = [];
  comments: Comment[] = [];

  searchText?: string;

  stationId!: string;
  stationUserCounts?: number;
  socket?: string;

  chargingUnits: string[] = [];
  connectorTypelist: string[] = [];
  facilityList: string[] = [];

  constructor(
    private stationService: StationService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private userStationService: UserStationService,
    private commentService: CommentService
  ) {}

  // ngOnInit(): void {
  //   this.route.params.subscribe((params) => {
  //     this.stationId = params['id'];

  //     console.log('StationID from route parameters:', this.stationId);

  //     this.getTotalUserCount(this.stationId);

  //     this.stationService.getStationById(this.stationId).subscribe(
  //       (station: Station) => {
  //         this.station = station;

  //         if (
  //           this.station &&
  //           this.station.stationModel?.stationsChargingUnits
  //         ) {
  //           this.chargingUnits = this.station.stationModel.stationsChargingUnits
  //             .map((unit) => unit?.chargingUnit?.name)
  //             .join(', ');
  //         }
  //         if (
  //           this.station &&
  //           this.station.stationModel?.stationsChargingUnits
  //         ) {
  //           this.connectorTypelist =
  //             this.station.stationModel.stationsChargingUnits
  //               .map((unit) => unit.chargingUnit?.connector?.type)
  //               .join(', ');
  //         }

  //         if (this.station.stationFacilities) {
  //           this.facilityList = this.station.stationFacilities.map(
  //             (unit) => unit.facility?.type
  //           );

  //           this.facilityList = this.facilityList.join(', ');
  //         }
  //       },
  //       (error) => {
  //         console.error('Error fetching station:', error);
  //       }
  //     );
  //   });
  // }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.stationId = params['id'];
      console.log('StationID from route parameters:', this.stationId);
      this.getTotalUserCount(this.stationId);
      this.fetchStationData();
    });
  }

  private fetchStationData(): void {
    this.stationService.getStationById(this.stationId).subscribe(
      (station: Station) => {
        this.station = station;
        this.processChargingUnits();
        this.processConnectorTypes();
        this.processFacilities();
      },
      (error) => {
        console.error('Error fetching station:', error);
      }
    );
  }

  private processChargingUnits(): void {
    if (this.station && this.station.stationModel?.stationsChargingUnits) {
      this.chargingUnits = this.chargingUnits =
        this.station.stationModel.stationsChargingUnits
          .map((unit) => unit?.chargingUnit?.name)
          .filter(Boolean) as string[];
    }
  }

  private processConnectorTypes(): void {
    if (this.station && this.station.stationModel?.stationsChargingUnits) {
      this.connectorTypelist = this.connectorTypelist =
        this.station.stationModel.stationsChargingUnits
          .map((unit) => unit.chargingUnit?.connector?.type)
          .filter(Boolean) as string[];

      console.log(this.connectorTypelist);
    }
  }

  private processFacilities(): void {
    if (this.station.stationFacilities) {
      this.facilityList = this.station.stationFacilities
        .map((unit) => unit.facility?.type)
        .filter(Boolean) as string[];
    }
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
