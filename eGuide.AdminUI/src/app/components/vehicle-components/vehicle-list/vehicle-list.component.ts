import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Vehicle } from 'src/app/models/vehicle';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
})
export class VehicleListComponent {
  vehicle: Vehicle = new Vehicle();
  vehicles: Vehicle[] = [];
  editMode = false;
  editForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private vehicleService: VehicleService
  ) {
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
      // id undefined ise gerekli işlemi yapabilirsiniz, örneğin bir hata mesajı gösterebilirsiniz.
      this.toastr.error('Invalid ID', 'Error');
    }
  }

  onUpdate(id?: string, model?: string): void {
    console.log(model);
    console.log(id);
    if (id && model !== undefined) {
      // item.id tanımlı ve item.model varsa update işlemi yap
      this.vehicleService.updateVehicle(id, model).subscribe(
        (data) => {
          this.toastr.success('Vehicle updated successfully');
          this.getVehicleInfo(); // Yeniden yükleyerek güncel verileri al
        },
        (error) => {
          console.error('Error updating vehicle:', error);
          this.toastr.error('Error updating vehicle');
        }
      );
    } else {
      // item.id tanımlı değilse veya item.model undefined ise geçersiz ID hatası göster
      this.toastr.error('Invalid ID or Model for update', 'Error');
    }
  }
}