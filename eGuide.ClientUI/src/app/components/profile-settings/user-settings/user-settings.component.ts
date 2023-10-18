import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserVehicle } from 'src/app/models/user-vehicle';
import { Vehicle } from 'src/app/models/vehicle';
import { UserVehicleService } from 'src/app/services/user-vehicle.service';
import { UserService } from 'src/app/services/user.service';
import { VehiclesService } from 'src/app/services/vehicles.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css'],
})
export class UserSettingsComponent {
  user: User = new User();
  vehicle: Vehicle = new Vehicle();
  vehicleList: Vehicle[] = [];
  uservehicle: UserVehicle = new UserVehicle();

  onSelectVehicle: boolean = false;

  brands: string[] = [];
  models: string[] = [];
  vehicles: string[] = [];
  editMode = false;
  primaryKey: string = '';
  
  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    var userId = localStorage.getItem('authToken');
    if (userId !== null) {
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
        
      );
    }
  }
}
