import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserSharedService } from 'src/app/services/user-shared.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  user: User = new User();
  editMode = false;
  userId = '';

kullaniciId:any;

  constructor(
    private router: Router,
    private userService: UserService,
    private userSharedService: UserSharedService
  ) {}

  ngOnInit(): void {
    this.userSharedService.profileSelected$.subscribe((userId) => {
      this.deneme(userId); // Eğer bu fonksiyonu kullanıyorsanız
    });
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

  deneme(event: any) {
    console.log('aaaaaaaa', event);
    this.kullaniciId = event;
    console.log(this.kullaniciId);
    
  }
}
