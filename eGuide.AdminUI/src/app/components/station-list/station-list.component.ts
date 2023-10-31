import { Socket } from 'src/app/models/socket';
import { Model } from 'src/app/models/stationInformationModel';
import { StationService } from '../../services/station.service';
import { Station } from './../../models/station';
import { Component, OnInit } from '@angular/core';
import { ConnectorService } from 'src/app/services/connector.service';
import { SocketService } from 'src/app/services/socket.service';
import { StationSocketService } from 'src/app/services/station-socket.service';

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
  displayedColumns: string[] = [
    'name',
    'longitude',
    'latitude',
    'altitude',
    'actions',
  ];

  constructor(
    private stationService: StationService,
    private socketService: SocketService,
    private stationSocketService: StationSocketService
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
}
