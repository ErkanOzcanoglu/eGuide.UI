import { CustomizationComponent } from './screens/customization/customization.component';
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
import { ChangePasswordComponent } from './modals/change-password/change-password.component';
import { AdminComponent } from './screens/admin/admin/admin.component';
import { VehicleComponent } from './screens/vehicle/vehicle.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { ServiceComponent } from './screens/service/service.component';
import { FacilityComponent } from './screens/facility/facility.component';
import { SocialMediaComponent } from './screens/social-media/social-media.component';
import { UserComponent } from './screens/user/user.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'station', component: StationsComponent },
      { path: 'charging-unit', component: SocketComponent },
      { path: 'map', component: MapComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'admin-list', component: AdminComponent },
      { path: 'services', component: ServiceComponent },
      { path: 'vehicle', component: VehicleComponent },
      { path: 'service', component: ServiceComponent },
      { path: 'facility', component: FacilityComponent },
      { path: 'social-media', component: SocialMediaComponent },
      { path: 'customization', component: CustomizationComponent },
      {path:  'user',component:UserComponent}

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
