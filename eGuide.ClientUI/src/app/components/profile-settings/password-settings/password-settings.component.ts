import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ResetPassword } from 'src/app/models/resetPassword';
import { UserService } from 'src/app/services/user.service';
import { selectLanguage } from 'src/app/state/language-state/language.selector';

@Component({
  selector: 'app-password-settings',
  templateUrl: './password-settings.component.html',
  styleUrls: ['./password-settings.component.css'],
})
export class PasswordSettingsComponent implements OnInit {
  selectedLanguage = '';
  language$: Observable<string>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private store: Store,
    public translateService: TranslateService
  ) {
    this.language$ = this.store.select(selectLanguage);
  }

  userId = '';
  resetPasswordModel: ResetPassword = new ResetPassword();
  showForgotPasswordButton = true;

  ngOnInit() {
    this.userId = localStorage.getItem('authToken') || '';
    this.language$.subscribe((currentState) => {
      this.selectedLanguage = currentState;
      console.log('deneme ngrx search icin', this.selectedLanguage);
      this.translateService.use(this.selectedLanguage);
    });
  }

  resetPassword(): void {
    this.userService
      .resetPassword(this.resetPasswordModel, this.userId)
      .subscribe(
        (response: string) => {
          localStorage.removeItem('authToken');
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error(error);
        }
      );
    this.showForgotPasswordButton = true;
  }

  forgotPassword() {
    this.userService.forgotPassword(this.userId).subscribe(
      (response) => {
        // Başarılı yanıt işlemleri
      },
      (error) => {
        // Hata işlemleri
      }
    );

    this.showForgotPasswordButton = false;
  }
}
