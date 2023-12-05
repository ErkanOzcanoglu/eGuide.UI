import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { User } from 'src/app/models/user';
import { Vehicle } from 'src/app/models/vehicle';
import { UserService } from 'src/app/services/user.service';
import { WebsiteService } from 'src/app/services/website.service';
import { selectActiveVehicle } from 'src/app/state/vehicle.selector';

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

  deneme: Vehicle = new Vehicle();
  currentState: Vehicle | null = null;

  constructor(
    private router: Router,
    private userService: UserService,
    private websiteService: WebsiteService,
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
      console.log('aa', this.currentState);
      console.log('aa', this.currentState);
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
}
