import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Admin } from 'src/app/models/admin';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.css'],
})
export class AdminSettingsComponent implements OnInit {
  adminInfo?: Admin;
  profileForm: FormGroup = new FormGroup({});
  isEdited?: boolean = false;

  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getAdminInfo();
    this.initializeForm();
  }

  getAdminInfo() {
    const adminId = localStorage.getItem('authToken');
    if (adminId != null) {
      this.adminService.getAdminInfo(adminId).subscribe({
        next: (response) => {
          this.adminInfo = response;
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  initializeForm() {
    this.profileForm = this.formBuilder.group({
      name: [''],
      surname: [''],
      email: ['', Validators.required, Validators.email],
      phone: [''],
      address: [''],
    });
  }

  editProfile() {
    this.isEdited = !this.isEdited;
  }
}
