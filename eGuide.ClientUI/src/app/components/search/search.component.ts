import { Component, EventEmitter, Output } from '@angular/core';
import { StationService } from 'src/app/services/station.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  @Output() searchType = new EventEmitter<string>();
  constructor(private stationService: StationService) {}

  onOptionSelect(event: Event) {
    const selectedOption = (event.target as HTMLSelectElement).value;
    console.log(`Selected option in search: ${selectedOption}`);
    this.searchType.emit(selectedOption);
  }
}
