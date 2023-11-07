import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-station-information-modal',
  templateUrl: './station-information-modal.component.html',
  styleUrls: ['./station-information-modal.component.css'],
})
export class StationInformationModalComponent {
  @Input() editedData: any;
}
