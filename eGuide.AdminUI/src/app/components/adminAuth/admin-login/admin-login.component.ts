import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  loadingAfterLogin?: boolean = false;

  token?: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private adminService: AdminService,
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
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.loadingAfterLogin = true;
          this.adminService.getAdminInfo(response?.id).subscribe({
            next: (response) => {
              if (response?.id) localStorage.setItem('authToken', response?.id);
              this.toaster.success('Login successful');
              setTimeout(() => {
                this.router.navigate(['']);
                this.loadingAfterLogin = false;
              }, 1000);
            },
            error: (error) => {
              this.toaster.error('Invalid email or password');
              console.log(error);
            },
          });
        },
        error: (error) => {
          console.log(error);
          this.toaster.error('Invalid email or password');
        },
      });
    }
  }
}
