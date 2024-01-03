import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Admin } from 'src/app/models/admin';
import { AdminService } from 'src/app/services/admin.service';
import { setRefresh } from 'src/app/state/refresh-list/refresh-list.action';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css'],
})
export class AddAdminComponent implements OnInit {
  admin: Admin = new Admin();
  adminForm: FormGroup = new FormGroup({});
  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.adminForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.minLength(3),
        ],
      ],
      surname: [
        '',
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.minLength(3),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      confirmPassword: [''],
      isMasterAdmin: [false],
    });
  }

  onSubmit() {
    const surname = this.adminForm.get('surname')?.value;
    const name = this.adminForm.get('name')?.value;
    const password = `${surname}.${name}`;
    this.adminForm.get('password')?.setValue(password);
    this.adminForm.get('confirmPassword')?.setValue(password);
    if (this.adminForm.valid) {
      this.admin = this.adminForm.value;
      this.admin.isMasterAdmin = false;
      this.adminService.adminRegister(this.admin).subscribe({
        next: () => {
          this.toastr.success('Admin added successfully');
          this.store.dispatch(setRefresh(true));
          this.adminForm.reset();
        },
        error: () => {
          this.toastr.error('Admin could not be added');
        },
      });
    } else {
      this.toastr.error('Form is not valid');
    }
  }
}
