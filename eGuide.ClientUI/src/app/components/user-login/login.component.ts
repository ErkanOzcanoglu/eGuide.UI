import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserService } from 'src/app/services/user.service';
import { LogHelper } from '../generic-helper/log/log-helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LogHelper],
})
export class LoginComponent implements OnInit {
  user: User = new User();
  loginForm: FormGroup = new FormGroup({});
  logForm: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private userauthService: UserAuthService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private logHelper: LogHelper
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
    this.logForm = this.formBuilder.group({
      message: ['', Validators.required],
      level: ['', Validators.required],
      source: ['', Validators.required],
    });
  }

  login(): void {
    //console.log(this.loginForm.value);

    // if (token === 'wrong email' || token === 'wrong password') {
    //   this.toastr.error('Incorrect login information, please try again..');
    //   localStorage.removeItem('authToken');
    // } else {
    //   this.toastr.success('Login successful!');
    //   this.logForm.patchValue({
    //     message: `${
    //       this.loginForm.value.email
    //     } logged in at ${new Date().toLocaleString()}`,
    //     level: 'info',
    //     source: 'web',
    //   });
    //   this.userauthService
    //     .login_Log(this.logForm.value)
    //     .subscribe(() => console.log('oldu'));

    //   setTimeout(() => {
    //     this.router.navigate(['/']);
    //     location.reload();
    //   }, 1000);
    // }
    if (this.loginForm.valid) {
      this.userauthService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.userService.getUserById(response?.id).subscribe({
            next: (response) => {
              if (response?.id) localStorage.setItem('authToken', response?.id);
              this.toastr.success('Login successful!');
              this.logHelper.successLogin(this.loginForm.value.email);
              this.router.navigate(['/']);
              location.reload();
            },
            error: (error) => {
              this.toastr.error(
                'Incorrect login information, please try again..'
              );
              console.log(error);
              this.logHelper.errorLogin(this.loginForm.value.email, error);
            },
          });
        },
        error: (error) => {
          // clg error message
          console.log(error.message, 'eroor message');
          console.log(error.error.error, 'eroor error');
          this.toastr.error('Incorrect login information, please try again..');
          this.logHelper.errorLogin(this.loginForm.value.email, error);
        },
      });
    }
  }
}
