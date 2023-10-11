import { Component } from '@angular/core';

@Component({
  selector: 'app-station-form',
  templateUrl: './station-form.component.html',
  styleUrls: ['./station-form.component.css'],
})
export class StationFormComponent {
  switchStatus = false;

  constructor() {}

  toggleSwitch() {
    this.switchStatus = !this.switchStatus;
    console.log(this.switchStatus);
  }
}
