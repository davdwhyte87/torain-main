import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ButtonComponent } from './components/shared/button/button.component';
import { InputComponent } from './components/shared/input/input.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { DonateComponent } from './pages/donate/donate.component';
import { MediaComponent } from './pages/media/media.component';
import { MsgComponent } from './components/shared/msg/msg.component';
import { MaxWidthPipe } from './pipes/max-width.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    ButtonComponent,
    InputComponent,
    HomeComponent,
    AboutComponent,
    DonateComponent,
    MediaComponent,
    MaxWidthPipe,
  ],
  providers: [MaxWidthPipe],
  bootstrap: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, MsgComponent],
})
export class AppModule {}
