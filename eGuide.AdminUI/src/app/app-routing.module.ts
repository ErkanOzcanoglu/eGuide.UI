import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StationsComponent } from './screens/stations/stations.component';
import { SocketComponent } from './screens/socket/socket.component';
import { MapComponent } from './components/map/map.component';
import { SettingsComponent } from './screens/settings/settings.component';
import { SignComponent } from './screens/sign/sign.component';
import { AuthGuard } from './services/auth.guard';
import { HomeComponent } from './screens/home/home.component';

const routes: Routes = [
  // { path: 'station', component: StationsComponent, canActivate: [AuthGuard] },
  // { path: 'socket', component: SocketComponent, canActivate: [AuthGuard] },
  // { path: 'map', component: MapComponent, canActivate: [AuthGuard] },
  // { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  // { path: 'sign-in', component: SignComponent },
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
