import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent {
  constructor(
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}
  token = '';

  ngOnInit() {
    this.token = this.route.snapshot.params['token']; // ActivatedRoute ile tokeni alın
 // Token'i konsola yazdırabilirsiniz
  }

  navigateToHome() {
    this.router.navigate(['/home']); // "home" sayfasına yönlendirme yapar
  }

  
  confirmAccount() {
     console.log(this.token);
    this.userService.confirmAccount(this.token).subscribe(
      (response) => {
        console.log('Hesap onaylandı.', response);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Hesap onayı başarısız.', error);
        this.router.navigate(['/home']);
      }
    );
  }
}
