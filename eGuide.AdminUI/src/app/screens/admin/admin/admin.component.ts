import { AdminService } from 'src/app/services/admin.service';
import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/models/admin';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  isOpen = false;
  adminInfo: Admin[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getAdmins();
  }

  getAdmins() {
    this.adminService.getAdmins().subscribe((res) => {
      this.adminInfo = res;
    });
  }

  openForm() {
    this.isOpen = !this.isOpen;
    console.log(this.isOpen);
  }
}
