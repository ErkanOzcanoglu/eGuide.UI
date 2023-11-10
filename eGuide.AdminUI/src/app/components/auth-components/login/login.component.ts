import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  token?: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      // if login is successful, navigate to the dashboard page or print an error message
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          if (response?.id) localStorage.setItem('token', response?.id);
          this.toaster.success('Login successful');
          setTimeout(() => {
            this.router.navigate(['/station']);
          }, 1000);
        },
        error: (error) => {
          console.log(error);
          this.toaster.error('Invalid email or password');
        },
      });
    }
  }
}
