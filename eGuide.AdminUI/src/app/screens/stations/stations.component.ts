import { Component } from '@angular/core';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css'],
})
export class StationsComponent {
  switchStatus = false;
  screenType = true;

  setScreenType() {
    this.screenType = !this.screenType;
  }

  toggleSwitch() {
    this.switchStatus = !this.switchStatus;
  }
  mapClickedData: any;

  onMapClick(event: any) {
    this.mapClickedData = event;
  }
}
