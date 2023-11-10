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
import { MapComponent } from './components/map/map.component';
import { StationsComponent } from './screens/stations/stations.component';
import { ConnectorModalComponent } from './modals/connector-modal/connector-modal.component';
import { SocketComponent } from './screens/socket/socket.component';

import { MatSelectModule } from '@angular/material/select';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

// pipes
import { GetFirstTwoPartsPipe } from './pipes/address.pipe';
import { StationInformationModalComponent } from './modals/station-information-modal/station-information-modal.component';
import { StoreModule } from '@ngrx/store';
import { stationEditDataReducer } from './state/station-edit-data/station-edit-data.reducer';
import { HomeComponent } from './screens/home/home.component';
import { SettingsComponent } from './screens/settings/settings.component';
import { ConnectorComponent } from './components/connector-components/connector/connector.component';
import { StationFormComponent } from './components/station-components/station-form/station-form.component';
import { SocketFormComponent } from './components/socket-components/socket-form/socket-form.component';
import { StationSocketsComponent } from './components/station-components/station-sockets/station-sockets.component';
import { StationListComponent } from './components/station-components/station-list/station-list.component';
import { SocketListComponent } from './components/socket-components/socket-list/socket-list.component';
import { ConnectorListComponent } from './components/connector-components/connector-list/connector-list.component';
import { AdminSettingsComponent } from './components/admin-components/admin-settings/admin-settings.component';
import { SiteSettingsComponent } from './components/admin-components/site-settings/site-settings.component';
import { AddAdminComponent } from './components/admin-components/add-admin/add-admin.component';
import { SignComponent } from './screens/sign/sign.component';
import { LoginComponent } from './components/auth-components/login/login.component';
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
    AdminSettingsComponent,
    SiteSettingsComponent,
    SettingsComponent,
    LoginComponent,
    AddAdminComponent,
    SignComponent,
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
