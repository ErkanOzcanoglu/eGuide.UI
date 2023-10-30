import { Socket } from 'src/app/models/socket';
import { Model } from 'src/app/models/stationInformationModel';
import { StationService } from '../../services/station.service';
import { Station } from './../../models/station';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.css'],
})
export class StationListComponent implements OnInit {
  models: Model[] = [];
  socket = '';
  socketArray: any;

  constructor(private stationService: StationService) {}

  ngOnInit(): void {
    this.getStations();
  }

  getStations(): void {
    this.stationService.getAllStaiton().subscribe((res) => {
      this.models = res;

      this.models.forEach((item) => {
        // If item.socket is a string, convert it to JSON data.
        if (typeof item.socket === 'string') {
          item.socket = JSON.parse(item.socket);
          console.log(item);
        }
      });
    });
  }
}
