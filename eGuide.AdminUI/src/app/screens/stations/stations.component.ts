import { Component } from '@angular/core';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css'],
})
export class StationsComponent {
  switchStatus = false;

  constructor() {}

  toggleSwitch() {
    this.switchStatus = !this.switchStatus;
    console.log(this.switchStatus);
  }
}
