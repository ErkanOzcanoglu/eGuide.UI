import { Component, OnInit, VERSION } from '@angular/core';
import { UserVehicle } from 'src/app/models/user-vehicle';
import { Vehicle } from 'src/app/models/vehicle';
import { UserVehicleService } from 'src/app/services/user-vehicle.service';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { ChangeDetectorRef } from '@angular/core';
import { Connector } from 'src/app/models/connector';
import { ConnectorService } from 'src/app/services/connector.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import * as VehicleActions from 'src/app/state/vehicle-state/vehicle.actions';
import { TranslateService } from '@ngx-translate/core';
import { LogHelper } from '../../generic-helper/log/log-helper';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css'],
  providers: [LogHelper],
})
export class VehicleComponent implements OnInit {
  vehicle: Vehicle = new Vehicle();
  uservehicle: UserVehicle = new UserVehicle();
  userVehicleActive: UserVehicle = new UserVehicle();
  vehicleState: Vehicle = new Vehicle();
  vehicleNgrX = new Vehicle();

  selectedBrand?: string;
  selectedModel!: string;
  selectedConnector: any;
  primaryKey?: string;

  selectedConnectorId?: string;
  selectedConnectorType?: string;

  onSelectVehicle = false;
  editModeVehicle = false;
  dropdownVisible = false;
  isUpdate = true;

  vehicleList: Vehicle[] = [];
  brands: string[] = [];
  models: string[] = [];
  vehicles: Vehicle[] = [];
  connectorList: Connector[] = [];

  constructor(
    private userVehicleService: UserVehicleService,
    private vehicleService: VehiclesService,
    private connectorService: ConnectorService,
    private sanitizer: DomSanitizer,
    private store: Store,
    private logHelper: LogHelper,
    public translateService: TranslateService
  ) {
    this.translateService.addLangs(['tr', 'en']);
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
  }

  ngOnInit(): void {
    this.getBrands();
    this.getVehicleByUserId();
    this.getConnector();
    this.getVehicleActiveView();
  }

  public onChange(selectedLanguage: string): void {
    this.translateService.use(selectedLanguage);
  }

  onModeChangeVehicle() {
    this.editModeVehicle = !this.editModeVehicle;
  }

  cancelVehicleEdit() {
    this.editModeVehicle = false;
  }

  getBrands() {
    this.vehicleService.getAllBrands().subscribe((data) => {
      this.brands = data;
    });
  }

  getConnector() {
    this.connectorService.getConnectors().subscribe((connectors) => {
      this.connectorList = connectors;
    });
  }

