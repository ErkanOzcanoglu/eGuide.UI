import { HomeComponent } from './screens/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthComponent } from './components/user-auth/user-auth.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from './models/auth-guard';
import { LoginComponent } from './components/user-login/login.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'user-profile',
    component: UserProfileComponent,
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
