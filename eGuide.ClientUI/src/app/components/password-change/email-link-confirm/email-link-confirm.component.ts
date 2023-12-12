import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { selectLanguage } from 'src/app/state/language-state/language.selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-email-link-confirm',
  templateUrl: './email-link-confirm.component.html',
  styleUrls: ['./email-link-confirm.component.css'],
})
export class EmailLinkConfirmComponent {
  user: User = new User();
  confirmEmailForm: FormGroup = new FormGroup({});
  selectedLanguage = '';
  language$: Observable<string>;

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public translateService: TranslateService,
    private store: Store
  ) {
    this.language$ = this.store.select(selectLanguage);
  }

  ngOnInit() {
    this.initializeForm();
    this.language$.subscribe((currentState) => {
      this.selectedLanguage = currentState;
      console.log('deneme ngrx search icin', this.selectedLanguage);
      this.translateService.use(this.selectedLanguage);
    });
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
          this.toastr.success(
            'Email verification request sent successfully.',
            'Successful'
          );
          localStorage.setItem('userEmail', this.confirmEmailForm.value.email);
        },
        error: (error) => {
          this.toastr.error(
            'An error occurred while sending an email verification request.',
            'Error'
          );
          console.error('Error sending email verification request:', error);
        },
      });
  }
}
