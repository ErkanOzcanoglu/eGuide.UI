import { Connector } from 'src/app/models/connector';
import { LastVisitedStations } from './../../models/last-visited-stations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Station } from 'src/app/models/station';
import { LastVisitedStationsService } from 'src/app/services/last-visited-stations.service';
import { StationService } from 'src/app/services/station.service';
import { ConnectorService } from 'src/app/services/connector.service';
import { FacilityService } from 'src/app/services/facility.service';
import { Facility } from 'src/app/models/facility';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Vehicle } from 'src/app/models/vehicle';
import { UserVehicleService } from 'src/app/services/user-vehicle.service';
import { UserVehicle } from 'src/app/models/user-vehicle';
import { Store } from '@ngrx/store';
import * as VehicleActions from 'src/app/state/vehicle-state/vehicle.actions';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { selectLanguage } from 'src/app/state/language-state/language.selector';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [
    trigger('slideDown', [
      state('void', style({ height: '0', opacity: 0 })),
      transition(':enter, :leave', [animate('0.3s ease-in-out')]),
    ]),
  ],
})
export class SearchComponent implements OnInit {
  vehicleState: Vehicle = new Vehicle();
  userVehicleActive: UserVehicle = new UserVehicle();
  vehicleNgrX = new Vehicle();

  searchText!: string;
  selectedLanguage!: string;
  language$: Observable<string>;

  isClicked = false;
  isFilterClicked = false;
  isFilteredForLastStations = false;
  isFilterEnabled = false;
  showConnectors = false;

  filteredStations: Station[] = [];
  stations: Station[] = [];
  connectors: Connector[] = [];
  facilities: Facility[] = [];
  vehicles: Vehicle[] = [];
  lastVisitedStations: LastVisitedStations[] = [];
  lastVisitedStations2: LastVisitedStations[] = [];
  selectedFacilities: Facility[] = [];
  selectedConnector: Connector[] = [];
  selectedVehicle: Vehicle = new Vehicle();
  filteredFacilityStations: Station[] = [];
  filteredConnectorStations: Station[] = [];

  @Output() searchTexts = new EventEmitter<string>();
  @Output() stationSelected = new EventEmitter<Station>();
  @Output() stationConnectorSelected = new EventEmitter<Station[]>();
  @Output() stationFacilitySelected = new EventEmitter<Station[]>();
  @Output() stationFilteredSelected = new EventEmitter<Station[]>();

  constructor(
    private stationService: StationService,
    private connectorService: ConnectorService,
    private lastVisitedStationsService: LastVisitedStationsService,
    private facilityService: FacilityService,
    private userVehicleService: UserVehicleService,
    private store: Store,
    public translateService: TranslateService
  ) {
    this.language$ = this.store.select(selectLanguage);
  }

  searchT(event: any) {
    this.searchTexts.emit(event.target.value);
  }

  ngOnInit(): void {
    this.getStations();
    this.getConnectors();
    this.getFacilities();
    this.getVehicles();
    this.getVehicleActiveView();

    this.language$.subscribe((currentState) => {
      this.selectedLanguage = currentState;
      console.log('deneme ngrx', this.selectedLanguage);
    });
  }

  public onChange(): void {
    this.translateService.use(this.selectedLanguage);
    console.log('navbarden searche geldi', this.selectedLanguage);
  }

  onClick() {
    this.isClicked = true;
  }

  searchByAddress(text: string) {
    if (this.isClicked) {
      this.isClicked = false;
    } else {
      this.isClicked = true;
    }
    this.searchTexts.emit(text);
  }

  closeSearch() {
    this.isClicked = false;
    this.isFilterClicked = false;
    this.isFilterEnabled = false;
  }

  getVehicles() {
    const userId = localStorage.getItem('authToken');
    if (userId !== null) {
      this.userVehicleService.getvehicleById(userId).subscribe(
        (data) => {
          this.vehicles = data;
          this.vehicles.map((vehicle) => {
            return `${vehicle.brand}-${vehicle.model}`;
          });
        },
        (error) => {
          console.error('Araç bilgileri alma hatası:', error);
        }
      );
    }
  }

