import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ResetPassword } from 'src/app/models/resetPassword';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css'],
})
export class UserSettingsComponent implements OnInit {
  user: User = new User();
  resetPasswordModel: ResetPassword = new ResetPassword();
  editMode = false;
  userId = '';

  showForgotPasswordButton = true;

  constructor(
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('authToken');
    if (userId !== null) {
      this.userService.getUserById(userId).subscribe(
        (user) => {
          this.user = user;
          console.log(user);
        },
        (error) => {
          console.error('error while getting data:', error);
        }
      );
    }

    this.userId = localStorage.getItem('authToken') || '';
  }
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
        console.log('Userupdated:', response);
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
          console.log(response);

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
