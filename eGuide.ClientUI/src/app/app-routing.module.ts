import { HomeComponent } from './screens/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthComponent } from './components/user-auth/user-auth.component';
import { AuthGuard } from './models/auth-guard';
import { LoginComponent } from './components/user-login/login.component';
import { SettingsComponent } from './screens/settings/settings/settings.component';
import { PasswordSettingsComponent } from './screens/password-settings/password-settings.component';
import { ForgotUserPasswordComponent } from './components/password-change/forgot-user-password/forgot-user-password.component';
import { EmailLinkConfirmComponent } from './components/password-change/email-link-confirm/email-link-confirm.component';
import { VerifyEmailComponent } from './screens/verify-email/verify-email.component';

const routes: Routes = [
  { path: 'password-change', component: PasswordSettingsComponent },
  { path: 'forgot-password/:token', component: ForgotUserPasswordComponent },
  { path: 'email-confirm', component: EmailLinkConfirmComponent },
  { path: '', component: HomeComponent },
  { path: 'station/:name', component: HomeComponent },
  { path: 'verify-email/:token', component: VerifyEmailComponent },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    component: UserAuthComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
