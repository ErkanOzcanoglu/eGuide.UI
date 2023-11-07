import { Component, HostListener } from '@angular/core';

interface SideNavToggle {
  screenWidth: number;
  collapseSideNav: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  isSideNavCollapsed = false;

  closeSideNav(event: SideNavToggle) {
    this.isSideNavCollapsed = event.collapseSideNav;
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isSideNavCollapsed = window.innerWidth < 1450;
  }

  constructor() {
    this.isSideNavCollapsed = window.innerWidth < 1450;
  }
}
