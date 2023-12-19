import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPassword } from 'src/app/models/resetPassword';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-forgot-admin-password',
  templateUrl: './forgot-admin-password.component.html',
  styleUrls: ['./forgot-admin-password.component.css'],
})
export class ForgotAdminPasswordComponent {
  resetPasswordModel: ResetPassword = new ResetPassword();
  forgotPasswordForm: FormGroup = new FormGroup({});
  token = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: AdminService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.token = this.route.snapshot.params['token'];
  }

  initializeForm() {
    this.forgotPasswordForm = this.formBuilder.group({
      password: [''],
      confirmPassword: [''],
    });
  }

  resetPassword() {
    this.userService
      .resetPasswordScreen(this.forgotPasswordForm.value, this.token)
      .subscribe(
        (response) => {
          this.router.navigate(['/station']);
        },
        (error) => {
          this.router.navigate(['/station']);
        }
      );
  }
}
