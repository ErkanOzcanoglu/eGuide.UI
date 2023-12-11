import { LogHelper } from './../generic-helper/log/log-helper';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Color, ThemeColor } from 'src/app/models/color';
import { User } from 'src/app/models/user';
import { ColorService } from 'src/app/services/color.service';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { UserVehicle } from 'src/app/models/user-vehicle';
import { Vehicle } from 'src/app/models/vehicle';
import { UserVehicleService } from 'src/app/services/user-vehicle.service';
import { UserService } from 'src/app/services/user.service';
import { WebsiteService } from 'src/app/services/website.service';
import { selectActiveVehicle } from 'src/app/state/vehicle-state/vehicle.selector';
import { ColorHelper } from '../generic-helper/color/color-helper';

import { setThemeData } from 'src/app/state/theme.action';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [ColorHelper],
})
export class NavbarComponent implements OnInit {
  navbar?: number;
  user: User = new User();
  isLoggedIn = false;
  showUserMenu = false;
  hamburgerMenu = false;
  color = new Color();
  localColor = new ThemeColor();
  currentTheme = localStorage.getItem('theme');
  vehicle: Vehicle = new Vehicle();
  activeVehicle$: Observable<Vehicle | null>;
  currentState: Vehicle | null = null;
  userVehicleActive: Vehicle = new Vehicle();
  savedActiveVehicle: Vehicle = new Vehicle();

  constructor(
    private router: Router,
    private userService: UserService,
    private websiteService: WebsiteService,
    private colorService: ColorService,
    private colorHelper: ColorHelper,
    private userVehicleService: UserVehicleService,
    private store: Store,
    private logHelper: LogHelper
  ) {
    this.activeVehicle$ = this.store.select(selectActiveVehicle);
  }

  ngOnInit(): void {
    this.colorHelper.getColors();
    this.colorHelper.getLocalColors(this.localColor);

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
      this.currentState = currentState;
    });
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

  changeTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') this.lightTheme();
    else if (theme === 'light') this.darkTheme();
    this.currentTheme = localStorage.getItem('theme');
    this.colorHelper.getColors();
    setTimeout(() => {
      this.colorHelper.getLocalColors(this.localColor);
    }, 50);
    console.log(this.currentTheme, 'currentTheme');
    this.store.dispatch(setThemeData({ themeData: this.currentTheme }));
  }

  darkTheme() {
    console.log('dark');
    localStorage.setItem('theme', 'dark');
  }

  lightTheme() {
    console.log('light');
    localStorage.setItem('theme', 'light');
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
          this.savedActiveVehicle = activeVehicle;
        },
        (error) => {
          this.logHelper.errorProcess('getActiveVehiclebyUserId', error);
          console.error(error);
        }
      );
    }
  }
}
