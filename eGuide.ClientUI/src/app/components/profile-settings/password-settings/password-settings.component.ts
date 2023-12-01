import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPassword } from 'src/app/models/resetPassword';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-password-settings',
  templateUrl: './password-settings.component.html',
  styleUrls: ['./password-settings.component.css'],
})
export class PasswordSettingsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService // Auth servisinizin adınıza göre değiştirin
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
