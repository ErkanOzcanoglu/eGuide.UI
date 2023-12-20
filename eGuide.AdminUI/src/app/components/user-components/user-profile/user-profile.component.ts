import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Station } from 'src/app/models/station';
import { User } from 'src/app/models/user';
import { Vehicle } from 'src/app/models/vehicle';
import { UserStationService } from 'src/app/services/user-station.service';
import { UserVehicleService } from 'src/app/services/user-vehicle.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  user: User = new User();
  vehicleList: Vehicle[] = [];
  stations: Station[] = [];

  editMode = false;

  userId!: string;
  numberOfVehicles?: number;
  numberOfStations?: number;

  constructor(
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
    private userVehicleService: UserVehicleService,
    private userStationService: UserStationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];

      this.getUserInfo(this.userId);
      this.getVehicleById(this.userId);
      this.getStationProfilesById(this.userId);
    });
  }

  getUserInfo(userId: any) {
    this.userService.getUserById(userId).subscribe(
      (user) => {
        this.user = user;
      },
      (error) => {
        console.error('Error getting user info:', error);
      }
    );
  }

  removeUser(): void {
    this.userService.removeUser(this.userId).subscribe(
      (response) => {
        this.router.navigate(['/user']);
      },
      (error) => {
        console.error('Error removing user', error);
      }
    );
  }

  getVehicleById(userId: any) {
    if (userId !== null) {
      this.userVehicleService.getvehicleById(userId).subscribe(
        (data) => {
          this.vehicleList = data;
          this.numberOfVehicles = this.vehicleList.length;
        },
        (error) => {
          console.error('Error getting vehicle info:', error);
        }
      );
    }
  }

  getStationProfilesById(userId: string): void {
    this.userStationService.getStationProfiles(userId).subscribe(
      (stations: Station[]) => {
        this.stations = stations;
        // İstasyon sayısını alma
        this.numberOfStations = this.stations.length;
      },
      (error) => {
        console.error('Error fetching station profiles:', error);
      }
    );
  }

  viewProfileList() {
    this.router.navigate(['/user']);
  }
}
