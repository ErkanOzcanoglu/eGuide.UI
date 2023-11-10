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
    const adminId = localStorage.getItem('token');
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

  initializeForm() {
    this.profileForm = this.formBuilder.group({
      firstName: [
        '',
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(3),
      ],
      lastName: [
        '',
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(3),
      ],
      email: ['', Validators.required, Validators.email],
      phone: [
        '',
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.maxLength(10),
        Validators.minLength(10),
      ],
      address: [
        '',
        Validators.required,
        Validators.maxLength(100),
        Validators.minLength(3),
      ],
    });
  }

  editProfile() {
    this.isEdited = !this.isEdited;
  }
}
