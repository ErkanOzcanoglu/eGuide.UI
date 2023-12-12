import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { selectLanguage } from 'src/app/state/language-state/language.selector';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  user: User = new User();
  registerForm: FormGroup = new FormGroup({});
  selectedLanguage = '';
  language$: Observable<string>;

  constructor(
    private router: Router,
    private userauthService: UserAuthService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public translateService: TranslateService,
    private store: Store
  ) {
    this.language$ = this.store.select(selectLanguage);
  }

  ngOnInit() {
    this.initializeForm();

    this.language$.subscribe((currentState) => {
      this.selectedLanguage = currentState;
      console.log('deneme ngrx search icin', this.selectedLanguage);
      this.translateService.use(this.selectedLanguage);
    });
  }

  private initializeForm() {
    this.registerForm = this.formBuilder.group({
      name: [''],
      surname: [''],
      email: [''],
      password: [''],
      confirmPassword: [''],
    });
  }

  register(): void {
    this.userauthService.registerUser(this.registerForm.value).subscribe({
      next: (response) => {
        this.toastr.success('User registered successfully.');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.toastr.error('Please fill out all the form information.');
        console.error('Please fill out all the form information.');
      },
    });
  }
}
