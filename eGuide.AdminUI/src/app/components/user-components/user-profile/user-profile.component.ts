import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute
  ) {}

  
ngOnInit(): void {
  // ActivatedRoute servisini kullanarak id parametresini al
  this.route.params.subscribe(params => {
    const userId = params['id'];

    // Burada userId'yi kullanabilirsiniz
    console.log('User ID from route parameters:', userId);

    // Kullanıcı bilgilerini almak için gerekli işlemleri gerçekleştirebilirsiniz
    this.getUserInfo(userId);
  });
}

getUserInfo(userId: any) {
  // Kullanıcı bilgilerini almak için gerekli HTTP çağrılarını yapabilirsiniz
  // Örneğin:
  this.userService.getUserById(userId).subscribe(
    (user) => {
      // Kullanıcı bilgilerini aldıktan sonra yapılacak işlemler
      console.log('User Info:', user);
      this.user = user;
    },
    (error) => {
      console.error('Error getting user info:', error);
    }
  );

 
  // onModeChange() {
  //   this.editMode = !this.editMode;
  // }

  // onCancelClick() {
   
  //   this.editMode = false; 
  // }

  // onSaveClick() {
  //   let userId = localStorage.getItem('authToken');

  //   if (userId !== null) {
  //     userId = userId.replace(/^"(.*)"$/, '$1');
  //     this.userService.updateUser(userId, this.user).subscribe((response) => {
  //       console.log('Userupdated:', response);
  //       this.editMode = false;
  //     });
  //   }
  //   this.editMode = false;
  // }

  }
}
