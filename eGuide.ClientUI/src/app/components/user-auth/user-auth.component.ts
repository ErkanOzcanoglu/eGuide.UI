import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent {
  user: User = new User();
  registerForm: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private userauthService: UserAuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.formBuilder.group({
      name: [''],
      surname: [''],
      email: [''],
      password: [''],
      confirmPassword: [''],
    });
  }

  register(): void {
    console.log(this.registerForm.value);
    this.userauthService.registerUser(this.registerForm.value).subscribe({
      next: (response) => {
        if (response && response.id) {
           response.id = response.id.replace(/^"(.*)"$/, '$1');
          localStorage.setItem('userId', response.id);
        }
      },
      error: (error) => {},
    });
  }
   //sonradan email valid yapma

}