  onConnectorSelected(connector: any) {
    this.selectedConnector = connector;
    localStorage.setItem('connectorId', this.selectedConnector.id);
    this.dropdownVisible = false;
    this.toggleDropdown();
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  onBrandSelected(event: any) {
    const selectedBrand = event.target.value;
    this.loadModelsByBrand(selectedBrand);
    localStorage.setItem('brand', selectedBrand);
  }

  selectVehicle(selectedVehicle: any) {
    localStorage.setItem('brand', selectedVehicle.brand);
    this.onCarSelected(selectedVehicle.brand, selectedVehicle.connector);

    this.selectedBrand = selectedVehicle.brand;
    this.selectedModel = selectedVehicle.model;
    this.selectedConnector = selectedVehicle.connector;

    if (this.selectedBrand && this.selectedModel) {
      this.updatePrimaryKey(this.selectedBrand, this.selectedModel);
    } else {
      this.primaryKey = 'xxx';
    }
  }

  onCarSelected(brand: string, connector: string) {
    const selectedBrand = brand;
    this.selectedConnector = connector;
    this.loadModelsByBrand(selectedBrand);
    this.getConnector();
    localStorage.setItem('brand', selectedBrand);
  }

  onModelSelected(event: any) {
    this.selectedModel = event.target.value;
    const selectedBrand = localStorage.getItem('brand');
    if (selectedBrand != null)
      this.updatePrimaryKey(selectedBrand, this.selectedModel);
  }

  onKeyDown(event: KeyboardEvent, vehicle: Vehicle) {
    if (event.key === 'Enter') {
      this.selectVehicle(vehicle);
    }
  }

  loadModelsByBrand(selectedBrand: string) {
    if (selectedBrand && selectedBrand !== 'default') {
      this.vehicleService.getModelsByBrand(selectedBrand).subscribe(
        (models) => {
          this.models = models;
        },
        (error) => {
          this.logHelper.errorProcess('Get models by brand', error);
          console.error('Modelleri alma hatası:', error);
        }
      );
    }
  }

  updatePrimaryKey(selectedBrand: string, selectedModel: string) {
    if (selectedBrand && selectedModel) {
      this.vehicleService
        .getPrimaryKeyByBrandAndModel(selectedBrand, selectedModel)
        .subscribe(
          (primaryKey) => {
            this.primaryKey = primaryKey;
            localStorage.setItem('vehicleId', primaryKey);
          },
          (error) => {
            this.logHelper.errorProcess(
              'Get primary key by brand and model',
              error
            );
            console.error('Anahtar alma hatası:', error);
          }
        );
    } else {
      this.primaryKey = 'xxx';
    }
  }

  addVehicle(): void {
    const userId = localStorage.getItem('authToken');
    const vehicleId = localStorage.getItem('vehicleId');
    const connectorId = localStorage.getItem('connectorId');

    if (userId !== null && vehicleId !== null && connectorId !== null) {
      const userVehicle: UserVehicle = {
        userId: userId,
        vehicleId: vehicleId,
        connectorId: connectorId,
        activeStatus: 0, //buraya dikkat cnm
      };

      this.userVehicleService.saveVehicle(userVehicle).subscribe(
        (response) => {
          this.getVehicleByUserId();
        },
        (error) => {
          this.logHelper.errorProcess('Save vehicle', error);
          console.error('UserVehicle kaydetme hatası:', error);
        }
      );
    } else {
      console.error('Kullanıcı kimliği veya araç kimliği eksik.');
    }
  }

  getVehicleByUserId() {
    const userId = localStorage.getItem('authToken');
    if (userId !== null) {
      this.userVehicleService.getvehicleById(userId).subscribe(
        (data) => {
          this.vehicleList = data;

          const combinedVehicles = this.vehicleList.map((vehicle) => {
            return `${vehicle.brand}-${vehicle.model}`;
          });
        },
        (error) => {
          console.error('Araç bilgileri alma hatası:', error);
        }
      );
    }
  }
  updateVehicle() {
    const vehicleId = localStorage.getItem('vehicleId');
    const oldId = vehicleId;

    if (oldId != null) {
      localStorage.setItem('oldId', oldId);
    }
    this.isUpdate = false;
  }

  deleteVehicle() {
    const vehicleId = localStorage.getItem('vehicleId');
    const userId = localStorage.getItem('authToken');

    if (vehicleId !== null && userId !== null) {
      this.userVehicleService
        .deleteUserVehicleByVehicleId(userId, vehicleId)
        .subscribe(
          () => {
            this.getVehicleByUserId();
          },
          (error) => {
            console.error('Araç silme hatası:', error);
          }
        );
    } else {
      console.error('vehicleId eksik.');
    }
  }

  //<--NGRX METHODS FOR VEHICLE-->
  setActiveVehicle(activeVehicle: Vehicle): void {
    this.store.dispatch(VehicleActions.setActiveVehicle({ activeVehicle }));
  }

  updateVehicleActiveStatus() {
    const vehicleId = localStorage.getItem('vehicleId');
    const userId = localStorage.getItem('authToken');

    if (vehicleId != null && userId != null) {
      this.userVehicleService
        .updateVehicleActiveStatus(userId, vehicleId) //THIS METHOD RETURNS VEHICLE FOR RESPONSE
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

  getVehicleActiveView(): void {
    const userId = localStorage.getItem('authToken');
    if (userId != null) {
      this.userVehicleService.getUserVehicleWithActiveStatus(userId).subscribe(
        (uservehicle) => {
          this.userVehicleActive = uservehicle;

          const matchingVehicle = this.vehicleList.find(
            (vehicle) => vehicle.id === this.userVehicleActive.vehicleId
          );
          if (matchingVehicle != null) this.vehicleState = matchingVehicle;

          if (matchingVehicle) {
            this.getVehicleByUserId();
          } else {
            console.log('Error fetching active user vehicle.');
          }
        },
        (error) => {
          console.error('Error fetching active user vehicle:', error);
        }
      );
    }
  }

  saveUpdate() {
    const userId = localStorage.getItem('authToken');
    const vehicleId = localStorage.getItem('vehicleId');
    const oldId = localStorage.getItem('oldId');
    const connectorId = localStorage.getItem('connectorId');

    if (
      vehicleId != null &&
      oldId !== null &&
      userId != null &&
      connectorId != null
    ) {
      this.userVehicleService
        .updateVehicle(userId, oldId, vehicleId, connectorId)
        .subscribe(
          (response) => {
            this.getVehicleByUserId();
          },
          (error) => {
            console.error('Araç güncelleme hatası:', error);
          }
        );
    }

    this.isUpdate = true;
    localStorage.removeItem('vehicleId');
    localStorage.removeItem('oldId');
  }

  onDropdownKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.toggleDropdown();
    }
  }
}
