import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserVehicle } from 'src/app/models/user-vehicle';
import { Vehicle } from 'src/app/models/vehicle';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css'],
})
export class UserSettingsComponent implements OnInit {
  user: User = new User();
  vehicle: Vehicle = new Vehicle();
  vehicleList: Vehicle[] = [];
  uservehicle: UserVehicle = new UserVehicle();

  onSelectVehicle = false;

  brands: string[] = [];
  models: string[] = [];
  vehicles: string[] = [];
  editMode = false;
  primaryKey = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('authToken');
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
    let userId = localStorage.getItem('authToken');

    if (userId !== null) {
      userId = userId.replace(/^"(.*)"$/, '$1');
      this.userService.updateUser(userId, this.user).subscribe((response) => {
        console.log('Userupdated:', response);
        this.editMode = false;
      });
    }
  }
}
