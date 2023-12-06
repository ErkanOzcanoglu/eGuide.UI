import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserVehicle } from 'src/app/models/user-vehicle';
import { Vehicle } from 'src/app/models/vehicle';
import { UserVehicleService } from 'src/app/services/user-vehicle.service';
import { UserService } from 'src/app/services/user.service';
import { WebsiteService } from 'src/app/services/website.service';
import { selectActiveVehicle } from 'src/app/state/vehicle-state/vehicle.selector';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  navbar?: number;
  user: User = new User();
  isLoggedIn = false;
  showUserMenu = false;
  hamburgerMenu = false;
  vehicle: Vehicle = new Vehicle();

  activeVehicle$: Observable<Vehicle | null>;

  currentState: Vehicle | null = null;
  userVehicleActive: Vehicle = new Vehicle();
  savedActiveVehicle: Vehicle = new Vehicle();

  constructor(
    private router: Router,
    private userService: UserService,
    private websiteService: WebsiteService,
    private userVehicleService: UserVehicleService,
    private store: Store
  ) {
    this.activeVehicle$ = this.store.select(selectActiveVehicle);
  }

  ngOnInit(): void {
    const authToken = localStorage.getItem('authToken');
    authToken;
    if (authToken) {
      const userId = authToken;
      this.userService.getUserById(userId).subscribe((user) => {
        this.user = user;
        this.isLoggedIn = true;
      });
    }
    // this.vehicleActiveView();
    this.getActiveVehiclebyUserId();
    this.getNavbarType();
    this.activeVehicle$.subscribe((currentState) => {
      // Bu kodlar asenkron bir şekilde çalışır
      if (currentState) {
        console.log(
          'ngrx deneme',
          currentState.id,
          currentState.brand,
          currentState.model
        );
      } else {
        console.log('Aktif araç bulunamadı.');
      }
      this.currentState = currentState;

      // currentState kullanıldığı yer buraya taşındı
      console.log('navbara ulaşan araç budur', this.currentState);
      
    });

    // this.activeVehicle$
    //   .pipe(
    //     map((currentState) => {
    //       if (currentState) {
    //         console.log(
    //           'ngrx deneme',
    //           currentState.id,
    //           currentState.brand,
    //           currentState.model
    //         );
    //       } else {
    //         console.log('Aktif araç bulunamadı.');
    //       }
    //       this.currentState=currentState;
    //       return currentState;
    //     })
    //   )
    //   .subscribe();
    // console.log('ngrx deneme5', this.activeVehicle$);
    // console.log('aaaa',this.currentState);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('brand');
    localStorage.removeItem('vehicleId');
    location.reload();
  }

  navigateToSettings(): void {
    this.router.navigate(['/settings']);
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  toggleHamburgerMenu() {
    this.hamburgerMenu = !this.hamburgerMenu;
  }

  getNavbarType() {
    this.websiteService.getWebsite().subscribe((website) => {
      this.navbar = website[0].navbar;
    });
  }

  handleActiveVehicle(event: any) {
    this.vehicle = event;
    console.log(this.vehicle);
  }

  getActiveVehiclebyUserId() {
    const authToken = localStorage.getItem('authToken');
    if (authToken != null) {
      this.userVehicleService.getActiveVehicle(authToken).subscribe(
        (activeVehicle: Vehicle) => {
          console.log('aktif araç geldi', activeVehicle);

          // activeVehicle değişkenini başka bir değişkene atayabilir veya başka bir yerde kullanabilirsiniz
          this.savedActiveVehicle = activeVehicle;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
