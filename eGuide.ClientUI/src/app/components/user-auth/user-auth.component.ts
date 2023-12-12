import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { LogHelper } from '../generic-helper/log/log-helper';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
  providers: [LogHelper],
})
export class UserAuthComponent implements OnInit {
  user: User = new User();
  registerForm: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private userauthService: UserAuthService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private logHelper: LogHelper
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.registerForm = this.formBuilder.group({
      name: [''],
      surname: [''],
      email: [''],
      password: [''],
      confirmPassword: [''],
    });
  }

  register(): void {
    this.userauthService.registerUser(this.registerForm.value).subscribe({
      next: (response) => {
        this.toastr.success('User registered successfully.');
        this.logHelper.successProcess('register');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.toastr.error('Please fill out all the form information.');
        this.logHelper.errorProcess('register', error.error.error);
        console.error('Please fill out all the form information.');
      },
    });
  }
}
