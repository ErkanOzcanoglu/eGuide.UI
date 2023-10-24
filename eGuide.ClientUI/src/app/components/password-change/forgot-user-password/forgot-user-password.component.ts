import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ResetPassword } from 'src/app/models/resetPassword';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-user-password',
  templateUrl: './forgot-user-password.component.html',
  styleUrls: ['./forgot-user-password.component.css'],
})
export class ForgotUserPasswordComponent {
  resetPasswordModel: ResetPassword = new ResetPassword();
  forgotPasswordForm: FormGroup = new FormGroup({});
  token = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initializeForm(); 
      this.token = this.route.snapshot.params['token']; // ActivatedRoute ile tokeni alın
      console.log(this.token); // Token'i konsola yazdırabilirsiniz

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
          console.log('success',response);
           this.router.navigate(['/login']);
        },
        (error) => {
          console.log('patos',error);
          this.router.navigate(['/login']);
        }
      );
  }
}
