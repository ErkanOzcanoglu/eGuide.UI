import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
export class VehicleFormComponent {
  vehicle: Vehicle = new Vehicle();
  vehicleForm: FormGroup = new FormGroup({});
  vehicles: Vehicle[] = [];
  brandControl = '';
  modelControl = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private vehicleService: VehicleService,
    private store: Store<{ refresh: boolean }>
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

      this.vehicleService.addVehicle(this.vehicle).subscribe(
        (response) => {
          // Başarılı bir şekilde eklenirse yapılacak işlemler
          this.toastr.success('Araç başarıyla eklendi', 'Başarılı');
          setTimeout(() => {
            this.store.dispatch(setRefresh(true));
          }, 400);
        },
        (error) => {
          // Hata durumunda yapılacak işlemler
          this.toastr.error('Araç eklenirken bir hata oluştu', 'Hata');
        }
      );
    } else {
      // Eğer form kontrol elemanları null ise, bir hata durumu olarak ele alınabilir.
      console.error('Form kontrol elemanları null.');
    }
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
}
