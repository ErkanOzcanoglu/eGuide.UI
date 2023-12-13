import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Station } from 'src/app/models/station';
import { Model } from 'src/app/models/stationInformationModel';
import { ChargingUnitService } from 'src/app/services/charging-unit.service';
import { StationSocketService } from 'src/app/services/station-socket.service';
import { StationService } from 'src/app/services/station.service';
import { UserStationService } from 'src/app/services/user-station.service';
import { setStationEditData } from 'src/app/state/station-edit-data/station-edit-data.action';

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

  constructor(
    private stationService: StationService,
    private chargingUnitService: ChargingUnitService,
    private stationSocketService: StationSocketService,
    private toastr: ToastrService,
    private store: Store<{ stationEditData: any }>,
    private router: Router,
    private route: ActivatedRoute,
    private userStationService: UserStationService
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
          console.log('istasyon ismim', this.station);
          console.log('sssss', this.station.stationModel?.name);
          // stationsChargingUnits array'ini bastır

          if (
            this.station &&
            this.station.stationModel?.stationsChargingUnits
          ) {
            this.chargingUnits = this.station.stationModel.stationsChargingUnits
              .map((unit) => unit?.chargingUnit?.name)
              .join(', ');

            console.log('Charging Units:', this.chargingUnits);
          }
          if (
            this.station &&
            this.station.stationModel?.stationsChargingUnits
          ) {
            this.connectorTypelist =
              this.station.stationModel.stationsChargingUnits
                .map((unit) => unit.chargingUnit?.connector?.type)
                .join(', ');

            console.log('Connector Types:', this.connectorTypelist);
          }

          console.log(this.station.stationFacilities);

          if (this.station.stationFacilities) {
            this.facilityList = this.station.stationFacilities.map(
              (unit) => unit.facility?.type
            );
            console.log('hizmetler', this.facilityList);
            this.facilityList = this.facilityList.join(', ');
            // console.log(this.station.stationFacilities[0].type);
          }
        },
        (error) => {
          console.error('Error fetching station:', error);
        }
      );
    });
  }
  stationUserCounts: number[] = [];

  getTotalUserCount(stationId: string) {
    this.userStationService
      .getTotalUserCountForStation(this.stationId)
      .subscribe(
        (totalUserCount) => {
          this.stationUserCounts.push(totalUserCount);
          console.log('aaaaaa', this.stationUserCounts);
        },
        (error) => {
          console.error(
            `Error getting total user count for Station ${stationId}:`,
            error
          );
          this.stationUserCounts.push(-1);
        }
      );
  }
}
