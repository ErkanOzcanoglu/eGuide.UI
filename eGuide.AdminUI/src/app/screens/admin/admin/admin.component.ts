import { AdminService } from 'src/app/services/admin.service';
import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/models/admin';
import { Store } from '@ngrx/store';
import { selectRefresh } from 'src/app/state/refresh-list/refresh-list.selector';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  isOpen = false;
  adminInfo: Admin[] = [];

  constructor(private adminService: AdminService, private store: Store) {
    this.store.select(selectRefresh).subscribe((refresh: boolean) => {
      if (refresh === true) {
        this.getAdmins();
      }
    });
  }

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
  }
}
