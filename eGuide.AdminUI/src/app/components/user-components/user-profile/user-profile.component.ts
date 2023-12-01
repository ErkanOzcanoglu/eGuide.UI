import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Vehicle } from 'src/app/models/vehicle';
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
  editMode = false;
  userId = '';

  kullaniciId: any;

  constructor(
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
    private userVehicleService: UserVehicleService
  ) {}

  ngOnInit(): void {
    // ActivatedRoute servisini kullanarak id parametresini al
    this.route.params.subscribe((params) => {
      this. userId = params['id'];

      // Burada userId'yi kullanabilirsiniz
      console.log('User ID from route parameters:', this.userId);

      // Kullanıcı bilgilerini almak için gerekli işlemleri gerçekleştirebilirsiniz
      this.getUserInfo(this.userId);
      this.getVehicleById(this.userId);
    
    });
  }

  getUserInfo(userId: any) {
    this.userService.getUserById(userId).subscribe(
      (user) => {
        console.log('User Info:', user);
        this.user = user;
      },
      (error) => {
        console.error('Error getting user info:', error);
      }
    );
  }
  removeUser(): void {
    // Kaldırılacak kullanıcının ID'si
    this.userService.removeUser(this.userId).subscribe(
      (response) => {
        console.log('User removed successfully', response);
        this.router.navigate(['/user']);
      },
      (error) => {
        console.error('Error removing user', error);
        // Hata durumunda yapılacak işlemler buraya eklenir
      }
    );
  }

  getVehicleById(userId: any) {
    if (userId !== null) {
      this.userVehicleService.getvehicleById(userId).subscribe(
        (data) => {
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

  viewProfileList() {
    this.router.navigate(['/user']);
  }
}
