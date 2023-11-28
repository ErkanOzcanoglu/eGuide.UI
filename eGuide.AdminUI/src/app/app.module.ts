import { mapReducer } from './state/map-click-data/map-click-data.reducer';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

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

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLoginComponent } from './components/adminAuth/admin-login/admin-login.component';
import { EmailConfirmComponent } from './components/adminAuth/email-confirm/email-confirm.component';
import { ForgotAdminPasswordComponent } from './components/adminAuth/forgot-admin-password/forgot-admin-password.component';
import { EmailLinkConfirmComponent } from './components/adminAuth/email-link-confirm/email-link-confirm.component';
import { AuthGuard } from './models/auth-guard';
import { AuthService } from './services/auth.service';
import { ChangePasswordComponent } from './modals/change-password/change-password.component';
import { AdminComponent } from './screens/admin/admin/admin.component';
import { VehicleComponent } from './screens/vehicle/vehicle.component';
import { VehicleFormComponent } from './components/vehicle-components/vehicle-form/vehicle-form.component';
import { VehicleListComponent } from './components/vehicle-components/vehicle-list/vehicle-list.component';
import { SearchFilterPipe } from './pipes/vehicle.pipe';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { FeedbackChartComponent } from './components/dashboard/feedback-chart/feedback-chart.component';
import { FavoritesComponent } from './components/dashboard/favorites/favorites.component';
import { LastFewTransactionComponent } from './components/dashboard/last-few-transaction/last-few-transaction.component';
import { CounterComponent } from './components/dashboard/counter/counter.component';
import { ChartModule } from 'angular-highcharts';
import { MatTabsModule } from '@angular/material/tabs';
import { ServiceFormComponent } from './components/service-components/service-form/service-form.component';
import { ServiceListComponent } from './components/service-components/service-list/service-list.component';
import { ServiceComponent } from './screens/service/service.component';
import { serviceEditDataReducer } from './state/service-edit-data/service-edit-data.reducer';
import { FacilityListComponent } from './components/facilities-components/facility-list/facility-list.component';
import { FacilityFormComponent } from './components/facilities-components/facility-form/facility-form.component';
import { FacilityComponent } from './screens/facility/facility.component';
import { SocialMediaFormComponent } from './components/social-media-components/social-media-form/social-media-form.component';
import { SocialMediaListComponent } from './components/social-media-components/social-media-list/social-media-list.component';
import { SocialMediaComponent } from './screens/social-media/social-media.component';
import { CustomizationComponent } from './screens/customization/customization.component';
import { NavbarCustomizationComponent } from './components/customization-components/navbar-customization/navbar-customization.component';
import { FooterCustomizationComponent } from './components/customization-components/footer-customization/footer-customization.component';
import { ColorCustomizationComponent } from './components/customization-components/color-customization/color-customization.component';
import { CompanyInformationComponent } from './components/customization-components/company-information/company-information.component';
import { setRefreshReducer } from './state/refresh-list/refresh-list.reducer';
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
    AdminLoginComponent,
    ConnectorListComponent,
    EmailConfirmComponent,
    ForgotAdminPasswordComponent,
    EmailLinkConfirmComponent,
    HomeComponent,
    AdminSettingsComponent,
    SiteSettingsComponent,
    SettingsComponent,
    AdminLoginComponent,
    AddAdminComponent,
    SignComponent,
    ChangePasswordComponent,
    AdminComponent,
    VehicleComponent,
    VehicleFormComponent,
    VehicleListComponent,
    SearchFilterPipe,
    DashboardComponent,
    FeedbackChartComponent,
    FavoritesComponent,
    LastFewTransactionComponent,
    CounterComponent,
    ServiceFormComponent,
    ServiceListComponent,
    ServiceComponent,
    FacilityListComponent,
    FacilityFormComponent,
    FacilityComponent,
    SocialMediaFormComponent,
    SocialMediaListComponent,
    SocialMediaComponent,
    CustomizationComponent,
    NavbarCustomizationComponent,
    FooterCustomizationComponent,
    ColorCustomizationComponent,
    CompanyInformationComponent,
  ],
  imports: [
    ChartModule,
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
      refresh: setRefreshReducer,
      serviceEditData: serviceEditDataReducer,
    }),
    MatTabsModule,
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
