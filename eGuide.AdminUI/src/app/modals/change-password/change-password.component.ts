import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    private formBuilder: FormBuilder
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
    const adminToken = localStorage.getItem('authToken');
    if (adminToken != null) {
      this.adminService.getAdminInfo(adminToken).subscribe((res) => {
        this.resetToken = res.passwordResetToken;

        if (this.updatePasswordForm.valid && this.resetToken != null) {
          this.adminService.resetPasswordScreen(
            this.updatePasswordForm.value,
            this.resetToken
          );
        }
        console.log(res);
      }),
        (err: any) => {
          console.log(err);
        };
    }
  }

  getAdminToken() {
    const adminToken = localStorage.getItem('authToken');
    this.adminService.getAdminInfo(adminToken).subscribe((res) => {
      console.log(res);
    });
  }
}
