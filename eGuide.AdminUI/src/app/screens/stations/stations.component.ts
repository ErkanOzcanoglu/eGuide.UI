import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectStationEditData } from 'src/app/state/station-edit-data/station-edit-data.selector';

interface Point {
  lat: number;
  lng: number;
}
@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css'],
})
export class StationsComponent {
  switchStatus = false;
  screenType = true;
  mapClickedData: any;
  mapFormAddressData: any;
  selectStationEditData$ = this.store.select(selectStationEditData);

  editData: any;

  constructor(private store: Store) {
    this.selectStationEditData$.subscribe((stationEditData) => {
      if (stationEditData.stationEditData) {
        this.editData = stationEditData;
        this.screenType = false;
      }
    });
  }

  setScreenType() {
    this.screenType = !this.screenType;
  }

  toggleSwitch() {
    this.switchStatus = !this.switchStatus;
  }

  onMapClick(event: any) {
    this.mapClickedData = event;
  }

  onFormSubmit(event: Point) {
    this.mapFormAddressData = event;
  }
}
