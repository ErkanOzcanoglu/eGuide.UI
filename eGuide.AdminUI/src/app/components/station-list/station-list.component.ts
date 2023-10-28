import { Socket } from './../../models/socket';
import { Model } from 'src/app/models/model';
import { StationService } from '../../services/station.service';
import { Station } from './../../models/station';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.css'],
})
export class StationListComponent implements OnInit {
  stations: Station[] = [];
  public statiobns: any;
  asd: JSON = JSON;
  models: Model[] = [];
  // json olan bir değişken tanımla
  myModel = new Model();
  socket = '';
  socketa = '';

  constructor(private stationService: StationService) {}

  ngOnInit(): void {
    this.getStations();
  }

  getStations(): void {
    this.stationService.getAllStaiton().subscribe((res) => {
      this.models = res;

      // this.models.forEach((item) => {
      //   const asd = JSON.parse(item.socket[0]);
      //   if (Array.isArray(socketArray) && socketArray.length > 0) {
      //     const voltageValues = socketArray[0].VoltageValues;
      //     console.log(voltageValues);
      //   }
      // });
     
    });
  }
}
