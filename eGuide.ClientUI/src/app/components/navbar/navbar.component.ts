import { Component, OnInit } from '@angular/core';
import { LogHelper } from './../generic-helper/log/log-helper';
import { Router } from '@angular/router';
import { Color, ThemeColor } from 'src/app/models/color';
import { User } from 'src/app/models/user';
import { ColorService } from 'src/app/services/color.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Vehicle } from 'src/app/models/vehicle';
import { UserVehicleService } from 'src/app/services/user-vehicle.service';
import { UserService } from 'src/app/services/user.service';
import { WebsiteService } from 'src/app/services/website.service';
import { selectActiveVehicle } from 'src/app/state/vehicle-state/vehicle.selector';
import { ColorHelper } from '../generic-helper/color/color-helper';

import { setThemeData } from 'src/app/state/theme-state/theme.action';
import { TranslateService } from '@ngx-translate/core';
import * as LanguageActions from 'src/app/state/language-state/language.action';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [ColorHelper],
})
export class NavbarComponent implements OnInit {
  navbar?: number;
  currentState: Vehicle | null = null;
  activeVehicle$: Observable<Vehicle | null>;
  currentTheme = localStorage.getItem('theme');

  isLoggedIn = false;
  showUserMenu = false;
  hamburgerMenu = false;

  user: User = new User();
  color = new Color();
  localColor = new ThemeColor();
  vehicle: Vehicle = new Vehicle();
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
    public translateService: TranslateService,
    private logHelper: LogHelper
  ) {
    this.activeVehicle$ = this.store.select(selectActiveVehicle);
    this.translateService.addLangs(['tr', 'en']);
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
  }

  ngOnInit(): void {
    if (localStorage.getItem('theme') === null) {
      localStorage.setItem('theme', 'light');

      this.currentTheme = localStorage.getItem('theme');
      this.colorHelper.getColors();
      this.colorHelper.getLocalColors(this.localColor);
    }
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
    this.getActiveVehiclebyUserId();
    this.getNavbarType();
    this.activeVehicle$.subscribe((currentState) => {
      this.currentState = currentState;
    });
  }

  setLanguage(language: string): void {
    this.store.dispatch(LanguageActions.setLanguage({ language }));
    console.log('navbarda setlenen dil', language);
  }

  public onChange(selectedLanguage: string): void {
    this.translateService.use(selectedLanguage);
    this.setLanguage(selectedLanguage);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('brand');
    localStorage.removeItem('vehicleId');
    location.reload();
  }

  settings(){
    console.log("tiklandi");
    this.router.navigate(['/settings']);
    
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
    this.colorHelper.getLocalColors(this.localColor);
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
