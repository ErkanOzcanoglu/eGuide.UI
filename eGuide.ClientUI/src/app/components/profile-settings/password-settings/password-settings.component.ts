import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPassword } from 'src/app/models/resetPassword';
import { UserService } from 'src/app/services/user.service';
import { LogHelper } from '../../generic-helper/log/log-helper';

@Component({
  selector: 'app-password-settings',
  templateUrl: './password-settings.component.html',
  styleUrls: ['./password-settings.component.css'],
  providers: [LogHelper],
})
export class PasswordSettingsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService, // Auth servisinizin adınıza göre değiştirin
    private logHelper: LogHelper
  ) {}

  userId = '';
  resetPasswordModel: ResetPassword = new ResetPassword();
  showForgotPasswordButton = true;

  ngOnInit() {
    this.userId = localStorage.getItem('authToken') || '';
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
