import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StationsComponent } from './screens/stations/stations.component';
import { SocketComponent } from './screens/socket/socket.component';

const routes: Routes = [
  { path: 'station', component: StationsComponent },
  { path: 'socket', component: SocketComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
