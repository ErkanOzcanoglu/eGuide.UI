import { Component, Output, HostListener, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Admin } from 'src/app/models/admin';
import { AdminService } from 'src/app/services/admin.service';

interface SideNavToggle {
  screenWidth: number;
  collapseSideNav: boolean;
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  isScreenWidthBelow756 = false;
  adminInfo?: Admin;
  isEdited?: boolean = false;

  @Output() closeSidenav = new EventEmitter<SideNavToggle>();
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.collapseSideNav = window.innerWidth < 1450;
  }

  constructor(private adminService: AdminService) {
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

  ngOnInit() {
    this.getAdminInfo();
  }

  getAdminInfo() {
    const adminId = localStorage.getItem('authToken');
    if (adminId != null) {
      this.adminService.getAdminInfo(adminId).subscribe(
        (res) => {
          this.adminInfo = res;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }
}
