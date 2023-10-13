import { Component, NgModule } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/models/auth-guard';
import { User } from 'src/app/models/user';
import { UserVehicle } from 'src/app/models/user-vehicle';
import { Vehicle } from 'src/app/models/vehicle';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserVehicleService } from 'src/app/services/user-vehicle.service';
import { UserService } from 'src/app/services/user.service';
import { VehiclesService } from 'src/app/services/vehicles.service';

// @NgModule({providers:[AuthGuard]})

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  user: User = new User();
  vehicle: Vehicle = new Vehicle();
  vehicleLists: Vehicle[] = [];
  uservehicle: UserVehicle = new UserVehicle();

  brands: string[] = [];
  models: string[] = [];
  selectedBrand = '';
  editMode = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private userVehicle: UserVehicleService,
    private vehicleService: VehiclesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    var userId = localStorage.getItem('authToken');
    if (userId !== null) {
      userId = userId.replace(/^"(.*)"$/, '$1');
      this.userService.getUserById(userId).subscribe(
        (user) => {
          this.user = user;
          console.log(user);
        },
        (error) => {
          console.error('error while getting data:', error);
        }
      );
    }

    this.getBrands();
  }
  onModeChange() {
    this.editMode = !this.editMode;
  }
  onSaveClick() {
    console.log('deneme');
    var userId = localStorage.getItem('authToken');

    if (userId !== null) {
      userId = userId.replace(/^"(.*)"$/, '$1');
      this.userService.updateUser(userId, this.user).subscribe(
        (response) => {
          console.log('Userupdated:', response);
          this.editMode = false;
        },
        (error) => {
          console.error('Hata oluştu:', error);
        }
      );
    }
  }

  getBrands() {
    this.vehicleService.getAllBrands().subscribe((data) => {
      this.brands = data;
      console.log(this.brands);
    });
  }

  // loadModelsByBrand() {
  //   if (this.selectedBrand) {
  //     this.vehicleService.getModelsByBrand(this.selectedBrand).subscribe(
  //       (models) => {
  //         // Modelleri aldığınızda burada işlem yapabilirsiniz.
  //         console.log('Ait modeller:', models);
  //       },
  //       (error) => {
  //         console.error('Modelleri alma hatası:', error);
  //       }
  //     );
  //   }
  // }

  
}
