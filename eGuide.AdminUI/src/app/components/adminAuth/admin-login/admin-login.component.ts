import { Component} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Admin } from 'src/app/models/admin';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent {
  user: Admin = new Admin();
  loginForm: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private adminService: AdminService,
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
  }

  login(): void {
   
    this.adminService.login(this.loginForm.value).subscribe(
      (token: string) => {
        token = token.replace(/^"(.*)"$/, '$1');
        localStorage.setItem('authToken', token);

        if (token === 'wrong email' || token === 'wrong password') {
          localStorage.removeItem('authToken');
        } else {
          this.router.navigate(['/']);
          location.reload();
        }
      },
      (error) => {
        console.error('An error occurred while logging in:', error);
      }
    );
  }
}
