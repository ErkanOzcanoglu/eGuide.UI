import { Component } from '@angular/core';

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

  setScreenType() {
    this.screenType = !this.screenType;
  }

  toggleSwitch() {
    this.switchStatus = !this.switchStatus;
  }

  onMapClick(event: any) {
    this.mapClickedData = event;
    console.log(this.mapClickedData, 'mapClickedData');
  }

  onFormSubmit(event: Point) {
    this.mapFormAddressData = event;
    console.log(this.mapFormAddressData, 'mapFormAddressData');
  }
}
