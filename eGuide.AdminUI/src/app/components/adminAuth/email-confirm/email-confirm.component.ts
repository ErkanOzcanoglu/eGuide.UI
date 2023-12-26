import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-email-confirm',
  templateUrl: './email-confirm.component.html',
  styleUrls: ['./email-confirm.component.css'],
})
export class EmailConfirmComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: AdminService,
    private route: ActivatedRoute,
    private toaster: ToastrService
  ) {}
  token = '';

  ngOnInit() {
    this.token = this.route.snapshot.params['token'];
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  confirmAccount() {
    this.userService.confirmAccount(this.token).subscribe({
      next: () => {
        this.toaster.success('Account confirmed successfully');
        this.router.navigate(['/home']);
      },
      error: () => {
        this.toaster.error('Account confirmation failed');
      },
    });
  }
}
