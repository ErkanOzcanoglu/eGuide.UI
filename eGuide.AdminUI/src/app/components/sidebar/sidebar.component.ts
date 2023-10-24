import { Component, Output } from '@angular/core';
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
  @Output() closeSidenav = new EventEmitter<SideNavToggle>();
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

    const screenWidth = window.innerWidth;
    this.closeSidenav.emit({
      screenWidth,
      collapseSideNav: this.collapseSideNav,
    });
  }
}
