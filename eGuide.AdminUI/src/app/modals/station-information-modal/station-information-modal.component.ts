import { Component, Input } from '@angular/core';
import { Station } from 'src/app/models/station';

@Component({
  selector: 'app-station-information-modal',
  templateUrl: './station-information-modal.component.html',
  styleUrls: ['./station-information-modal.component.css'],
})
export class StationInformationModalComponent {
  @Input() editedData?: Station;
}
