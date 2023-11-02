import { Socket } from 'src/app/models/socket';
import { Model } from 'src/app/models/stationInformationModel';
import { StationService } from '../../services/station.service';
import { Station } from './../../models/station';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConnectorService } from 'src/app/services/connector.service';
import { SocketService } from 'src/app/services/socket.service';
import { StationSocketService } from 'src/app/services/station-socket.service';
// improt toast
import { ToastrService } from 'ngx-toastr';

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
    console.log(this.showList);
  }

  selectItem(socketItem: any) {
    this.selectedItem = socketItem.socketName;
    this.showList = false;
  }
  constructor(
    private stationService: StationService,
    private socketService: SocketService,
    private stationSocketService: StationSocketService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getStations();
    this.getStaInfo();
  }

  getStaInfo() {
    this.stationService.getAllStaiton().subscribe({
      next: (stations) => {
        console.log(stations);
        this.stationInfo = stations;
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
            console.log(item.stationName, 'asdsad');
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
    console.log(id);
  }

  editStation(id: string): void {
    console.log(id);
  }

  sendEditData(id: string): void {
    console.log(id);
  }
}
