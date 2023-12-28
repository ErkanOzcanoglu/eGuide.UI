import { AdminService } from 'src/app/services/admin.service';
import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/models/admin';
import { Store } from '@ngrx/store';
import { selectRefresh } from 'src/app/state/refresh-list/refresh-list.selector';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  isOpen = false;
  adminInfo: Admin[] = [];
  refresh$ = this.store.select(selectRefresh);

  constructor(private adminService: AdminService, private store: Store) {
    this.refresh$.subscribe((refresh: boolean) => {
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

  deleteAdmin(admin: Admin) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        }).then(() => {
          if (admin.id != null && admin.isMasterAdmin === true) {
            this.adminService.deleteAdmin(admin.id).subscribe({
              next: () => {
                this.getAdmins();
              },
            });
          }
        });
      }
    });
  }
}
