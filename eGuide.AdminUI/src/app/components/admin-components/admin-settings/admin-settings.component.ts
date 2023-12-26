import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
  updateProfile: FormGroup = new FormGroup({});
  isEdited?: boolean = false;

  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private toaster: ToastrService
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

    this.updateProfile = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
    });
  }

  toggleEdit() {
    this.isEdited = !this.isEdited;
  }

  editProfile(adminId: string) {
    this.isEdited = !this.isEdited;
    if (this.isEdited) {
      console.log('');
    } else {
      if (this.updateProfile.valid) {
        this.adminService
          .updateAdminInformation(adminId, this.updateProfile.value)
          .subscribe({
            next: (response) => {
              this.toaster.success(`${response.name} updated successfully`);
            },
            error: () => {
              this.toaster.error('Error updating profile');
            },
          });
      }
    }
  }

  createResetToken() {
    if (this.adminInfo?.id)
      this.adminService.adminForgotPassword(this.adminInfo?.id).subscribe({});
  }
}
