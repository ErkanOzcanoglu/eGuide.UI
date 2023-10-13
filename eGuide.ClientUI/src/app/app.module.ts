import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './screens/home/home.component';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { UserAuthComponent } from './components/user-auth/user-auth.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from './models/auth-guard';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './components/user-login/login.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    NavbarComponent,
    HomeComponent,
    UserAuthComponent,
    UserProfileComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
