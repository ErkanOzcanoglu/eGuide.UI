import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Output() closeSidenav = new EventEmitter<void>();

  collapseManagement = false;
  collapseCustomization = false;
  collapseSidebar = true;

  hideManagement() {
    this.collapseManagement = !this.collapseManagement;
  }

  hideCustomization() {
    this.collapseCustomization = !this.collapseCustomization;
  }

  sideBarToggler() {
    this.collapseSidebar = !this.collapseSidebar;
  }
}
