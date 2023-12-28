import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Vehicle } from 'src/app/models/vehicle';
import { VehicleService } from 'src/app/services/vehicle.service';
import { selectRefresh } from 'src/app/state/refresh-list/refresh-list.selector';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
})
export class VehicleListComponent implements OnInit {
  updatedModel: string | undefined;
  searchTerm!: string;
  editMode = false;
  showSearch = false;

  vehicle: Vehicle = new Vehicle();
  vehicles: Vehicle[] = [];

  editForm: FormGroup;

  refresh$ = this.store.select(selectRefresh);

  constructor(
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
    if (item.isSelected && item.id != null && item.model != null) {
      this.onUpdate(item.id, item.model);
    } else {
      this.onModeChange();
    }
  }

  deleteVehicle(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        if (id) {
          this.vehicleService.hardDeleteVehicle(id).subscribe({
            next: () => {
              this.getVehicleInfo();
              Swal.fire({
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                icon: 'success',
              });
            },
            error: (err) => this.toastr.error(err, 'Error'),
          });
        } else {
          this.toastr.error('Invalid ID', 'Error');
        }
      }
    });
  }

  onUpdate(vehicleId: string, model: string): void {
    if (vehicleId !== null && model !== null) {
      this.vehicleService.updateVehicle(vehicleId, model).subscribe();
    } else {
      this.toastr.error('Invalid ID or Model for update', 'Error');
    }
  }
}
