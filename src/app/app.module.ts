import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MaxWidthPipe } from './pipes/max-width.pipe';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './layout/auth/auth.component';
import { LoginComponent } from './pages/auth/login.component';
import { MediaComponent } from './pages/media/media.component';
import { AboutComponent } from './pages/about/about.component';
import { MaterialModule } from './shared/module/material.module';
import { DonateComponent } from './pages/donate/donate.component';
import { UnauthComponent } from './layout/unauth/unauth.component';
import { MsgComponent } from './components/shared/msg/msg.component';
import { FirebaseService } from './service/firebase/firebase.service';
import { DashboardComponent } from './pages/admin/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { InputComponent } from './components/shared/input/input.component';
import { ButtonComponent } from './components/shared/button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    LoginComponent,
    ButtonComponent,
    InputComponent,
    HomeComponent,
    AboutComponent,
    DonateComponent,
    MediaComponent,
    MaxWidthPipe,
    DashboardComponent,
    AuthComponent,
    UnauthComponent,
  ],
  providers: [MaxWidthPipe, FirebaseService],
  bootstrap: [AppComponent],
  imports: [
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientJsonpModule,
    AppRoutingModule,
    MsgComponent,
    HttpClientModule,
  ],
})
export class AppModule {}
