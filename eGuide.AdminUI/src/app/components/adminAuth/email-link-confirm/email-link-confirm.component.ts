import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Admin } from 'src/app/models/admin';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-email-link-confirm',
  templateUrl: './email-link-confirm.component.html',
  styleUrls: ['./email-link-confirm.component.css'],
})
export class EmailLinkConfirmComponent implements OnInit {
  admin: Admin = new Admin();
  confirmEmailForm: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.confirmEmailForm = this.formBuilder.group({
      email: [''],
    });
  }

  confirmEmail() {
    this.adminService
      .forgotPasswordScreen(this.confirmEmailForm.value.email)
      .subscribe({
        next: () => {
          this.toastr.success(
            'Email verification request sent successfully.',
            'Successful'
          );
          localStorage.setItem('userEmail', this.confirmEmailForm.value.email);
        },
        error: (error) => {
          this.toastr.error(
            'An error occurred while sending an email verification request.',
            'Error'
          );
          console.error('Error sending email verification request:', error);
        },
      });
  }
}
