import { Connector } from 'src/app/models/connector';
import { LastVisitedStations } from './../../models/last-visited-stations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Station } from 'src/app/models/station';
import { LastVisitedStationsService } from 'src/app/services/last-visited-stations.service';
import { StationService } from 'src/app/services/station.service';
import { ConnectorService } from 'src/app/services/connector.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchText = '';
  isClicked = false;
  isFilterClicked = false;
  stations: Station[] = [];
  connectors:Connector[]=[];
  lastVisitedStations: LastVisitedStations[] = [];
  lastVisitedStations2: LastVisitedStations[] = [];
  @Output() searchTexts = new EventEmitter<string>();
  @Output() stationSelected = new EventEmitter<Station>();
  @Output() connectorSelected = new EventEmitter<Connector>();

  showConnectors= false;


  constructor(
    private stationService: StationService,
    private connectorService:ConnectorService,
    private lastVisitedStationsService: LastVisitedStationsService
  ) {}

  searchT(event: any) {
    this.searchTexts.emit(event.target.value);
  }

  ngOnInit(): void {
    this.getStations();
    this.getConnectors() ;
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
    this.isFilterClicked = false;
  }

  getStations() {
    this.stationService.getStations().subscribe((stations) => {
      this.stations = stations;
      console.log(this.stations);
      this.showConnectors = false;
    });
  }

  
  toggleConnectors() {
    this.showConnectors = !this.showConnectors;
    
    if (this.showConnectors) {
      this.getConnectors();
    }
  }

  getConnectors() {
    this.connectorService. getConnectors().subscribe((connectors) => {
      this.connectors = connectors;
    });
  }

  onSelectStation(station: Station) {
    this.searchText = station.name;
    this.isClicked = false;
    console.log(this.searchText);
    this.stationSelected.emit(station);
  }
  //`${station.name} ${station.stationModel?.stationsChargingUnits[0].chargingUnit?.type}`;
  onSelectConnector(connector: Connector) {
    this.searchText = connector.type;
    this.isClicked = false;
    console.log(this.searchText);
    this.connectorSelected.emit(connector);
    console.log('Seçilen Connector:', connector);
  }

  openFilter() {
    this.isFilterClicked = !this.isFilterClicked;
    this.getLastVisitedStations();
    console.log(this.isFilterClicked);
  }

  getLastVisitedStations() {
    const userId = localStorage.getItem('authToken');
    if (userId) {
      this.lastVisitedStationsService
        .getLastVisitedStationsByUserId(userId)
        .subscribe((lastVisitedStations) => {
          if (lastVisitedStations.length > 0) {
            this.lastVisitedStations = lastVisitedStations;
            console.log(this.lastVisitedStations, 'genel deneme');
            console.log(this.lastVisitedStations[0].stationId, 'station id');
            // find station by station if for each last visited station
            this.lastVisitedStations.forEach((lastVisitedStation) => {
              this.stationService
                .getStationById(lastVisitedStation.stationId)
                .subscribe((station) => {
                  console.log(station, 'station');
                  this.lastVisitedStations2.push({
                    id: lastVisitedStation.id,
                    createdTime: lastVisitedStation.createdTime,
                    userId: lastVisitedStation.userId,
                    stationId: lastVisitedStation.stationId,
                    station: station,
                  });
                });
              console.log(this.lastVisitedStations2, 'last visited stations 2');
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
        console.log('last visited station removed');
      });
  }
}
