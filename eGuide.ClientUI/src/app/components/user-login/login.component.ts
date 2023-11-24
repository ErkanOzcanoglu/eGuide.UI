import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User = new User();
  loginForm: FormGroup = new FormGroup({});
  logForm: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private userauthService: UserAuthService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
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
    this.userauthService.login(this.loginForm.value).subscribe(
      (token: string) => {
        token = token.replace(/^"(.*)"$/, '$1');
        localStorage.setItem('authToken', token);

        if (token === 'wrong email' || token === 'wrong password') {
          this.toastr.error('Incorrect login information, please try again..');
          localStorage.removeItem('authToken');
        } else {
          this.toastr.success('Login successful!');
          this.logForm.patchValue({
            message: `${
              this.loginForm.value.email
            } logged in at ${new Date().toLocaleString()}`,
            level: 'info',
            source: 'web',
          });
          this.userauthService
            .login_Log(this.logForm.value)
            .subscribe(() => console.log('oldu'));

          setTimeout(() => {
            this.router.navigate(['/']);
            location.reload();
          }, 1000);
        }
      },
      (error) => {
        this.toastr.error('An error occurred while logging in.');
        console.error('An error occurred while logging in:', error);
      }
    );
  }
}
