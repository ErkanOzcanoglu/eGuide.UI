import { StationService } from 'src/app/services/station.service';
import { Station } from './../../models/station';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.css'],
})
export class StationListComponent implements OnInit {
  stations: Station[] = [];

  constructor(private stationService: StationService) {}

  ngOnInit(): void {
    this.getStations();
  }

  getStations(): void {
    this.stationService.getStations().subscribe((stations) => {
      this.stations = stations;
    });
  }
}
