import { StationFilterPipe } from './../../../pipes/station-filter.pipe';
import { Model } from 'src/app/models/stationInformationModel';
import { Component, OnInit } from '@angular/core';
import { StationSocketService } from 'src/app/services/station-socket.service';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { setStationEditData } from 'src/app/state/station-edit-data/station-edit-data.action';
import { StationService } from 'src/app/services/station.service';
import { Station } from 'src/app/models/station';
import { ChargingUnitService } from 'src/app/services/charging-unit.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.css'],
})
export class StationListComponent implements OnInit {
  models: Model[] = [];
  socket = '';
  socketArray: any;
  stations: Station[] = [];
  stationInfo: any;
  showList: any;
  selectedItem: any;
  searchText = '';

  toggleList() {
    this.showList = !this.showList;
  }

  selectItem(socketItem: any) {
    this.selectedItem = socketItem.socketName;
    this.showList = false;
  }

  constructor(
    private stationService: StationService,
    private chargingUnitService: ChargingUnitService,
    private stationSocketService: StationSocketService,
    private toastr: ToastrService,
    private store: Store<{ stationEditData: any }>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getStations();
    this.getStaInfo();
  }

  getStaInfo() {
    this.stationService.getStations().subscribe({
      next: (stations) => {
        this.stations = stations;
      },
    });
  }

  getStations(): void {
    this.stationService.getAllStaiton().subscribe(
      (res) => {
        this.models = res;

        this.models.forEach((item) => {
          if (typeof item.socket === 'string') {
            item.socket = JSON.parse(item.socket);
          }
        });
        this.stationService.getStations().subscribe({
          next: (stations) => {
            this.stations = stations;
            this.chargingUnitService.getChargingUnits().subscribe({
              error: (err) => console.error(err),
            });
          },
        });
      },
      (err) => console.error(err)
    );
  }

  deleteStation(id: string): void {
    this.stationService.deleteStation(id).subscribe({
      next: () => {
        this.toastr.success('Deleted successfully');
        this.getStations();
      },
      error: (err) => this.toastr.error(err, 'Error'),
    });
  }

  editStation(model: Station): void {
    this.store.dispatch(setStationEditData({ stationEditData: model }));
  }

  viewStationDetails(stationId: any) {
    console.log('VIEW KULLANICI', stationId);
    this.router.navigate(['/station-profile', stationId]);
  }
}
