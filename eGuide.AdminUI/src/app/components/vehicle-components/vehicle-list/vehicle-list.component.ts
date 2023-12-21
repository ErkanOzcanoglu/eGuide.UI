import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Vehicle } from 'src/app/models/vehicle';
import { VehicleService } from 'src/app/services/vehicle.service';
import { selectRefresh } from 'src/app/state/refresh-list/refresh-list.selector';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
})
export class VehicleListComponent {
  updatedModel: string | undefined;
  searchTerm!: string;
  editMode = false;
  showSearch = false;

  vehicle: Vehicle = new Vehicle();
  vehicles: Vehicle[] = [];

  editForm: FormGroup;

  updatedModel: string | undefined;
  searchTerm: any;
  showSearch: any;
  refresh$ = this.store.select(selectRefresh);

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private vehicleService: VehicleService,
    private store: Store
  ) {
    this.refresh$.subscribe((refresh: boolean) => {
      if (refresh === true) {
        this.getVehicleInfo();
      }
    });
    this.editForm = this.formBuilder.group({
      model: [''],
    });
  }

  ngOnInit(): void {
    this.getVehicleInfo();
  }

  onModeChange() {
    this.editMode = !this.editMode;
  }
  toggleSelection(item: Vehicle): void {
    this.vehicles.forEach((v) => (v.isSelected = false));
    item.isSelected = !item.isSelected;
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
  }

  getVehicleInfo() {
    this.vehicleService.getAllVehicles().subscribe(
      (data) => {
        this.vehicles = data;
      },
      (error) => {
        console.error('Error getting vehicles:', error);
      }
    );
  }

  onSave(item: Vehicle): void {
    if (item.isSelected) {
      this.onUpdate(item.id, item.model);
    } else {
      this.onModeChange();
    }
  }

  deleteVehicle(id: string | undefined): void {
    if (id) {
      this.vehicleService.hardDeleteVehicle(id).subscribe({
        next: () => {
          this.toastr.success('Deleted successfully');
          this.getVehicleInfo();
        },
        error: (err) => this.toastr.error(err, 'Error'),
      });
    } else {
      this.toastr.error('Invalid ID', 'Error');
    }
  }

  onUpdate(vehicleId: any, model: any): void {
    if (vehicleId !== null && model !== null) {
      this.vehicleService.updateVehicle(vehicleId, model).subscribe();
    } else {
      this.toastr.error('Invalid ID or Model for update', 'Error');
    }
  }
}