  getVehicleActiveView(): void {
    const userId = localStorage.getItem('authToken');
    if (userId != null) {
      this.userVehicleService.getUserVehicleWithActiveStatus(userId).subscribe(
        (uservehicle) => {
          this.userVehicleActive = uservehicle;

          const matchingVehicle = this.vehicles.find(
            (vehicle) => vehicle.id === this.userVehicleActive.vehicleId
          );
          if (matchingVehicle != null) this.vehicleState = matchingVehicle;

          if (matchingVehicle) {
            this.getVehicles();
          }
        },
        (error) => {
          console.error('Error fetching active user vehicle:', error);
        }
      );
    }
  }

  setActiveVehicle(activeVehicle: Vehicle): void {
    this.store.dispatch(VehicleActions.setActiveVehicle({ activeVehicle }));
  }
  onSelectVehicle(vehicle: Vehicle) {
    const userId = localStorage.getItem('authToken');

    if (vehicle.id != null && userId != null) {
      this.userVehicleService
        .updateVehicleActiveStatus(userId, vehicle.id) //THIS METHOD RETURNS VEHICLE FOR RESPONSE
        .subscribe(
          (response) => {
            this.vehicleNgrX = response;
            this.setActiveVehicle(this.vehicleNgrX);
            this.getVehicleActiveView();
          },
          (error) => {
            console.error('Update error:', error);
          }
        );
    }
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
    this.stationSelected.emit(station);
  }

  refreshFilter() {
    console.log('Refreshten sonraki istasyonlar', this.stations);
    this.stationFilteredSelected.emit(this.stations);
  }

  onSelectFacility(facility: Facility) {
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

    this.stationFilteredSelected.emit(this.filteredFacilityStations);

    console.log('Seçilen Tesisler:', this.selectedFacilities);
    console.log(
      'Seçilen İstasyonlar (Facility):',
      this.filteredFacilityStations
    );

    this.stationFilteredSelected.emit(this.filteredFacilityStations);
  }

  toggleFilter() {
    if (this.isFilterEnabled) {
      this.filteredConnectorStations = this.stations.filter((station) =>
        station.stationModel?.stationsChargingUnits.some(
          (unit) =>
            unit.chargingUnit?.connector?.id ===
            this.userVehicleActive.connectorId
        )
      );
      console.log('gitmesi gereken istasyon', this.filteredConnectorStations);
      this.stationFilteredSelected.emit(this.filteredConnectorStations);
      return;
    }
  }

  onSelectConnector(connector: Connector) {
    this.searchText = connector.type;
    this.isClicked = false;

    if (this.isFilterEnabled) {
      return;
    }

    if (this.filteredFacilityStations.length === 0) {
      this.filteredConnectorStations = this.stations.filter((station) =>
        station.stationModel?.stationsChargingUnits.some(
          (unit) => unit.chargingUnit?.connector?.id === connector.id
        )
      );
    } else {
      console.log('filteredFacilityStations:', this.filteredFacilityStations);
      this.filteredConnectorStations = this.filteredFacilityStations.filter(
        (filteredFacilityStations) =>
          filteredFacilityStations.stationModel?.stationsChargingUnits.some(
            (unit) => unit.chargingUnit?.connector?.type === connector.type
          )
      );
    }

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
            this.lastVisitedStations.forEach((lastVisitedStation) => {
              this.stationService
                .getStationById(lastVisitedStation.stationId)
                .subscribe((station) => {
                  this.lastVisitedStations2.push({
                    id: lastVisitedStation.id,
                    createdTime: lastVisitedStation.createdTime,
                    userId: lastVisitedStation.userId,
                    stationId: lastVisitedStation.stationId,
                    station: station,
                  });
                });
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
