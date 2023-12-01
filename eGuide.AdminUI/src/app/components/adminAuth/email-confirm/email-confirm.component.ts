import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-email-confirm',
  templateUrl: './email-confirm.component.html',
  styleUrls: ['./email-confirm.component.css'],
})
export class EmailConfirmComponent {
  constructor(
    private router: Router,
    private userService: AdminService,
    private route: ActivatedRoute
  ) {}
  token = '';

  ngOnInit() {
    this.token = this.route.snapshot.params['token'];
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  confirmAccount() {
    this.userService.confirmAccount(this.token).subscribe(
      (response) => {
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Hesap onayı başarısız.', error);
        this.router.navigate(['/']);
      }
    );
  }
}
