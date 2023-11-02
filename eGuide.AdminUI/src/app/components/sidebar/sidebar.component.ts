import { Component, Output, HostListener } from '@angular/core';
import { EventEmitter } from '@angular/core';

interface SideNavToggle {
  screenWidth: number;
  collapseSideNav: boolean;
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  isScreenWidthBelow756 = false;

  @Output() closeSidenav = new EventEmitter<SideNavToggle>();
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.collapseSideNav = window.innerWidth < 1450;
  }

  constructor() {
    this.collapseSideNav = window.innerWidth < 1450;
  }

  handleKeyup(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.collapseSideNav = true;
    }
  }

  collapseManagement = false;
  collapseCustomization = false;
  collapseSideNav = false;

  hideManagement() {
    this.collapseManagement = !this.collapseManagement;
  }

  hideCustomization() {
    this.collapseCustomization = !this.collapseCustomization;
  }

  setSideNav() {
    this.collapseSideNav = !this.collapseSideNav;
    this.collapseManagement = false;
    this.collapseCustomization = false;

    const screenWidth = window.innerWidth;
    this.closeSidenav.emit({
      screenWidth,
      collapseSideNav: this.collapseSideNav,
    });
  }
}
