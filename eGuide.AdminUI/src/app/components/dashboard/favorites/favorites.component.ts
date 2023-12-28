import { Component, OnInit } from '@angular/core';
import { Station } from 'src/app/models/station';
import { StationService } from 'src/app/services/station.service';
import { UserStationService } from 'src/app/services/user-station.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  stations: Station[] = [];
  stationIds: string[] = [];
  stationNames: string[] = [];
  stationUserCounts: number[] = [];

  constructor(
    private userStationService: UserStationService,
    private stationService: StationService
  ) {}

  ngOnInit(): void {
    this.getStations();
  }

  getStations() {
    this.stationService.getStations().subscribe(
      (data) => {
        this.stations = data;
        this.stationIds = data.map((station) => station.id);
        this.stationNames = data.map((station) => station.name);

        // Get total user count for each station
        this.stationIds.forEach((stationId) => {
          this.getTotalUserCount(stationId);
        });
      },
      (error) => {
        console.error('Error getting stations:', error);
      }
    );
  }

  getTotalUserCount(stationId: string) {
    this.userStationService.getTotalUserCountForStation(stationId).subscribe(
      (totalUserCount) => {
        this.stationUserCounts.push(totalUserCount);
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
