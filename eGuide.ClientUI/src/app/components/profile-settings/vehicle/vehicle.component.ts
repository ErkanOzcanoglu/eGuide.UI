import { Component, OnInit } from '@angular/core';
import { UserVehicle } from 'src/app/models/user-vehicle';
import { Vehicle } from 'src/app/models/vehicle';
import { UserVehicleService } from 'src/app/services/user-vehicle.service';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { ChangeDetectorRef } from '@angular/core';
import { Connector } from 'src/app/models/connector';
import { ConnectorService } from 'src/app/services/connector.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css'],
})
export class VehicleComponent implements OnInit {
  vehicle: Vehicle = new Vehicle();
  vehicleList: Vehicle[] = [];
  uservehicle: UserVehicle = new UserVehicle();

  onSelectVehicle = false;

  brands: string[] = [];
  models: string[] = [];
  vehicles: Vehicle[] = [];

  selectedBrand = '';
  selectedModel = '';
  selectedConnector: any;
  primaryKey = '';

  connectorList: Connector[] = [];
  selectedConnectorId = '';
  selectedConnectorType = '';
  vehicleMode = false;
  vehicleMode2 = false;
  vehicleMode3 = false;

  editModeVehicle = false;
  isUpdate = true;

  constructor(
    private userVehicleService: UserVehicleService,
    private vehicleService: VehiclesService,
    private connectorService: ConnectorService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getBrands();
    this.getVehicleById();
    this.getConnector();
  }

  dropdownVisible = false;
  maxVisibleItems = 3;

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

  // onConnectorSelected(event: any) {
  //   const selectedConnectorId = event.target.value;
  //   this.selectedConnectorId = selectedConnectorId;
  //   localStorage.setItem('connectorId', selectedConnectorId);
  // }
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
    this.getConnector(); //buraya dikkat
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
      // yanlıs calısıyor
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
      };

      this.userVehicleService.saveVehicle(userVehicle).subscribe(
        (response) => {
          this.getVehicleById();
        },
        (error) => {
          console.error('UserVehicle kaydetme hatası:', error);
        }
      );
    } else {
      console.error('Kullanıcı kimliği veya araç kimliği eksik.');
    }
  }

  getVehicleById() {
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

  deleteVehicle() {
    const vehicleId = localStorage.getItem('vehicleId');
    const userId = localStorage.getItem('authToken');

    if (vehicleId !== null && userId !== null) {
      this.userVehicleService
        .deleteUserVehicleByVehicleId(userId, vehicleId)
        .subscribe(
          () => {
            this.getVehicleById();
          },
          (error) => {
            console.error('Araç silme hatası:', error);
          }
        );
    } else {
      console.error('vehicleId eksik.');
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
            this.getVehicleById();
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
