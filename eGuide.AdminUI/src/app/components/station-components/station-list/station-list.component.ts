import { Model } from 'src/app/models/stationInformationModel';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { StationSocketService } from 'src/app/services/station-socket.service';
// improt toast
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { setStationEditData } from 'src/app/state/station-edit-data/station-edit-data.action';
import { StationService } from 'src/app/services/station.service';
import { Station } from 'src/app/models/station';

@Component({
  selector: 'app-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.css'],
})
export class StationListComponent implements OnInit {
  @Output() editData = new EventEmitter<any>();
  models: Model[] = [];
  socket = '';
  socketArray: any;
  stations: Station[] = [];
  stationInfo: any;
  showList: any;
  selectedItem: any;

  toggleList() {
    this.showList = !this.showList;
  }

  selectItem(socketItem: any) {
    this.selectedItem = socketItem.socketName;
    this.showList = false;
  }

  constructor(
    private stationService: StationService,
    private socketService: SocketService,
    private stationSocketService: StationSocketService,
    private toastr: ToastrService,
    private store: Store<{ stationEditData: any }>
  ) {}

  ngOnInit(): void {
    this.getStations();
    this.getStaInfo();
  }

  getStaInfo() {
    this.stationService.getStations().subscribe({
      next: (stations) => {
        stations;
        this.stations = stations;
      },
    });
  }

  getStations(): void {
    this.stationService.getAllStaiton().subscribe(
      (res) => {
        this.models = res;

        this.models.forEach((item) => {
          // If item.socket is a string, convert it to JSON data.
          if (typeof item.socket === 'string') {
            item.socket = JSON.parse(item.socket);
          }
        });
        this.stationService.getStations().subscribe({
          next: (stations) => {
            this.stations = stations;
            this.socketService.getSockets().subscribe({
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
}