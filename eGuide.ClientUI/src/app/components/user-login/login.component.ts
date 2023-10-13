import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: User = new User();
  loginForm: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private userauthService: UserAuthService,
    private formBuilder: FormBuilder
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
    console.log(this.loginForm.value);
    this.userauthService.login(this.loginForm.value).subscribe((token: string) => {
       localStorage.setItem('authToken', token)
       
  });
  }

}
