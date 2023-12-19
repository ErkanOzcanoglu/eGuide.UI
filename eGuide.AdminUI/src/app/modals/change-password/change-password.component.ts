import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  updatePasswordForm: FormGroup = new FormGroup({});
  resetToken?: string;
  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAdminToken();
    this.initializeForm();
  }

  initializeForm() {
    this.updatePasswordForm = this.formBuilder.group({
      password: [''],
      confirmPassword: [''],
    });
  }

  onSubmit() {
    const adminId = localStorage.getItem('authToken');
    if (this.updatePasswordForm.valid) {
      const password = this.updatePasswordForm.value.password;
      const confirmPassword = this.updatePasswordForm.value.confirmPassword;
      if (password === confirmPassword) {
        this.adminService
          .passChange(adminId, this.updatePasswordForm.value)
          .subscribe({
            next: () => {
              this.toast.success('Password changed successfully');
              setTimeout(() => {
                window.location.reload();
              }, 1400);
            },
            error: (error) => {
              this.toast.error('Password change failed');
              console.log(error);
            },
          });
      }
    }
  }

  getAdminToken() {
    const adminToken = localStorage.getItem('authToken');
    this.adminService.getAdminInfo(adminToken).subscribe();
  }
}
