import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserVehicle } from 'src/app/models/user-vehicle';
import { Vehicle } from 'src/app/models/vehicle';
import { UserVehicleService } from 'src/app/services/user-vehicle.service';
import { VehiclesService } from 'src/app/services/vehicles.service';

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
  vehicles: string[] = [];

  selectedBrand = '';
  selectedModel = '';
  primaryKey = '';
  vehicleMode = false;
  vehicleMode2=false;

  editModeVehicle = false;

  constructor(
    private router: Router,
    private userVehicleService: UserVehicleService,
    private vehicleService: VehiclesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getBrands();
    this.getVehicleById();
  }

  onModeChangeVehicle() {
    this.editModeVehicle = !this.editModeVehicle;
  }

  getBrands() {
    this.vehicleService.getAllBrands().subscribe((data) => {
      this.brands = data;
      console.log(this.brands);
    });
  }

  onBrandSelected(event: any) {
    const selectedBrand = event.target.value;
    this.loadModelsByBrand(selectedBrand);
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
          console.log('Ait modeller:', models);
          this.models = models;
          this.selectedModel = 'default';
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

    if (userId !== null && vehicleId !== null) {
      const userVehicle: UserVehicle = {
        userId: userId,
        vehicleId: vehicleId,
      };

      this.userVehicleService.saveVehicle(userVehicle).subscribe(
        (response) => {
          console.log('UserVehicle başarıyla kaydedildi:', response);
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
          this.vehicles = data;
          this.vehicleList = data;

          const combinedVehicles = this.vehicleList.map((vehicle) => {
            return `${vehicle.brand}-${vehicle.model}`;
          });
          console.log(combinedVehicles);
        },
        (error) => {
          console.error('Araç bilgileri alma hatası:', error);
        }
      );
    }
  }

  deleteVehicle() {
    const vehicleId = localStorage.getItem('vehicleId');
    const userId =localStorage.getItem('authToken');

    console.log(vehicleId);
    console.log(userId);
    if (vehicleId!==null && userId!==null) {
      this.userVehicleService.deleteUserVehicleByVehicleId(userId,vehicleId).subscribe(
        () => {
          console.log('Araç başarıyla silindi.');
        },
        (error) => {
          console.error('Araç silme hatası:', error);
        }
      );
    } else {
      console.error('vehicleId eksik.');
    }
  }

  selectVehicle(selectedVehicle: Vehicle) {
    console.log('Seçilen Araç:', selectedVehicle.brand, selectedVehicle.model);
    localStorage.setItem('brand', selectedVehicle.brand);

    this.selectedBrand = selectedVehicle.brand;
    this.selectedModel = selectedVehicle.model;

    if (this.selectedBrand && this.selectedModel) {
      this.updatePrimaryKey(this.selectedBrand, this.selectedModel);
    } else {
      this.primaryKey = 'xxx';
    }
    
  }

  updateUserVehicle() {
    const userId = localStorage.getItem('authToken');
    const vehicleId = localStorage.getItem('vehicleToUpdatedId');
    const idNew = localStorage.getItem('vehicleId');

    if (userId !== null && vehicleId !== null && idNew !== null) {
      this.userVehicleService.updateVehicle(userId, vehicleId, idNew).subscribe(
        (response) => {
          console.log('Araç güncelleme başarılı:', response);
        },
        (error) => {
          console.error('Araç güncelleme hatası:', error);
        }
      );
    }
  }
}
