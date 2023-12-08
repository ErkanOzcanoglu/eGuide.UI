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
import { PreventLoginGuardService } from './services/prevent-login-guard.service';
import { ServiceComponent } from './screens/service/service.component';
import { ContactComponent } from './screens/contact/contact.component';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/error-pages/page-not-found/page-not-found.component';
import { LiveSupportComponent } from './components/live-support/live-support.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'password-change', component: PasswordSettingsComponent },
      {
        path: 'forgot-password/:token',
        component: ForgotUserPasswordComponent,
      },
      { path: 'email-confirm', component: EmailLinkConfirmComponent },
      { path: 'station/:name', component: HomeComponent },
      { path: 'verify-email/:token', component: VerifyEmailComponent },
      { path: 'services', component: ServiceComponent },
      { path: 'contact', component: ContactComponent },
      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'live-support',
    component: LiveSupportComponent,
  },
  {
    path: 'register',
    component: UserAuthComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [PreventLoginGuardService],
  },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
