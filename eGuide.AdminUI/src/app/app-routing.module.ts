import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StationsComponent } from './screens/stations/stations.component';
import { SocketComponent } from './screens/socket/socket.component';
import { MapComponent } from './components/map/map.component';
import { SettingsComponent } from './screens/settings/settings.component';

const routes: Routes = [
  { path: 'station', component: StationsComponent },
  { path: 'socket', component: SocketComponent },
  { path: 'map', component: MapComponent },
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
