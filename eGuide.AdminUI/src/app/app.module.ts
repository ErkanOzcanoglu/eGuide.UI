import { mapReducer } from './state/map-click-data/map-click-data.reducer';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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

import { MatSelectModule } from '@angular/material/select';
import { StationSocketsComponent } from './components/station-sockets/station-sockets.component';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { StationListComponent } from './components/station-list/station-list.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { SocketListComponent } from './components/socket-list/socket-list.component';

// pipes
import { GetFirstTwoPartsPipe } from './pipes/address.pipe';
import { StationInformationModalComponent } from './modals/station-information-modal/station-information-modal.component';
import { ConnectorListComponent } from './components/connector-list/connector-list.component';
import { StoreModule } from '@ngrx/store';
import { stationEditDataReducer } from './state/station-edit-data/station-edit-data.reducer';
import { HomeComponent } from './screens/home/home.component';
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
    StationSocketsComponent,
    StationListComponent,
    SocketListComponent,
    GetFirstTwoPartsPipe,
    StationInformationModalComponent,
    ConnectorListComponent,
    HomeComponent,
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
    BrowserAnimationsModule,
    NgMultiSelectDropDownModule.forRoot(),
    ToastrModule.forRoot(),
    StoreModule.forRoot({
      map: mapReducer,
      stationEditData: stationEditDataReducer,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
