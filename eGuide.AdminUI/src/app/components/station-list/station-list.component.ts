import { StationService } from 'src/app/services/station.service';
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
    this.stationSocketService.getAllStationInformation().subscribe({
      next: (stations) => {
        console.log(stations);
        this.stationInfo = stations;
      },
    });
  }

  getStations(): void {
    this.stationService.getStations().subscribe({
      next: (stations) => {
        this.stations = stations;
        this.socketService.getSockets().subscribe({
          error: (err) => console.error(err),
        });
      },
    });
  }
}
