import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}
  token = '';

  ngOnInit() {
    this.token = this.route.snapshot.params['token']; // ActivatedRoute ile tokeni alın
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  confirmAccount() {
    this.userService.confirmAccount(this.token).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: () => {
        this.router.navigate(['/']);
      },
    });
  }
}
