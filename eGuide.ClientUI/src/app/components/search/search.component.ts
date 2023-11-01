import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Station } from 'src/app/models/station';
import { StationService } from 'src/app/services/station.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchText = '';
  isClicked = false;
  stations: Station[] = [];
  @Output() searchTexts = new EventEmitter<string>();
  @Output() stationSelected = new EventEmitter<Station>();

  constructor(private stationService: StationService) {}

  searchT(event: any) {
    this.searchTexts.emit(event.target.value);
  }

  ngOnInit(): void {
    this.getStations();
  }
  onClick() {
    this.isClicked = true;
  }

  aramaYap(text: string) {
    this.searchTexts.emit(text);
    console.log(text, 'text in the search component');
  }

  closeSearch() {
    this.isClicked = false;
  }

  getStations() {
    this.stationService.getStations().subscribe((stations) => {
      this.stations = stations;
      console.log(this.stations);
    });
  }

  onSelect(station: Station) {
    this.searchText = station.name;
    this.isClicked = false;
    console.log(this.searchText);
    this.stationSelected.emit(station);
  }
}
