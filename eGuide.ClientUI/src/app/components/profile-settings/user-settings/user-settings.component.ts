import { Component, OnInit, VERSION } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ResetPassword } from 'src/app/models/resetPassword';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { selectLanguage } from 'src/app/state/language-state/language.selector';
import { LogHelper } from '../../generic-helper/log/log-helper';


@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css'],
  providers: [LogHelper],
})
export class UserSettingsComponent implements OnInit {
  user: User = new User();
  resetPasswordModel: ResetPassword = new ResetPassword();
  editMode = false;
  userId = '';

  showForgotPasswordButton = true;

  selectedLanguage = '';

  language$: Observable<string>;

  constructor(
    private router: Router,
    private userService: UserService,
    public translateService: TranslateService,
    private store: Store,
    private logHelper: LogHelper

  ) {
    this.translateService.addLangs(['tr', 'en']);
    this.translateService.setDefaultLang('en'); // Varsayılan dil İngilizce
    this.translateService.use('en'); // Başlangıçta İngilizce olarak kullan
    this.language$ = this.store.select(selectLanguage);
  }



  ngOnInit(): void {

     this.language$.subscribe((currentState) => {
       this.selectedLanguage = currentState;
       console.log('deneme ngrx user icin', this.selectedLanguage);
       this.translateService.use(this.selectedLanguage);
     });

    const userId = localStorage.getItem('authToken');
    if (userId !== null) {
      this.userService.getUserById(userId).subscribe(
        (user) => {
          this.user = user;
        },
        (error) => {
          this.logHelper.errorProcess('getUserById', error);
          console.error('error while getting data:', error);
        }
      );
    }

    this.userId = localStorage.getItem('authToken') || '';
  }
  //dil değişimi

  public onChange(): void {
    this.translateService.use(this.selectedLanguage);
    console.log('navbarden searche geldi', this.selectedLanguage);
  }
  //dil değişimi
  onModeChange() {
    this.editMode = !this.editMode;
  }

  onCancelClick() {
    this.editMode = false;
  }

  onSaveClick() {
    let userId = localStorage.getItem('authToken');

    if (userId !== null) {
      userId = userId.replace(/^"(.*)"$/, '$1');
      this.userService.updateUser(userId, this.user).subscribe((response) => {
        this.editMode = false;
      });
    }
    this.editMode = false;
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
          this.logHelper.errorProcess('resetPassword', error);
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
        this.logHelper.errorProcess('forgotPassword', error);
        // Hata işlemleri
      }
    );

    this.showForgotPasswordButton = false;
  }
}
