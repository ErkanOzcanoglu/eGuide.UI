import { Connector } from 'src/app/models/connector';
import { LastVisitedStations } from './../../models/last-visited-stations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Station } from 'src/app/models/station';
import { LastVisitedStationsService } from 'src/app/services/last-visited-stations.service';
import { StationService } from 'src/app/services/station.service';
import { ConnectorService } from 'src/app/services/connector.service';
import { FacilityService } from 'src/app/services/facility.service';
import { Facility } from 'src/app/models/facility';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchText = '';
  isClicked = false;
  isFilterClicked = false;
  isFilteredForLastStations = false;
  filteredStations: Station[] = [];
  stations: Station[] = [];
  connectors: Connector[] = [];
  facilities: Facility[] = [];
  lastVisitedStations: LastVisitedStations[] = [];
  lastVisitedStations2: LastVisitedStations[] = [];
  selectedFacilities: Facility[] = [];
  selectedConnector: Connector[] = [];
  filteredFacilityStations: Station[] = [];
  filteredConnectorStations: Station[] = [];

  @Output() searchTexts = new EventEmitter<string>();
  @Output() stationSelected = new EventEmitter<Station>();
  @Output() stationConnectorSelected = new EventEmitter<Station[]>();
  @Output() stationFacilitySelected = new EventEmitter<Station[]>();
  @Output() stationFilteredSelected = new EventEmitter<Station[]>();

  showConnectors = false;

  constructor(
    private stationService: StationService,
    private connectorService: ConnectorService,
    private lastVisitedStationsService: LastVisitedStationsService,
    private facilityService: FacilityService
  ) {}

  searchT(event: any) {
    this.searchTexts.emit(event.target.value);
  }

  ngOnInit(): void {
    this.getStations();
    this.getConnectors();
    this.getFacilities();
  }

  onClick() {
    this.isClicked = true;
  }

  aramaYap(text: string) {
    this.searchTexts.emit(text);
    // console.log(text, 'text in the search component');
  }

  closeSearch() {
    this.isClicked = false;
    this.isFilterClicked = false;
  }

  getStations() {
    this.stationService.getStations().subscribe((stations) => {
      this.stations = stations;
      this.showConnectors = false;
    });
  }

  getFacilities() {
    this.facilityService.getFacilities().subscribe((facilities) => {
      this.facilities = facilities;
    });
  }

  toggleConnectors() {
    this.showConnectors = !this.showConnectors;

    if (this.showConnectors) {
      this.getConnectors();
    }
  }

  getConnectors() {
    this.connectorService.getConnectors().subscribe((connectors) => {
      this.connectors = connectors;
    });
  }

  onSelectStation(station: Station) {
    this.searchText = station.name;
    this.isClicked = false;
    // console.log(this.searchText);
    this.stationSelected.emit(station);
  }

  onSelectFacility(facility: Facility) {
    console.log(this.selectedFacilities, 'girdim mi ki');
    const index = this.selectedFacilities.findIndex(
      (selected) => selected.type === facility.type
    );

    if (index !== -1) {
      this.selectedFacilities.splice(index, 1);
    } else {
      this.selectedFacilities.push(facility);
    }

    this.updateSearchText();

    if (this.filteredConnectorStations.length === 0) {
      this.filteredFacilityStations = this.stations.filter((station) =>
        this.selectedFacilities.every((selectedFacility) =>
          station.stationFacilities.some(
            (unit) => unit.facility?.type === selectedFacility.type
          )
        )
      );
    } else {
      this.filteredFacilityStations = this.filteredConnectorStations.filter(
        (filteredConnectorStations) =>
          this.selectedFacilities.every((selectedFacility) =>
            filteredConnectorStations.stationFacilities.some(
              (unit) => unit.facility?.type === selectedFacility.type
            )
          )
      );
    }

    this.stationFilteredSelected .emit(this.filteredFacilityStations);

    console.log('Seçilen Tesisler:', this.selectedFacilities);
    console.log(
      'Seçilen İstasyonlar (Facility):',
      this.filteredFacilityStations
    );
  }

  onSelectConnector(connector: Connector) {
    this.searchText = connector.type;
    this.isClicked = false;

    if (this.filteredFacilityStations.length === 0) {
      console.log(this.filteredFacilityStations, 'buraya girdim');
      // filteredFacilityStations henüz tanımlanmadıysa veya null ise
      this.filteredConnectorStations = this.stations.filter((station) =>
        station.stationModel?.stationsChargingUnits.some(
          (unit) => unit.chargingUnit?.connector?.type === connector.type
        )
      );
    } else {
      console.log('filteredFacilityStations:', this.filteredFacilityStations);
      console.log('asdşlasdaskdlasdkalsdk');
      // filteredFacilityStations tanımlıysa ve null değilse
      this.filteredConnectorStations = this.filteredFacilityStations.filter(
        (filteredFacilityStations) =>
          filteredFacilityStations.stationModel?.stationsChargingUnits.some(
            (unit) => unit.chargingUnit?.connector?.type === connector.type
          )
      );
    }

    // Filtrelenmiş istasyonları güncelle ve etkinlik yayınla
    this.stationFilteredSelected.emit(this.filteredConnectorStations);
    console.log('Seçilen Connector:', connector);
    console.log(
      'Seçilen İstasyonlar (Connector):',
      this.filteredConnectorStations
    );
  }

  updateSearchText() {
    const facilityTypes = this.selectedFacilities.map(
      (facility) => facility.type
    );

    const allSelectedTypes = [facilityTypes];
    this.searchText = allSelectedTypes.join(', ');
  }

  isSelectedFacility(facility: Facility): boolean {
    return this.selectedFacilities.some(
      (selected) => selected.type === facility.type
    );
  }

  isSelectedConnector(connector: Connector): boolean {
    return this.selectedConnector.some(
      (selected) => selected.type === connector.type
    );
  }

  openFilter() {
    this.isFilterClicked = !this.isFilterClicked;
    if (this.isFilteredForLastStations === false) this.getLastVisitedStations();
    this.isFilteredForLastStations = true;
  }

  getLastVisitedStations() {
    const userId = localStorage.getItem('authToken');
    if (userId) {
      this.lastVisitedStationsService
        .getLastVisitedStationsByUserId(userId)
        .subscribe((lastVisitedStations) => {
          if (lastVisitedStations.length > 0) {
            this.lastVisitedStations = lastVisitedStations;
            // console.log(this.lastVisitedStations, 'genel deneme');
            // console.log(this.lastVisitedStations[0].stationId, 'station id');
            // find station by station if for each last visited station
            this.lastVisitedStations.forEach((lastVisitedStation) => {
              this.stationService
                .getStationById(lastVisitedStation.stationId)
                .subscribe((station) => {
                  // console.log(station, 'station');
                  this.lastVisitedStations2.push({
                    id: lastVisitedStation.id,
                    createdTime: lastVisitedStation.createdTime,
                    userId: lastVisitedStation.userId,
                    stationId: lastVisitedStation.stationId,
                    station: station,
                  });
                });
              // console.log(this.lastVisitedStations2, 'last visited stations 2');
            });
          } else {
            // clear the last visited stations
            this.lastVisitedStations = [];
          }
        });
    }
  }

  removeLastVisitedStations(id: any) {
    this.lastVisitedStationsService
      .removeLastVisitedStation(id)
      .subscribe(() => {
        this.getLastVisitedStations();
        window.location.reload();
        // console.log('last visited station removed');
      });
  }
}
