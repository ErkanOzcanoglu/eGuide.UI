import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-email-link-confirm',
  templateUrl: './email-link-confirm.component.html',
  styleUrls: ['./email-link-confirm.component.css'],
})
export class EmailLinkConfirmComponent {
  user: User = new User();
  confirmEmailForm: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.confirmEmailForm = this.formBuilder.group({
      email: [''],
    });
  }

  confirmEmail() {
    this.userService
      .forgotPasswordScreen(this.confirmEmailForm.value.email)
      .subscribe({
        next: (response) => {
          console.log('E-posta doğrulama isteği başarıyla gönderildi.');
          localStorage.setItem('userEmail', this.confirmEmailForm.value.email);
        },
        error: (error) => {
          console.error(
            'E-posta doğrulama isteği gönderilirken hata oluştu:',
            error
          );
        },
      });
  }
}
