import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Vehicle } from 'src/app/models/vehicle';
import { VehicleService } from 'src/app/services/vehicle.service';
import { setRefresh } from 'src/app/state/refresh-list/refresh-list.action';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css'],
})
export class VehicleFormComponent implements OnInit {
  brandControl?: string;
  modelControl?: string;

  vehicle: Vehicle = new Vehicle();
  vehicleForm: FormGroup = new FormGroup({});
  vehicles: Vehicle[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private vehicleService: VehicleService,
    private store: Store
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.vehicleForm = this.formBuilder.group({
      brand: [''],
      model: [''],
    });
  }

  onSubmit() {
    const brandControl = this.vehicleForm.get('brand');
    const modelControl = this.vehicleForm.get('model');

    if (brandControl && modelControl) {
      this.vehicle.brand = brandControl.value;
      this.vehicle.model = modelControl.value;

      this.vehicleService.addVehicle(this.vehicle).subscribe({
        next: () => {
          this.toastr.success('Vehicle added successfully', 'Successful');
          this.store.dispatch(setRefresh(true));
          this.vehicleForm.reset();
        },
        error: () => {
          this.toastr.error(
            'An error occurred while adding the vehicle',
            'Error'
          );
        },
      });
      this.store.dispatch(setRefresh(false));
    } else {
      this.toastr.error('Form control elements are null.');
    }
  }

  getVehicleInfo() {
    this.vehicleService.getAllVehicles().subscribe({
      next: (data) => {
        this.vehicles = data;
      },
      error: (error) => {
        this.toastr.error('Error getting vehicles', 'Error');
      },
    });
  }
}
