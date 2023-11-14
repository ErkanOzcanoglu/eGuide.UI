import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StationsComponent } from './screens/stations/stations.component';
import { SocketComponent } from './screens/socket/socket.component';
import { MapComponent } from './components/map/map.component';
import { SettingsComponent } from './screens/settings/settings.component';
import { SignComponent } from './screens/sign/sign.component';
import { AuthGuard } from './services/auth.guard';
import { HomeComponent } from './screens/home/home.component';
import { EmailConfirmComponent } from './components/adminAuth/email-confirm/email-confirm.component';
import { ForgotAdminPasswordComponent } from './components/adminAuth/forgot-admin-password/forgot-admin-password.component';
import { EmailLinkConfirmComponent } from './components/adminAuth/email-link-confirm/email-link-confirm.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,

    canActivate: [AuthGuard],
    children: [
      { path: 'station', component: StationsComponent },
      { path: 'socket', component: SocketComponent },
      { path: 'map', component: MapComponent },
      { path: 'settings', component: SettingsComponent },
    ],
  },
  { path: 'sign-in', component: SignComponent },
  {
    path: 'email-confirm',
    component: EmailLinkConfirmComponent,
  },
  {
    path: 'forgot-admin-password/:token',
    component: ForgotAdminPasswordComponent,
  },
  { path: 'verify-email/:token', component: EmailConfirmComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
