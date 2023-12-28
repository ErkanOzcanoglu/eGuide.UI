import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ResetPassword } from 'src/app/models/resetPassword';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { LogHelper } from '../../generic-helper/log/log-helper';

@Component({
  selector: 'app-forgot-user-password',
  templateUrl: './forgot-user-password.component.html',
  styleUrls: ['./forgot-user-password.component.css'],
  providers: [LogHelper],
})
export class ForgotUserPasswordComponent {
  resetPasswordModel: ResetPassword = new ResetPassword();
  forgotPasswordForm: FormGroup = new FormGroup({});
  token!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private logHelper: LogHelper
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
          this.router.navigate(['/login']);
        },
        (error) => {
          this.logHelper.errorProcess('resetPassword', error);
          this.router.navigate(['/login']);
        }
      );
  }
}
