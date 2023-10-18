import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-password-settings',
  templateUrl: './password-settings.component.html',
  styleUrls: ['./password-settings.component.css'],
})
export class PasswordSettingsComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService // Auth servisinizin adınıza göre değiştirin
  ) {}

  userId = '';
  ngOnInit() {
    this.userId = localStorage.getItem('authToken') || '';
  }
  

  resetPassword(password: string, confirmPassword: string) {
    if (password === confirmPassword) {
      const request = { Token: this.userId, Password: password };
      this.userService.resetPassword(this.userId, request).subscribe(
        (response) => {
          // Şifre sıfırlama başarılı
          // Kullanıcıyı yönlendirebilir veya başka bir işlem yapabilirsiniz
        },
        (error) => {
          // Şifre sıfırlama sırasında bir hata oluştu
          console.error(error);
        }
      );
    } else {
      // Şifreler uyuşmuyor, hata mesajı gösterilebilir
    }
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
  }
}
