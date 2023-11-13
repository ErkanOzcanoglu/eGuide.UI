import { Component, HostListener } from '@angular/core';
import { AuthService } from './services/auth.service';

interface SideNavToggle {
  screenWidth: number;
  collapseSideNav: boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isSideNavCollapsed = false;

  closeSideNav(event: SideNavToggle) {
    this.isSideNavCollapsed = event.collapseSideNav;
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isSideNavCollapsed = window.innerWidth < 1450;
  }

  constructor(public auth: AuthService) {
    this.isSideNavCollapsed = window.innerWidth < 1450;
  }
}
