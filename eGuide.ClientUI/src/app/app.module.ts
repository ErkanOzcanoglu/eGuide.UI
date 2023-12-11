import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Pipes
import { FilterPipe } from './components/search/search.pipe';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/user-login/login.component';
import { VehicleComponent } from './components/profile-settings/vehicle/vehicle.component';
import { PasswordSettingsComponent } from './components/profile-settings/password-settings/password-settings.component';
import { UserSettingsComponent } from './components/profile-settings/user-settings/user-settings.component';
import { FavouritesComponent } from './components/profile-settings/favourites/favourites.component';
import { ForgotUserPasswordComponent } from './components/password-change/forgot-user-password/forgot-user-password.component';
import { EmailLinkConfirmComponent } from './components/password-change/email-link-confirm/email-link-confirm.component';
import { UserAuthComponent } from './components/user-auth/user-auth.component';

// Secreens
import { HomeComponent } from './screens/home/home.component';
import { SettingsComponent } from './screens/settings/settings/settings.component';

// Services
import { AuthGuard } from './models/auth-guard';
import { AuthService } from './services/auth.service';
import { SearchComponent } from './components/search/search.component';
import { VerifyEmailComponent } from './screens/verify-email/verify-email.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { ServiceComponent } from './screens/service/service.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactComponent } from './screens/contact/contact.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { vehicleReducer } from './state/vehicle-state/vehicle.reducer';
import { PageNotFoundComponent } from './components/error-pages/page-not-found/page-not-found.component';
import { themeReducer } from './state/theme.reducer';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    NavbarComponent,
    HomeComponent,
    UserAuthComponent,
    LoginComponent,
    SettingsComponent,
    VehicleComponent,
    FavouritesComponent,
    PasswordSettingsComponent,
    UserSettingsComponent,
    ForgotUserPasswordComponent,
    EmailLinkConfirmComponent,
    SearchComponent,
    VerifyEmailComponent,
    FilterPipe,
    ServiceListComponent,
    ServiceComponent,
    FooterComponent,
    ContactFormComponent,
    ContactComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    MatDialogModule,
    StoreModule.forRoot({
      theme: themeReducer,
      activeVehicle: vehicleReducer,
    }),
    MatExpansionModule,
    MatListModule,
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
