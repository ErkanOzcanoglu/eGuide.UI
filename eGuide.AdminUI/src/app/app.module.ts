import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { loadModules } from 'esri-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConnectorComponent } from './components/connector/connector.component';
import { MapComponent } from './components/map/map.component';
import { StationsComponent } from './screens/stations/stations.component';
import { StationFormComponent } from './components/station-form/station-form.component';
import { ConnectorModalComponent } from './modals/connector-modal/connector-modal.component';
import { SocketComponent } from './screens/socket/socket.component';
import { SocketFormComponent } from './components/socket-form/socket-form.component';
import { StationModelComponent } from './components/station-model/station-model.component';

import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ConnectorComponent,
    MapComponent,
    StationsComponent,
    StationFormComponent,
    ConnectorModalComponent,
    SocketComponent,
    SocketFormComponent,
    StationModelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
